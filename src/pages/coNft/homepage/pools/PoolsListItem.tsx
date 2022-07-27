import React, { useMemo, useState } from 'react'
import { PoolsListData } from '../../../../types/coNFT'
import { Link, useNavigate } from 'react-router-dom'
import { useModal } from '../../../../contexts/modal'
import {
  DataContent,
  ImageContent,
  InfoContent,
  PoolsCardContainer,
} from './poolList.styles'
import Flex from '../../../../contexts/theme/components/Box/Flex'
import { RightArrowSvg } from '../../../../assets/svgs/icons'

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

    else return '/ai-general/goblintownai'
  }, [data])

  const { openModal } = useModal()

  return (
    <Link to={toArtistDetailUrl}>
      <PoolsCardContainer chain={data?.chain} >
        <div className="ribbon ribbon-top-left"><span>{data?.chain}</span></div>

        <ImageContent cover={data?.image}>
          <div className={'background'}  />
          <img src={data?.avatar} />
          <div className={'title'}>
            <span>{data?.name }</span>
          </div>
        </ImageContent>

        <InfoContent>
          <Flex>
            <DataContent>
              <div className="pool-name"> NFTs: {data?.nfts ?? '0'}</div>
            </DataContent>

            <DataContent>
              <div className="pool-name"> Creators: {data?.minters ?? '0'}</div>
            </DataContent>
          </Flex>

          <div className={'right-arrow-svg'}>

            <RightArrowSvg width={32} height={32} />
          </div>

          {/*<PoolInfo>*/}
          {/*  <LeftArea>*/}
          {/*    <div className={'avatar'} >*/}
          {/*      <img src={data?.image} />*/}
          {/*    </div>*/}
          {/*    <div className={'owner'} >*/}
          {/*      <div> Owned by </div>*/}
          {/*      <span> {data?.artistName} </span>*/}
          {/*    </div>*/}
          {/*  </LeftArea>*/}
          {/*  <RightArea >*/}
          {/*    <div className={'data'}>*/}
          {/*      <div>{data?.nfts ?? '0'}</div>*/}
          {/*      <span>NFTs</span>*/}
          {/*    </div>*/}

          {/*    <div className={'data'}>*/}
          {/*      <div>{data?.minters ?? '0'}</div>*/}
          {/*      <span>Creators</span>*/}
          {/*    </div>*/}
          {/*  </RightArea>*/}
          {/*</PoolInfo>*/}

          {/*<Operation>*/}
          {/*  {*/}
          {/*    data?.status === 'closed' ? (*/}
          {/*      <StyledButton  sx={{ width:'100%' }} disabled={true} variant={'contained'}>*/}
          {/*        Create*/}
          {/*      </StyledButton>*/}
          {/*    ) :*/}
          {/*      <Link to={toArtistDetailUrl} style={{ width:'100%' }}>*/}
          {/*        <StyledButton sx={{ width:'100%' }} variant={'contained'}>*/}
          {/*          Create*/}
          {/*        </StyledButton>*/}
          {/*      </Link>*/}
          {/*  }*/}
          {/*</Operation>*/}
        </InfoContent>
      </PoolsCardContainer>
    </Link>
  )
}

export default PoolsListItem
