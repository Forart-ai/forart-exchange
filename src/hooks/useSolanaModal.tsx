import React, { useMemo, useState } from 'react'
import { Modal } from 'antd'


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
    <Modal visible={visible} onCancel={close} onOk={close} footer={null}>
      {content}
    </Modal>
  ), [content, visible])

  return {
    modal,
    open,
    close
  }
}
