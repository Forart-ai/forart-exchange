import React from 'react'

type Web3EnvContextType = {
    providerReady: boolean,
    networkReady:boolean | undefined,
}

const Web3EnvContext = React.createContext<Web3EnvContextType>({
  networkReady:false,
  providerReady:false
})
