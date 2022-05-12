import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useModal } from '../useModal'
import styled from 'styled-components'
import { Divider, List, Modal, Skeleton, Table } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocationQuery } from '../useLocationQuery'
import CONFT_API from '../../apis/co-nft'
import { Simulate } from 'react-dom/test-utils'
import InfiniteScroll from 'react-infinite-scroll-component'
import useLocationHash from '../useLocationHash'
import ThemeTable from '../../styles/ThemeTable'
import { ThemeInput } from '../../styles/ThemeInput'
import { SearchOutlined } from '@ant-design/icons'

const RankingModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 900px !important;

`

const Content = styled.div`
  width: 100%;
`

const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
  
  .btn {
    font-size: .7em;
    background-color: #E42575;
    padding: 5px 14px;
    border-radius: 10px;
    margin-left: 10px;
    cursor: pointer;
  }
  
`

export const useWalletRankModal = () => {
  const { account } = useSolanaWeb3()

  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState<string | number>('')
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [flag, setFlag] = useState(true)

  const series = useLocationQuery('artistId')

  let scrollRef: any

  const column = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Wallet address',
      dataIndex: 'wallet',
      key: 'wallet',
      width:'70%'
    },
    {
      title: 'Create number',
      dataIndex: 'count',
      key: 'count',
      ellipsis: true,
      textWrap: 'word-break',
    }]

  const loadMoreData = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (loading) {
        return resolve()
      }

      if (!series) {return }

      setLoading(true)
      CONFT_API.core.nft.getWalletRank(series, page, searchKey )
        .then((res:any) => {
          if (res.length === 0) {
            setHasMore(false)
          }
          setData( res.map((item:any, index: number) => ({
            key: index,
            wallet: item.wallet,
            rank:item.rank,
            count: item.count
          })))
          setPage(prev => prev + 1)
          setLoading(false)
          setHasMore(true)
          resolve()
        }).catch(() => {
          resolve()
          setLoading(false)
        })

      resolve()
    })
  },[loading, page, searchKey])

  const getData = () => {
    if (!series) {
      return
    }
    CONFT_API.core.nft.getWalletRank(series, page, searchKey )
      .then((res:any) => {
        if (res.length === 0) {
          setHasMore(false)
        }
        setData(prev => [...prev, ...res.map((item:any, index:number) => ({
          key: index,
          wallet: item.wallet,
          rank:item.rank,
          count: item.count
        }))])
        setLoading(false)
        setHasMore(true)
      }).catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
  },[data])

  useEffect(() => {
    if (flag) {
      loadMoreData()
      setFlag(false)
    }
  }, [flag, loadMoreData])

  const onScrollCapture = (e:any) => {
    if (Math.round(scrollRef.scrollTop) + scrollRef.clientHeight == scrollRef.scrollHeight) {
      setPage(prev => prev + 1)
      getData()
      if (Math.ceil(total / 10) == page) {
        setHasMore(false)
        return false
      }
    }
  }

  const onChange =( r:any )=> {
    setSearchKey(r.target.value)
    setFlag(true)
    // setSearchKey(res.target.value)
    setData([])
    setPage(1)
  }

  const { modal, open, close } = useModal((_open, close, visible) => (
    <RankingModal
      visible = {visible}
      onCancel = {close}
      footer = { null }
      title={'Create Ranking'}
    >
      <Content >
        <div onScrollCapture={onScrollCapture}
          style={{ height: 500, overflowY: 'scroll', width:'100%' }}
          ref={c => {
            scrollRef = c
          }}
        >
          <Filter>
            <ThemeInput
              placeholder={'Please input token ID'}
              // onChange ={(res:any) =>onChange(res)}
              onBlur = { e => onChange(e)}
              prefix={<SearchOutlined style={{ color: 'white', width: '15px' }} />}
              defaultValue={searchKey}
              style={{ width:'200px', marginRight: '20px' }}
            />
            {/*<OrderSelector onChange={ e => { setSelectedOrder(e) }} />*/}
          </Filter>
          <ThemeTable columns= {column} dataSource={data} pagination={false}  />

        </div>
      </Content>
    </RankingModal>
  ))

  return {
    walletRankModal: modal,
    openWalletRankModal: open,
    closeWalletRankModal: close
  }
}
