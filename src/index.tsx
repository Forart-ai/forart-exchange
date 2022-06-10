import React, { useEffect } from 'react'
import App from './App'
import { getLibrary } from './web3/connectors'
import reportWebVitals from './reportWebVitals'
import { DAppProvider } from '@usedapp/core'
import ReactDOM from 'react-dom'

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
import { Snackbar } from './contexts/theme/components/Snackbar/snackbar'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import HomepageBanner from './assets/images/coPools/homepage-banner.webp'

const { store } = configureStore()

const queryClient = new QueryClient()

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={ForartTheme}>
      <HelmetProvider>
        <SnackbarProvider autoHideDuration={3000}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <QueryClientProvider client={queryClient}>
              <RefreshControllerProvider>
                <Router>
                  <SolanaConnectionConfigProvider>
                    <SolanaWeb3Provider>
                      <ModalProvider>
                        <Helmet >
                          <meta property="og:title" content="Forart - homeww page" />
                          <meta
                            property="og:description"
                            content="Forart - momosama homeww"
                          />
                          <meta property="og:url" content="https://v1.forart-exchange.pages.dev" />
                          <meta property="og:image" content={HomepageBanner} />
                          <meta property="og:site_name" content="Forart" />
                          <meta
                            name="twitter:site"
                            content="@momosama_404"
                          />
                          <meta
                            name="twitter:card"
                            content="summary_large_image"
                          />
                          <meta name="twitter:creator" content="@momosama_404" />
                          <meta name="viewport" content="width=device-width, initial-scale=1" />
                          <meta name="theme-color" content="#000000" />
                          <meta
                            name="description"
                            content="Forart - NFT SaaS For Social"
                          />
                        </Helmet>
                        <App />
                      </ModalProvider>
                    </SolanaWeb3Provider>
                  </SolanaConnectionConfigProvider>
                </Router>
              </RefreshControllerProvider>

            </QueryClientProvider>

          </Web3ReactProvider>
        </SnackbarProvider>
      </HelmetProvider>

    </ThemeProvider>
  </Provider>
  ,

  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
