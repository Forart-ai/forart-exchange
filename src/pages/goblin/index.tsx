import React, { useEffect, useMemo, useState } from 'react'
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
import { useFreeMint } from '../../hooks/programs/useFreeMint'
import Countdown, { CountdownRendererFn } from 'react-countdown'
import { useCurrentSlotTime } from '../../web3/utils'
import useCandyMachine from '../../hooks/programs/useCandyMachine'
import { GoblinCandyMachineAddress } from '../../hooks/programs/useCandyMachine/helpers/constant'

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
  //background-color: #18182a;
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
  height: 500px;
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
  padding: 1.4rem 1rem;
  font-family: Kanit-Regular;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  
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
        {hours}:{minutes}:{seconds}
      </StyledCountdown>
    )
  }
}

const Goblin: React.FC = () => {

  const { account, disconnect } = useSolanaWeb3()
  const { mintGoblin, loading, message, mintingChance } = useGoblinMint()
  const { startTime } = useFreeMint()
  const { openModal } = useModal()
  const [count, setCount] = useState<number | undefined>(mintingChance.data)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
  const currentSlotTime = useCurrentSlotTime()
  const [countdown, setCountdown] = useState<number | undefined>(startTime.data)
  const { candyMachineMintAmount } = useCandyMachine()

  useEffect(() => {
    if (!currentSlotTime || !startTime.data) return

    if (currentSlotTime  < startTime.data  ) {
      setButtonDisabled(true)
      setCountdown(startTime.data * 1000)
    }

    //if countdown ends
    if (currentSlotTime > startTime.data ) {
      setButtonDisabled(false)
      setCountdown(undefined)
    }
  }, [countdown, startTime, currentSlotTime, buttonDisabled]
  )

  return (
    <Wrapper>
      <BackgroundImage>
        <MainContainer>

          <MainArea>
            <img src={GoblinAvatar} />
            <span>GoblinTownAI Official</span>
            <div className="info-message">
              The amazing 9999 goblintownai collection integrated of technology and NFT. The art created by technology
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
              <p> We&apos;ve been devoting ourselves to the AI-generated image technology. And we are a big fan of AI-generated NFT artwork.
                Until the dope NFT collection Goblintown born.
              </p>

              <p>The crazy idea came out. Which will be more innovative and fantastic...
                Don&apos;t blink or you&apos;ll miss it...
              </p>

              <div className={'highlight'}>
                <div>We are reserving 500 GoblinTownAI.</div>
                <div>2 free + gas mint per wallet.</div>
              </div>
            </Flex>

            <Flex flexDirection={'column'}>
              <Flex>Connected wallet: &nbsp;
                {
                  account ?
                    (
                      <Tooltip placement={'top'} title={'Click to disconnect'}>
                        <div className={'connect'} onClick={disconnect}> {shortenAddress(account?.toBase58())}</div>
                      </Tooltip>
                    ) :
                    (
                      <div className={'connect'} onClick={() => openModal(<WalletSelectionModal />)} />
                    )
                }
              </Flex>

              {
                !!mintingChance?.data && (
                  <NumericStepper
                    minimumValue={1}
                    maximumValue={mintingChance.data}
                    initialValue={mintingChance.data}
                    thumbShadowAnimationOnTrackHoverEnabled={false}
                    onChange={value => setCount(value)}
                  />
                )
              }

              <Flex gap={'10px'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} marginTop={'10px'}>
                <div>Free Mint: {candyMachineMintAmount(GoblinCandyMachineAddress).data - 500}/2222</div>
                {
                  account ? (
                    <>
                      {
                        !!mintingChance.data && (
                          <>
                            <CustomizeButton
                              variant={'contained'}
                              size={'large'}
                              onClick={() => mintGoblin(count)}
                              disabled={loading || !account || mintingChance.data < 1 || buttonDisabled }
                            >
                              MINT {count ? count : <BeatLoader size={6} color={'white'} />} GOBLIN
                            </CustomizeButton>
                          </>
                        )
                      }
                    </>
                  ):
                    <CustomizeButton
                      variant={'contained'}
                      size={'large'}
                      onClick={() => openModal(<WalletSelectionModal />)}
                    >
                      Connect to wallet
                    </CustomizeButton>
                }
                <Message color={message.color}>{message.msg}
                  {
                    loading && <BeatLoader size={6} color={'white'} />
                  }
                </Message>
              </Flex>
              {countdown &&  <Countdown renderer={renderer} onComplete={() => setButtonDisabled(!buttonDisabled)} date={countdown} />}

            </Flex>

          </Content>

        </MessageContainer>
      </Container>

    </Wrapper>

  )
}

export default Goblin
