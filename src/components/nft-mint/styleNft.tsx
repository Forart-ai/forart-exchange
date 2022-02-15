import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Navigation } from 'swiper'
import { Checkbox, Image as AntdImage } from 'antd'
import styled from '@emotion/styled'

const StyledImage = styled(AntdImage)`
  display: flex;
  justify-content: center;
  user-select: none;
`

export const SelectableNFTItem: React.FC<{ src: string, checked?: boolean, onSelect:(_:string) => void}> = ({
  src,
  checked,
  onSelect
}) => {
  const SelectBtn: React.FC = () => {
    return (
      <div style={{
        position:'relative',
        bottom:'150px',
        left:'10px'
      }}
      >
        <Checkbox checked={checked} />
      </div>
    )
  }

  return (
    <div
      onClick={() => onSelect(src)}
    >
      <StyledImage width={160}
        height={160}
        src={src}
        preview={false}
        style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '10px', display:'flex', justifyContent:'center' }}
      />
      <SelectBtn />
    </div>
  )
}

export const SelectableNFTList: React.FC<{selectedValue:string, onSelect:(_: string) => void, list?: string[]}> = ({
  selectedValue,
  onSelect,
  list
}) => {

  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={isMobile? 1 : 5}
      navigation
      spaceBetween={20}
    >
      {
        list?.map((item,key) => (
          <SwiperSlide key={key} style={{ display:'flex', justifyContent:'center' }} >
            <SelectableNFTItem src={item} onSelect={onSelect} checked={selectedValue === item} />
          </SwiperSlide>
        ))
      }

    </Swiper>
  )
}
