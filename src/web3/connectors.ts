import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import MetaMaskIcon from '../images/wallet/metamask.png'
import CeloLogo from '../images/wallet/celo.svg'

import { Web3Provider } from '@ethersproject/providers'
import { CeloConnector } from './celo-connector'
import { WalletAdapter } from '../contexts/solana-web3'
import { PhantomWalletAdapter } from '../contexts/solana-web3/walletAdapters/phantom'

import SolanaLogo from '../assets/images/wallets/solanaLogoMark.svg'
import AvalancheLogo from '../assets/images/wallets/avalanche.png'
export const injected = new InjectedConnector({})

export const celoInjected = new CeloConnector({})

export enum WalletKeys {
  MetaMask = 'MetaMask',
  BSC = 'BSC',
  WalletConnect = 'WalletConnect',
  Celo = 'Celo'
}

export enum NetworkKeys {
  Solana = 'Solana',
  Celo = 'Celo',
  Avalanche = 'Avalanche'
}

export type WalletType = {
  key?: WalletKeys,
  name: string
  icon: string,
  connector?: AbstractConnector,
  url?: string,
  adapter?: new() => WalletAdapter
  chainType: 'eth' | 'solana' | 'celo'
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
    icon: CeloLogo,
    connector: celoInjected,
    chainType: 'celo' || 'eth'

  },
  {
    name: 'Phantom',
    url: 'https://phantom.app/',
    icon: 'https://raydium.io/_nuxt/img/phantom.d9e3c61.png',
    adapter: PhantomWalletAdapter,
    chainType: 'solana',
  }
]

export type NetworkType = {
  key?: NetworkKeys
  icon: any,
  name: string
  selected?: (_? : string) => void
  supportedWallet: WalletType[]
}

export const supportNetwork: NetworkType[] = [
  {
    key: NetworkKeys.Solana,
    name: 'Solana',
    icon:SolanaLogo,
    supportedWallet: supportWallets.filter(v => v.chainType === 'solana')
  },
  {
    key: NetworkKeys.Celo,
    name: 'Celo',
    icon: CeloLogo,
    supportedWallet: supportWallets.filter(v => v.chainType !== 'solana')
  },
  {
    key: NetworkKeys.Avalanche,
    name: 'Avalanche',
    icon: AvalancheLogo,
    supportedWallet: supportWallets.filter(v => v.chainType === 'eth')
  }
]

export const SCAN_ADDRESS = {
  [44787]: 'https://alfajores-forno.celo-testnet.org',
  [43114]: 'https://api.avax.network/ext/bc/C/rpc'
}

export const networkConf = {
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

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}
