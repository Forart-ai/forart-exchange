export type State = {
    app: AppState
    wallet: WalletState
}

export type AppState = {
}

export type WalletState = {
    account?: string
    chainId?: number
    rpcUrl?: string
}
