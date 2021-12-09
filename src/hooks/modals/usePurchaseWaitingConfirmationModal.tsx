import React from 'react'
// import Authorizing from '@/assets/images/allModalImg/authorizing.svg'
// @ts-ignore
import styled from 'styled-components'
import { Modal } from 'antd'
import { useModal } from '../useModal'

const AuthorizingModal = styled(Modal)`
  .ant-modal-close-icon {
    color: white;
  }
  .ant-modal-content {
    width: 600px;
    height: 350px;
    background-color: #2A2E35; !important;
    border-radius: 10px;
  }

  .ant-modal-header {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .author-body {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    .author-title {
      font-size: 28px;
      font-weight: 550;
      color: #00EBA4;
      margin-top: 60px;
      margin-bottom: 20px;
    }

    .author-tip {
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }
  }

  .author-img {
    position: absolute;
    margin-top: 5.1rem;
    margin-left: 17.8rem;
  }
`

export const usePurchaseWaitingConfirmationModal = () => {
  const { modal, open, close } = useModal((_open, close, visible) => (
    <AuthorizingModal
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <div className="author-body">
        <div className="author-title">
          Please confirm in your wallet...
        </div>
        <div className="author-tip">If a transaction confirmation dialog pops up,</div>
        <div className="author-tip">please click &quot;Confirm&quot; button to confirm and send out the transaction.</div>
      </div>
      <div className="author-img">
        {/*<img src={Authorizing} alt="" style={{ width: '21.1rem', height: '15.2rem' }} />*/}
      </div>
    </AuthorizingModal>
  ))

  return {
    purchaseWaitingConfirmationModal: modal,
    openPurchaseWaitingConfirmationModal: open,
    closePurchaseWaitingConfirmationModal: close
  }
}
