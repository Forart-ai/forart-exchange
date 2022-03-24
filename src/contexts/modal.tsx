import React, { cloneElement, useCallback, useContext, useState } from 'react'
import ReactModal from 'react-modal'
import { useMediaQuery } from 'react-responsive'
import CloseIcon from '../assets/images/coPools/close.svg'
import styled, { createGlobalStyle } from 'styled-components'

export const CloseButton = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
  background-image: url("${require('../assets/images/coPools/close.svg').default}");
  width: 30px;
  height: 30px;
`

export type ModalContextValue = {
  open: (content: ModalConfig['content'], closeable?: boolean) => void
  configModal: (config: ModalConfig) => void
  update: (modalContent?: JSX.Element) => void
  close: () => void
  addEventListener: (event: ModalEvents, callback: () => void) => number
  removeEventListener: (event: ModalEvents, callbackId: number) => void
}

export type ModalConfig = {
  content?: JSX.Element | string
  closeable?: boolean
  contentStyle?: React.CSSProperties
  contentWrapper?: JSX.Element
}

export type ModalEvents = 'open' | 'close' | 'update'

const responsiveDefaultContentStyle = (isMobile: boolean) => {
  if (isMobile) {
    return {
      width: '90%',
      margin: '0 auto',
      background: 'none',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontFamily: 'gilroy'
    }
  }

  return {
    width: '90%',
    margin: '10vh 0 0 0',
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',

  }
}

const ModalContext = React.createContext<ModalContextValue>({
  open: (_: ModalConfig['content']) => {},
  configModal: (_: ModalConfig) => {},
  close: () => {},
  update: () => {},
  addEventListener: (_event: ModalEvents, _callback: () => void) => 0,
  removeEventListener: (_event: ModalEvents, _callbackId: number) => {}
})

// const CloseButton: React.FC<{ show?: boolean; onClose: () => void }> = ({ show, onClose }) => {
//   const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })
//
//   if (!show) {
//     return <></>
//   }
//
//   return (
//     <img
//       alt={'close'}
//       onClick={onClose}
//       src={ CloseIcon }
//       style={{  position: 'absolute', right: '20px', top: isMobile ? '20px' : '70px', cursor: 'pointer' }}
//     />
//   )
// }

const ModalWrapper: React.FC<{ contentStyle?: React.CSSProperties; isOpen: boolean; contentWrapper?: JSX.Element; onRequestClose: any ; shouldCloseOnEsc: boolean; shouldCloseOnOverlayClick: boolean;}> = ({
  contentStyle,
  contentWrapper,
  isOpen,
  onRequestClose,
  shouldCloseOnEsc,
  shouldCloseOnOverlayClick,
  children

}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  return (
    <ReactModal
      closeTimeoutMS={100}
      ariaHideApp={false}
      preventScroll={true}
      isOpen={isOpen}
      className={'modal-wrapper'}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      appElement={document.getElementById('app')!}
      style={{
        overlay: {
          background: 'rgba(29, 20, 56, 0.09)',
          backdropFilter: 'blur(10px)',
          zIndex: 11,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },

        content: { ...responsiveDefaultContentStyle(isMobile), ...contentStyle }
      }}
    >
      {contentWrapper ? cloneElement(contentWrapper, { children }) : children}
    </ReactModal>
  )
}

const GlobalStyle = createGlobalStyle`
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .ReactModal__Overlay--after-open{
    opacity: 1;
  }

  .ReactModal__Overlay--before-close{
    opacity: 0;
  }
`

const ModalProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const [content, setContent] = useState<JSX.Element | string>()

  const [callbackByEvent, setCallbackByEvent] = useState<Map<ModalEvents, { id: number; callback: () => void }[]>>(
    new Map()
  )

  const [config, setConfig] = useState<ModalConfig>({
    closeable: true
  })

  const open = useCallback((content: ModalConfig['content'], closeable?: boolean) => {
    setVisible(true)
    if (closeable === undefined) {
      setConfig(prev => ({ ...prev, closeable: true }))
    } else {
      setConfig(prev => ({ ...prev, closeable }))
    }

    content && setContent(content)

    const callbacks = callbackByEvent.get('open')

    callbacks?.forEach(({ callback }) => {
      callback()
    })
  }, [callbackByEvent])

  const update = useCallback(
    (modalContent?: JSX.Element) => {
      setContent(modalContent)

      const callbacks = callbackByEvent.get('update')
      callbacks?.forEach(({ callback }) => {
        callback()
      })
    },
    [callbackByEvent]
  )

  const close = useCallback(() => {
    setVisible(false)

    const callbacks = callbackByEvent.get('close')

    callbacks?.forEach(({ callback }) => {
      callback()
    })
  }, [callbackByEvent])

  const configModal = (config: ModalConfig) => {
    setConfig(prev => ({
      ...prev,
      ...config
    }))
  }

  const addEventListener = useCallback(
    (event: ModalEvents, callback: () => void) => {
      const random = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
      const entry: { id: number; callback: () => void } = { id: -1, callback }

      const exist = (idToCheck: number) => {
        return callbackByEvent.get(event)?.some(({ id }) => id === idToCheck)
      }

      do {
        entry.id = random()
      } while (exist(entry.id))

      setCallbackByEvent(prev => {
        const arr = prev.get(event) || []

        return prev?.set(event, [...arr, entry])
      })

      return entry.id
    },
    [callbackByEvent]
  )

  const removeEventListener = useCallback((event: ModalEvents, callbackId: number) => {
    setCallbackByEvent(prev => {
      const callbacks = prev.get(event)

      const index = () => {
        if (!callbacks) return -1

        for (let i = 0; i < callbacks.length || 0; i++) {
          const cb = callbacks[i]
          if (cb.id === callbackId) {
            return i
          }
        }

        return -1
      }

      callbacks?.splice(index(), 1)

      return prev?.set(event, callbacks || [])
    })

    return
  }, [callbackByEvent])

  return (
    <ModalContext.Provider value={{ open, update, close, configModal, addEventListener, removeEventListener }}>
      <GlobalStyle />
      <ModalWrapper isOpen={visible} contentStyle={config.contentStyle} contentWrapper={config.contentWrapper} shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true} onRequestClose={close}>
        {/*<CloseButton show={config.closeable} onClose={close} />*/}
        {content}
      </ModalWrapper>
      {children}
    </ModalContext.Provider>
  )
}

const useModal = () => {
  const { open, update, close, configModal, addEventListener, removeEventListener } = useContext(ModalContext)

  return {
    openModal: open,
    updateModal: update,
    closeModal: close,
    configModal,
    addEventListener,
    removeEventListener
  }
}

export { ModalContext, ModalWrapper, ModalProvider, useModal }
