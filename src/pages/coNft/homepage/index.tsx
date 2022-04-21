import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useCoNFTDataQuery } from '../../../hooks/queries/useCoNftDataQuery'
import { usePoolsQuery } from '../../../hooks/queries/usePoolsQuery'
import { useGetOverview } from '../../../hooks/queries/useGetOverview'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import {
  DescriptionText,
  HeaderContainer,
  LeftArea,
  LeftBottom,
  MainTitle,
  RainbowButton,
  StyledCountUp,
  RightArea,
  Wrapper
} from './index.styles'
import { Box, Button } from '@mui/material'
import DefaultPageWrapper from '../../../components/default-page-wrapper'
import PoolList from './pools/PoolList'
import HomepageBanner from '../../../assets/images/coPools/homepage-banner.png'
import Ticket from '../../../assets/images/coPools/ticket.png'

import useLocalStorage from '../../../hooks/useLocalStorage'
import {  Swiper , SwiperSlide } from 'swiper/react'
import  { Pagination, Autoplay } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const LeftTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
 
  
`

const Banner = styled.div` 
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  img {
    width: 100%;
    height: 90%;
    object-fit: contain;
    border-radius: 10px;
    position: relative;
  } 
  
`

const ButtonArea = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: flex-start;
  
  a{
    color: #ffffff
  }

  @media screen and (max-width: 1080px) {
    width: 100%;
  }
`

const Header: React.FC = () => {

  const { data: hypeteenData } = useGetOverview(3312)

  const { data: painterData } = useGetOverview(1024)

  const toArtistDetailUrl = '/co-nft/artistDetail?' + new URLSearchParams({
    artistId: '3312'
  }).toString()

  // const token = useLocalStorage('TOKEN')

  const settings ={
    dots: true
  }

  return (
    <HeaderContainer>

      <Swiper
        pagination={{ dynamicBullets: true }}
        modules={[Pagination, Autoplay]}
        className={'styled-swiper'}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        draggable={true}
        loop={true}
      >

        <SwiperSlide>
          <Wrapper>
            <LeftArea>
              <LeftTop>
                <MainTitle>
                  <div className="title1"> HypeTeen </div>
                  The First CO-NFT
                  <div className={'title2'}><span>On</span> Forart Created</div>
                </MainTitle>

                <DescriptionText>
                  Forart.ai provides the First AI-powered NFT SaaS for Social, which integrates NFT content creation and social attributes to provide
                  a one-click experience for NFT creation, publishing and sharing.
                </DescriptionText>

                <ButtonArea>
                  <Link to={toArtistDetailUrl}>
                    <Button sx={{ padding: '15px 25px', borderRadius:'10px', marginRight:'30px' }} variant={'contained'} color={'secondary'} >Create Hypeteen</Button>
                  </Link>

                  <RainbowButton>
                    <a href="https://youtu.be/GrknLnLrwjU" target="_blank" rel="noopener noreferrer" >
                      Instruction
                    </a>
                  </RainbowButton>
                </ButtonArea>

              </LeftTop>

              <LeftBottom>
                <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', marginRight: '100px' }}>
                  {
                    hypeteenData ? (
                      <div style={{ display: 'flex', alignItems: 'baseline',  width:'200px' }}>
                        <StyledCountUp
                          end={hypeteenData?.minted ? hypeteenData?.minted : '---'}
                          duration={2}
                          separator=","

                        />
                        <div className={'total-data'}> /2000</div>
                      </div>
                    ) :
                      <StyledCountUp end={0} />
                  }
                  <div className={'label'}>Total create</div>
                </Box>

                <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center' }}>
                  {
                    hypeteenData ? (
                      <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <StyledCountUp
                          end={hypeteenData?.mintedWallet ? hypeteenData?.mintedWallet : '---'}
                          duration={2}
                          separator=","

                        />
                        <div className={'total-data'}> </div>
                      </div>
                    ) :
                      <StyledCountUp end={0} />
                  }
                  <div className={'label'}>Creators</div>
                </Box>
              </LeftBottom>
            </LeftArea>

            <RightArea>
              <Banner>
                <img src={HomepageBanner} />
              </Banner>
            </RightArea>
          </Wrapper>

        </SwiperSlide>

        <SwiperSlide>
          <Wrapper>
            <LeftArea>
              <LeftTop>
                <MainTitle>
                  <div className="title1"> Painter  </div>

                  <div className={'title2'}> <span> The Unique Admin Ticket</span> To  Forart.ai</div>
                </MainTitle>

                <DescriptionText>
                  Forart.ai is a brand new AI technology-driven C2E world,
                  which is full of imagination and adventure.
                  We&apos;re searching for a limited number of 10000 innovative and creative painters to jointly explore its future.
                </DescriptionText>

                <ButtonArea>
                  <Link to={toArtistDetailUrl}>
                    <Button sx={{ padding: '15px 25px', borderRadius:'10px', marginRight:'30px' }} variant={'contained'} color={'secondary'} >Create Painter</Button>
                  </Link>

                  <RainbowButton>
                    <a href="https://youtu.be/GrknLnLrwjU" target="_blank" rel="noopener noreferrer" >
                      Instruction
                    </a>
                  </RainbowButton>
                </ButtonArea>

              </LeftTop>

              <LeftBottom>
                <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center',  marginRight: '100px' }}>
                  {
                    painterData ? (
                      <div style={{ display: 'flex', alignItems: 'baseline',  width:'200px' }}>
                        <StyledCountUp
                          end={painterData?.minted ? painterData?.minted : '---'}
                          duration={2}
                          separator=","

                        />
                        <div className={'total-data'}> /2000</div>
                      </div>
                    ) :
                      <StyledCountUp end={0} />
                  }
                  <div className={'label'}>Total create</div>
                </Box>

                <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center' }}>
                  {
                    painterData ? (
                      <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <StyledCountUp
                          end={painterData?.mintedWallet ? painterData?.mintedWallet : '---'}
                          duration={2}
                          separator=","

                        />
                        <div className={'total-data'}> </div>
                      </div>
                    ) :
                      <StyledCountUp end={0} />
                  }
                  <div className={'label'}>Creators</div>
                </Box>
              </LeftBottom>

            </LeftArea>
            <RightArea>
              <Banner>
                <img src={HomepageBanner} />
              </Banner>
            </RightArea>
          </Wrapper>

        </SwiperSlide>

      </Swiper>
    </HeaderContainer>

  )
}

const CoNftPage: React.FC = () => {

  const { data: poolsList } = usePoolsQuery({
    size: 20,
    current: 1
  })

  return (
    <DefaultPageWrapper>
      <Header  />
      <PoolList poolsList={poolsList?.records} />
    </DefaultPageWrapper>
  )

}
export default CoNftPage
