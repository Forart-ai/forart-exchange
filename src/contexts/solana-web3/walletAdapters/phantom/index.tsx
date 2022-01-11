import React from 'react'
import { WalletAdapter } from '../../index'
import EventEmitter from 'eventemitter3'
import { PublicKey, Transaction } from '@solana/web3.js'
import notify from '../../../../utils/notify'

type PhantomEvent = 'disconnect' | 'connect'
type PhantomRequestMethod = 'connect' | 'disconnect' | 'signTransaction' | 'signAllTransactions'

interface PhantomProvider {
  isPhantom: boolean
  publicKey?: PublicKey
  isConnected?: boolean
  autoApprove?: boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  on: (event: PhantomEvent, handler: (args: any) => void) => void
  request: (method: PhantomRequestMethod, params: any) => Promise<any>
  listeners: (event: PhantomEvent) => (() => void)[]
}

export class PhantomWalletAdapter extends EventEmitter implements WalletAdapter {
  _provider?: PhantomProvider

  constructor() {
    super()
    this.connect = this.connect.bind(this)

    if ((window as any)?.solana?.isPhantom) {
      return this._provider = (window as any).solana
    }
  }

  private _handleConnect = (...args: any) => {
    this.emit('connect', ...args)
  }

  private _handleDisconnect = (...args: any) => {
    this.emit('disconnect', ...args)
  }

  get connected() {
    return this._provider?.isConnected || false
  }

  get autoApprove() {
    return this._provider?.autoApprove || false
  }

  // eslint-disable-next-line
  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!this._provider) {
      return transactions
    }

    return this._provider.signAllTransactions(transactions)
  }

  get publicKey() {
    return this._provider?.publicKey ?? PublicKey.default
  }

  // eslint-disable-next-line
  async signTransaction(transaction: Transaction) {
    if (!this._provider) {
      return transaction
    }

    return this._provider.signTransaction(transaction)
  }

  async signAllTransaction(txs: Transaction[]) {
    if (!this._provider) {
      return txs
    }

    return this._provider.signAllTransactions(txs)
  }

  async connect() {
    const provider = this._provider

    if (!provider || !provider.isPhantom) {
      notify({
        message: 'Phantom Not Found!',
        description: (
          <p>
            Please install Phantom wallet from&nbsp;
            <a
              href="https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa"
            >
              Chrome Web Store
            </a>
          </p>
        ),
      })
      return Promise.reject()
    }

    return await provider.connect()
  }

  disconnect() {
    this._provider?.disconnect()
  }
}
