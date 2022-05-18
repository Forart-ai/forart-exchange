import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { getLibrary } from './web3/connectors'
import reportWebVitals from './reportWebVitals'
import { DAppProvider } from '@usedapp/core'
// @ts-ignore
import { BrowserRouter as Router } from 'react-router-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RefreshControllerProvider } from './contexts/refresh-controller'
import configureStore from './store/index.js'
import { Provider } from 'react-redux'
import { SolanaWeb3Provider, useSolanaWeb3 } from './contexts/solana-web3'
import { SolanaConnectionConfigProvider } from './contexts/solana-connection-config'
import { ModalProvider } from './contexts/modal'
import ForartTheme from './contexts/theme/config/dark'
import { ThemeProvider } from '@mui/material'
import { useSignLogin } from './hooks/useSignLogin'
import { SnackbarProvider } from 'notistack'

const { store } = configureStore()

const queryClient = new QueryClient()

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={ForartTheme}>
      <SnackbarProvider autoHideDuration={3000}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <QueryClientProvider client={queryClient}>
            <RefreshControllerProvider>
              <Router>
                <DAppProvider config={{}}>
                  <SolanaConnectionConfigProvider>
                    <SolanaWeb3Provider>
                      <ModalProvider>
                        <App />
                      </ModalProvider>
                    </SolanaWeb3Provider>
                  </SolanaConnectionConfigProvider>
                </DAppProvider>
              </Router>
            </RefreshControllerProvider>

          </QueryClientProvider>

        </Web3ReactProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
  ,

  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
