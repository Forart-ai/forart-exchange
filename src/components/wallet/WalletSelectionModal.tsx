import React, { useCallback, useEffect, useState } from 'react'
import { CloseButton, useModal } from '../../contexts/modal'
import { networkConf, NetworkKeys, NetworkType, supportNetwork, supportWallets, WalletType } from '../../web3/connectors'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useWeb3React } from '@web3-react/core'
import SolanaLogo from '../../assets/images/wallets/solanaLogoMark.svg'
import Dialog from '../../contexts/theme/components/Dialog/Dialog'
import { Wrapper, TopArea, ChosenArea } from './index.style'

const WalletList: React.FC<{network: string, wallet: WalletType, onSelect:(_:WalletType) => void}> = ({ network, wallet, onSelect }) => {
  const { chainType, name, connector, adapter } = wallet

  const connectToWallet =  useCallback(async () => {
    const provider = await connector?.getProvider()
    if ((wallet.chainType === 'eth' || wallet.chainType === 'celo' ) && !provider ) {
      // message.warn(`Please install ${name} wallet first.`)
      return
    }
    onSelect(wallet)
  }, [connector, network])

  return (
    <div className="row" key={wallet.name} onClick={ connectToWallet }  >
      <img  src={wallet.icon} />
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
    console.log(wallet)

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

    <Dialog title={'Connect Wallet'} closeable>
      <Wrapper>
        {/*<TopArea>*/}
        {/*  <TextRow >*/}
        {/*    <div className="step-number">1</div>*/}
        {/*    <div> Choose a network</div>*/}
        {/*  </TextRow>*/}
        {/*  <ChosenArea>*/}
        {/*    {*/}
        {/*      supportNetwork.map((network: NetworkType) => (*/}
        {/*        <div className="col-3" key={network.key}  >*/}
        {/*          <div className={network.name} onClick={() => onNetworkClick(network)} >*/}
        {/*            <img src={network.icon}  />*/}
        {/*            <span>{network.name}</span>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      ))*/}
        {/*    }*/}
        {/*  </ChosenArea>*/}

        {/*</TopArea>*/}

        {/*<TopArea>*/}
        {/*  <TextRow >*/}
        {/*    <div className="step-number">2</div>*/}
        {/*    <div> Choose a wallet</div>*/}
        {/*  </TextRow>*/}
        {/*  <ChosenArea>*/}
        {/*    {*/}
        {/*      network.supportedWallet?.map(wallet => (*/}
        {/*        <WalletList network={network.name} wallet={wallet} key={wallet.name} onSelect={() => onClick(wallet)} />*/}
        {/*      ))*/}
        {/*    }*/}
        {/*  </ChosenArea>*/}
        {/*</TopArea>*/}

        {/*-------------------------------------------------------*/}

        <TopArea>
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
