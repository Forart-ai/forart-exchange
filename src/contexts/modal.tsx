import React, { useContext, useState } from 'react'
import ReactModal from 'react-modal'

export type ModalContextValue = {
  open: (content: ModalConfig['content'], closeable?: boolean) => void
  configModal: (config: ModalConfig) =>  void
  update: (modalContent?: JSX.Element) => void
  close: () => void
}

const ModalContext = React.createContext<ModalContextValue>({
  open: (_: ModalConfig['content']) => {
  },
  configModal: (_: ModalConfig) => {
  },
  close: () => {
  },
  update: () => {
  }
})

export type ModalConfig = {
  content?: JSX.Element | string
  closeable?: boolean
  contentStyle?: React.CSSProperties
}

const DEFAULT_CONTENT_STYLE: React.CSSProperties = {
  width: '90%',
  margin: '0 auto',
  background: 'none',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontFamily: 'gilroy'
}

const ModalProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const [content, setContent] = useState<JSX.Element | string>()

  const [config, setConfig] = useState<ModalConfig>({
    closeable: true,
  })

  const open = (content: ModalConfig['content']) => {
    setVisible(true)

    content && setContent(content)
  }

  const update = (modalContent?: JSX.Element) => {
    setContent(modalContent)
  }

  const close = () => setVisible(false)

  const configModal = (config: ModalConfig) => {
    setConfig(prev => ({
      ...prev,
      ...config
    }))
  }

  return (
    <ModalContext.Provider
      value={{ open, update, close, configModal }}
    >
      <ReactModal
        preventScroll={true}
        isOpen={visible}
        contentLabel="Minimal Modal Example"
        style={{
          overlay: {
            background: 'rgba(29,34,45, 0.09)',
            backdropFilter: 'blur(10px)',
            zIndex: 11,
            color:'#fff'
          },
          content: { ...DEFAULT_CONTENT_STYLE, ...config.contentStyle },
        }}
      >
        {
          config.closeable && (
            <img
              alt={'close'}
              onClick={close}
              src={require('../assets/images/coPools/close.svg').default}
              style={{ position: 'absolute', right: '20px', top: '60px', cursor: 'pointer', width:'50px' }}
            />
          )
        }
        {content}
      </ReactModal>
      {children}
    </ModalContext.Provider>
  )
}

const useModal = () => {
  const { open, update, close, configModal } = useContext(ModalContext)

  return {
    openModal: open,
    updateModal: update,
    closeModal: close,
    configModal
  }
}

export {
  ModalProvider,
  useModal
}
