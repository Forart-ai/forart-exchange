import React from 'react'
import { Button, Modal } from 'antd'
// @ts-ignore
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useModal } from '../useModal'

const PurchaseTransactionSentModal = styled(Modal)`
  .ant-modal-close-icon {
    color: white;
  }

  .ant-modal-content {
    width: 500px;
    height: 350px;
    background-color: #282c34;!important;
    border-radius: 10px;
  }

  .ant-modal-header {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .body {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;

    .title {
      margin-top: 50px;
      font-size: 26px;
      font-weight: 550;
      color: white;
      margin-bottom: 30px;
    }

    .tip {
      font-size: 18px;
      font-weight: 500;
      color: #00EBA4;
      margin-bottom: 30px;

    }
  }

  img {
    margin-top: 6rem;
    margin-bottom: 6rem;
    width: 8.1rem;
  }
`

export const usePurchaseTransactionSentModal = () => {
  const history = useHistory()

  const backItem = () => {
    history.push('/personal/home')
  }

  const { modal, open, close } = useModal((_open, close, visible) => (
    <PurchaseTransactionSentModal
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <div className="body">
        <div className="title">
          Your purchase request has been sent!
        </div>
        <div className="tip">Just wait a moment for transaction confirmation.</div>
        {/*<img src={successExchange} alt="" />*/}
        <Button className="toItem" onClick={backItem}>BACK TO ALL ITEMS</Button>
      </div>
    </PurchaseTransactionSentModal>
  ))

  return {
    purchaseTransactionSentModal: modal,
    openPurchaseTransactionSentModal: open,
    closePurchaseTransactionSentModal: close
  }
}
