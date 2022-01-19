import { useConnectionConfig } from '../contexts/solana-connection-config'
import { useSolanaWeb3 } from '../contexts/solana-web3'
import { Provider } from '@project-serum/anchor'
import { useMemo } from 'react'

const useAnchorProvider = () => {
  const { connection } = useConnectionConfig()
  const { adapter, connected } = useSolanaWeb3()

  return useMemo(() => {
    if (!connection || !adapter || !connected) {
      return undefined
    }

    return new Provider(connection, adapter, {})
  }, [connection, adapter, connected])
}

export default useAnchorProvider
