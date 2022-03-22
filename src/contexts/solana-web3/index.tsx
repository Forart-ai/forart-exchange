import EventEmitter from 'eventemitter3'
import type { PublicKey } from '@solana/web3.js'
import { Transaction } from '@solana/web3.js'
import { useConnectionConfig } from '../solana-connection-config'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useEagerConnect from '../../hooks/useEagerConnect'
import { SUPPORT_WALLETS } from '../../utils/constant'
import Wallet  from '@project-serum/sol-wallet-adapter'
import useLocalStorage, { LOCAL_STORAGE_WALLET_KEY } from '../../hooks/useLocalStorage'
import { SolanaWalletSelectionModal, WalletItem } from './modal'
import { shortenAddress } from '../../utils'
import notify from '../../utils/notify'

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
  signAllTransactions: (txs: Transaction[]) => Promise<Transaction[]>;
  connect: () => any;
  disconnect: () => any;
}

export type SupportWalletNames =
    | 'Phantom'
// | 'Solflare'
// | 'Solong'
// | 'MathWallet'
// | 'Ledger'
// | 'Sollet'

export type SolanaWallet = {
  name: SupportWalletNames
  url: string
  icon: string
  adapter?: new() => WalletAdapter
}

export type WalletContextValues = {
  adapter: WalletAdapter | undefined;
  connected: boolean;
  select: () => void;
  wallet: SolanaWallet | undefined;
  account?: PublicKey,
  connect: (wallet: any) => void,
  disconnect: () => void
}

const SolanaWeb3Context = React.createContext<WalletContextValues>({
  adapter: undefined,
  connected: false,
  select: () => {
  },
  wallet: undefined,
  connect: () => {
  },
  disconnect: () => {}
})

export const SolanaWeb3Provider: React.FC = ({ children }) => {

  const { endpointUrl } = useConnectionConfig()

  const [, setLocalStoredWallet] = useLocalStorage<SupportWalletNames>(LOCAL_STORAGE_WALLET_KEY)
  const [wallet, setWallet] = useState<SolanaWallet>()
  const [connected, setConnected] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const select = useCallback(() => setIsModalVisible(true), [])
  const close = useCallback(() => setIsModalVisible(false), [])

  const { eagerConnected } = useEagerConnect()

  useEffect(() => {
    if (eagerConnected) {
      setWallet(SUPPORT_WALLETS.Phantom)
    }
  }, [eagerConnected])

  const adapter = useMemo(
    () => {
      if (!wallet) {
        return undefined
      }

      return new (wallet.adapter || Wallet)(
        wallet.url,
        endpointUrl
      ) as WalletAdapter
    },
    [wallet, endpointUrl]
  )

  // after wallet being set, automatically execute connect method
  useEffect(() => {
    if (wallet && adapter) {
      adapter.connect()
        .then(() => {
          setLocalStoredWallet(wallet.name)
        })
        .catch(() => {
          setWallet(undefined)
        })
    }
  }, [wallet, adapter])

  const account = useMemo(() => {
    if (!connected) {
      return undefined
    }
    return adapter?.publicKey
  }, [connected, adapter])

  // const connect = useCallback(adapter?.connect ?? select , [adapter, select])

  const connect = useCallback(
    (wallet: any ) => {
      console.log(wallet)
      setWallet(wallet)
    },[adapter, select]
  )

  const disconnect = useCallback(() => {
    adapter?.disconnect()
    setWallet(undefined)
    setLocalStoredWallet(undefined)
  } , [adapter])

  useEffect(() => {
    if (adapter) {
      adapter.on('connect', () => {
        if (!adapter.publicKey) {
          console.error('adapter connected, but got null publicKey!')
          return
        }

        setConnected(true)

        const walletPublicKey = adapter.publicKey.toBase58()
        const keyToDisplay =
            walletPublicKey.length > 20
              ? shortenAddress(walletPublicKey)
              : walletPublicKey

        notify({
          message: 'Wallet update',
          description: 'Connected to wallet ' + keyToDisplay
        })
      })

      adapter.on('disconnect', () => {
        setConnected(false)
        notify({
          message: 'Wallet update',
          description: 'Disconnected from wallet'
        })
      })
    }

    return () => {
      setConnected(false)
      if (adapter) {
        adapter.disconnect()
      }
      adapter?.removeAllListeners()
    }
  }, [adapter])

  return (
    <SolanaWeb3Context.Provider
      value={{
        adapter,
        connected,
        select,
        wallet,
        account,
        connect,
        disconnect
      }}
    >
      {children}

    </SolanaWeb3Context.Provider>
  )
}

export function useSolanaWeb3() {
  return useContext(SolanaWeb3Context)
}

