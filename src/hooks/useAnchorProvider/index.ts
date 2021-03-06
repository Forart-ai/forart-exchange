import { useConnectionConfig } from '../../contexts/solana-connection-config'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { Provider } from '@project-serum/anchor'
import { useMemo } from 'react'
import { MockWallet } from './MockWallet'

const useAnchorProvider = () => {
  const { connection } = useConnectionConfig()
  const { adapter, connected } = useSolanaWeb3()

  return useMemo<{ provider: Provider; readOnly: boolean }>(() => {
    if (!adapter) {
      const mockWallet = new MockWallet()

      return {
        provider: new Provider(connection, mockWallet, {}),
        readOnly: true
      }
    }

    return {
      provider: new Provider(connection, adapter, {}),
      readOnly: false
    }
  }, [connection, adapter, connected])
}

export default useAnchorProvider

