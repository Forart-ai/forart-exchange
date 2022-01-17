import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { message, Modal } from 'antd'
import { supportWallets, Wallet } from '../web3/connectors'
import { useWeb3React } from '@web3-react/core'
import styled from '@emotion/styled'

export const StyledWalletSelectionModal = styled(Modal)`
  .ant-modal-header {
    color: white;
    border-top-right-radius: 2rem;
    border-top-left-radius: 2rem;
    height: 5.1rem;
    line-height: 5.1rem;
    background: #1C1C1C !important;
  }

  .ant-modal-content {
    width: fit-content !important;
    border-radius: 2rem;
    background: #1C1C1C !important;
  }

  .ant-modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2.5rem !important;
  }

  .ant-modal-title {
    color: #fff !important;
    font-size: 1.8rem;
    margin-top: 0.4rem;
    margin-left: 1.4rem;
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

type WalletSelectionModalProps = {
    visible:boolean
    onClose?:() => void
}

const WalletCard: React.FC<{wallet: Wallet}> = ({ wallet }) => {
  const { activate } = useWeb3React()
  const { name, icon, connector } = wallet
  const  prepareToConnect = () =>  { activate(connector) }

  const connectToWallet =  useCallback(async () => {
    const provider = await connector.getProvider()
    if (!provider) {
      message.warn(`Please install ${name} wallet first.`)
      return
    }
    prepareToConnect()
  }, [activate, connector])

  return (
    <StyledWalletCard>
      <div className="wallet-item" onClick={ connectToWallet } >
        <span>{name}</span>
        <img className="wallet-icon" src={icon} alt="" />
      </div>
    </StyledWalletCard>
  )
}

const WalletSelectionModal: React.FC<WalletSelectionModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      className="wallet-selection-modal"
      visible={visible}
      onCancel={onClose}
      footer=""
      title="Connect to wallet"

    >
      {
        supportWallets.map(wallet => (
          <WalletCard wallet={wallet} key={wallet.name} />
        ))
      }
    </Modal>
  )
}

const WalletSelectionModalContext = React.createContext({
  open: () => { return },
  close: () => { return }
})

const WalletSelectionModalProvider: FC = ({ children }) => {
  const { account } = useWeb3React()

  const [visible, setVisible] = useState(false)

  const open = useCallback(() => {
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    account && close()
  }, [close, account])

  return (
    <WalletSelectionModalContext.Provider
      value={{ open, close }}
    >
      {children}
      <WalletSelectionModal
        visible={visible}
        onClose={close}
      />
    </WalletSelectionModalContext.Provider>
  )
}

const useWalletSelectionModal = () => useContext(WalletSelectionModalContext)

export {
  WalletSelectionModalProvider, useWalletSelectionModal
}
