import React, { useMemo } from 'react'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { useMintResultQuery } from '../../../hooks/queries/useMintResultQuery'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { MintedNFTItem } from '../../../types/coNFT'
import Wrapper from '../../../contexts/theme/components/Image/Wrapper'
import { Box, Checkbox, useMediaQuery, useTheme } from '@mui/material'
import Image from '../../../contexts/theme/components/Image'
import Flex from '../../../contexts/theme/components/Box/Flex'
import { styled } from '@mui/system'
import { ShowCoNftParams } from '../../../types/social'

const NftContent = styled('div')`
  display: flex;
  height: 156px;
  width: 156px;
  
  img{
    object-fit: cover;
  }
`

export const NFTItem: React.FC<{ src: ShowCoNftParams, checked?: boolean, onSelect:(_:ShowCoNftParams) => void}> = ({
  src,
  checked,
  onSelect
}) => {

  const SelectBtn: React.FC = () => {
    return (
      <div style={{
        position:'absolute',
        top:'10px'
      }}
      >
        <Checkbox checked={checked} />
      </div>
    )
  }

  return (
    <NftContent>
      <Image style={{ cursor:'pointer' }} src={src.previewUrl} width={'100%'} height={'100%'} onClick={() => onSelect(src)} borderRadius={10}  />
      <SelectBtn />
    </NftContent>

  )
}

const UserCoNftList:React.FC<{selectedValue?:ShowCoNftParams, onSelect:(_: ShowCoNftParams) => void, list?: MintedNFTItem[]}> =({ selectedValue,onSelect,list }) => {
  const { account } = useSolanaWeb3()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xl'))
  const coNftList = useMemo(() => {

    return list?.map((item:MintedNFTItem) => ({
      nft: item.id,
      previewUrl: item.previewUrl,
      wallet: account?.toBase58()
    }))
  }, [list])
  return (
    <Swiper
      slidesPerView={isMobile ? 2 : 4}
      spaceBetween={1}
      navigation={true}
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
