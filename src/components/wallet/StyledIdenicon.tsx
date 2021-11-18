import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { useEthers } from '@usedapp/core'
// @ts-ignore
import Jazzicon from '@metamask/jazzicon'

const StyledIdeniconMain = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 20px;
  background-color: black;
  margin-left: 10px;
`

const StyledIdenicon:React.FC = () => {
  const { account } = useEthers()
  
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(20, parseInt(account.slice(2, 10), 20)))
    }
  },[account])

  return (
    <StyledIdeniconMain ref={ref as any} />
  )
}

export default StyledIdenicon