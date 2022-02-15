import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import warning from 'tiny-warning'

export type SendReturnResult = { result: any }
export type SendReturn = any

export type Send = (method: string, params?: any[]) => Promise<SendReturnResult | SendReturn>
export type SendOld = ({ method }: { method: string }) => Promise<SendReturnResult | SendReturn>

function parseSendReturn(sendReturn: SendReturnResult | SendReturn): any {
  // eslint-disable-next-line no-prototype-builtins
  return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn
}

export class NoEthereumProviderError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'No Ethereum provider was found on (window as any).celo.'
  }
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}

export class CeloConnector extends AbstractConnector {
  constructor(kwargs: AbstractConnectorArguments) {
    super(kwargs)

    this.handleNetworkChanged = this.handleNetworkChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  private handleChainChanged(chainId: string | number): void {
    this.emitUpdate({ chainId, provider: (window as any).celo })
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) {
      this.emitDeactivate()
    } else {
      this.emitUpdate({ account: accounts[0] })
    }
  }

  private handleClose(_code: number, _reason: string): void {
    this.emitDeactivate()
  }

  private handleNetworkChanged(networkId: string | number): void {
    if (networkId === 'loading') {
      return
    }

    this.emitUpdate({ chainId: networkId, provider: (window as any).celo })
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!(window as any).celo) {
      throw new NoEthereumProviderError()
    }

    if ((window as any).celo.on) {
      (window as any).celo.on('chainChanged', this.handleChainChanged);
      (window as any).celo.on('accountsChanged', this.handleAccountsChanged);
      (window as any).celo.on('close', this.handleClose);
      (window as any).celo.on('networkChanged', this.handleNetworkChanged)
    }

    if (((window as any).celo as any).isMetaMask) {
      ((window as any).celo as any).autoRefreshOnNetworkChange = false
    }

    // try to activate + get account via eth_requestAccounts
    let account
    try {
      account = await ((window as any).celo.send as Send)('eth_requestAccounts').then(
        sendReturn => parseSendReturn(sendReturn)[0]
      )
    } catch (error) {
      if ((error as any).code === 4001) {
        throw new UserRejectedRequestError()
      }
      warning(false, 'eth_requestAccounts was unsuccessful, falling back to enable')
    }

    // if unsuccessful, try enable
    if (!account) {
      // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
      account = await (window as any).celo.enable().then((sendReturn: any) => sendReturn && parseSendReturn(sendReturn)[0])
    }

    return { provider: (window as any).celo, ...(account ? { account } : {}) }
  }

  public async getProvider(): Promise<any> {
    return (window as any).celo
  }

  public async getChainId(): Promise<number | string> {
    if (!(window as any).celo) {
      throw new NoEthereumProviderError()
    }

    let chainId
    try {
      chainId = await ((window as any).celo.send as Send)('eth_chainId').then(parseSendReturn)
    } catch {
      warning(false, 'eth_chainId was unsuccessful, falling back to net_version')
    }

    if (!chainId) {
      try {
        chainId = await ((window as any).celo.send as Send)('net_version').then(parseSendReturn)
      } catch {
        warning(false, 'net_version was unsuccessful, falling back to net version v2')
      }
    }

    if (!chainId) {
      try {
        chainId = parseSendReturn(((window as any).celo.send as SendOld)({ method: 'net_version' }))
      } catch {
        warning(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties')
      }
    }

    if (!chainId) {
      if (((window as any).celo as any).isDapper) {
        chainId = parseSendReturn(((window as any).celo as any).cachedResults.net_version)
      } else {
        chainId =
          ((window as any).celo as any).chainId ||
          ((window as any).celo as any).netVersion ||
          ((window as any).celo as any).networkVersion ||
          ((window as any).celo as any)._chainId
      }
    }

    return chainId
  }

  public async getAccount(): Promise<null | string> {
    if (!(window as any).celo) {
      throw new NoEthereumProviderError()
    }

    let account
    try {
      account = await ((window as any).celo.send as Send)('eth_accounts').then(sendReturn => parseSendReturn(sendReturn)[0])
    } catch {
      warning(false, 'eth_accounts was unsuccessful, falling back to enable')
    }

    if (!account) {
      try {
        account = await (window as any).celo.enable().then((sendReturn: any) => parseSendReturn(sendReturn)[0])
      } catch {
        warning(false, 'enable was unsuccessful, falling back to eth_accounts v2')
      }
    }

    if (!account) {
      account = parseSendReturn(((window as any).celo.send as SendOld)({ method: 'eth_accounts' }))[0]
    }

    return account
  }

  public deactivate() {
    if ((window as any).celo && (window as any).celo.removeListener) {
      (window as any).celo.removeListener('chainChanged', this.handleChainChanged);
      (window as any).celo.removeListener('accountsChanged', this.handleAccountsChanged);
      (window as any).celo.removeListener('close', this.handleClose);
      (window as any).celo.removeListener('networkChanged', this.handleNetworkChanged)
    }
  }

  public async isAuthorized(): Promise<boolean> {
    if (!(window as any).celo) {
      return false
    }

    try {
      return await ((window as any).celo.send as Send)('eth_accounts').then(sendReturn => {
        return parseSendReturn(sendReturn).length > 0
      })
    } catch {
      return false
    }
  }
}
