import React, { useMemo } from 'react'
import { PoolsListData } from '../../../../types/coNFT'
import { useGetOverview } from '../../../../hooks/queries/useGetOverview'
import { useMediaQuery } from 'react-responsive'
import PoolsListItem from './PoolsListItem'
import { PoolListContainer, PoolsContainer } from './poolList.styles'
import RainbowText from '../../../../contexts/theme/components/RainbowText'
import PainterAvatar from '../../../../assets/images/coPools/painter.webp'

const PoolList: React.FC<{ poolsList?: Array<PoolsListData> }> = ({ poolsList }) => {

  const { data: overviewData } = useGetOverview(3312)

  const { data: painterData } = useGetOverview(1024)

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const hypeteen = {
    'image': 'https://forart.mypinata.cloud/ipfs/QmSFo7w1m87FnSbcgWAsydWzsjKiExZCrt7ynxMJLQP2d4',
    'name': 'HypeTeen',
    'describe': 'HypeTeen is the first CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen.',
    'nfts': overviewData?.created,
    'minters': overviewData?.creator,
    'status': 'living',
    'artistId': '3312',
    artistName: 'Monica'
  }

  const identity = {
    'image': PainterAvatar,
    'name': 'DePainter',
    'describe': 'HypeTeen is the first CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen.',
    'nfts': painterData?.minted,
    'minters': painterData?.minter,
    'status': 'living',
    'artistId': '1024',
    artistName: 'Forart.ai'
  }

  const spaceTronauts = {
    'image': PainterAvatar,
    'name': 'SPACETRONAUTS',
    'describe': 'mexico',
    'nfts': 0,
    'minters': 0,
    'status': 'living',
    'artistId': '1025',
    artistName: 'mexico'
  }

  useMemo(() => {
    if (isMobile) {
      hypeteen.describe =  hypeteen.describe.substr(0,70) + '...'
    }
    else return
  },[hypeteen])

  return (
    <PoolsContainer>
      <RainbowText>CO-NFT Lived Pools</RainbowText>
      <PoolListContainer>
        <PoolsListItem
          data={hypeteen}
          status={hypeteen.status}
        />
        <PoolsListItem
          data={identity}
          status={identity.status}
        />
        <PoolsListItem
          data={spaceTronauts}
          status={spaceTronauts.status}
        />
        {
          poolsList?.map((pool: PoolsListData, index: number) => (
            <PoolsListItem
              data={pool}
              key={index}
              status={pool.status}
            />
          ))
        }
      </PoolListContainer>
    </PoolsContainer>
  )

}

export default PoolList
