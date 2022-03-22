import React, { useCallback, useEffect, useState } from 'react'
import { CloseButton, useModal } from '../../contexts/modal'
import styled from 'styled-components'
import { NetworkType, supportNetwork, WalletType } from '../../web3/connectors'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useWeb3React } from '@web3-react/core'
import { message } from 'antd'

const Wrapper = styled.div`
  width: 700px;
  max-width: 700px;
  background: rgb(27, 3, 42);
  padding: 20px;
  border-radius: 1em;
  position: relative;

`

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-family: inter-extraBold;
  color: #f2f2f2;
  margin-bottom: 50px;
`

const TopArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const TextRow = styled.div`
  display: flex;
  color: #f2f2f2;
  font-size: .85em;
  align-items: center;
  
  
  .step-number {
    width: 35px;
    height: 35px;
    padding: 5px;
    border-radius: 50%;
    background: #ff468b;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  }
`

const ChosenArea = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px;
  justify-content: space-around;
  margin-top: 30px;
  
  .col-3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #f2f2f2;
    font-size: .8em;
    cursor: pointer;
    
    img{
      width: 70px;
    }
  }
`

const WalletList: React.FC<{wallet: WalletType, onSelect:(_:WalletType) => void}> = ({ wallet, onSelect }) => {
  const { chainType, name, connector, adapter } = wallet

  const connectToWallet =  useCallback(async () => {
    const provider = await connector?.getProvider()
    if (!provider || !adapter) {
      message.warn(`Please install ${name} wallet first.`)
      return
    }
    onSelect(wallet)
  }, [connector])

  return (
    <div className="col-3" key={wallet.name} onClick={ connectToWallet }  >
      <img src={wallet.icon} />
      <span>{wallet.name}</span>
    </div>
  )
}

const WalletSelectionModal:React.FC = () => {
  const { closeModal } = useModal()
  const [wallets, setWallets] = useState<WalletType[]>()

  const { connect } =  useSolanaWeb3()
  const { activate } = useWeb3React()

  const onNetworkClick = (wallets:WalletType[]) => {
    setWallets(wallets)
  }

  const onClick = useCallback((wallet: WalletType) => {

    if (wallet.chainType === 'eth' && wallet.connector) {
      activate(wallet.connector)
    }

    if (wallet.chainType === 'solana' && wallet.adapter) {
      connect(wallet)
    }

  }, [connect, activate])

  return (
    <Wrapper>
      <CloseButton onClick={closeModal} />
      <Title>Connect to wallet</Title>
      <TopArea>
        <TextRow >
          <div className="step-number">1</div>
          <div> Choose a network</div>
        </TextRow>
        <ChosenArea >
          {
            supportNetwork.map((network: NetworkType) => (
              <div className="col-3" key={network.key} onClick={() => onNetworkClick(network.supportedWallet)} >
                <img src={network.icon} />
                <span>{network.name}</span>
              </div>
            ))
          }
        </ChosenArea>

      </TopArea>

      <TopArea>
        <TextRow >
          <div className="step-number">2</div>
          <div> Choose a wallet</div>
        </TextRow>
        <ChosenArea>
          {
            wallets?.map(wallet => (
              <WalletList wallet={wallet} key={wallet.name} onSelect={() => onClick(wallet)} />
            ))
          }
        </ChosenArea>
      </TopArea>
    </Wrapper>
  )
}

export default WalletSelectionModal
