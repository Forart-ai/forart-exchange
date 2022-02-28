import styled from 'styled-components'
import { SolanaWallet, SupportWalletNames } from './index'
import { message, Modal } from 'antd'
import React, { useCallback } from 'react'
import { WalletType } from '../../web3/connectors'
import { useWeb3React } from '@web3-react/core'

export const SolanaWalletSelectionModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 1rem;
  }

  .ant-modal-body,
  .ant-modal-header {
    background-color: #1D222D !important;
  }

  .ant-modal-header {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-bottom: none;
  }

  .ant-modal-title {
    color: white;
    font-weight: 550;
    font-size: 1.6rem;
  }

  .ant-modal-close-icon {
    color: white;
  }
`

export const WalletItemContainer = styled.div`
  display: flex;
  margin-left: 7%;
  margin-bottom: 1.5rem;
  width: 86%;
  justify-content: space-between;
  align-items: center;

  border: 0.1em solid #b2b2b2;
  border-radius: 1rem;
  padding: 1rem 2.2rem;
  color: white;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;

  img {
    width: 4rem;
    height: 4rem;
  }
`

const StyledWalletCard = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;


  .wallet-item {
    width: 86%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    border: 0.2em solid #b2b2b2;
    display: flex;
    border-radius: 1rem;
    transition: all 0.4s;
    padding: 1rem 2.2rem;

    img {
      width: 4rem;
      height: 4rem;
      right: 50px;
    }

    span {
      display: inline-block;
      color: #ffffff;
      font-size: 1.8rem;
      font-weight: bold;
      transition: all 0.4s;
      user-select: none;
    }
  }
`

export const WalletItem: React.FC<{ wallet: SolanaWallet, onClick: (name: SupportWalletNames) => void }> = ({ wallet, onClick }) => {
  const { name, icon } = wallet

  return (
    <WalletItemContainer onClick={() => onClick(name)}>
      <span className="wallet-name">{name}</span>
      <img className="SelectImg" src={icon} alt="" />
    </WalletItemContainer>
  )
}

export const WalletCard: React.FC<{wallet: WalletType, onSelect:(_: WalletType) => void}> = ({ wallet,onSelect }) => {
  const { name, icon, connector } = wallet

  // const { activate } = useWeb3React()
  // const prepareToConnect = () => {
  //   if (connector) {
  //     activate(connector)
  //   }
  // }

  // const connectToWallet =  useCallback(async () => {
  //   const provider = await connector?.getProvider()
  //   if (!provider) {
  //     message.warn(`Please install ${name} wallet first.`)
  //     return
  //   }
  //   prepareToConnect()
  // }, [activate, connector])

  return (
    <StyledWalletCard>
      <div className="wallet-item" onClick={ () => onSelect(wallet) } >
        <span>{name}</span>
        <img className="wallet-icon" src={icon} alt="" />
      </div>
    </StyledWalletCard>
  )
}
