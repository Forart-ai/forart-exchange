import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import CONFT_API from '../../apis/co-nft'
import { ThemeInput } from '../../styles/ThemeInput'
import { OrderBySelector, OrderSelector } from '../../components/NFTListSelectors'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Button, Divider, List, Skeleton } from 'antd'
import styled from 'styled-components'
import AllNftList from '../../components/nft-mint/allNftList'
import { LoadingOutlined } from '@ant-design/icons'
import { useWalletRankModal } from '../../hooks/modals/useWalletRankModal'
import {
  RedoOutlined
} from '@ant-design/icons'

const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
  margin-bottom: 25px;
  flex-wrap: wrap;
  
  .refresh {
    height: 100%;
    margin-right: 10px;
    background: rgb(40,44,52);
    border-radius: 5px;
  }
  @media screen and (max-width: 1080px) {
    margin-bottom: 80px;
  }
  
  
`

const AllNftWrapper = styled.div`
  width: 100%;
  font-size: 2em;
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
  
  
  
  @media screen and (max-width: 1080px) {
    .ant-list-items {
      grid-template-columns: repeat(2, 175px);
      grid-template-rows: repeat(auto-fill, 240px);
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
  const [orderBy, setOrderBy] = useState('random')
  const [loading, setLoading] = useState(false)
  const series = useLocationQuery('artistId')
  const [hasMore, setHasMore] = useState<boolean>(true)

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
    CONFT_API.core.kits.getOverView().then((r: any) => {
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
        <ThemeInput
          placeholder={'Please input token ID'}
          onChange ={(res:any) =>onChange(res)}
          // onBlur = { e => onChange(e)}
          prefix={<></>}
          defaultValue={searchKey}
          style={{ width:'300px', marginRight: '20px' }}
        />
        <div className="refresh">
          <RedoOutlined style={{ width:'40px', color: '#cfcfcf' }} spin={loading} onClick={resetData} />
        </div>
        <OrderSelector onChange={ e => { setSelectedOrder(e); onPressEnter() }}  />
        <OrderBySelector onChange={e => { setOrderBy(e); onPressEnter()}} />
        <Button  onClick={ openWalletRankModal } style={{ marginLeft:'10px' }}>Creator Ranking</Button>
      </Filter>

      <div className="infinite-container" id="scrollableDiv">
        {
          loading && (<LoadingOutlined spin style={{ color: '#ffffff', display:'flex', justifyContent: 'center' }} />)
        }

        <InfiniteScroll
          next={loadMoreData}
          hasMore={ hasMore }
          loader={<></>}
          dataLength={ data?.length }
          scrollableTarget="scrollableDiv"
          endMessage={<Divider style={{ color:' #c2c2c2' }} plain> oops! there&apos;s nothong more 🤐</Divider>}
        >
          <List dataSource={data}
            renderItem={(item,index) => (
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
      {walletRankModal}
    </AllNftWrapper>
  )
}

export default AllNftContainer
