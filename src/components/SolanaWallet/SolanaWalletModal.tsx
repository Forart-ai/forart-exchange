import React, { useMemo } from 'react'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { Button } from 'antd'
import styled from 'styled-components'
import { useSolanaModal } from '../../hooks/useSolanaModal'

type WalletModalContentProps = {
  account: string
}

const WalletModal = styled.div`
  

  .ant-modal-content {
    border-radius: 1rem;
    width: 62.3rem;
  }

  .ant-modal-body,

  .ant-modal-header{
    background-color: #111C3A;
    border: none;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .ant-modal-header .ant-modal-title {
    display: flex;
    justify-content: center;
    font-weight: 550;
    font-size: 1.8rem;
    color: white;
  }
.wallet-modal-content {
  .walletModal-Title {
    text-align: center;
    color: white;
    font-weight: bolder;
    font-size: 1em;
  }
  
  .button-container{
    display: flex;
    justify-content: center;
  }
}
  

  .text-label {
    font-size: 1.7rem;
  }

  .walletModalClose {
    width: 12.6rem;
    height: 4rem;
    background: #554BFF;
    border: none;
    border-radius: 1rem;
    color: #ffffff;
    font-weight: bolder;
    margin-left: calc((100% - 12.6rem) / 2);
    margin-top: 20px;
  }

  .disconnect {
    background: #0ee3a1;
    font-weight: bolder;
    border: none;
    border-radius: 10px;
    color: #ffffff;
    margin-top: 20px;
  }
`

const Divider = styled.div`
  position: absolute;
  right: 0;
  top: 5rem;
  width: 100%;
  height: 0.15rem;
`

const WalletModalContent: React.FC<WalletModalContentProps> = ({ account }) => {
  const { disconnect } = useSolanaWeb3()

  return (
    <WalletModal>
      <div className="wallet-modal-content">
        <div className="walletModal-Title">{account}</div>
        <div className="button-container">
          <Button type="text" onClick={disconnect} className="disconnect">
            Disconnect
          </Button>
        </div>
      </div>
    </WalletModal>
  )
}

const useSolanaWalletModal = () => {
  const { account } = useSolanaWeb3()

  const modalContent = useMemo(() => (
    <>
      <Divider />
      <WalletModalContent account={account!.toBase58()} />
    </>
  ), [account])

  return useSolanaModal(modalContent)
}

export default useSolanaWalletModal
