import React from 'react'
import Text from '../../../../../contexts/theme/components/Text/Text'
import Flex from '../../../../../contexts/theme/components/Box/Flex'
import Image from '../../../../../contexts/theme/components/Image'
import { styled } from '@mui/system'
import { IconButton, SvgIcon } from '@mui/material'
import { Arrow_Down, Heart_Filled } from '../../../../../contexts/svgIcons'
import { RankingBox, TableHeader, RankList, Number, MoreContainer } from '../ranking.style'

const mockData = [
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'momosama',
    fta: 2344
  },
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'eve',
    fta: 425
  },
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'maybis',
    fta: 1263
  }
]

const FtaRanking:React.FC = () => {
  return (
    <RankingBox>
      <>
        <Text p={20} fontSize={26} fontFamily={'Kanit-Regular'}>CO-NFT Quantity</Text>
        <TableHeader>
          <Flex alignItems={'center'}>
            <Text color={'grey[400]'}>Rank</Text>
            <Flex ml={'34px'}>
              <Text color={'grey[400]'}>Creator</Text>
            </Flex>
          </Flex>
          <Text color={'grey[400]'}>FTA Value</Text>

        </TableHeader>
        {
          mockData.map((item,index) => (
            <RankList key={index}>
              <Flex alignItems={'center'} >
                <Number $rank={(index + 1).toString()}> {index + 1} </Number>
                <Flex alignItems={'center'} ml={'34px'}>
                  <Image width={'36px'} height={'36px'} src={item.avatar} />
                  <Text fontFamily={'Kanit-Regular'} ml={10} fontSize={18} color={'secondary.main'}> {item.username} </Text>
                </Flex>
              </Flex>
              <Text fontSize={22} fontFamily={'Aldrich-Regular'}>${item.fta}</Text>
            </RankList>

          ))
        }
        <MoreContainer>
          <IconButton>
            <SvgIcon> <path fill="currentColor" d={Arrow_Down} /> </SvgIcon>
          </IconButton>
        </MoreContainer>
      </>
    </RankingBox>
  )
}

export default FtaRanking
