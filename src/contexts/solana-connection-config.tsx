import React, { useContext, useEffect, useMemo } from 'react'
import { Account, Cluster, clusterApiUrl, Connection } from '@solana/web3.js'
import { ENV as ChainID } from '@solana/spl-token-registry'
import useLocalStorage from '../hooks/useLocalStorage'
import { setProgramIds } from '../utils/ids'

interface ConnectionConfig {
  connection: Connection;
  sendConnection: Connection;
  endpointUrl: string;
  slippage: number;
  setSlippage: (val: number) => void;
  network: Cluster;
  setEndpoint: (val: string) => void;
}

export type Endpoint = {
  name: Cluster
  endpointUrl: string
  chainID: ChainID,
}

export const ENDPOINTS: Record<Cluster, Endpoint> = {
  'mainnet-beta': {
    name: 'mainnet-beta',
    endpointUrl: 'https://solana-api.projectserum.com/',
    chainID: ChainID.MainnetBeta
  },
  'testnet': {
    name: 'testnet',
    endpointUrl: clusterApiUrl('testnet'),
    chainID: ChainID.Testnet
  },
  'devnet': {
    name: 'devnet',
    endpointUrl: clusterApiUrl('devnet'),
    chainID: ChainID.Devnet
  },
}

export const DEFAULT_CLUSTER: Cluster = process.env.REACT_APP_SOLANA_CLUSTER as Cluster
// export const DEFAULT_CLUSTER: Cluster = 'devnet'

const DEFAULT_ENDPOINT = ENDPOINTS[DEFAULT_CLUSTER]
const DEFAULT_SLIPPAGE = 1

const SolanaConnectionConfigContext = React.createContext<ConnectionConfig>({
  endpointUrl: DEFAULT_ENDPOINT.endpointUrl,
  setEndpoint: () => {
  },
  slippage: DEFAULT_SLIPPAGE,
  setSlippage: (_val: number) => {
  },
  connection: new Connection(DEFAULT_ENDPOINT.endpointUrl, 'finalized'),
  sendConnection: new Connection(DEFAULT_ENDPOINT.endpointUrl, 'finalized'),
  network: DEFAULT_CLUSTER
})

export function SolanaConnectionConfigProvider({ children = undefined as any }) {
  const [endpoint, setEndpoint] = useLocalStorage<string>(
    'connectionEndpts',
    DEFAULT_ENDPOINT.endpointUrl
  )

  const [slippage, setSlippage] = useLocalStorage<string>(
    'slippage',
    DEFAULT_SLIPPAGE.toString()
  )

  const connection = useMemo(() => new Connection(endpoint!, 'recent'), [
    endpoint
  ])
  const sendConnection = useMemo(() => new Connection(endpoint!, 'recent'), [
    endpoint
  ])

  const chain = ENDPOINTS[endpoint as Cluster] ?? DEFAULT_ENDPOINT
  const env = chain.name

  setProgramIds(env)

  // The websocket library solana/web3.js uses closes its websocket connection when the subscription list
  // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
  // This is a hack to prevent the list from every getting empty
  useEffect(() => {
    const id = connection.onAccountChange(new Account().publicKey, () => {
    })
    return () => {
      connection.removeAccountChangeListener(id)
    }
  }, [connection])

  useEffect(() => {
    const id = connection.onSlotChange(() => null)
    return () => {
      connection.removeSlotChangeListener(id)
    }
  }, [connection])

  useEffect(() => {
    const id = sendConnection.onAccountChange(
      new Account().publicKey,
      () => {
      }
    )
    return () => {
      sendConnection.removeAccountChangeListener(id)
    }
  }, [sendConnection])

  useEffect(() => {
    const id = sendConnection.onSlotChange(() => null)
    return () => {
      sendConnection.removeSlotChangeListener(id)
    }
  }, [sendConnection])

  return (
    <SolanaConnectionConfigContext.Provider
      value= {{
        endpointUrl: endpoint!,
        setEndpoint,
        slippage: parseFloat(slippage!),
        setSlippage: val => setSlippage(val.toString()),
        connection,
        sendConnection,
        network: env
      }}
    >
      {children}
    </SolanaConnectionConfigContext.Provider>
  )
}

export function useConnectionConfig() {
  return useContext(SolanaConnectionConfigContext)
}

