import React, { useEffect, useState } from 'react'
import { styled, Tooltip, } from '@mui/material'
import Background from '../../assets/images/goblin/Goblin_Background.png'
import GoblinAvatar from '../../assets/images/goblin/goblin-avatar.jpg'
import CustomizeButton from '../../contexts/theme/components/Button'
import { useGoblinMint } from '../../hooks/ai-generarl/useGoblinMint'
import './numeric.scss'
import Swipe1 from '../../assets/images/goblin/1.jpg'
import Swipe2 from '../../assets/images/goblin/2.jpg'
import Swipe3 from '../../assets/images/goblin/3.jpg'
import Swipe4 from '../../assets/images/goblin/4.jpg'
import Swipe5 from '../../assets/images/goblin/5.jpg'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import Flex from '../../contexts/theme/components/Box/Flex'
import { shortenAddress } from '../../utils'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import { BeatLoader } from 'react-spinners'
import { NumericStepper } from '@anatoliygatt/numeric-stepper'
import Countdown, { CountdownRendererFn } from 'react-countdown'
import { useCurrentSlotTime } from '../../web3/utils'
import useCandyMachine from '../../hooks/programs/useCandyMachine'
import { useQuery } from 'react-query'
import { GoblinCandyMachineAddress } from '../../hooks/programs/useCandyMachine/helpers/constant'
import MELogo from '../../assets/images/goblin/me.svg'
import OpenseaLogo from '../../assets/images/goblin/opensea.svg'

const PUBLIC_MINT_START_TIME = 1658217600
const PUBLIC_MINT_END_TIME = 1658822400

const Wrapper = styled('div')`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const BackgroundImage = styled('div')`
  height: 470px;
  width: 100%;
  background: url(${Background}) no-repeat center;
  position: relative;
  background-size: cover;
  text-align: center;
`

const MainContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px 40px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 10px;
  }
`

const MainArea = styled('div')`
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 60px;

  img {
    width: 180px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px rgb(48, 21, 124) solid;
    box-shadow: 8px -2px 20px rgb(19, 7, 52);

  }

  span {
    font-family: KronaOne-Regular;
    color: #ffffff;
    font-size: 34px;
  }

  .info-message {
    margin-top: 20px;
    text-align: center;
    color: ${({ theme }) => theme.palette.grey[400]};
    font-size: 18px;
  }

  @media screen and (max-width: 1080px) {
    height: 70%;
    .top {
      flex-direction: column;

      span {
        margin-left: 0;
        font-family: inter-extraBold;
        color: #ffffff;
        font-size: 18px;
      }
    }

    .info-message {
      text-align: center;
      padding: 0 10px;
      font-size: 16px;
    }
  }
`

const Container = styled('div')`
  padding: 20px 30px;
  width: 100%;
  max-width: 1600px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 30px;
  
  ${({ theme }) => theme.breakpoints.down('lg')} {
    flex-direction: column;
    padding: 20px;
  }
`

const MessageContainer = styled('div')`
  width: 50%;
  border: 1px #999999 solid;
  background: rgba(255, 255, 255, .1);
  border-radius: 1rem;
  padding: 1rem;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 100%;
    height: auto;
  }
`

const Content = styled('div')`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: linear-gradient(60.1deg, #8246F5 0.7%, #5000B4 99.3%);
  font-size: 16px;
  color: #ffffff;
  padding: 2rem 1rem;
  font-family: Kanit-Regular;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  min-height: 500px;
  
  .highlight {
    font-size: 20px;
    color: ${({ theme }) => theme.palette.primary.light};
    font-weight: bolder;
    letter-spacing: 1px;
  }

  .connect {
    cursor: pointer;
    font-size: 18px;
    color: ${({ theme }) => theme.palette.primary.light};
  }
`

const SwiperContainer = styled('div')`
  width: 40%;

  max-width: 500px;
  max-height: 500px;

  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  img {
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 100%;
  }
`

const MarketLogo = styled('div')`
  width: 100%;
  display: flex;
  gap: 30px;
  
  img {
    max-width: 160px;
    object-fit: contain;
    padding: 4px 6px;
    background-color: rgba(18,12 ,24, .7);
    border-radius: .4rem;
    cursor: pointer;
  }
`

const Message = styled('div')<{ color?: string | 'white' }>`
  font-size: 16px;
  color: ${({ color }) => color};
`

const StyledCountdown = styled('div')`
  color: ${({ theme }) => theme.palette.secondary.light};
  font-size: 22px;
  font-family: Aldrich-Regular;
  margin-top: 30px;
`

const renderer: CountdownRendererFn = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <StyledCountdown  />
  } else {
    // Render a countdown
    return (
      <StyledCountdown>

        Still {hours}:{minutes}:{seconds} before the whitelist mint start.

      </StyledCountdown>
    )
  }
}

export const useMintLimit = () => {
  const currentSlotTime = useCurrentSlotTime()

  return useQuery(
    ['MINT_LIMIT', currentSlotTime],
    () => {
      const current = currentSlotTime || Date.now() / 1000

      if (current < PUBLIC_MINT_START_TIME) {
        return 9999
      }

      return 9999
    },
    { keepPreviousData: true }
  ).data
}

