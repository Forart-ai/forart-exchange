import { PublicKey } from '@solana/web3.js'
import FTBLogo from '../../../../assets/images/wallets/phantomLogo.png'

const CURRENCY_FTB: Currency = {
  name: 'FTB',
  icon: FTBLogo,
}

// const CURRENCY_ETH: Currency = {
//   name: 'ETH',
//   icon: 'https://www.gate.io/images/coin_icon/64/eth.png?v=1632807763'
// }
//
// const CURRENCY_USDC: Currency = {
//   name: 'USDC',
//   icon: 'https://w.namu.la/s/2a459b80b53e834d84a9057dab174f8ce7116b1ce96a5fe4bb2c4ac4680f5cbe93e0c117dcb245cd19378a7b7a4d55ea66d665d5b26909810e5ebb3aaa9e3c47999b524f65df6eafd1666fab31dded66'
// }

export type Currency = {
    name: string
    icon: any
}

export type TokenStakingPoolConfig = {
    currency: [Currency] | [Currency, Currency]
    poolAddress?: PublicKey
    whitelist?: PublicKey
    rewardTokenName: string
}

const TOKEN_STAKING_POOLS: TokenStakingPoolConfig[] = [
  {
    currency: [CURRENCY_FTB],
    poolAddress: undefined,
    whitelist: undefined,
    rewardTokenName: 'FTB'
  },
]

export {
  TOKEN_STAKING_POOLS
}
