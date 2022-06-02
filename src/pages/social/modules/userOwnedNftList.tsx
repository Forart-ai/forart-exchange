import React, { useMemo } from 'react'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { MintedNFTItem } from '../../../types/coNFT'
import { Skeleton, useMediaQuery, useTheme } from '@mui/material'
import { ShowCoNftParams } from '../../../types/social'
import { NFTItem, NFTItemFromWallet } from './nftItem'
import { useOwnedNFTsQuery } from '../../../hooks/queries/useOwnedNFTsQuery'
import { MetadataResult } from '../../../utils/metaplex/metadata'
import Flex from '../../../contexts/theme/components/Box/Flex'

const UserOwnedNftList:React.FC<{selectedValue?:MetadataResult, onSelect:(_: MetadataResult) => void, }> =({ selectedValue,onSelect }) => {

  const holds = useOwnedNFTsQuery()
  const { data, isLoading } = holds

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={1}
      navigation={true}
      modules={[Navigation]}
      breakpoints={
        {
          400: {
            slidesPerView: 2,
          },
          500: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 4,
          }
        }
      }
    >
      {
        isLoading ?
          <>
            {
              new Array(4).fill({}).map((_, index) => (
                <SwiperSlide key={index} style={{ display:'flex', justifyContent:'center', alignItems:'center' }} >
                  <Skeleton height={156} width={156} variant={'rectangular'} animation="wave"  key={index}  />
                </SwiperSlide>
              ))
            }
          </>
          :
          <>
            {
              data?.map((item,index) => (
                <SwiperSlide key={index} style={{ display:'flex', justifyContent:'center', alignItems:'center' }} >
                  <NFTItemFromWallet src={item} onSelect={onSelect} checked={selectedValue?.data?.image === item.data?.image} />
                </SwiperSlide>

              ))
            }
          </>
      }
    </Swiper>

  )
}

export default UserOwnedNftList
