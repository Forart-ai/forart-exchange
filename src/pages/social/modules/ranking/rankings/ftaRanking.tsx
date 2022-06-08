import React, { useState } from 'react'
import Text from '../../../../../contexts/theme/components/Text/Text'
import Flex from '../../../../../contexts/theme/components/Box/Flex'
import Image from '../../../../../contexts/theme/components/Image'
import { styled } from '@mui/system'
import { IconButton, SvgIcon } from '@mui/material'
import { Arrow_Down, Caret_Down, Heart_Filled } from '../../../../../contexts/svgIcons'
import { RankingBox, TableHeader, RankList, Number, MoreContainer, ShowMoreIcon } from '../ranking.style'
import { useRankQuery } from '../../../../../hooks/queries/useRankQuery'

const mockData = [
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'momosama',
    fta: 2344,
    rank: 1
  },
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'eve',
    fta: 425,
    rank: 2
  },
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'maybis',
    fta: 126,
    rank: 3
  },
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'momosama4',
    fta: 2344,
    rank: 4
  },
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'eve',
    fta: 425,
    rank: 5
  },
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'maybis',
    fta: 1263,
    rank: 6
  },
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'momosama',
    fta: 2344,
    rank: 7
  },
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'eve',
    fta: 425,
    rank: 8
  },
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'maybis',
    fta: 1263,
    rank: 9
  },
  {
    avatar:'https://forart-account.s3.us-west-2.amazonaws.com/4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s/avatar.png',
    username: 'momosama',
    fta: 2344,
    rank: 10
  },

]

const FtaRanking:React.FC = () => {

  const [size, ] = useState(20)
  const [current, setCurrent] = useState(1)
  const [showMore, setShowMore] = useState<boolean>(false)

  const { data: rankList } = useRankQuery({ size: size, current: current })

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
          mockData.filter(v => v.rank <= 3).map((item,index) => (
            <RankList key={index}>
              <Flex alignItems={'center'} >
                <Number $rank={item.rank.toString()}> {item.rank} </Number>
                <Flex alignItems={'center'} ml={'34px'}>
                  <Image width={'36px'} height={'36px'} src={item.avatar} />
                  <Text fontFamily={'Kanit-Regular'} ml={10} fontSize={18} color={'secondary.main'}> {item.username} </Text>
                </Flex>
              </Flex>
              <Text fontSize={22} fontFamily={'Aldrich-Regular'}>${item.fta}</Text>
            </RankList>

          ))
        }
        {
          showMore && (
            <>
              {
                mockData.filter(v=> v.rank > 3).map((item,index) => (
                  <RankList key={index}>
                    <Flex alignItems={'center'} >
                      <Number $rank={item.rank.toString()}> {item.rank} </Number>
                      <Flex alignItems={'center'} ml={'34px'}>
                        <Image width={'36px'} height={'36px'} src={item.avatar} />
                        <Text fontFamily={'Kanit-Regular'} ml={10} fontSize={18} color={'secondary.main'}> {item.username} </Text>
                      </Flex>
                    </Flex>
                    <Text fontSize={22} fontFamily={'Aldrich-Regular'}>${item.fta}</Text>
                  </RankList>

                ))
              }
            </>
          )
        }
        <MoreContainer onClick={() => setShowMore(prevState => !prevState )}>
          <ShowMoreIcon color={'secondary'} showmore={showMore.toString()} >
            <Caret_Down />
          </ShowMoreIcon>
        </MoreContainer>
      </>
    </RankingBox>
  )
}

export default FtaRanking
