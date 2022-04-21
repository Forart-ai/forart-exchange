import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { PoolsListData } from '../../../../types/coNFT'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useModal } from '../../../../contexts/modal'
import DonateDialog from '../../components/modals/donation/donate-dialog'
import PoolAvatar from '../../../../assets/images/coPools/pool-avatar.png'
import {
  ImageContent,
  PoolsCardContainer,
  InfoContent,
  DataContent,
  PoolTitle,
  PoolInfo,
  LeftArea, RightArea, Operation,StyledButton
} from './poolList.styles'
import HeartFilled from '../../../../assets/images/coPools/heart-filled.svg'
import { ThemeProvider } from '@mui/material'
import ForartTheme from '../../../../contexts/theme/config/dark'

const PoolsListItem: React.FC<{data?: PoolsListData, status?: string}> = ({ data, status }) => {

  const [loading, setLoading] = useState<string>('false')

  useMemo(() => {
    if (data?.status === 'closing') {
      setLoading('true')
    }
  },[status])

  const toArtistDetailUrl = 'co-nft/artistDetail?' + new URLSearchParams({
    artistId: data?.artistId ?? ''
  }).toString()

  const { openModal } = useModal()

  const openDonateModal = useCallback(() => {
    openModal(<DonateDialog />)
  },[])

  return (
    <ThemeProvider theme={ForartTheme}>
      <PoolsCardContainer >
        <ImageContent>
          <img src={data?.image} />
        </ImageContent>

        <InfoContent>
          <PoolTitle>
            <div className="pool-name"> {data?.name }</div>
            {/*<div className="likes-value">*/}
            {/*  <img src={HeartFilled} style={{ marginRight: '10px' }} />*/}
            {/*  345*/}
            {/*</div>*/}
          </PoolTitle>

          <PoolInfo>
            <LeftArea>
              <div className={'avatar'} >
                <img src={data?.image} />
              </div>
              <div className={'owner'} >
                <div> Owned by </div>
                <span> {data?.artistName} </span>
              </div>
            </LeftArea>
            <RightArea >
              <div className={'data'}>
                <div>{data?.nfts ?? '0'}</div>
                <span>NFTs</span>
              </div>

              <div className={'data'}>
                <div>{data?.minters ?? '0'}</div>
                <span>Creators</span>
              </div>
            </RightArea>
          </PoolInfo>

          <Operation >
            {
              data?.status === 'closed' ? (
                <StyledButton sx={{ width:'100%' }} disabled={true} variant={'contained'}>
                  Create
                </StyledButton>
              ):
                <Link to={toArtistDetailUrl} style={{ width:'100%' }}>
                  <StyledButton sx={{ width:'100%' }} variant={'contained'}>
                    Create
                  </StyledButton>
                </Link>
            }
          </Operation>

        </InfoContent>
      </PoolsCardContainer>
    </ThemeProvider>
  )
}

export default PoolsListItem
