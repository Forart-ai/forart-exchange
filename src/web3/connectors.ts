import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import MetaMaskIcon from '../images/wallet/metamask.png'
import CeloIcon from '../images/wallet/celo.svg'

import { Web3Provider } from '@ethersproject/providers'
import { CeloConnector } from './celo-connector'
import { WalletAdapter } from '../contexts/solana-web3'
import { PhantomWalletAdapter } from '../contexts/solana-web3/walletAdapters/phantom'

export const injected = new InjectedConnector({})

export const celoInjected = new CeloConnector({})

export enum WalletKeys {
  MetaMask = 'MetaMask',
  BSC = 'BSC',
  WalletConnect = 'WalletConnect',
  Celo = 'Celo'
}

export type WalletType = {
  key?: WalletKeys,
  name: string
  icon: string,
  connector?: AbstractConnector,
  url?: string,
  adapter?: new() => WalletAdapter
  chainType: 'eth' | 'solana'
}

export const supportWallets: WalletType[] = [
  {
    name: 'MetaMask',
    key: WalletKeys.MetaMask,
    icon: MetaMaskIcon,
    connector: injected,
    chainType: 'eth'
  },
  {
    name: 'Celo',
    key: WalletKeys.Celo,
    icon: CeloIcon,
    connector: celoInjected,
    chainType: 'eth'

  },
  {
    name: 'Phantom',
    url: 'https://phantom.app/',
    icon: 'https://raydium.io/_nuxt/img/phantom.d9e3c61.png',
    adapter: PhantomWalletAdapter,
    chainType: 'solana'

  }

]

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  console.log(library)
  return library
}
