import type { PublicKey } from '@solana/web3.js'
import { useConnectionConfig } from '../solana-connection-config'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useEagerConnect from '../../hooks/useEagerConnect'
import { SUPPORT_WALLETS } from '../../utils/constant'
import useLocalStorage, { LOCAL_STORAGE_WALLET_KEY } from '../../hooks/useLocalStorage'
import { shortenAddress } from '../../utils'
import { BaseMessageSignerWalletAdapter } from '@solana/wallet-adapter-base'
import {  useSnackbar } from 'notistack'

export type SupportWalletNames =
    | 'Phantom'
    | 'Slope'
    | 'Solflare'
// | 'Solong'
// | 'MathWallet'
// | 'Ledger'
// | 'Sollet'

export type SolanaWallet = {
  name: SupportWalletNames
  icon: any
  adapter: new() => BaseMessageSignerWalletAdapter
}

export type WalletContextValues = {
  adapter: BaseMessageSignerWalletAdapter | undefined;
  connected: boolean;
  wallet: SolanaWallet | undefined;
  account?: PublicKey,
  connect: (wallet: any) => void,
  disconnect: () => void
}

const SolanaWeb3Context = React.createContext<WalletContextValues>({
  adapter: undefined,
  connected: false,
  wallet: undefined,
  connect: () => {},
  disconnect: () => {}
})

export const SolanaWeb3Provider: React.FC = ({ children }) => {

  useEagerConnect()

  const { endpointUrl } = useConnectionConfig()

  const [, setLocalStoredWallet] = useLocalStorage<SupportWalletNames>(LOCAL_STORAGE_WALLET_KEY)
  const [wallet, setWallet] = useState<SolanaWallet>()
  const [connected, setConnected] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const { eagerConnected } = useEagerConnect()

  // connect wallet every refresh
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

      return new wallet.adapter() as BaseMessageSignerWalletAdapter
    },
    [wallet, endpointUrl]
  )

  // after wallet being set, automatically execute connect method
  useEffect(() => {
    if (wallet && adapter) {
      adapter.connect()
        .then(() => {
          const walletPublicKey = adapter.publicKey!.toBase58()
          const keyToDisplay =
              walletPublicKey.length > 20
                ? shortenAddress(walletPublicKey)
                : walletPublicKey

          setConnected(true)
          // notify({
          //   message: 'Wallet update',
          //   description: 'Connected to wallet ' + keyToDisplay
          // })
          enqueueSnackbar(`Connected to wallet   ${keyToDisplay}`, { variant:'success' })

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

    return adapter?.publicKey || undefined
  }, [connected, adapter])

  // const connect = useCallback(adapter?.connect ?? select , [adapter, select])

  const connect = useCallback(
    (wallet: any) => {
      setWallet(wallet)
    },[adapter]
  )

  const disconnect = useCallback(() => {
    adapter?.disconnect()
    setWallet(undefined)
    setLocalStoredWallet(undefined)
    setConnected(false)
    // notify({
    //   message: 'Wallet update',
    //   description: 'Disconnected from wallet'
    // })
    enqueueSnackbar('Disconnected from wallet', { variant:'success' })
  } , [adapter])

  return (
    <SolanaWeb3Context.Provider
      value={{
        adapter,
        connected,
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

