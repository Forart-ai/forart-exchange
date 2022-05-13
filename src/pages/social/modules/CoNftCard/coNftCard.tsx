import React, { useMemo } from 'react'
import { styled, useMediaQuery, useTheme } from '@mui/material'
import { useNftDetail } from '../../../../hooks/queries/useNftDetail'
import { useFindComponent } from '../../../../hooks/queries/useFindComponent'
import Flex from '../../../../contexts/theme/components/Box/Flex'
import Text from '../../../../contexts/theme/components/Text/Text'
import { shortenAddress } from '../../../../utils'
import { AttributesItem } from '../../../../components/attributes-item'
import AttributesItemCard from './AttributesItemCard'

const Wrapper = styled('div')`
  width: 100%;
  background-color: rgb(13,14,45);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  height: auto;

  ${({ theme }) => theme.breakpoints.down('md')} {
    height: auto;

  }
 
`

const Container = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
  }
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
  const ForartTheme = useTheme()

  const { data: nftDetail } = useNftDetail(nftId)

  const { data: a } = useFindComponent(nftDetail?.components)

  const attr = useMemo(() => {
    return nftDetail?.componentMetas.map((v: any) => (
      JSON.parse(v.chainMeta)
    ))
  }, [ nftDetail,a])

  const isMobile = useMediaQuery(ForartTheme.breakpoints.down('md'))

  return (
    <Wrapper>
      <Container  >
        <ImageWrapper>
          <img src={nftDetail?.previewUrl} />
        </ImageWrapper>
        <Flex flexDirection={'column'} width={isMobile ? '100%' : 'calc(100% - 200px)'}  >
          <Text fontSize={'20px'} fontFamily={'Aldrich-Regular'}>{nftDetail?.chainNftName}</Text>
          <Text letterSpacing={'.4px'} fontFamily={'Kanit-Regular'} fontSize={'14px'} mb={'5px'} >Owned by: &nbsp;{shortenAddress(nftDetail?.wallet)}</Text>
          <AttributesItemCard item={attr} />
        </Flex>
      </Container>
    </Wrapper>
  )
}

export default CoNftCard
