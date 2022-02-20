import { useModal } from '../useModal'
import styled from 'styled-components'
import { Avatar, Button, message, Modal, Steps } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { shortenAddress } from '../../utils'
import { useLocationQuery } from '../useLocationQuery'
import useDiscordAccessToken from '../useDiscordAccessToken'
import useUserQuery from '../queries/useUserQuery'
import { useRefreshController } from '../../contexts/refresh-controller'
import CONFT_API from '../../apis/co-nft'
import useDiscordMeQuery from '../queries/useDiscordMeQuery'

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

    .ant-steps-item-finish .ant-steps-item-icon {
      background-color: #FF468B;
      border-color: transparent;
    }

    .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
      color: #ffffff;
    }
    
    .ant-steps-item-process .ant-steps-item-icon {
      border: none;
    }
    .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
      color: rgba(255, 255, 255, 0.85);
    }
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
      color: rgba(255, 255, 255, 0.85);
    }
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
      background-color:  rgb(255, 255, 255);
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
  const {  account } = useSolanaWeb3()
  return (
    account ? (
      <StepContent>
        <p>
          The wallet is connected with <br />
          <span>{shortenAddress(account.toBase58())}</span>
        </p>
        {/*<ConnectButton status={'primary'} onClick={disconnect}> Disconnect</ConnectButton>*/}
      </StepContent>
    ) :
      <StepContent>
        {/*<ConnectButton status={'success'} onClick={ select }> Connect </ConnectButton>*/}
      </StepContent>
  )
}

const DiscordIdentity: React.FC<StepProps> = ({ active }) => {
  const artistId = useLocationQuery('artistId')
  const { account } = useSolanaWeb3()

  const redirectUri = `${location.protocol}//${location.host}/artistDetail?artistId=${artistId}`
  const discordLoginUrl = `https://discord.com/oauth2/authorize?response_type=token&client_id=942705935221157978&state=15773059ghq9183habn&scope=identify&redirect_uri=${redirectUri}`

  const { data: user } = useUserQuery()

  const userFromDiscord = useDiscordMeQuery()

  const userData = useMemo(() => {
    if (!account) {
      return undefined
    }

    if (!user && userFromDiscord) {
      return userFromDiscord.data?.user
    }

    if (user){
      return user
    }

    return undefined
  }, [userFromDiscord, user, account])

  if (!userData ) {
    return (
      <StepContent>
        <ConnectButton  disabled={!active} status={'success'} onClick={()=>window.open(discordLoginUrl)}>Login Discord</ConnectButton>
      </StepContent>
    )
  }

  return (
    <StepContent>
      <p>
        Hello&nbsp;&nbsp;&nbsp;
        {
          userData.avatar && <Avatar src={ `https://cdn.discordapp.com/avatars/${ (userData as any).id }/e44a2870accc5915aae48c251a156d02.png`} />
        }
        &nbsp;<span style={{ color: 'white', fontWeight: 'bold' }}> {userData.username} </span> !
      </p>

    </StepContent>
  )
}

const BindingStatus: React.FC<StepProps> = ({ active }) => {
  const { account } = useSolanaWeb3()
  const { forceRefresh } = useRefreshController()
  const { data: user } = useUserQuery()
  const discordAccessToken = useDiscordAccessToken()
  const userFromDiscord = useDiscordMeQuery()
  const [, setRequesting] = useState(false)

  const handleBinding = useCallback(
    () => {
      if (!account  || !discordAccessToken) {
        return
      }

      Modal.confirm({
        width: 500,
        title: (
          <div style={{ color: '#fff' }}>
            Binding Account
          </div>
        ),
        content: (
          <div style={{ fontFamily: 'gilroy', color: '#fff' }} >
            <div>
              Are you sure want to binding Solana wallet address {account.toBase58()} to your Discord:
              {
                !user
                  ? <> {userFromDiscord.data?.user.username}</>
                  : <> {user.username} </>
              }

            </div>
            <div style={{ color: 'orangered' }}>Warning: this operation is irreversible!</div>
          </div>
        ),
        onOk: () => {
          setRequesting(true)
          CONFT_API.core.user.bindingUser(discordAccessToken, account.toBase58())
            .then(() => {
              forceRefresh()
              setRequesting(false)
              message.success('Binding Successfully')
            })
            .catch(e => {
              setRequesting(false)
              Modal.error({
                title: e
              })
            })
        }
      })
    },[account,discordAccessToken, userFromDiscord]
  )

  return (
    <ConnectButton disabled={!active} onClick={handleBinding} > Binding <br />Discord & wallet</ConnectButton>
  )
}

export const useCheckWhiteListModal = () => {
  const { account } = useSolanaWeb3()

  const { data: user } = useUserQuery()

  const discordAccessToken = useDiscordAccessToken()

  const currentStep = useMemo(() => {
    if (!account) {
      return 0
    }

    if (!user && !discordAccessToken) {
      return 1
    }

    if (discordAccessToken || user) {
      return 2
    }

    return 3

  },[account, user,discordAccessToken])

  console.log(currentStep)

  const { modal, open, close } = useModal((_open, close, visible) => (
    <BindingModal
      visible = {visible}
      onCancel = {close}
      footer = { null }
    >
      <Content >
        <TipsCard>
          <p>1. Vote for Forart: <a href="">Hackathon</a></p> <br />
          <p>2. Bind Discord </p>

          <Steps current={currentStep} direction={'horizontal'}>
            <Steps.Step title={'Connect to wallet'} description={<WalletStatus active={currentStep === 0} />}  />
            <Steps.Step title={'Login via Discord'} description={<DiscordIdentity active={currentStep === 1} />}  />
            <Steps.Step title={'Binding Discord and wallet'} description={<BindingStatus active={currentStep === 2}  />}  />
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
