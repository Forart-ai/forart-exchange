import React, { useMemo } from 'react'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { MintedNFTItem } from '../../../types/coNFT'
import {  useMediaQuery, useTheme } from '@mui/material'
import { ShowCoNftParams } from '../../../types/social'
import { NFTItem } from './nftItem'

const UserCoNftList:React.FC<{selectedValue?:ShowCoNftParams, onSelect:(_: ShowCoNftParams) => void, list?: MintedNFTItem[]}> =({ selectedValue,onSelect,list }) => {
  const { account } = useSolanaWeb3()
  const coNftList = useMemo(() => {

    return list?.map((item:MintedNFTItem) => ({
      nft: item.id,
      previewUrl: item.previewUrl,
      wallet: account?.toBase58(),
      chainNftName: item.chainNftName
    }))
  }, [list])
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={1}
      navigation={true}
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
      modules={[Navigation]}
    >

      {
        coNftList?.map((item,index) => (
          <SwiperSlide key={index} style={{ display:'flex', justifyContent:'center', alignItems:'center' }} >
            <NFTItem src={item} onSelect={onSelect} checked={selectedValue?.nft === item.nft} />
          </SwiperSlide>

        ))
      }

    </Swiper>
  )
}

export default UserCoNftList
