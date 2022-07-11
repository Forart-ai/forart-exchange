import React, { useCallback } from 'react'
import { Box, Button, styled, useMediaQuery, useTheme } from '@mui/material'
import AvatarIcon from '../../../../../assets/images/coPools/painter.webp'
import LightBulb from '../../../../../assets/images/siderIcon/light-bulb.png'
import SpaceAvatar from '../../../../../assets/images/coPools/spacetronautsAvatar.png'
import Gift from '../../../../../assets/images/siderIcon/gift.png'
import Cube from '../../../../../assets/images/siderIcon/cube.png'
import Background from '../../../../../assets/images/coPools/painter-background.jpg'
import { useGetOverview } from '../../../../../hooks/queries/useGetOverview'
import { useDonation } from '../../../../../hooks/programs/useDonation'
import { useModal } from '../../../../../contexts/modal'
import DonateDialog from '../../../components/modals/donation/donate-dialog'
import { useLocationQuery } from '../../../../../hooks/useLocationQuery'

const Wrapper = styled('div')`
  height: 700px;
  width: 100%;
  position: relative;
  text-align: center;
  border-bottom: 1px ${({ theme }) => theme.palette.secondary.main} solid;
 
`

const BackgroundImage = styled('div') <{artistId?: string}>`
  height: 520px;
  width: 100%;
  background: ${({ artistId }) => artistId === '1024' ? `url(${Background}) no-repeat` :'#15152c'};
  position: relative;
  background-size: cover;
  text-align: center;

 
  

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: 60px 0;
  }
`

const MainContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px 40px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 10px;
  }
`

const DonateArea = styled('div')`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
`

const MainArea = styled('div')`
  max-width: 570px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
    img {
      width: 180px;
      object-fit: cover;
      border-radius: 50%;
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
    font-size: 20px;
  }
  
  @media screen and (max-width: 1080px) {
    height: 70%;
    .top {
      flex-direction: column;

      span {
        margin-left: 0;
        font-family: inter-extraBold;
        color: #ffffff;
        font-size: 1.4em;
      }
    }

    .info-message {
      text-align: center;
      padding: 0 10px;
      font-size: 1.2em;
    }
  }
`

const DataArea = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: center;
  gap: 10px;
  position: absolute;
  bottom:  -100px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`

const DataItem = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  
  .value {
    color: ${({ theme }) => theme.palette.text.primary};
    font-family: Aldrich-Regular;
    font-size: 30px;
  }
  
  .name {
    color: ${({ theme }) => theme.palette.grey[500]};
    font-size: 16px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    text-align: center;
    width: 125px;
  }
  
`

const DataIcon = styled('div')`
  width: 85px;
  height: 85px;
  border-radius: 10px;
  background: linear-gradient(90deg, #EB1482 0%, #CD19B9 100%);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 64px;
    height: 64px;
  }
`

const IdentityInfo:React.FC = () => {
  const artistId = useLocationQuery('artistId')

  const { data: overviewData } = useGetOverview(parseInt(artistId as string))

  const theme = useTheme()

  // const { openModal } = useModal()
  // const openDonateModal = useCallback(() => {
  //   openModal(<DonateDialog />)
  // },[])

  return (
    <>
      <BackgroundImage artistId={artistId}>
        <MainContainer >

          <MainArea>
            {artistId === '1024' &&   <img src={AvatarIcon} />}
            {artistId === '1025' &&   <img src={SpaceAvatar} />}
            <span>
              {artistId === '1024' &&  <>DePainter</>}
              {artistId === '1025' &&  <>Spacetronauts</>}
            </span>
            <div className="info-message">
              Forart.ai are searching for a limited number of 10000 innovative and creative painters to jointly explore its future.
            </div>
          </MainArea>

          <DataArea>
            <DataItem>
              <DataIcon >
                <img src={LightBulb} />
              </DataIcon>
              <Box sx={{ display: 'flex', flexDirection:'column', alignItems:'center' }}>
                <div className={'value'}>{overviewData?.minted ?? '0'}</div>
                <div className={'name'}>Minted</div>
              </Box>
            </DataItem>

            <DataItem>
              <DataIcon >
                <img src={Cube} />
              </DataIcon>
              <Box sx={{ display: 'flex', flexDirection:'column', alignItems:'center' }}>
                <div className={'value'}>{overviewData?.minter ?? '0'}</div>
                <div className={'name'}>Minters</div>
              </Box>
            </DataItem>
          </DataArea>

        </MainContainer>
      </BackgroundImage>

    </>
  )
}

export default IdentityInfo
