import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Signer } from 'ethers'

const useSigner = (): Signer | undefined => {
  const { account, library } = useWeb3React()

  const [signer, setSigner] = useState()

  useEffect(() => {
    (async () => {
      if (!account || !library) {
        setSigner(undefined)
        return
      }

      setSigner(await library.getSigner(account))
    })()
  }, [account, library])

  return signer
}

export default useSigner
