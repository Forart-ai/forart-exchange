import { useEffect, useState } from 'react'
import { sleep } from '../utils'
import useLocalStorage, { LOCAL_STORAGE_WALLET_KEY } from './useLocalStorage'
import { SupportWalletNames } from '../contexts/solana-web3'
import { SUPPORT_WALLETS } from '../utils/constant'

const useEagerConnect = () => {
  const [wallet] = useLocalStorage<SupportWalletNames>(LOCAL_STORAGE_WALLET_KEY)

  const [eagerConnected, setEagerConnected] = useState<boolean>(false)

  useEffect(() => {
    (async () => {

      if (wallet === SUPPORT_WALLETS.Phantom.name) {
        await sleep(1000)
        const solana = (window as any).solana

        solana?.connect({ onlyIfTrusted: true })
          .then(() => {
            setEagerConnected(true)
          })
          .catch(() => {})
      }
    })()
  }, [wallet])

  return { eagerConnected }
}

export default useEagerConnect
