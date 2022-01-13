import React, { useMemo, useState } from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  .ant-modal-body, .ant-modal-footer {
    background: #202225;
    border-top: none;
  }
`

export type ModalContent = JSX.Element

export const useSolanaModal = (defaultContent?: ModalContent) => {
  const [visible, setVisible] = useState(false)

  const [content, setContent] = useState<ModalContent | undefined>(defaultContent)

  const open = (content?: ModalContent) => {
    content && setContent(content)
    setVisible(true)
  }

  const close = () => setVisible(false)

  const modal = useMemo(() => (
    <StyledModal visible={visible} onCancel={close} onOk={close}>
      {content}
    </StyledModal>
  ), [content, visible])

  return {
    modal,
    open,
    close
  }
}
