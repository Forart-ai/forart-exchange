import { PhantomWalletAdapter } from '../contexts/solana-web3/walletAdapters/phantom'
import { SolanaWallet, SupportWalletNames } from '../contexts/solana-web3'
import PhantomLogo from '../assets/images/wallets/phantomLogo.png'

export const SUPPORT_WALLETS: Record<SupportWalletNames, SolanaWallet> = {
  'Phantom': {
    name: 'Phantom',
    url: 'https://phantom.app/',
    icon: PhantomLogo,
    adapter: PhantomWalletAdapter
  },
  // 'Solflare': {
  //   name: 'Solflare',
  //   url: 'https://solflare.com/access-wallet',
  //   icon: `${ASSETS_URL}solflare.svg`
  // },
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
