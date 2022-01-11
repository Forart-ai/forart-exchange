import React, { useContext, useEffect, useMemo } from 'react'
import { Account, clusterApiUrl, Connection } from '@solana/web3.js'
import { ENV as ChainID } from '@solana/spl-token-registry'
import useLocalStorage from '../hooks/useLocalStorage'
import { setProgramIds } from '../utils/ids'

export type Network =
  | 'mainnet-beta'
  | 'testnet'
  | 'devnet'
  | 'localnet';


interface ConnectionConfig {
  connection: Connection;
  sendConnection: Connection;
  endpointUrl: string;
  slippage: number;
  setSlippage: (val: number) => void;
  network: Network;
  setEndpoint: (val: string) => void;
}

export type Endpoint = {
  name: Network
  endpointUrl: string
  chainID: ChainID,
}

export const ENDPOINTS: Record<Network, Endpoint> = {
  'mainnet-beta': {
    name: 'mainnet-beta' as Network,
    endpointUrl: 'https://solana-api.projectserum.com/',
    chainID: ChainID.MainnetBeta
  },
  'testnet': {
    name: 'testnet' as Network,
    endpointUrl: clusterApiUrl('testnet'),
    chainID: ChainID.Testnet
  },
  'devnet': {
    name: 'devnet' as Network,
    endpointUrl: clusterApiUrl('devnet'),
    chainID: ChainID.Devnet
  },
  'localnet': {
    name: 'localnet' as Network,
    endpointUrl: 'http://127.0.0.1:8899',
    chainID: ChainID.Devnet
  }
}


const DEFAULT_NETWORK: Network = 'devnet'

const DEFAULT_ENDPOINT = ENDPOINTS[DEFAULT_NETWORK]

const DEFAULT_SLIPPAGE = 1


const SolanaConnectionConfigContext = React.createContext<ConnectionConfig>({
  endpointUrl: DEFAULT_ENDPOINT.endpointUrl,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEndpoint: () => {},
  slippage: DEFAULT_SLIPPAGE,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSlippage: (_val: number) => {},
  connection: new Connection(DEFAULT_ENDPOINT.endpointUrl, 'recent'),
  sendConnection: new Connection(DEFAULT_ENDPOINT.endpointUrl, 'recent'),
  network: DEFAULT_NETWORK
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

  const chain = ENDPOINTS[endpoint as Network] ?? DEFAULT_ENDPOINT
  const env = chain.name

  setProgramIds(env)

  // The websocket library solana/web3.js uses closes its websocket connection when the subscription list
  // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
  // This is a hack to prevent the list from every getting empty
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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
      value={{
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
