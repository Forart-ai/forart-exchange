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
    width: 62.3rem;
    height: 49.4rem;
    background-color: #111C3A;!important;
    border-radius: 1rem;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 2.2rem;
      font-weight: 550;
      color: white;
      line-height: 3rem;
      margin-top: 7.1rem;
      margin-bottom: 2.5rem;
    }

    .tip {
      font-size: 1.6rem;
      font-weight: 500;
      color: #97BCF8;
      line-height: 2rem;
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
