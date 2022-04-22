import React, { useEffect, useState } from 'react'
import {
  DescriptionText,
  LeftArea,
  LeftBottom,
  MainTitle,
  RainbowButton,
  RightArea,
  StyledCountUp,
  Wrapper
} from '../index.styles'
import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { Banner, ButtonArea, LeftTop } from '../index'
import { useGetOverview } from '../../../../hooks/queries/useGetOverview'
import PainterBanner from '../../../../assets/images/home/painter-banner.webp'
import CONFT_API from '../../../../apis/co-nft'

const PainterHomepage:React.FC = () => {

  const { data } = useGetOverview(1024)

  // useEffect(() => {
  //   return () => {
  //     CONFT_API.core.kits.getOverView(1024).then(res=> {
  //       console.log(res)
  //       setData(res)
  //     })
  //   }
  // }, [])

  const toArtistDetailUrl = '/co-nft/artistDetail?' + new URLSearchParams({
    artistId: '3312'
  }).toString()

  return (
    <Wrapper>

      <RightArea>
        <Banner>
          <img src={PainterBanner} />
        </Banner>
      </RightArea>

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
              data ? (
                <div style={{ display: 'flex', alignItems: 'baseline',  width:'200px' }}>
                  <StyledCountUp
                    end={data?.minted ? data?.minted : '---'}
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
              data ? (
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <StyledCountUp
                    end={data?.mintedWallet ? data?.mintedWallet : '---'}
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

    </Wrapper>
  )
}

export default PainterHomepage
