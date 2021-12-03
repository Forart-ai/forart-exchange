import { Button, Divider, Modal } from 'antd'
import React from 'react'
// import StepOne from '@/assets/images/allModalImg/number1.png'
// @ts-ignore
import styled from 'styled-components'
import { useModal } from '../useModal'

const PurchaseBlockedModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 1rem;
    width: 62.3rem;
    height: 43.8rem;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .head-title {
    display: flex;
    justify-content: center;
    font-weight: 550;
    font-size: 1.8rem;
  }

  .step-tip {
    font-size: 1.6rem;
    font-weight: 500;
    color: #999999;
    line-height: 2.2rem;
  }

  .step-one-border {
    margin-top: 2.6rem;
    width: 55.7rem;
    height: 22.9rem;
    border: 1px solid #DCDCDC;

    .border-head {
      display: flex;
      align-content: center;
      padding: 1.9rem 1.9rem;


      .step-title {
        font-size: 1.6rem;
        font-weight: 500;
        color: #000000;
        line-height: 2.5rem;
        align-self: center;
        margin-left: 1.1rem;
      }
    }

    .border-body {
      padding: 1.9rem 1.9rem;
      background: rgba(124, 109, 235, 0.1);

      .border-detail {
        font-size: 1.6rem;
        font-weight: 500;
        color: #999999;
        line-height: 22px;
      }

      .ant-btn {
        width: 16.1rem;
        height: 5rem;
        background: #7C6DEB;
        border-radius: 1rem;
        margin-top: 2.1rem;
      }

      .ant-btn > span {
        font-size: 1.8rem;
        font-weight: 550;
        color: #FFFFFF;
      }
    }
  }
`

export const usePurchaseBlockedModal = () => {
  const { modal, open, close } = useModal((_open, close, visible) => (
    <PurchaseBlockedModal
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <div className="head-title">
        Complete your purchase
      </div>
      <Divider />
      <div className="step-tip">
        To complete your purchase, follow these steps:
      </div>
      <div className="step-one-border">
        <div className="border-head">
          {/*<img src={StepOne} alt="" style={{ width: '3.7rem', height: '3.7rem' }} />*/}
          <div className="step-title">Deposit or convert funds</div>
        </div>
        <div className="border-body">
          <div className="border-detail">
            You don&apos;t have enough funds to complete the purchase. Please deposit or convert your funds.
          </div>
          <Button>Deposit</Button>
        </div>
      </div>
    </PurchaseBlockedModal>
  ))

  return {
    purchaseBlockedModal: modal,
    openPurchaseBlockedModal: open,
    closePurchaseBlockedModal: close
  }
}
