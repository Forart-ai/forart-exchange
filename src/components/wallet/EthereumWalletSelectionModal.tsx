import React, { useCallback, useEffect } from 'react'
import { networkConf, supportWallets, WalletType } from '../../web3/connectors'
import { useModal } from '../../contexts/modal'
import { useWeb3React } from '@web3-react/core'
import Dialog from '../../contexts/theme/components/Dialog/Dialog'
import { ChosenArea, TopArea, Wrapper,ChipContainer } from './index.style'
import { Chip } from '@mui/material'

const WalletList: React.FC<{wallet: WalletType, onSelect:(_:WalletType) => void}> = ({  wallet, onSelect }) => {
  const {  connector } = wallet

  const connectToWallet =  useCallback(async () => {
    const provider = await connector?.getProvider()
    if ((wallet.chainType === 'eth') && !provider ) {
      // message.warn(`Please install ${name} wallet first.`)
      return
    }
    onSelect(wallet)
  }, [connector])

  return (
    <div className="row" key={wallet.name} onClick={ connectToWallet }  >
      <ChipContainer>
        <Chip label="Avalanche" color="secondary" sx={{ fontFamily:'Kanit-Regular' }}  />
      </ChipContainer>
      <img  src={wallet.icon} />
      <span>{wallet.name}</span>
    </div>
  )
}

const EthereumWalletSelectionModal:React.FC = () => {
  const { closeModal } = useModal()

  const { activate, account } = useWeb3React()

  const onClick = useCallback( (wallet: WalletType) => {

    if (wallet.chainType === 'eth' && wallet.connector) {
      activate(wallet.connector).then(() => {
        closeModal()
      })
      return
    }

  }, [ activate])

  useEffect(():any => {
    const { ethereum } = window as any

    if (ethereum  && account) {
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

  },[ account])

  return (

    <Dialog title={'Connect Wallet'} closeable>
      <Wrapper>

        <TopArea>
          <ChosenArea>
            {
              supportWallets.filter(v=>v.name==='MetaMask').map(wallet => (
                <WalletList  wallet={wallet} key={wallet.name} onSelect={() => onClick(wallet)} />
              ))
            }
          </ChosenArea>
        </TopArea>
      </Wrapper>
    </Dialog>
  )
}

export default EthereumWalletSelectionModal
