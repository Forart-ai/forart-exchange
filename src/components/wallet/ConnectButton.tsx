import { useEtherBalance, useEthers } from '@usedapp/core'
import React from 'react'
import styled from '@emotion/styled'
import { formatEther } from '@ethersproject/units'
import StyledIdenicon from './StyledIdenicon'

const ConnectMain = styled.div`
  padding: 4px 8px;
  position: absolute;
  right: 20px;
  font-weight: bolder;
`

const ConnectWalletButton = styled.button`
  width: 180px;
  height: 40px;
  background: #EDF2F7;
  border-radius: 8px;
  position: absolute;
  right: 20px;
`

const ConnectMessage = styled.div`
  display: flex;
  width: 252px;
  padding: 2px 2px 2px 8px;
  border-radius: 10px;
  background: #2E3748;
  color: #fff;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  .accountAddress {
    padding: 9px 4px;
    background: #1A1F2D;
    border-radius: 10px;
    margin-left: 4px;
    display: flex;
    align-items: center;
  }
`

const ConnectButton:React.FC = () => {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)

  const handleConnectWallet = () => {
    activateBrowserWallet()
  }

  return account ? (
    <ConnectMain>
      <ConnectMessage>
        {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        <div className="accountAddress">
          {account &&
        `${account.slice(0, 6)}...${account.slice(
          account.length - 4,
          account.length
        )}`}
          <StyledIdenicon />
        </div>
      </ConnectMessage>
    </ConnectMain>
  ) : (
    <ConnectWalletButton onClick={handleConnectWallet}>Connect to a wallet！</ConnectWalletButton>
  )
}

export default ConnectButton
