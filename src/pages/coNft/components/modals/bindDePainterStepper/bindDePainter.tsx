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
import { Skeleton } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { useUserBoundedDepainter } from '../../../../../hooks/queries/account/useUserBoundedDepainter'
import useBindDePainter from '../../../../../hooks/account/bindDepainter'
import { useRefreshController } from '../../../../../contexts/refresh-controller'

const NFTItem:React.FC<{item?: MetadataResult, selected?: MetadataResult | any, onSelect:(_?:any) => void }> = ({
  item,
  selected,
  onSelect
}) => {

  return (
    <Flex width={'100%'} gap={'10px'}>
      <NFTWithCheckbox
        width={'180px'}
        height={'220px'}
        src={item}
        checked={(selected?.mintKey === item?.mint.toBase58()) || selected?.data === item?.data}
        onSelect={onSelect}
      >
        <Image borderRadius={6} width={'100%'} height={'80%'} src={item?.data?.image} />
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
        navigate(`/account/${solAccount.toBase58()}?tab=co-nft`)
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
      bindDePainter(selectedValue.mintKey).then(() => forceNext(true))
      return
    }

    if (selectedValue.mint) {
      console.log(selectedValue)
      bindDePainter(selectedValue.mint.toBase58()).then(() => forceNext(true))
      return
    }

  }

  return (
    <Flex height={'100%'}  flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >

      <Swiper slidesPerView={3}>
        <Flex  width={'100%'} justifyContent={'center'} gap={'8px'}>
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
            !isLoading &&

            <>
              {
                data?.map((nft: any, index: number) => (
                  <SwiperSlide key={index} style={{ padding:'5px 0', width:'180px' }}   >
                    <Flex height={'100%'}>
                      <NFTItem selected={selectedValue} onSelect={v => setSelectedValue(v)}  key={index} item={nft}  />
                    </Flex>
                  </SwiperSlide>
                ))
              }
            </>

          }
        </Flex>
      </Swiper>

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

    </Flex>
  )
}

export default BindDePainter
