import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { message, Modal } from 'antd'
import { supportWallets, WalletType } from '../web3/connectors'
import { useWeb3React } from '@web3-react/core'
import styled from '@emotion/styled'
import { SolanaWallet, SolanaWeb3Provider, SupportWalletNames, useSolanaWeb3 } from '../contexts/solana-web3'
import { WalletCard, WalletItem } from '../contexts/solana-web3/modal'
import { SUPPORT_WALLETS } from '../utils/constant'

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

type WalletSelectionModalProps = {
    visible:boolean
    onClose?:() => void
}

const WalletSelectionModal: React.FC<WalletSelectionModalProps> = ({
  visible,
  onClose,
}) => {

  const { connect } =  useSolanaWeb3()
  const { activate } = useWeb3React()

  const onClick = useCallback((wallet: WalletType) => {

    if (wallet.chainType === 'eth' && wallet.connector) {
      activate(wallet.connector)
    }

    if (wallet.chainType === 'solana' && wallet.adapter) {
      connect(wallet)
    }

  }, [connect, activate])

  return (
    <Modal
      className="wallet-selection-modal"
      centered={true}
      visible={visible}
      onCancel={onClose}
      footer=""
      title="Connect to wallet"

    >
      {
        supportWallets.map(wallet => (
          <WalletCard wallet={wallet}
            key={wallet.name}
            onSelect={ () => onClick(wallet) }
          />
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
  const { account : solanaAccount } = useSolanaWeb3()

  const [visible, setVisible] = useState(false)

  const open = useCallback(() => {
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    (account || solanaAccount) && close()
  }, [close, solanaAccount, account])

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
