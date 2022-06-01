import React, { useEffect, useState } from 'react'
import { usePostQuery } from '../../../hooks/queries/usePostQuery'
import { useLocationQuery } from '../../../hooks/useLocationQuery'
import Blogs from '../../social/modules/blogs/blogs'
import Flex from '../../../contexts/theme/components/Box/Flex'
import { Box } from '@mui/material'

const UserPost:React.FC = () => {
  const walletAccount = useLocationQuery('userWalletAccount')

  const [loading, setLoading] = useState(false)
  const [size, ] = useState(20)
  const [, setCurrent] = useState(1)

  const { data: pagingData, fetchNextPage, hasNextPage, isLoading } = usePostQuery({
    size,
    orders: [{ field:'', order:'' }],
    wallet: walletAccount,
    createDay: undefined
  })

  useEffect(() => {
    console.log(pagingData)
  }, [pagingData])

  return (
    <Flex flexDirection={'column'} alignItems={'center'}  mt={2}>
      <Box sx={{ width: '900px' }}>
        {
          pagingData?.pages.flat(1).map((item, index) => (
            item.nft && <Blogs key={index} item={item} />
          ))
        }
      </Box>
    </Flex>
  )
}

export default UserPost
