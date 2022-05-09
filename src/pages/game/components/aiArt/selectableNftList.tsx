import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Checkbox, styled } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper'

const StyledImageItem = styled('div')`
  width: 260px;
  height: 260px;
  border: 1px #999999 solid;
  padding: 10px;
  border-radius: 20px;
  background-color: rgba(255,255,255,.1);
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;

  }

`

const SelectableNFTItem: React.FC<{ src: string, checked?: boolean, onSelect:(_:string) => void}> = ({
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
    <StyledImageItem onClick={() => onSelect(src)}>
      <img src={src} />
      <SelectBtn />
    </StyledImageItem>

  )
}

const SelectableNFTList: React.FC<{selectedValue:string, onSelect:(_: string) => void, list?: string[]}> = ({
  selectedValue,
  onSelect,
  list
}) => {

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  return (

    <Swiper
      modules={[Pagination]}
      slidesPerView={isMobile? 1 : 6}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
    >
      {
        list?.map((item,key) => (
          <SwiperSlide key={key} style={{ display:'flex', justifyContent:'space-between', cursor:'pointer' }} >
            <SelectableNFTItem src={item} onSelect={onSelect} checked={selectedValue === item} />
          </SwiperSlide>
        ))
      }

    </Swiper>
  )
}

export default SelectableNFTList
