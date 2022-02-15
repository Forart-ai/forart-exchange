import React, { useMemo } from 'react'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { Button } from 'antd'
import styled from 'styled-components'
import { useSolanaModal } from '../../hooks/useSolanaModal'
import { shortenAddress } from '../../utils'
import { DEFAULT_CLUSTER } from '../../contexts/solana-connection-config'

type WalletModalContentProps = {
  account: string
}

const WalletModal = styled.div`

  margin-top: 3em;

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
    font-weight: bolder;
    border: none;
    border-radius: 10px;
    color: #ffffff;
    margin-top: 20px;
  }
`

const Title = styled.div`
  color: #ffffff;
  font-size: 1.6em;
`

const Divider = styled.div`
  position: absolute;
  right: 0;
  top: 4em;
  width: 100%;
  height: 0.15em;
  border-top: 1px #ffffff solid;
`

const WalletModalContent: React.FC<WalletModalContentProps> = ({ account }) => {
  const { disconnect } = useSolanaWeb3()

  return (
    <WalletModal>
      <div className="wallet-modal-content">
        <div className="walletModal-Title">  You are now connected to {shortenAddress(account)} </div>
        <div className="walletModal-Title"> NETWORK: { DEFAULT_CLUSTER }</div>
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
      <Title>Your Wallet</Title>
      <Divider />
      <WalletModalContent account={account!.toBase58()} />
    </>
  ), [account])

  return useSolanaModal(modalContent)
}

export default useSolanaWalletModal
