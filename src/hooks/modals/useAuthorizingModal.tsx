import React from 'react'
import Authorizing from '../../assets/images/modalImages/authorizing.svg'
// @ts-ignore
import styled from 'styled-components'
import { Modal } from 'antd'
import { useModal } from '../useModal'

const AuthorizingModal = styled(Modal)`
  .ant-modal-close-icon {
    color: white;
  }
  .ant-modal-content {
    border-radius: 10px;
    width: 600px;
    height: 350px;
    background-color: #1D222D; !important;
  }

  .ant-modal-header {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom: none;
  }

  .author-body {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    .author-title {
      font-size: 22px;
      font-weight: 550;
      color: white;
      margin-top: 20px;
      margin-bottom: 45px;

    }

    .author-tip {
      font-size: 16px;
      font-weight: 500;
      color: #00EBA4;
    }
  }

  .author-img {
    border: 1px red solid;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    
    img {
      width: 120px;
    }
  }
`

export const useAuthorizingModal = () => {
  const { modal, open, close } = useModal((_open, close, visible) => (
    <AuthorizingModal
      visible = {visible}
      onCancel= {close}
      footer= {null}
    >
      <div className="author-body">
        <div className="author-title">
          Authorizing your account for this order...
        </div>
        <div className="author-tip">If a signature request pops up,</div>
        <div className="author-tip">please click &quot;Sign&quot; to verify that you own your wallet.</div>
      </div>
      <div className="author-img">
        <img src={Authorizing} alt=""  />
      </div>
    </AuthorizingModal>
  ))

  return {
    authorizingModal: modal,
    openAuthorizingModal: open,
    closeAuthorizingModal: close
  }
}
