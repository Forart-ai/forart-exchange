import { useSolanaWeb3 } from '../contexts/solana-web3'
import { useWeb3React } from '@web3-react/core'
import {  useMemo } from 'react'

const useConnectedWallet = () => {

  const { account: solAccount } = useSolanaWeb3()
  const { account: ethAccount } = useWeb3React()

  return useMemo(() => {

    if (solAccount && !ethAccount) {
      return solAccount.toBase58()
    }

    if (ethAccount && !solAccount) {
      return ethAccount
    }
    else return undefined

  }, [solAccount, ethAccount])

}

export default useConnectedWallet
