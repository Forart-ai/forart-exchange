import React from 'react'
import { SolanaWeb3Provider, useSolanaWeb3 } from '../../contexts/solana-web3'
import styled from 'styled-components'
import useSolanaWalletModal from './SolanaWalletModal'

type CurrentAccountProps = {
  account: string
}

const WalletButton = styled.div`
  height: 40px;
  background-color: #1E052D;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  //border: 2px solid #02A6F5;
  box-sizing: border-box;
  padding: 0 10px;
  margin-right: 20px;
  cursor: pointer;
`

const SCCurrentAccount = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 1.2rem;

    img {
      width: 26px;
      height: 26px;
    }
  }
`

const ConnectButton = () => {
  const { select } = useSolanaWeb3()

  return (
    <WalletButton onClick={select}>
      <span>Connect To Solana</span>
    </WalletButton>
  )
}

const CurrentAccount: React.FC<CurrentAccountProps> = ({ account }) => {
  const { wallet } = useSolanaWeb3()
  const { modal, open } = useSolanaWalletModal()

  return (
    <WalletButton>
      <SCCurrentAccount>
        <div className="icon">
          <img src={wallet?.icon} alt="" />
        </div>
        <span onClick={() => open()}>{`${account.substr(0, 5)}...${account.substr(-4, 4)}`}</span>
      </SCCurrentAccount>

      {modal}
    </WalletButton>
  )
}

const SolanaWallet: React.FC = () => {
  const { account } = useSolanaWeb3()

  return (
    <>
      {!account && <ConnectButton />}
      {!!account && <CurrentAccount account={account.toBase58()} />}
    </>
  )
}

export default SolanaWallet
