import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import CONFT_API from '../../apis/co-nft'
import { ThemeInput } from '../../styles/ThemeInput'
import { SearchOutlined } from '@ant-design/icons'
import { OrderSelector } from '../../components/NFTListSelectors'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Divider, List, Skeleton } from 'antd'
import styled from 'styled-components'
import AllNftList from '../../components/nft-mint/allNftList'
import { Simulate } from 'react-dom/test-utils'
import { useQuery } from 'react-query'

const Filter = styled.div`
  display: flex;
  align-items: center;
`

const AllNftWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 2em;
  color: #ffffff;
  flex-direction: column;
  
  .ant-list-items {
    display: flex;
    flex-wrap: wrap;
  }
  

  
  
  .rc-virtual-list {
   .rc-virtual-list-holder-inner {
     display: flex;
     flex-direction: row !important;
     flex-wrap: wrap;
     justify-content: flex-start;
   }
  }
  
`
const ListItem = styled.div`
  display: flex;
  width: fit-content;
  
`

const AllNftContainer: React.FC = () => {
  const [total, setTotal] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState<string | number>('')
  const [selectedOrder, setSelectedOrder] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const series = useLocationQuery('artistId')

  const [flag, setFlag] = useState(true)

  const loadMoreData = useCallback(() => {
    if (loading) {
      return
    }

    if (series){
      setLoading( true)
      CONFT_API.core.nft.getNftRank(series, page, selectedOrder, searchKey)
        .then((res:any) => {
          setData(prev => ([...prev, ...res]))
          setPage(prev => prev + 1)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
        })
    }

  }, [loading, page, searchKey, selectedOrder])

  const onPressEnter = (res: any) => {
    setFlag(true)
    setSearchKey(res.target.value)
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
    CONFT_API.core.kits.getOverView().then((r: any) => {
      setTotal(r.minted)
    })
  },[])

  // const a = useQuery([], async() => { return CONFT_API.core.kits.getOverView() }, { refetchInterval: 1000 })

  return (
    <AllNftWrapper >
      <Filter>
        <ThemeInput
          onPressEnter={ onPressEnter }
          prefix={<SearchOutlined style={{ color: 'white', width: '15px' }} />}
          defaultValue={searchKey}
        />
        <OrderSelector onChange={ setSelectedOrder }  />
      </Filter>

      <div style={{ height: 500, overflow:'auto', padding: '0 16px', }} id="scrollableDiv">

        <InfiniteScroll
          next={loadMoreData}
          hasMore={!flag && data?.length !== 0}
          loader={<></>}
          dataLength={ data?.length }
          scrollableTarget="scrollableDiv"
          endMessage={<Divider plain> 🤐</Divider>}
        >
          <List dataSource={data}
            renderItem={(item,index) =>(
              <ListItem key={index}>
                <AllNftList data={item} index={index} />
              </ListItem>
            )}
          />
        </InfiniteScroll>
      </div>

    </AllNftWrapper>
  )
}

export default AllNftContainer
