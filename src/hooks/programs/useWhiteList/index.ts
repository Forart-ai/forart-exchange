import useAnchorProvider from '../../useAnchorProvider'
import { useConnectionConfig } from '../../../contexts/solana-connection-config'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { useCallback } from 'react'
import { WHITELIST_TOKEN_ADDRESS } from './constant'
import { ParsedAccountData } from '@solana/web3.js'

const useWhiteList = () => {
  const { provider } = useAnchorProvider()
  const { account } = useSolanaWeb3()
  const { connection } = useConnectionConfig()

  const checkWhiteList = useCallback(async () => {
    if (!account) {
      return
    }
    console.log('in')

    const userTokenAmount = (await connection.getTokenAccountsByOwner(account, { mint: WHITELIST_TOKEN_ADDRESS })).value[0]?.pubkey

    if (!userTokenAmount) {
      throw new Error('Sorry')
      return
    }

    const tokenAccount = await connection.getParsedAccountInfo(userTokenAmount)

    const tokenBalance = (tokenAccount.value?.data as ParsedAccountData).parsed.info.tokenAmount.uiAmountString

    console.log(tokenBalance)

    return tokenBalance

  },[account])

  return {
    checkWhiteList
  }

}

export { useWhiteList }
