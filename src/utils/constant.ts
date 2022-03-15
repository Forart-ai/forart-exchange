import { PhantomWalletAdapter } from '../contexts/solana-web3/walletAdapters/phantom'
import { SolanaWallet, SupportWalletNames } from '../contexts/solana-web3'

export const SUPPORT_WALLETS: Record<SupportWalletNames, SolanaWallet> = {
  'Phantom': {
    name: 'Phantom',
    url: 'https://phantom.app/',
    icon: 'https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1.25,format=auto/https%3A%2F%2F3632261023-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-28427.appspot.com%2Fo%2Fspaces%252F-MVOiF6Zqit57q_hxJYp%252Favatar-1615495356537.png%3Fgeneration%3D1615495356841399%26alt%3Dmedia',
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
