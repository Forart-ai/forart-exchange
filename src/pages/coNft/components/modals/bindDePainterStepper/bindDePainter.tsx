import React, { useCallback, useEffect, useState } from 'react'
import NFTWithCheckbox from '../../../../../contexts/theme/components/NFT-With-Checkbox'
import Image from '../../../../../contexts/theme/components/Image'
import { useOwnedNFTsQuery } from '../../../../../hooks/queries/account/useOwnedNFTsQuery'
import { PublicKey } from '@solana/web3.js'
import Text from '../../../../../contexts/theme/components/Text/Text'
import Flex from '../../../../../contexts/theme/components/Box/Flex'
import { MetadataResult } from '../../../../../utils/metaplex/metadata'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import { useNavigate } from 'react-router-dom'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import { useModal } from '../../../../../contexts/modal'
import { Skeleton, SvgIcon } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper'

import { useUserBoundedDepainter } from '../../../../../hooks/queries/account/useUserBoundedDepainter'
import useBindDePainter from '../../../../../hooks/account/bindDepainter'
import { useRefreshController } from '../../../../../contexts/refresh-controller'
import { Empty_Outline } from '../../../../../contexts/svgIcons'
import Dialog from '../../../../../contexts/theme/components/Dialog/Dialog'
import { styled } from '@mui/system'

const Wrapper = styled('div')`
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .mySwiper {
    .swiper-wrapper {
      padding: 40px 0;
    }
  }
`

const NFTItem:React.FC<{item?: MetadataResult, selected?: MetadataResult | any, onSelect:(_?:any) => void }> = ({
  item,
  selected,
  onSelect
}) => {

  return (
    <Flex width={'100%'} gap={'10px'} justifyContent={'center'}>
      <NFTWithCheckbox
        width={'160px'}
        height={'220px'}
        src={item}
        checked={(selected?.mintKey === item?.mint.toBase58()) || selected?.data === item?.data}
        onSelect={onSelect}
      >
        <Image borderRadius={6} width={'140px'} height={'180px'} src={item?.data?.image} />
        <Text >{item?.data?.name}</Text>
      </NFTWithCheckbox>
    </Flex>
  )
}

const BindDePainter:React.FC<{onBound: (_?: boolean) => void, forceNext: (_?: boolean) => void}> = ({ onBound, forceNext }) => {

  const navigate = useNavigate()
  const holds = useOwnedNFTsQuery(new PublicKey('7Gdgp25ghYQyNf6m5nVaxQbCMf2igDVHGStEz7B7vXUM'))

  const { closeModal } = useModal()
  const { account: solAccount } = useSolanaWeb3()
  const { forceRefresh } = useRefreshController()

  const { data: userBoundDePainter } = useUserBoundedDepainter()
  const { bindDePainter, loading } = useBindDePainter()

  const { data, isLoading } = holds

  const [selectedValue, setSelectedValue] = useState<MetadataResult | any>()

  useEffect(() => {
    if (userBoundDePainter && !selectedValue) {
      setSelectedValue(userBoundDePainter)
    }

    if (selectedValue) {
      onBound(true)
      return
    }
    onBound(false)
  }, [selectedValue, userBoundDePainter, forceRefresh])

  const toPersonalCenter = useCallback(
    () => {
      if (solAccount) {
        navigate(`/account/${solAccount.toBase58()}?tab=dePainter`)
        closeModal()
        return
      }
      return
    },
    [solAccount],
  )

  const beforeBindDePainter = () => {
    if (selectedValue.mintKey) {
      console.log('bind already',selectedValue.mintKey)
      bindDePainter(selectedValue.mintKey)
        .then(() => forceNext(true))
        .catch(er => {
          console.log(er)})
      return
    }

    if (selectedValue.mint) {
      console.log(selectedValue)
      bindDePainter(selectedValue.mint.toBase58())
        .then(() => forceNext(true))
        .catch(er => {
          console.log(er)})
      return
    }

  }

  return (
    <Dialog variant={'info'} closeable title={'Bind a DePainter'}>
      <Wrapper>

        <Flex height={'100%'} width={'100%'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
          <Flex width={'100%'}>
            {
              isLoading &&
              <>
                {
                  new Array(3).fill({}).map((item,index) => (
                    <Skeleton key={index} width={'180px'} height={'220px'} animation={'wave'} />
                  ))
                }
              </>

            }
            {
              (!isLoading && holds.data?.length !== 0) &&
              <Swiper

                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
              >

                {
                  data?.map((nft: any, index: number) => (

                    <SwiperSlide key={index}>
                      <Flex height={'100%'} >
                        <NFTItem selected={selectedValue} onSelect={v => setSelectedValue(v)}  key={index} item={nft}  />
                      </Flex>
                    </SwiperSlide>

                  ))
                }

              </Swiper>

            }
          </Flex>

          {
            holds.data?.length !== 0 ? (
              <>
                <Flex width={'100%'} alignItems={'flex-end'} justifyContent={'flex-end'}>
                  {
                    solAccount && <CustomizeButton size={'small'} onClick={toPersonalCenter}>Personal center</CustomizeButton>
                  }
                </Flex>
                <CustomizeButton
                  onClick={() => beforeBindDePainter()}
                  size={'small'}
                  variant={'contained'}
                >
                  Confirm
                </CustomizeButton>
              </>
            ) : (
              <>
                <SvgIcon color={'primary'} fontSize={'large'}><Empty_Outline /></SvgIcon>
                <Text>No depainter found in your wallet</Text>
              </>
            )
          }
        </Flex>
      </Wrapper>
    </Dialog>
  )
}

export default BindDePainter
