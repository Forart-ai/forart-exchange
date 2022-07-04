import React, { useCallback, useMemo, useState } from 'react'
import { PoolsListData } from '../../../../types/coNFT'
import { Link, useNavigate } from 'react-router-dom'
import { useModal } from '../../../../contexts/modal'
import DonateDialog from '../../components/modals/donation/donate-dialog'
import {
  ImageContent,
  PoolsCardContainer,
  InfoContent,
  PoolTitle,
  PoolInfo,
  LeftArea, RightArea, Operation,StyledButton
} from './poolList.styles'

const PoolsListItem: React.FC<{data?: PoolsListData, status?: string}> = ({ data, status }) => {

  const [loading, setLoading] = useState<string>('false')
  const navigate = useNavigate()

  useMemo(() => {
    if (data?.status === 'closing') {
      setLoading('true')
    }
  },[status])

  const toArtistDetailUrl = useMemo(() => {
    if (!data?.artistId) return ''

    if (data.type === 'co-nft') {
      return 'co-nft/artistDetail?' + new URLSearchParams({
        artistId: data.artistId ?? ''
      }).toString()
    }

    else  return 'goblintownai'

  }, [data])

  const { openModal } = useModal()

  return (
    <PoolsCardContainer onClick={() => navigate(toArtistDetailUrl)}>
      <ImageContent>
        <img src={data?.image} />
      </ImageContent>

      <InfoContent>
        <PoolTitle>
          <div className="pool-name"> {data?.name }</div>
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

        <Operation>
          {
            data?.status === 'closed' ? (
              <StyledButton sx={{ width:'100%' }} disabled={true} variant={'contained'}>
                Create
              </StyledButton>
            ) :
              <Link to={toArtistDetailUrl} style={{ width:'100%' }}>
                <StyledButton sx={{ width:'100%' }} variant={'contained'}>
                  Create
                </StyledButton>
              </Link>
          }
        </Operation>
      </InfoContent>
    </PoolsCardContainer>
    // </Link>
  )
}

export default PoolsListItem
