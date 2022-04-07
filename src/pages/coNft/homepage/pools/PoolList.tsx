import React, { useMemo } from 'react'
import { PoolsListData } from '../../../../types/coNFT'
import { useGetOverview } from '../../../../hooks/queries/useGetOverview'
import { useMediaQuery } from 'react-responsive'
import { CaretRightOutlined } from '@ant-design/icons'
import PoolsListItem from './PoolsListItem'
import { PoolListContainer, PoolsContainer } from './poolList.styles'
import RainbowText from '../../../../contexts/theme/components/RainbowText'

const PoolList: React.FC<{ poolsList?: Array<PoolsListData> }> = ({ poolsList }) => {

  const { data: overviewData } = useGetOverview()

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const req = {
    'image': 'https://forart.mypinata.cloud/ipfs/QmSFo7w1m87FnSbcgWAsydWzsjKiExZCrt7ynxMJLQP2d4',
    'name': 'HypeTeen',
    'describe': 'HypeTeen is the first CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen.',
    'nfts': overviewData?.minted,
    'minters': overviewData?.mintedWallet,
    'status': 'closing',
    'artistId': '3312'
  }

  useMemo(() => {
    if (isMobile) {
      req.describe =  req.describe.substr(0,70) + '...'
    }
    else return
  },[req])

  return (
    <PoolsContainer>
      <RainbowText>CO-NFT Lived Pools</RainbowText>
      <PoolListContainer>
        <PoolsListItem
          data={req}
          status={req.status}
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
