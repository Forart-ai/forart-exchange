import { useCallback } from 'react'
// import { FormInstance } from 'antd'
import { useSolanaWeb3 } from '../contexts/solana-web3'

const usePost = () => {
  const { account } = useSolanaWeb3()
  // const post = useCallback(async (formInstance:FormInstance<PostForm>) => {
  //
  //   const form = await formInstance.validateFields()
  //
  //   console.log(form)
  //
  // },[account])

  return 0
}

export default usePost

