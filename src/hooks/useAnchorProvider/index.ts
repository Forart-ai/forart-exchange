import { useConnectionConfig } from '../../contexts/solana-connection-config'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { AnchorProvider } from '@project-serum/anchor'
import { useMemo } from 'react'
import { MockWallet } from './MockWallet'

const useAnchorProvider = () => {
  const { connection } = useConnectionConfig()
  const { adapter, connected } = useSolanaWeb3()

  return useMemo<{ provider: AnchorProvider; readOnly: boolean }>(() => {
    if (!adapter) {
      const mockWallet = new MockWallet()

      return {
        provider: new AnchorProvider(connection, mockWallet, {}),
        readOnly: true
      }
    }

    return {
      provider: new AnchorProvider(connection, adapter as any, {}),
      readOnly: false
    }
  }, [connection, adapter, connected])
}

export default useAnchorProvider

