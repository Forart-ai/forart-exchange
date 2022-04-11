import React, { useContext, useEffect, useState } from 'react'

export const FAST_INTERVAL = 5000
export const INTERMEDIATE_INTERVAL = 10000
export const SLOW_INTERVAL = 30000

const RefreshControllerContext = React.createContext({
  fast: 0,
  intermediate: 0,
  slow: 0,
  quiet: 0,
  refresh: () => {}
})

const RefreshControllerProvider: React.FC = ({ children }) => {
  const [slow, setSlow] = useState(0)
  const [intermediate, setIntermediate] = useState(0)
  const [fast, setFast] = useState(0)
  const [quiet, setQuiet] = useState(0)

  const refresh = () => {
    setFast(prev => prev + 1)
    setIntermediate(prev => prev + 1)
    setSlow(prev => prev + 1)
    setQuiet(prev => prev + 1)
  }

  useEffect(() => {
    const fastInterval = setInterval(async () => {
      setFast(prev => prev + 1)
    }, FAST_INTERVAL)

    const intermediateInterval = setInterval(async () => {
      setIntermediate(prev => prev + 1)
    }, INTERMEDIATE_INTERVAL)

    const slowInterval = setInterval(async () => {
      setSlow(prev => prev + 1)
    }, SLOW_INTERVAL)

    return () => {
      clearInterval(fastInterval)
      clearInterval(intermediateInterval)
      clearInterval(slowInterval)
    }
  }, [])

  return (
    <RefreshControllerContext.Provider
      value={{ slow, intermediate, fast, quiet, refresh }}
    >
      {children}
    </RefreshControllerContext.Provider>
  )
}

const useRefreshController = () => {
  const { slow, intermediate, fast, quiet, refresh } = useContext(RefreshControllerContext)

  return {
    slowRefreshFlag: slow,
    intermediateRefreshFlag: intermediate,
    fastRefreshFlag: fast,
    quietRefreshFlag: quiet,
    forceRefresh: refresh
  }
}

export {
  RefreshControllerProvider, useRefreshController
}

