import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import MetaMaskIcon from '../images/wallet/metamask.png'
import CeloIcon from '../images/wallet/celo.svg'

import { Web3Provider } from '@ethersproject/providers'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { CeloConnector } from './celo-connector'

const RPC_URLS: {[chainId: number]:string} = {
  1: process.env.RPC_URL_1 as string,
  4: process.env.RPC_URL_1 as string,
}

export const injected = new InjectedConnector({})

export const celoInjected = new CeloConnector({})

const walletConnect = new WalletConnectConnector( {})

export enum WalletKeys {
  MetaMask = 'MetaMask',
  BSC = 'BSC',
  WalletConnect = 'WalletConnect',
  Celo = 'Celo'
}

export type Wallet = {
  key: WalletKeys,
  name: string
  icon: string,
  connector: AbstractConnector
}

export const supportWallets: Wallet[] = [
  {
    name:'MetaMask',
    key:WalletKeys.MetaMask,
    icon:MetaMaskIcon,
    connector: injected
  },
  {
    name:'Celo',
    key:WalletKeys.Celo,
    icon:CeloIcon,
    connector: celoInjected
  },

]

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  console.log(library)
  return library
}
