import React, { useCallback, useEffect } from 'react'
import { styled, Tooltip, } from '@mui/material'
import HypeteenIcon from '../../assets/images/artistDetail/hypeteenIcon.png'
import Background from '../../assets/images/goblin/Goblin_Background.png'
import GoblinAvatar from '../../assets/images/goblin/goblin-avatar.jpg'
import CustomizeButton from '../../contexts/theme/components/Button'
import { useFreeMint } from '../../hooks/programs/useFreeMint'
import { useGoblinMint } from '../../hooks/ai-generarl/useGoblinMint'

import Swipe1 from '../../assets/images/goblin/swipe1.jpg'
import Swipe2 from '../../assets/images/goblin/swipe2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import Flex from '../../contexts/theme/components/Box/Flex'
import { useOwnedNFTsQuery } from '../../hooks/queries/account/useOwnedNFTsQuery'
import { PublicKey } from '@solana/web3.js'
import { useWhiteListQuery } from '../../hooks/programs/useWhiteList'
import { useGoblinWhiteList } from '../../hooks/programs/useFreeMint/useGoblinWhiteList'
import { shortenAddress } from '../../utils'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import { BeatLoader, BounceLoader, DotLoader, MoonLoader, RotateLoader, SyncLoader } from 'react-spinners'

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
`

const MessageContainer = styled('div')`
  width: 50%;
  height: 500px;
  border: 1px #999999 solid;
  background: rgba(255,255,255, .1);
  border-radius: 1rem;
  padding: 2rem;

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
  justify-content: space-between;
  
  .highlight {
    font-size: 24px;
    color: ${({ theme }) => theme.palette.primary.light};
    font-weight: bolder;
    letter-spacing: 1.2px;
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
`

const Goblin:React.FC = () => {

  const { account, disconnect } = useSolanaWeb3()
  const { getFreeMintToken, userRemainTokenCount } = useFreeMint()
  const { mintGoblin } = useGoblinMint()
  const { openModal } = useModal()

  const { data, isFetching, error } = useGoblinWhiteList()

  useEffect(() => {
  }, [data, userRemainTokenCount])

  const  handleGoblinMint = useCallback(  (mintCount: number) => {
    console.log('handle mint')

    mintGoblin(mintCount).then(r => {
      console.log(r)
      return
    }).catch(er => {
      console.log(er)
      return
    })
  },[account, data])

  const handleGetWhitelistAndMint = useCallback(
    (mintCount:number) => {
      getFreeMintToken()
        .then(res => {
          console.log('give token')
          handleGoblinMint(mintCount)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    [account, data],
  )

  const mintPreCheck = useCallback(
    (mintCount: number) => {
      console.log('pre-check')

      if (data && parseInt(data) >= 1){
        console.log('mint')
        handleGoblinMint(mintCount)
        return
      }

      handleGetWhitelistAndMint(mintCount)
    },
    [account, data],
  )

  return (
    <Wrapper>
      <BackgroundImage>
        <MainContainer >

          <MainArea>
            <img src={GoblinAvatar} />
            <span> Goblinai.sol</span>
            <div className="info-message">
              AAAAAAAUUUUUGGGHHHHH gobblins goblinns GOBLINNNNNNNNns wekm ta goblintown yoo sniksnakr DEJEN RATS oooooh
            </div>
          </MainArea>

        </MainContainer>

      </BackgroundImage>

      <Container>
        <SwiperContainer >
          <Swiper
            pagination={{ dynamicBullets: true, }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide><img src={Swipe1} /></SwiperSlide>
            <SwiperSlide><img src={Swipe2} /></SwiperSlide>

          </Swiper>
        </SwiperContainer>

        <MessageContainer >
          <Content>
            <Flex flexDirection={'column'}>
              <p>Hypeteen is a good-looking and interesting teen. She/He likes food from all over the world, loves travel and art, and is good at socializing.</p>

              <br />

              <p>Hypeteen is a good-looking and interesting teen. She/He likes food from all over the world, loves travel and art, and is good at socializing.</p>

              <div className={'highlight'}>Mint Your free Goblinai.</div>
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
                      <div className={'connect'} onClick={() => openModal(<WalletSelectionModal />)}>Click to connect</div>
                    )
                }
              </Flex>

              <p>You have {data ? data : <BeatLoader size={6} color={'white'} />} Whitelist token</p>
              <p>Remain whitelist token you can get:
                {
                  userRemainTokenCount.data && <>{ userRemainTokenCount?.data?.toString()}</>
                }

              </p>

              <Flex gap={'20px'}>
                <CustomizeButton disabled={(data &&userRemainTokenCount?.data) ?( parseInt(data) + parseInt(userRemainTokenCount?.data?.toString())) < 1 : false}  variant={'contained'} onClick={() => mintPreCheck(1)}>MINT 1 GOBLIN</CustomizeButton>
                <CustomizeButton disabled={(data &&userRemainTokenCount?.data) ?( parseInt(data) + parseInt(userRemainTokenCount?.data?.toString())) < 2 : false} variant={'contained'} onClick={() => mintPreCheck(2)}>MINT 2 GOBLIN</CustomizeButton>
              </Flex>

            </Flex>

          </Content>

        </MessageContainer>
      </Container>

    </Wrapper>

  )
}

export default Goblin
