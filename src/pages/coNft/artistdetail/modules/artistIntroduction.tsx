import React from 'react'
import { useMediaQuery } from 'react-responsive'

import {  ThemeProvider } from '@mui/material'
import ForartTheme from '../../../../contexts/theme/config/dark'
import { useArtistKitsQuery } from '../../../../hooks/queries/useArtistKitsQuery'
import { useLocationQuery } from '../../../../hooks/useLocationQuery'

import HypeteenDetail from './hypeteen/hypeteenDetail'
import IdentifyDetail from './identifyNFT/IndentifyDetail'

export const ArtDetail: React.FC = () => {
  const artistId = useLocationQuery('artistId')

  return (
    <ThemeProvider theme={ForartTheme}>
      {
        artistId === '3312' ? <HypeteenDetail /> : <IdentifyDetail />
      }
    </ThemeProvider>
  )
}
