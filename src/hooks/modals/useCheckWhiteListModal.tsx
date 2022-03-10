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
import { useMediaQuery } from 'react-responsive'
import useGetCurrentWallet from '../useGetCurrentWallet'

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
  
  a, b{
    color: #FF468B;
    font-weight: bold;
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

const TableBox = styled.div`
  display: flex;
  flex-direction: column;
  
  @media screen and (max-width: 1080px) {
    display: none;
  }
`

const Row = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  
  b {
    width: 20%;
    color: #FF468B;
  }
  
  .col-2 {
    width: 35%;
  }
  
  span {
    width: 20%;
  }
`

const WalletStatus: React.FC<StepProps> = () => {
  const   account  = useGetCurrentWallet()
  return (
    account ? (
      <StepContent>
        <p>
          The wallet is connected with <br />
          <span>{account.substr(0,4) +'...' + account.substr(-4,4)}</span>
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
  const account = useGetCurrentWallet()

  const redirectUri = 'https://app.forart.ai/artistDetail?artistId=3312'
  const discordLoginUrl = `https://discord.com/oauth2/authorize?response_type=token&client_id=942705935221157978&state=15773059ghq9183habn&scope=identify&redirect_uri=${redirectUri}`

  const { data: user } = useUserQuery()

  const userFromDiscord = useDiscordMeQuery()

  const userData = useMemo(() => {
    if (!account) {
      return undefined
    }

    if (!user?.byWallet && userFromDiscord) {
      return userFromDiscord.data?.user
    }

    if (user?.byWallet !== null) {
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
        {
          userData.byWallet && <Avatar src={  user?.byWallet.avatar } />
        }
        &nbsp;<span style={{ color: 'white', fontWeight: 'bold' }}> { userData?.byWallet?.username || userData?.username  } </span> !
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
              Solana wallet address {shortenAddress(account.toBase58())}.
              Discord:
              {
                !user?.byWallet
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
              message.success('Connect Successfully')
            })
            .catch(e => {
              setRequesting(false)
              Modal.error({
                title:(
                  <div style={{ color: '#fff' }}>
                    {e}
                  </div>
                )
              })
            })
        }
      })
    },[account,discordAccessToken, userFromDiscord]
  )

  return (
    <StepContent>
      {
        !user?.byWallet ? (
          <ConnectButton disabled={!active} onClick={handleBinding} > Connect <br />Discord & wallet</ConnectButton>
        ) : (
          <p  >The Discord account has been connected with <br />
            <span>{shortenAddress(user.byWallet?.wallet)}</span>
          </p>
        )
      }
    </StepContent>
  )
}

export const useCheckWhiteListModal = () => {
  const account = useGetCurrentWallet()

  const { data: user } = useUserQuery()
  const discordAccessToken = useDiscordAccessToken()

  const currentStep = useMemo(() => {
    if (!account) {
      return 0
    }

    if (!user?.byWallet && !discordAccessToken) {
      return 1
    }

    if (discordAccessToken || user?.byWallet) {
      return 2
    }

    return 3

  },[account, user,discordAccessToken])

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const { modal, open, close } = useModal((_open, close, visible) => (
    <BindingModal
      visible = {visible}
      onCancel = {close}
      footer = { null }
    >
      <Content >
        <TipsCard>
          <p > 😺  Accesses left: <b>{user?.getQualification}</b> </p>
          <p>  😻  You can get a Discord role by voting for us in Hackthon or inviting friends to join our Discord.</p>
          <p>  🎁  Server role perks on CO-NFT creation <br /> One access mean you can create one NFT artwork for free and earn 10% of sale revenue in launchpad!</p>
          <p>
            <TableBox>
              <Row>
                <b>Roles</b>
                <b className="col-2">Access</b>
                <b>Accesses</b>
              </Row>
              <Row>
                <span>OG-L1/2/3/4</span>
                <span className="col-2">at least 1/5/8/10 votes</span>
                <span>1/2/3/4</span>
              </Row>

              <Row>
                <span>Hero</span>
                <span className="col-2">at least 12 votes</span>
                <span>5</span>
              </Row>
              <Row>
                <span>Legend</span>
                <span className="col-2">at least 15 votes</span>
                <span>6</span>
              </Row><br />

              <Row>
                <span>Referrer L-1/2/3</span>
                <span className="col-2">invite at least 3/6/9 people for valid votes</span>
                <span>1/2/3</span>
              </Row>
              <br />

              <Row>
                <span>Inviter L-1/2/3</span>
                <span className="col-2">invite at least 5/10/15 people to join Forart Discord server</span>
                <span>1/2/3</span>
              </Row>

            </TableBox>
          </p>
          <p>👉🏻 1. Vote for forart in
            <a href={'https://hackerlink.io/buidl/1932?roundProj=1433'} target={'_blank'} rel="noreferrer"> Avalanche Hackathon@Asia (AVAX Pool)</a> or
            <a href={'https://hackerlink.io/buidl/1932?roundProj=1416'} target={'_blank'} rel="noreferrer"  > Solana Riptide Hackathon@East Asia</a>  , The Discord administrator checks the votes and assigns roles
          </p>

          <p>👉🏻 2. Invite friends to join Discord and contact your administrator to assign roles</p>

          <p>👉🏻 3. Invite friends to Join Discord, and the administrator will check votes and assign roles</p>

          <p> Please first associate your wallet with Discord, and we&apos;ll verify your role</p>

          <Steps current={currentStep} direction={isMobile ? 'vertical' : 'horizontal'}>
            <Steps.Step title={'Connect to wallet'} description={<WalletStatus active={currentStep === 0} />}  />
            <Steps.Step title={'Login via Discord'} description={<DiscordIdentity active={currentStep === 1} />}  />
            <Steps.Step title={'Connect Discord and wallet'} description={<BindingStatus active={currentStep === 2}  />}  />
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
