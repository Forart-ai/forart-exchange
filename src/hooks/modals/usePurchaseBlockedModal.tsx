import { Divider, Modal } from 'antd'
import React from 'react'
// import StepOne from '@/assets/images/allModalImg/number1.png'
// @ts-ignore
import styled from 'styled-components'
import { useModal } from '../useModal'
import WarningIcon from '../../assets/images/modalImages/warning.svg'


const PurchaseBlockedModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
  }
  .ant-modal-body,
  .ant-modal-header {
    background-color: #2A2E35;!important;

  }

  .ant-modal-header {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .ant-divider-horizontal {
    margin: 15px 0;
  }

  .head-title {
    display: flex;
    justify-content: center;
    font-weight: 550;
    font-size: 1.8em;
    color: #fff;
  }

  .step-tip {
    font-size: 1.4em;
    font-weight: 500;
    color: #999999;
  }

  .step-one-border {

    .border-head {
      display: flex;
      align-content: center;


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
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .border-detail {
        text-align: center;
        font-size: 1.6em;
        font-weight: 500;
        width: 100%;
        color: white;

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
      <div className="head-title" >Oops!</div>
      <Divider />
      <div className="step-one-border">
        <div className="border-body">
          <img src={WarningIcon} />
          <div className="border-detail">
            Sorry, you don&apos;t have enough funds to complete the purchase.
          </div>
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
