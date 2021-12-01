import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css'
import { getLibrary } from './web3/connectors'
import reportWebVitals from './reportWebVitals'
import { DAppProvider } from '@usedapp/core'
// @ts-ignore
import { HashRouter as Router } from 'react-router-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { WalletSelectionModalProvider } from './hooks/wallet-selection-modal'
import { QueryClient , QueryClientProvider } from 'react-query'
import { RefreshControllerProvider } from './contexts/refresh-controller'


const queryClient = new QueryClient()

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <WalletSelectionModalProvider>
      <QueryClientProvider client={queryClient}>
        <RefreshControllerProvider>
          <Router>
            <DAppProvider config={{}}>
              <App />
            </DAppProvider>
          </Router>
        </RefreshControllerProvider>
      </QueryClientProvider>

    </WalletSelectionModalProvider>
  </Web3ReactProvider>,

  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
