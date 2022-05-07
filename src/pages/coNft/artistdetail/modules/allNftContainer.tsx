import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocationQuery } from '../../../../hooks/useLocationQuery'
import CONFT_API from '../../../../apis/co-nft'
import InfiniteScroll from 'react-infinite-scroll-component'
import AllNftList from '../../../../components/nft-mint/allNftList'
import { useWalletRankModal } from '../../../../hooks/modals/useWalletRankModal'

import { useMediaQuery } from 'react-responsive'
import { Box, Button, List, ListItem, MenuItem, styled } from '@mui/material'
import { SelectPainterRankings, SelectRankings } from '../../components/filter-operations/selectors'
import StyledTextField from '../../../../contexts/theme/components/TextField'
import CustomizeButton from '../../../../contexts/theme/components/Button'

const Filter = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  flex-wrap: wrap;
  
  .refresh {
    height: 100%;
    margin-right: 10px;
    background: rgb(40,44,52);
    border-radius: 5px;
  } 
  
  .mobile-filter {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  
  
`

const AllNftWrapper = styled('div')`
  width: 100%;
  font-size: 18px;
  padding: 0 20px;

  color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;

  .infinite-container {
    height: 1000px;
    overflow: auto;

    ::-webkit-scrollbar {
     display: none;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
   padding: 0 5px;
  }
  
`

const StyledList = styled(List)`
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-gap: 10px;
  justify-content: space-between;
  user-select: none;
  
  ${({ theme }) => theme.breakpoints.down('sm')} {
    grid-template-columns: repeat(2, 170px);
    grid-gap: 10px;
  }
`

const AllNftContainer: React.FC = () => {
  const [total, setTotal] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState<string | number>('')
  const [selectedOrder, setSelectedOrder] = useState(undefined)
  const [orderBy, setOrderBy] = useState('random')
  const [loading, setLoading] = useState(false)
  const series = useLocationQuery('artistId')
  const [hasMore, setHasMore] = useState<boolean>(true)

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const { walletRankModal, openWalletRankModal } = useWalletRankModal()

  const [flag, setFlag] = useState(true)

  const loadMoreData = useCallback( () => {
    return new Promise<void>((resolve, reject) => {
      if (loading) {
        return resolve()
      }

      if (series) {
        setLoading( true)
        CONFT_API.core.nft.getNftRank(series, page, selectedOrder, searchKey, orderBy)
          .then((res:any) => {
            if (res.length === 0)  {
              setHasMore(false)
            }

            setData(prev => ([...prev, ...res]))
            setPage(prev => prev + 1)
            setLoading(false)
            setHasMore(true)
            resolve()
          })
          .catch(err => {
            resolve()
            setLoading(false)
          })
      }

      resolve()
    })
  }, [loading, page, searchKey, selectedOrder, orderBy])

  const onPressEnter = () => {
    setFlag(true)
    // setSearchKey(res.target.value)
    setData([])
    setPage(1)
  }

  useEffect(() => {
    if (flag) {
      loadMoreData()
      setFlag(false)
    }
  }, [flag, loadMoreData])

  useEffect(() => {
    CONFT_API.core.kits.getOverView(3312).then((r: any) => {
      setTotal(r.minted)
    })
  },[])

  const onChange =( r:any )=> {
    setSearchKey(r.target.value)
    onPressEnter()
  }

  const resetData = () => {
    setSearchKey('')
    onPressEnter()
  }

  // const a = useQuery([], async() => { return CONFT_API.core.kits.getOverView() }, { refetchInterval: 1000 })

  return (
    <AllNftWrapper >

      <Filter>
        {
          series === '1024' ?
            <SelectPainterRankings  value={orderBy} onChange={e => { setOrderBy(e.target.value); onPressEnter()}} />
            :
            <SelectRankings value={orderBy} onChange={e => { setOrderBy(e.target.value); onPressEnter()}} />

        }

        <Box sx={{  display: 'flex', justifyContent:'space-between',  marginTop:'10px' }}>
          <StyledTextField
            placeholder={'Please input token ID'}
            onChange ={(res:any) => onChange(res)}
            variant={'outlined'}
          />
          <CustomizeButton sx={{ marginLeft: '20px', padding:'0 5px' }} variant={'contained'} color={'secondary'}  onClick={ openWalletRankModal }>Creator Ranking</CustomizeButton>
        </Box>
      </Filter>

      <div className="infinite-container" id="scrollableDiv">

        <InfiniteScroll
          next={loadMoreData}
          hasMore={ hasMore }
          loader={<></>}
          dataLength={ data?.length }
          scrollableTarget="scrollableDiv"
          endMessage={<></>}
        >
          {/*<List dataSource={data}*/}
          {/*  renderItem={(item,index) => (*/}
          {/*    <>*/}
          {/*      <ListItem key={index}>*/}
          {/*        <AllNftList data={item} index={index} />*/}
          {/*      </ListItem>*/}

          {/*    </>*/}
          {/*  )}*/}
          {/*/>*/}

          <StyledList dense >
            {data.map((item,index) => {
              return (
                <ListItem key={index} sx={{ '&.MuiListItem-root': { width:'auto', padding:0 } }} >
                  <AllNftList data={item} index={index} />
                </ListItem>
              )
            })}
          </StyledList>

          <div className="empty" style={{ height: '600px' }}  />

        </InfiniteScroll>
      </div>
      {walletRankModal}
    </AllNftWrapper>
  )
}

export default AllNftContainer
