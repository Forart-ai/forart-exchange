import React, { useMemo } from 'react'
import { PoolsListData } from '../../../../types/coNFT'
import { useGetOverview } from '../../../../hooks/queries/useGetOverview'
import { useMediaQuery } from 'react-responsive'
import PoolsListItem from './PoolsListItem'
import { PoolListContainer, PoolsContainer } from './poolList.styles'
import RainbowText from '../../../../contexts/theme/components/RainbowText'
import PainterAvatar from '../../../../assets/images/coPools/painter.webp'
import GoblinAvatar from '../../../../assets/images/goblin/goblin-avatar.jpg'
import SpacetronautsAvatar from '../../../../assets/images/coPools/spacetronauts/thespaceproject-avatar2.webp'

import { Box } from '@mui/material'
import { useMintedAmount } from '../../../goblin'

const PoolList: React.FC<{ poolsList?: Array<PoolsListData> }> = ({ poolsList }) => {

  const { data: overviewData } = useGetOverview(3312)

  const { data: painterData } = useGetOverview(1024)

  const { data: spaceData } = useGetOverview(1025)

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const mintedAmount = useMintedAmount()

  const hypeteen = {
    'image': 'https://forart.mypinata.cloud/ipfs/QmSFo7w1m87FnSbcgWAsydWzsjKiExZCrt7ynxMJLQP2d4',
    'name': 'HypeTeen',
    'describe': 'HypeTeen is the first CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen.',
    'nfts': overviewData?.created,
    'minters': overviewData?.creator,
    'status': 'living',
    'artistId': '3312',
    artistName: 'Monica',
    'type': 'co-nft'
  }

  const identity = {
    'image': PainterAvatar,
    'name': 'DePainter',
    'describe': 'HypeTeen is the first CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen.',
    'nfts': painterData?.minted,
    'minters': painterData?.minter,
    'status': 'living',
    'artistId': '1024',
    artistName: 'Forart.ai',
    'type': 'co-nft',
  }

  const spaceTronauts = {
    'image': SpacetronautsAvatar,
    'name': 'SPACETRONAUTS',
    'describe': 'Yigit Akdag',
    'nfts': spaceData?.created,
    'minters': spaceData?.creator,
    'status': 'living',
    'artistId': '1025',
    artistName: 'Yigit Akdag',
    'type': 'co-nft',
  }

  const goblin = React.useMemo(() => ({
    'image': GoblinAvatar,
    'name': 'GoblinTownAI',
    'describe': 'GoblinG oblinGob linGob linGo blin GoblinG oblinGoblin GoblinGoblin.',
    'nfts': mintedAmount,
    'minters': '-',
    'status': 'living',
    'artistId': '1',
    artistName: 'GoblinTownAI',
    'type': 'ai-general'
  }), [mintedAmount])

  useMemo(() => {
    if (isMobile) {
      hypeteen.describe =  hypeteen.describe.substr(0,70) + '...'
    }
    else return
  },[hypeteen])

  return (
    <PoolsContainer>
      <Box sx={{ marginBottom:'30px' }}>
        <RainbowText>AI-Generate Lived Pools</RainbowText>
        <PoolListContainer>
          <PoolsListItem
            data={goblin}
            status={goblin.status}
          />
        </PoolListContainer>
      </Box>

      <RainbowText>CO-NFT Lived Pools</RainbowText>
      <PoolListContainer>
        <PoolsListItem
          data={spaceTronauts}
          status={spaceTronauts.status}
        />
        <PoolsListItem
          data={hypeteen}
          status={hypeteen.status}
        />
        <PoolsListItem
          data={identity}
          status={identity.status}
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
