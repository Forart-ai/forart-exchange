import { SolanaWallet, SupportWalletNames } from '../contexts/solana-web3'
import PhantomLogo from '../assets/images/wallets/phantomLogo.png'

import { PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

export const SUPPORT_WALLETS: Record<SupportWalletNames, SolanaWallet> = {
  'Phantom': {
    name: 'Phantom',
    icon: PhantomLogo,
    adapter: PhantomWalletAdapter
  },
  'Solflare': {
    name: 'Solflare',
    icon: '',
    adapter: SolflareWalletAdapter,
  },
  Slope: {
    name: 'Slope',
    icon: '',
    adapter: SlopeWalletAdapter
  }
  // 'Solong': {
  //   name: 'Solong',
  //   url: 'https://solongwallet.com',
  //   icon: `${ASSETS_URL}solong.png`,
  //   adapter: SolongWalletAdapter
  // },
  // 'MathWallet': {
  //   name: 'MathWallet',
  //   url: 'https://mathwallet.org',
  //   icon: `${ASSETS_URL}mathwallet.svg`
  // },
  // 'Ledger': {
  //   name: 'Ledger',
  //   url: 'https://www.ledger.com',
  //   icon: `${ASSETS_URL}ledger.svg`,
  //   adapter: LedgerWalletAdapter
  // },
  // 'Sollet': {
  //   name: 'Sollet',
  //   url: 'https://www.sollet.io',
  //   icon: `${ASSETS_URL}sollet.svg`
  // }
}
