import React from 'react'
import { ImageBorder, StyledImage, SwiperList } from '../../pages/coNft/artistMint.style'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Navigation } from 'swiper'
import { Checkbox } from 'antd'
import { useMediaQuery } from 'react-responsive'
import ArrowDown from '../../assets/images/coPools/arrow-down.svg'
import ArrowUp from '../../assets/images/coPools/arrow-up.svg'



export const SelectableBodyItem: React.FC<{ src: any, checked?: boolean, onSelect:(_?: string) => void}> = ({
  src,
  checked,
  onSelect
}) => {

  const SelectBtn: React.FC = () => {
    return (
      <div style={{
        position:'relative',
        bottom:'100px',
        left:'10px',
      }}
      >
        <Checkbox checked={checked} />
      </div>
    )
  }

  return (
    <ImageBorder
      onClick={() => onSelect(!checked ? src : undefined)}
    >
      <StyledImage
        width={100}
        height={100}
        src={src.url}
        preview={false}
        style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '10px', display:'flex', justifyContent:'center' }}
      />
      {/*<SelectBtn />*/}
    </ImageBorder>
  )
}

export const SelectableBodyList: React.FC<{selectedValue?: any, onSelect: (_?: string) => void, list?: [{url:string, price:number, rarity:string}]}> =({
  selectedValue,
  onSelect,
  list
}) => {

  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })

  return (
    <SwiperList>
      <div className="navigation">
        <img className="up-arrow" src={ArrowUp} />
        <img className="down-arrow" src={ArrowDown} />
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={isMobile ? 3 : 6}
        spaceBetween={isMobile ? 50 : 10}
        direction= {isMobile ? 'horizontal' :'vertical'}
        navigation={
          { prevEl: '.navigation .up-arrow',
            nextEl:'.navigation .down-arrow',
            disabledClass: 'disable' }
        }
      >
        {
          list?.map((item,key)=>(
            <SwiperSlide key={key} >
              <SelectableBodyItem src={item} onSelect={onSelect} checked={selectedValue?.url === item?.url} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </SwiperList>
  )
}