export const useMintedAmount = () => {
  const { program } = useCandyMachine()
  const mintLimit = useMintLimit()

  return useQuery(
    ['MINTED_AMOUNT', mintLimit],
    async () => {
      if (!mintLimit) return undefined

      const candyMachine: any = await program.account.candyMachine.fetch(GoblinCandyMachineAddress)

      const itemsRedeemed = candyMachine.itemsRedeemed.toNumber()

      return Math.min(itemsRedeemed - 500, mintLimit)
    },
    { keepPreviousData: true }
  ).data
}

const Goblin: React.FC = () => {

  const { account, disconnect } = useSolanaWeb3()
  const { mintGoblin, loading, message, mintingChance } = useGoblinMint()
  const { openModal } = useModal()
  const [count, setCount] = useState<number | undefined>(mintingChance)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
  const currentSlotTime = useCurrentSlotTime()
  const [countdown, setCountdown] = useState<number | undefined>(PUBLIC_MINT_START_TIME * 1000)
  const mintLimit = useMintLimit()
  const mintedAmount = useMintedAmount()

  useEffect(() => {
    if (!currentSlotTime) return

    // before start
    if (currentSlotTime < PUBLIC_MINT_START_TIME) {
      setButtonDisabled(true)
      setCountdown(PUBLIC_MINT_START_TIME * 1000)
    } else {
      setButtonDisabled(false)
      setCountdown(undefined)
    }
  }, [countdown, currentSlotTime, buttonDisabled])

  return (
    <Wrapper>
      <BackgroundImage>
        <MainContainer>

          <MainArea>
            <img src={GoblinAvatar} />
            <span>GoblinTownAI Official</span>
            <div className="info-message">
              The amazing 9999 GoblinTownAI collection integrated of technology and NFT. The art created by AI technology
            </div>
          </MainArea>

        </MainContainer>

      </BackgroundImage>

      <Container>
        <SwiperContainer>
          <Swiper
            pagination={{ dynamicBullets: true, }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            draggable={true}
            loop={true}
            className="mySwiper"
          >
            <SwiperSlide><img src={Swipe1} /></SwiperSlide>
            <SwiperSlide><img src={Swipe2} /></SwiperSlide>
            <SwiperSlide><img src={Swipe3} /></SwiperSlide>
            <SwiperSlide><img src={Swipe4} /></SwiperSlide>
            <SwiperSlide><img src={Swipe5} /></SwiperSlide>
          </Swiper>
        </SwiperContainer>

        <MessageContainer>
          <Content>
            <Flex flexDirection={'column'}>
              <p> We&apos;ve been devoting ourselves to the AI-generated image technology.
              </p>
              <p>And we are a big fan of AI-generated NFT artwork.

              </p>

              <p>Let&apos;s see what&apos;d happen while the dope NFT collection integrated with AI technology...</p>

              <p> Don&apos;t blink or you&apos;ll miss it...</p>

              <div className={'highlight'}>
                <div>We are reserving 500 GoblinTownAI.</div>
                <div>gas mint per wallet.</div>
              </div>
            </Flex>
            <MarketLogo >
              <a href={'https://opensea.io/collection/goblintownai-official'} target="_blank" rel="noreferrer">
                <img src={OpenseaLogo} />
              </a>

              <a href={'https://magiceden.io/marketplace/goblintown_ai'} target="_blank" rel="noreferrer">
                <img src={MELogo} />
              </a>

            </MarketLogo>
            <Flex flexDirection={'column'}>
              <Flex>Connected wallet: &nbsp;
                {
                  account ? (
                    <Tooltip placement={'top'} title={'Click to disconnect'}>
                      <div className={'connect'} onClick={disconnect}> {shortenAddress(account?.toBase58())}</div>
                    </Tooltip>
                  ) : (
                    <div className={'connect'} onClick={() => openModal(<WalletSelectionModal />)} />
                  )
                }
              </Flex>

              {
                !!mintingChance && (
                  <NumericStepper
                    minimumValue={1}
                    maximumValue={mintingChance}
                    initialValue={mintingChance}
                    thumbShadowAnimationOnTrackHoverEnabled={false}
                    onChange={value => setCount(value)}
                  />
                )
              }

              <Flex gap={'10px'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} marginTop={'10px'}>
                <div>Mint: {mintedAmount || '-'} / {mintLimit}</div>
                {
                  account ? (
                    <CustomizeButton
                      variant={'contained'}
                      size={'large'}
                      onClick={() => mintGoblin(count)}
                      disabled
                      sx={{ fontSize:'22px' }}
                    >
                      MINT {count ? count : ''} GOBLIN
                    </CustomizeButton>
                  ) : (
                    <CustomizeButton
                      variant={'contained'}
                      size={'large'}
                      onClick={() => openModal(<WalletSelectionModal />)}
                      sx={{ fontSize:'22px' }}
                    >
                      Connect to wallet
                    </CustomizeButton>
                  )
                }
                <Message color={message.color}>{message.msg}
                  {
                    loading && <BeatLoader size={6} color={'white'} />
                  }
                </Message>
              </Flex>

              {
                countdown &&
                (
                  <Flex justifyContent={'flex-end'}>
                    <Countdown
                      renderer={renderer}
                      onComplete={() => setButtonDisabled(true)}
                      date={countdown}
                    />
                  </Flex>
                )
              }

            </Flex>

          </Content>

        </MessageContainer>
      </Container>

    </Wrapper>
  )
}

export default Goblin
