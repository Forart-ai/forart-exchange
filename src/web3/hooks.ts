import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { celoInjected, injected } from './connectors'
import { SupportWalletNames, useSolanaWeb3 } from '../contexts/solana-web3'
import useLocalStorage, { LOCAL_STORAGE_WALLET_KEY } from '../hooks/useLocalStorage'
import { SUPPORT_WALLETS } from '../utils/constant'
import { sleep } from '../utils'

export function useEagerConnect() {
  const [wallet] = useLocalStorage<SupportWalletNames>(LOCAL_STORAGE_WALLET_KEY)

  const [eagerConnected, setEagerConnected] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      if (wallet === SUPPORT_WALLETS.Phantom.name) {
        await sleep(1000)
        const solana = (window as any).solana

        solana
          ?.connect({ onlyIfTrusted: true })
          .then(() => {
            setEagerConnected(true)
          })
          .catch(() => {})
      }
    })()
  }, [wallet])

  return { eagerConnected }
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React()

  useEffect((): any => {
    const { ethereum } = window as any
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log('Handling \'connect\' event')
        activate(injected)
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log('Handling \'chainChanged\' event with payload', chainId)
        activate(injected)
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('Handling \'accountsChanged\' event with payload', accounts)
        if (accounts.length > 0) {
          activate(injected)
        }
      }
      const handleNetworkChanged = (networkId: string | number) => {
        console.log('Handling \'networkChanged\' event with payload', networkId)
        activate(injected)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}

export function useChainEffect() {
  const { account, connector } = useWeb3React()

  const SCAN_ADDRESS = {
    [44787]: 'https://alfajores-forno.celo-testnet.org',
    [43114]: 'https://api.avax.network/ext/bc/C/rpc'
  }

  const networkConf = {
    [44787]: {
      chainId: '0x' + parseInt('44787').toString(16),
      chainName: 'CELO Alfajores Testnet',
      nativeCurrency: {
        name:'',
        symbol:'',
        decimals:18,
      },
      rpcUrls: [
        'https://alfajores-forno.celo-testnet.org'
      ],
      blockExplorerUrls: [SCAN_ADDRESS[44787]]
    },

    [43114]: {
      chainId: '0x' + parseInt('43114').toString(16),
      chainName: 'Avalanche Mainnet C-Chain',
      nativeCurrency: {
        name:'',
        symbol: 'AVAX',
        decimals: 18,
      },
      rpcUrls: [
        'https://api.avax.network/ext/bc/C/rpc'
      ],
      blockExplorerUrls: [SCAN_ADDRESS[43114]]
    }
  }

  useEffect(():any => {
    const { ethereum } = window as any

    if (ethereum) {
      ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkConf[43114].chainId }]
      }).catch((e: any) => {
        if (e.code === 4902) {
          ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                ...networkConf[43114]
              }
            ],
          })

        }
      })
    }

  },[account])

}

