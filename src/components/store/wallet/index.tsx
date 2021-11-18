import { State, WalletState } from '../type'


export function getAccount(state: State): string | undefined {
  return state.wallet.account
}
