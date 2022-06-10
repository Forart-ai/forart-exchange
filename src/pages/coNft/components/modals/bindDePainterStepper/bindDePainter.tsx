import React, { useCallback, useEffect, useState } from 'react'
import NFTWithCheckbox from '../../../../../contexts/theme/components/NFT-With-Checkbox'
import Image from '../../../../../contexts/theme/components/Image'
import { useOwnedNFTsQuery } from '../../../../../hooks/queries/useOwnedNFTsQuery'
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

const NFTItem:React.FC<{item?: MetadataResult, selected?: MetadataResult, onSelect:(_?:any) => void }> = ({
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
        checked={selected?.data === item?.data}
        onSelect={onSelect}
      >
        <Image width={'100%'} height={'80%'} src={item?.data?.image} />
        <Text >{item?.data?.name}</Text>
      </NFTWithCheckbox>
    </Flex>
  )
}

const BindDePainter:React.FC<{onBound: (_?: boolean) => void}> = ({ onBound }) => {

  const navigate = useNavigate()
  const holds = useOwnedNFTsQuery(new PublicKey('7Gdgp25ghYQyNf6m5nVaxQbCMf2igDVHGStEz7B7vXUM'))
  const { data, isLoading } = holds
  const [selectedValue, setSelectedValue] = useState<MetadataResult>()
  const { account: solAccount } = useSolanaWeb3()
  const { closeModal } = useModal()

  useEffect(() => {
    if (selectedValue) {
      onBound(true)
      return
    }
    onBound(false)
  }, [selectedValue])

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

  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
      <Flex  width={'100%'} justifyContent={'center'} gap={'12px'}>
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
          <Swiper slidesPerView={3}>
            {
              data?.map((nft: any, index: number) => (
                <SwiperSlide key={index} >
                  <Flex width={'100%'}>
                    <NFTItem selected={selectedValue} onSelect={v => setSelectedValue(v)}  key={index} item={nft}  />
                  </Flex>
                </SwiperSlide>
              ))
            }

          </Swiper>
        }
      </Flex>

      <Flex width={'100%'} alignItems={'flex-end'} justifyContent={'flex-end'}>
        {
          solAccount && <CustomizeButton size={'small'} onClick={toPersonalCenter}>Personal center</CustomizeButton>
        }
      </Flex>
      <CustomizeButton size={'small'} variant={'contained'}>Confirm</CustomizeButton>

    </Flex>
  )
}

export default BindDePainter
