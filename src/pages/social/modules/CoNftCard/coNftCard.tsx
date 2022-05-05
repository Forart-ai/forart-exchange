import React, { useMemo } from 'react'
import { styled } from '@mui/material'
import { useNftDetail } from '../../../../hooks/queries/useNftDetail'
import { useFindComponent } from '../../../../hooks/queries/useFindComponent'
import Flex from '../../../../contexts/theme/components/Box/Flex'
import Text from '../../../../contexts/theme/components/Text/Text'
import { shortenAddress } from '../../../../utils'
import { AttributesItem } from '../../../../components/attributes-item'
import AttributesItemCard from './AttributesItemCard'

const Wrapper = styled('div')`
  width: 100%;
  height: 320px;
  background-color: rgb(13,14,45);
  border-radius: 10px;
  margin: 0 8px;
  padding: 15px;
  display: flex;
  align-items: center;
`

const ImageWrapper = styled('div')`
  height: 200px;
  width: 200px;
  margin-right: 20px;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`

const CoNftCard:React.FC<{nftId: string}> = ({ nftId }) => {

  const { data: nftDetail } = useNftDetail(nftId)

  const { data: a } = useFindComponent(nftDetail?.components)

  const attr = useMemo(() => {
    return nftDetail?.componentMetas.map((v: any) => (
      JSON.parse(v.chainMeta)
    ))
  }, [ nftDetail,a])

  return (
    <>
      <Wrapper>
        <Flex justifyContent={'space-between'}  >
          <ImageWrapper>
            <img src={nftDetail?.previewUrl} />
          </ImageWrapper>
          <Flex flexDirection={'column'}>
            <Text fontSize={'20px'} fontFamily={'Aldrich-Regular'}>{nftDetail?.chainNftName}</Text>
            <Text letterSpacing={'.4px'} fontSize={'14px'} marginBottom={'5px'} >Owned by: &nbsp;{shortenAddress(nftDetail?.wallet)}</Text>
            <AttributesItemCard item={attr} />
          </Flex>
        </Flex>
      </Wrapper>
    </>
  )
}

export default CoNftCard
