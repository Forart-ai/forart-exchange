import { useModal } from '../useModal'
import styled from 'styled-components'
import { Button, Modal, Steps } from 'antd'
import React, { useMemo } from 'react'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { shortenAddress } from '../../utils'

type StepProps = {
  active?: boolean
}

const BindingModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw !important;
  
  .ant-modal-content {
    min-width: 80%;
  }
  
  .ant-steps {
    .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
      background: #FF468B;
    }
    
    .ant-steps-item-process .ant-steps-item-icon {
      border: none;
    }
    .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
      color: rgba(255, 255, 255, 0.85);
    }
    .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
      color: rgba(255, 255, 255, 0.45);
    }
    .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
      color: #ffffff;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .ant-steps-item-wait .ant-steps-item-icon {
       background-color: transparent; 
       border: 2px #FF468B solid;
    }
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
`

const TipsCard = styled.div`
  font-size: 1.6em;
  a {
    color: #FF468B;
  }
`

const StepContent = styled.div`
  font-size: 16px;
  color: #b2b2b2;
  
  span {
    font-size: 18px;
    color: #ffffff;
  }
`

const ConnectButton = styled(Button)<{status?: string}>`
  height: fit-content;
  border-radius: 20px;
  margin-top: 10px;
  
    ${props => props.status === 'primary' && `
      background: #FF468B;
  `}
  
    ${props => props.status === 'success' && `
      background: #12dbe4;
  `}
  
  `

const WalletStatus: React.FC<StepProps> = () => {
  const { select, account, disconnect } = useSolanaWeb3()
  return (
    account ? (
      <StepContent>
        <p>
          The wallet is connected with <br />
          <span>{shortenAddress(account.toBase58())}</span>
        </p>
        <ConnectButton status={'primary'} onClick={disconnect}> Disconnect</ConnectButton>
      </StepContent>
    ) :
      <StepContent>
        <ConnectButton status={'success'} onClick={ select }> Connect </ConnectButton>
      </StepContent>
  )
}

export const useCheckWhiteListModal = (_body: any, _kits: any) => {
  const { account } = useSolanaWeb3()

  const currentStep = useMemo(() => {
    if (!account) {
      return 0
    }
  },[account])

  const { modal, open, close } = useModal((_open, close, visible) => (
    <BindingModal
      visible = {visible}
      onCancel = {close}
      footer = { null}
    >
      <Content >
        <TipsCard>
          <p>1. Vote for Forart: <a href="">Hackathon</a></p> <br />
          <p>2. Bind Discord </p>

          <Steps current={currentStep} direction={'horizontal'}>
            <Steps.Step title={'Connect to wallet'} description={<WalletStatus active={currentStep === 0} />}  />
            <Steps.Step title={'Login via Discord'}   />

          </Steps>
        </TipsCard>
      </Content>
    </BindingModal>
  ))

  return {
    checkWhiteListModal: modal,
    openCheckWhiteListModal: open,
    closeCheckWhiteListModal: close,
  }
}
