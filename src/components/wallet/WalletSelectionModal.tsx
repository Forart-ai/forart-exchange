import React from 'react'
import { Modal  } from 'antd'
import { supportWallets, WalletType } from '../../web3/connectors'
import { useWeb3React } from '@web3-react/core'
import styled from '@emotion/styled'

const StyledWalletSelectionModal = styled(Modal)`
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
  
  &:nth-last-of-type(1) {
    margin-bottom: 20px;
  }

  cursor: pointer;

  .wallet-item {
    width:400px;
    height: 70px;
    margin-top: 2.2rem;
    margin-left: calc((100% - 400px) / 2);
    border: 1px solid #979797;
    display: flex;
    align-items: center;
    border-radius: 10px;
    position: relative;
    transition: all 0.4s;

    img {
      width: 45px;
      position: absolute;
      right: 50px;
    }

    span {
      display: inline-block;
      margin-left: 50px;
      color: #979797;
      font-size: 24px;
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

const WalletCard: React.FC<{wallet: WalletType}> = ({ wallet }) => {
  const { activate } = useWeb3React()
  const { name, icon, connector } = wallet

  const prepareToConnect = () => {
    if (connector) {
      activate(connector)
    }
  }

  return (
    <StyledWalletCard>
      <div className="wallet-item" onClick={ prepareToConnect } >
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

    <StyledWalletSelectionModal
      className="wallet-selection-modal"
      title="Connect to wallet"
      visible={visible}
      onCancel={onClose}
      footer=""
    >
      {
        supportWallets.map(wallet => (
          <WalletCard wallet={wallet} key={wallet.name} />
        ))
      }
    </StyledWalletSelectionModal>
  )
}

export default WalletSelectionModal
