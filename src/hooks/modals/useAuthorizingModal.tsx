import React from 'react'
import Authorizing from '@/assets/images/allModalImg/authorizing.svg'
import styled from 'styled-components'
import { Modal } from 'antd'
import { useModal } from '@/hooks/useModal'

const AuthorizingModal = styled(Modal)`
  .ant-modal-close-icon {
    color: white;
  }
  .ant-modal-content {
    width: 62.3rem;
    height: 49.4rem;
    background-color: #111C3A; !important;
    border-radius: 1rem;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .author-body {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    .author-title {
      font-size: 2.2rem;
      font-weight: 550;
      color: white;
      line-height: 3rem;
      margin-top: 7.1rem;
      margin-bottom: 2.5rem;
    }

    .author-tip {
      font-size: 1.6rem;
      font-weight: 500;
      color: #97BCF8;
      line-height: 2rem;
    }
  }

  .author-img {
    position: absolute;
    margin-top: 5.1rem;
    margin-left: 17.8rem;
  }
`

export const useAuthorizingModal = () => {
  const { modal, open, close } = useModal((_open, close, visible) => (
    <AuthorizingModal
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <div className="author-body">
        <div className="author-title">
          Authorizing your account for this order...
        </div>
        <div className="author-tip">If a signature request pops up,</div>
        <div className="author-tip">please click &quot;Sign&quot; to verify that you own your wallet.</div>
      </div>
      <div className="author-img">
        <img src={Authorizing} alt="" style={{ width: '21.1rem', height: '15.2rem' }} />
      </div>
    </AuthorizingModal>
  ))

  return {
    authorizingModal: modal,
    openAuthorizingModal: open,
    closeAuthorizingModal: close
  }
}
