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
    endpointUrl: clusterApiUrl('mainnet-beta'),
    chainID: ChainID.MainnetBeta
  },
  'testnet': {
    name: 'testnet',
    endpointUrl: clusterApiUrl('testnet'),
    chainID: ChainID.Testnet
  },
  'devnet': {
    name: 'devnet',
    endpointUrl: 'https://mango.devnet.rpcpool.com',
    chainID: ChainID.Devnet
  },
}

export const DEFAULT_CLUSTER: Cluster = process.env.REACT_APP_SOLANA_CLUSTER as Cluster
export const DEFAULT_ENDPOINT: string = process.env.REACT_APP_SOLANA_ENDPOINT || ENDPOINTS[DEFAULT_CLUSTER].endpointUrl

// export const DEFAULT_CLUSTER: Cluster = 'devnet'

const DEFAULT_SLIPPAGE = 1

const SolanaConnectionConfigContext = React.createContext<ConnectionConfig>({
  endpointUrl: DEFAULT_ENDPOINT,
  setEndpoint: () => {
  },
  slippage: DEFAULT_SLIPPAGE,
  setSlippage: (_val: number) => {
  },
  connection: new Connection(DEFAULT_ENDPOINT, 'finalized'),
  sendConnection: new Connection(DEFAULT_ENDPOINT, 'finalized'),
  network: DEFAULT_CLUSTER
})

export function SolanaConnectionConfigProvider({ children = undefined as any }) {
  const [endpoint, setEndpoint] = useLocalStorage<string>(
    'connectionEndpts',
    DEFAULT_ENDPOINT
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

