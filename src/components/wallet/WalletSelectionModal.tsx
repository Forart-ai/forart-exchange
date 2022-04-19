import React, { useCallback, useEffect, useState } from 'react'
import { CloseButton, useModal } from '../../contexts/modal'
import styled from 'styled-components'
import { networkConf, NetworkKeys, NetworkType, supportNetwork, supportWallets, WalletType } from '../../web3/connectors'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useWeb3React } from '@web3-react/core'
import { message } from 'antd'
import SolanaLogo from '../../assets/images/wallets/solanaLogoMark.svg'
import { useSignLogin } from '../../hooks/useSignLogin'
import Dialog from '../../contexts/theme/components/Dialog/Dialog'

const Wrapper = styled.div`
  width: 700px;
  max-width: 700px;
  position: relative;
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-family: inter-extraBold;
  color: #f2f2f2;
  margin-bottom: 40px;
`

const TopArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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


    .Celo, .Avalanche {
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.6;
    }

    img {
      width: 70px;
    }
  }
`

const WalletList: React.FC<{network: string, wallet: WalletType, onSelect:(_:WalletType) => void}> = ({ network, wallet, onSelect }) => {
  const { chainType, name, connector, adapter } = wallet

  const connectToWallet =  useCallback(async () => {
    const provider = await connector?.getProvider()
    if ((wallet.chainType === 'eth' || wallet.chainType === 'celo' ) && !provider ) {
      message.warn(`Please install ${name} wallet first.`)
      return
    }
    onSelect(wallet)
  }, [connector, network])

  return (
    <div className="col-3" key={wallet.name} onClick={ connectToWallet }  >
      <img src={wallet.icon} />
      <span>{wallet.name}</span>
    </div>
  )
}

const WalletSelectionModal:React.FC = () => {
  const { closeModal } = useModal()
  const [network, setNetwork] = useState<NetworkType>( {
    key: NetworkKeys.Solana,
    name: 'Solana',
    icon: SolanaLogo,
    supportedWallet: supportWallets.filter(v => v.chainType === 'solana')
  })

  const { connect, account: solAccount, adapter } = useSolanaWeb3()
  const { activate, account } = useWeb3React()

  const onNetworkClick = (network: NetworkType) => {
    setNetwork(network)
  }

  const onClick = useCallback( (wallet: WalletType) => {

    if (wallet.chainType === 'eth' && wallet.connector) {
      activate(wallet.connector)
      return
    }

    if (wallet.chainType === 'solana' && wallet.adapter) {
      connect(wallet)
      return
    }

  }, [connect, activate, network])

  useEffect(():any => {
    const { ethereum } = window as any

    if (ethereum && network.name === 'Avalanche' && account) {
      ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkConf[43114].chainId }]
      }).catch((e: any) => {
        if (e.code === 4902) {
          ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                ...networkConf[43114]
              }
            ],
          })
        }
      })
    }
    else if (ethereum && network.name === 'Celo' && account) {
      ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkConf[44787].chainId }]
      }).catch((e: any) => {
        if (e.code === 4902) {
          ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                ...networkConf[44787]
              }
            ],
          })
        }
      })
    }

  },[network, account])

  useEffect(() => {
    if (account || solAccount) {
      closeModal()
    }
  },[account, solAccount])

  return (

    <Dialog title={'Connect to wallet'}>
      <Wrapper>
        <TopArea>
          <TextRow >
            <div className="step-number">1</div>
            <div> Choose a network</div>
          </TextRow>
          <ChosenArea>
            {
              supportNetwork.map((network: NetworkType) => (
                <div className="col-3" key={network.key}  >
                  <div className={network.name} onClick={() => onNetworkClick(network)} >
                    <img src={network.icon}  />
                    <span>{network.name}</span>
                  </div>
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
              network.supportedWallet?.map(wallet => (
                <WalletList network={network.name} wallet={wallet} key={wallet.name} onSelect={() => onClick(wallet)} />
              ))
            }
          </ChosenArea>
        </TopArea>
      </Wrapper>
    </Dialog>
  )
}

export default WalletSelectionModal
