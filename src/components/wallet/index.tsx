import React, { useEffect, useRef, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import styled from '@emotion/styled'
// @ts-ignore
import Jazzicon from '@metamask/jazzicon'
import { Button, Modal } from 'antd'
import { useWalletSelectionModal } from '../../hooks/wallet-selection-modal'

const StyledCurrentModal = styled(Modal)`
  .ant-modal-header {
    color: white;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    height: 60px;
    background: #1D222D !important;
  }

  .ant-modal-content {
    width: fit-content !important;
    height: 200px;
    border-radius: 10px;
    background: #1D222D !important;
  }

  .ant-modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 30px !important;
    color: white;
  }

  .ant-modal-title {
    color: #fff !important;
    font-size: 24px;
    margin-top: 5px;
    margin-left: 15px;
  }
`

const StyledWallet = styled.div`
  height: 40px;
  background-color: #1E052D;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  //border: 2px solid #02A6F5;
  padding: 0 10px;

  box-sizing: border-box;
  margin-right: 20px;
  cursor: pointer;
  
  @media screen and (max-width: 1100px) {
    height: 35px;
    font-size: 12px;
    margin-right: 10px;
  }
`

const CurrentAccountContainer = styled.div`
  display: flex;
  font-size: 18px;
  user-select: none;
  align-items: center;
  justify-content: center;
  
  @media screen and (max-width: 1100px) {
    font-size: 14px;
  }
`

const BalanceContainer = styled.div`
  display: flex;
  font-size: 16px;
  user-select: none;
`

const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 8px;
  margin-top: 50px;
  background-image: linear-gradient(to right, #00EBA4, #02A6F5);
  border: none;
  color: white;
  font-weight: bolder;
`

type CurrentAccountProps = {
  account: string
}

const MetamaskIcon: React.FC = () => {
  const ref =useRef<HTMLDivElement>()
  const { account } = useWeb3React()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(26, parseInt(account.slice(2, 10), 26)))
    }
  }, [account])

  return (
    <div>
      <div className="userIcon" style={{ display:'flex', marginRight:'15px' }} ref={ref as any} />
    </div>
  )
}

const WalletModalContent: React.FC<CurrentAccountProps> =({
  account,
}) => {

  const { library, chainId } = useWeb3React()

  const [balance, setBalance] = useState()

  useEffect(():any => {
    if (!!account && !!library) {
      let stale = false

      library.getBalance(account)
        .then((balance:any) => {
          if (!stale) {
            setBalance(balance)
            console.log(formatEther(balance))
          }
        })
        .catch(() => {
          if (!stale) {
            // @ts-ignore
            setBalance(null)
          }
        })

      return () =>{
        stale = true
        setBalance(undefined)
      }
    }

  },[account, library,chainId])

  return (
    <BalanceContainer>
      <div className="balance">{account}</div>
      {/*<div>{balance !== undefined ? `${formatEther(balance)}` : ''}</div>*/}
    </BalanceContainer>
  )
}

const CurrentAccount: React.FC<CurrentAccountProps> = ({ account }) => {

  const { deactivate } = useWeb3React()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const disconnect =() => {
    deactivate()

  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <CurrentAccountContainer>
      <MetamaskIcon />
      <div className="wallet-add" onClick={() => setIsModalVisible(true)}> {`${account.substr(0, 5)}...${account.substr(-4, 4)}`}</div>

      <StyledCurrentModal
        style={{ top: 20 }}
        wrapClassName="wallet-modal-wrapper"
        title="Your Wallet"
        onCancel={closeModal}
        visible={ isModalVisible }
        footer= { null }
      >
        <WalletModalContent account={account}  />
        <StyledButton className="walletModalClose" onClick={disconnect}>
          Disconnect
        </StyledButton>
      </StyledCurrentModal>
    </CurrentAccountContainer>
  )
}

export const ConnectToWallet = () => {
  const { open } = useWalletSelectionModal()

  return (
    <div className="toAmount" onClick={open}>
      <span>Connect To Ethereum</span>
    </div>
  )
}

const Wallet: React.FC = () => {
  const { account, library } = useWeb3React()

  return (
    <StyledWallet>
      {!account && <ConnectToWallet />}
      {!!account && <CurrentAccount account={account} />}
    </StyledWallet>

  )
}

export default Wallet
