import styled from 'styled-components'
import { SolanaWallet, SupportWalletNames } from './index'
import { Modal } from 'antd'
import React from 'react'


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


export const WalletItem: React.FC<{ wallet: SolanaWallet, onClick: (name: SupportWalletNames) => void }> = ({ wallet, onClick }) => {
  const { name, icon } = wallet

  return (
    <WalletItemContainer onClick={() => onClick(name)}>
      <span className="wallet-name">{name}</span>
      <img className="SelectImg" src={icon} alt="" />
    </WalletItemContainer>
  )
}
