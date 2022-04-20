import React, { useCallback } from 'react'
import { Box, Button, styled, useMediaQuery, useTheme } from '@mui/material'
import HypeteenIcon from '../../../../assets/images/artistDetail/hypeteenIcon.png'
import { useGetOverview } from '../../../../hooks/queries/useGetOverview'
import { useModal } from '../../../../contexts/modal'
import DonateDialog from '../../components/modals/donation/donate-dialog'
import { useDonation } from '../../../../hooks/programs/useDonation'
import Background from '../../../../assets/images/coPools/hypeteen-background.png'
import LightBulb from '../../../../assets/images/siderIcon/light-bulb.png'
import Cube from '../../../../assets/images/siderIcon/cube.png'
import Gift from '../../../../assets/images/siderIcon/gift.png'
import HypeteenInfo from './hypeteen/hypeteenInfo'
import IdentityInfo from './identifyNFT/identityInfo'
import { useLocationQuery } from '../../../../hooks/useLocationQuery'

const Wrapper = styled('div')`
  height: 700px;
  width: 100%;
  position: relative;
  text-align: center;
  border-bottom: 1px ${({ theme }) => theme.palette.secondary.main} solid;
 
`

const ArtistInfo:React.FC = () => {

  const artistId = useLocationQuery('artistId')

  return (
    <Wrapper>
      {
        artistId === '3312' ? <HypeteenInfo /> :  <IdentityInfo />
      }

    </Wrapper>
  )
}

export default ArtistInfo
