import useAnchorProvider from '../../useAnchorProvider'
import { useConnectionConfig } from '../../../contexts/solana-connection-config'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { useCallback } from 'react'
import { WHITELIST_TOKEN_ADDRESS } from './constant'
import { ParsedAccountData } from '@solana/web3.js'
import { useQuery } from 'react-query'

const useWhiteList = () => {
  const { provider } = useAnchorProvider()
  const { account } = useSolanaWeb3()
  const { connection } = useConnectionConfig()

  // const checkWhiteList = useCallback(async () => {
  //   if (!account) {
  //     return
  //   }
  //
  //   const userTokenAmount = (await connection.getTokenAccountsByOwner(account, { mint: WHITELIST_TOKEN_ADDRESS })).value[0]?.pubkey
  //
  //   if (!userTokenAmount) {
  //     throw new Error('Sorry')
  //     return
  //   }
  //
  //   const tokenAccount = await connection.getParsedAccountInfo(userTokenAmount)
  //
  //   const tokenBalance = (tokenAccount.value?.data as ParsedAccountData).parsed.info.tokenAmount.uiAmountString
  //
  //   console.log(tokenBalance)
  //
  //   return tokenBalance
  //
  // },[account])

  const checkWhiteList = useQuery(['USER_MINT_CHANCE', account?.toBase58()], async () => {
    if (!account) {
      return
    }

    const userTokenAmount = (await connection.getTokenAccountsByOwner(account, { mint: WHITELIST_TOKEN_ADDRESS })).value[0]?.pubkey

    if (!userTokenAmount) {
      throw new Error('The current account is not in whitelist')
      return
    }

    const tokenAccount = await connection.getParsedAccountInfo(userTokenAmount)

    // if (!tokenAccount) {
    //   throw new Error('something is going wrong')
    //   return
    // }

    const tokenBalance = (tokenAccount.value?.data as ParsedAccountData).parsed.info.tokenAmount.uiAmountString

    return tokenBalance
  }, { refetchInterval: false, refetchOnWindowFocus: true })

  return {
    checkWhiteList
  }

}

export { useWhiteList }
