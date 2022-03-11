import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import CONFT_API from '../../apis/co-nft'
import { ThemeInput } from '../../styles/ThemeInput'
import { SearchOutlined } from '@ant-design/icons'
import { OrderSelector } from '../../components/NFTListSelectors'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BackTop, Button, Divider, List, Skeleton } from 'antd'
import styled from 'styled-components'
import AllNftList from '../../components/nft-mint/allNftList'

const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
  
  .btn {
    font-size: .7em;
    background-color: #FF4D9D;
    padding: 5px 4px;
    border-radius: 10px;
    margin-left: 10px;
    cursor: pointer;
  }
  
`

const AllNftWrapper = styled.div`
  width: 100%;
  height: fit-content;
 
  font-size: 2em;
  color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;


  .ant-list-items {
    //display: flex;
    //flex-wrap: wrap;
    //justify-content: space-between;
   
    display: grid;
    grid-template-columns: repeat(auto-fill, 230px);
    grid-template-rows: repeat(auto-fill, 300px);
    grid-gap: 12px;
    justify-content: space-between;
    user-select: none;
 
  }


 
  
  
  .rc-virtual-list {
   .rc-virtual-list-holder-inner {
     display: flex;
     flex-direction: row !important;
     flex-wrap: wrap;
     justify-content: center;
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
  const [hasMore, setHasMore] = useState<boolean>(true)

  const [flag, setFlag] = useState(true)

  const loadMoreData = useCallback( () => {
    return new Promise<void>((resolve, reject) => {
      if (loading) {
        return resolve()
      }

      if (series) {
        setLoading( true)
        CONFT_API.core.nft.getNftRank(series, page, selectedOrder, searchKey)
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
  }, [loading, page, searchKey, selectedOrder])

  const onPressEnter = (res: any) => {
    console.log(selectedOrder)
    setFlag(true)
    setSearchKey(res.target.value)
    setData([])
    setPage(1)
  }

  useEffect(() => {
    if (flag) {
      loadMoreData()
      // .then(() => {
      //   loadMoreData()
      //   setFlag(false)
      // })
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
          style={{ width:'200px', marginRight: '20px' }}
        />
        {/*<OrderSelector onChange={ e => { setSelectedOrder(e) }} />*/}
        <div className="btn" onClick={onPressEnter}>Search</div>
      </Filter>

      <div style={{ height: 1000, overflow: 'auto' }} id="scrollableDiv">

        <InfiniteScroll
          next={loadMoreData}
          hasMore={ hasMore }
          loader={<Skeleton  paragraph={{ rows: 1 }} active />}
          dataLength={ data?.length }
          scrollableTarget="scrollableDiv"
          endMessage={<Divider style={{ color:' #c2c2c2' }} plain> oops! there&apos;s nothong more 🤐</Divider>}
        >
          <List dataSource={data}
            renderItem={(item,index) =>(
              <>
                <ListItem key={index}>
                  <AllNftList data={item} index={index} />

                </ListItem>

              </>
            )}
          />

          <div className="empty" style={{ height: '600px' }}  />

        </InfiniteScroll>
      </div>

    </AllNftWrapper>
  )
}

export default AllNftContainer
