import React from 'react'
import { styled } from '@mui/system'
import Text from '../../../../contexts/theme/components/Text/Text'
import Image from '../../../../contexts/theme/components/Image'
import Sample from '../../../../assets/images/coPools/painter-background.jpg'

const TopBox = styled('div')`
  position: fixed;
  height: 610px;
  width: 500px;
  border: 1px ${({ theme }) => theme.palette.secondary.light} solid;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ArtistMessage = styled('div')`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 18px;
  line-height: 1.6;
  font-family: Kanit-Light;
`

const GallerySwiper:React.FC = () => {
  return (
    <TopBox>
      <>
        <Text mb={30} fontSize={26} fontFamily={'Kanit-Regular'}>Encryption Gallery</Text>
        <Image mb={30} width={'100%'} height={'220px'} src={Sample} variant={'rectangular'} borderRadius={10} />
        <ArtistMessage>
          <span>Lorem ipsum dolor sit amet</span>
          <span>Lorem ipsum dolor sit amet, consectetur.</span>
          <span>Lorem ipsum dolor sit.</span>
          <span>Lorem ipsum dolor.</span>
        </ArtistMessage>
      </>
      <Text color={'grey[400]'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad fugit inventore minus nesciunt numquam provident repellat, sint vitae voluptates?</Text>
    </TopBox>
  )
}

export default GallerySwiper
