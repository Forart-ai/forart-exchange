import { useModal } from '../useModal'
import styled from 'styled-components'
import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { useCheckWhiteList } from '../queries/useCheckWhiteList'
import useNFTMint from '../contract/service/useNFTMint'


const AuthorizingModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  
  .ant-modal-content {
    width: 30em;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  color: #ffffff;
  height: 10em;
  
  .feedback {
    font-size: 1.5em;
  }
  .hint {
    color: #b2b2b2;
    font-size: .8em;
  }
`

export const useCheckWhiteListModal = (body: any, kits: any) => {
  const { modal, open, close } = useModal((_open, close, visible) => (
    <AuthorizingModal
      visible = {visible}
      onCancel = {close}
      footer = { null}
    >
      <Content />
    </AuthorizingModal>
  ))

  return {
    checkWhiteListModal: modal,
    openCheckWhiteListModal: open,
    closeCheckWhiteListModal: close,
  }
}
