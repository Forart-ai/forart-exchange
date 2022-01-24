import React, { useEffect, useState } from 'react'
import { useNFTsQuery } from '../../hooks/queries/useNFTsQuery'
// @ts-ignore
import styled from 'styled-components'

import { NftListItem } from '../../types/NFTDetail'
import NFTListItem from '../../components/NFTListItem'
import { Button, Pagination } from 'antd'
import { useHistory } from 'react-router-dom'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { ThemeInput } from '../../styles/ThemeInput'
import { ForartNftTransactionStatus } from '../../apis/nft'
import { StatusSelector } from '../../components/NFTListSelectors/index'
import { useMediaQuery } from 'react-responsive'


const Wrapper = styled.div`
  max-width: 100vw;
  width: 100%;
  height: calc(100vh - 68px);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #97BCF6;
  margin-bottom: 70px;
  overflow-y: scroll;

  @media screen and  (max-width: 1100px) {
    width: 100vw !important;
    background-color: #0B111E;
    padding: 0;
  }
`

const Banner = styled.div`
  width: 100%;
  height: 300px; 
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}  
  @media screen and (max-width: 1100px) {
    height: 100px;
  }
`

const Title = styled.div`
  font-size: 2.5em;
  font-weight: bolder;
  background-image: -webkit-linear-gradient(left, #FF4D9D, #c330c9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 10px;
  margin-bottom: 30px;
  
  @media screen and (max-width: 1100px) {
    font-size: 26px;
  }
`

const NFTListContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .empty {
    padding: 0;
    height: 0;
    width: 210px;
  }

  @media screen and (min-width: 300px) and (max-width: 1000px) {
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;

    .nft-container {
      display: flex;
      justify-content: center;
    }
  }
`


const NFTCreateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 25px 0;

  .filter {
    display: flex;
    width: fit-content;
    height: 35px;

  }
  
  @media screen and (max-width: 1100px) {
    width: 90%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
    .filter {
      justify-content: space-between;
      margin-top: 10px;
      width: 90vw;
    }
    
  }
`

const CustomPagination = styled(Pagination)`
  margin-bottom: 50px;

  .ant-pagination-prev .ant-pagination-item-link {
    border: none !important;
    background-color: #282c34 !important;
    color: #00EBA4;
  }

  .ant-pagination-item-active {
    border: none !important;
  }

  .ant-pagination-item-active a {
    background: #5b6174;
    color: #00EBA4 !important;
  }

  .ant-pagination-item {
    border: none;
  !important;
    background: #282c34 !important;
  }

  .ant-pagination-item a {
    //color: rgba(124,109,235,0.2) !important;
    color: #EADEDE;
  !important;

  }

  .ant-pagination-next .ant-pagination-item-link {
    border: none !important;
    background-color: #282c34 !important;
    color: #00EBA4;
  }


`

const NFTList: React.FC<{ list: Array<NftListItem> | undefined }> = ({ list }) => {
  return (
    <NFTListContainer>
      {
        list?.map((nft: NftListItem, index: number) => (
          <NFTListItem
            data={nft}
            key={index}
            type={'nftList'}
          />
        ))
      }
      {
        new Array(5).fill({}).map((_, index) => (
          <div className="empty" key={index} />
        ))
      }
    </NFTListContainer>
  )
}

const marketplace: React.FC = () => {
  const history = useHistory()

  const current = parseInt(useLocationQuery('page') ?? '1')

  const [searchKey, setSearchKey] = useState<any>()

  const [selectedStatus, setSelectedStatus] = useState<ForartNftTransactionStatus | undefined>()

  const [size, setSize] = useState(20)

  const { data: pagingData, isLoading } = useNFTsQuery({
    current,
    size,
    searchKey,
    transactionStatus: selectedStatus,
    typeChain: 'Ethereum'
  })


  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pagingData])

  const onPageChange = (page: number, pageSize?: number) => {
    history.push(`/marketplace?page=${page}`)
    pageSize && setSize(pageSize)
  }

  const onPressEnter = (res: any) => {
    setSearchKey(res.target.attributes[2].value)
  }

  return (
    <Wrapper>
      {/*<Banner>*/}
      {/*  <img src={banner} />*/}
      {/*</Banner>*/}
      <Title>NFT Marketplace</Title>

      <NFTCreateContainer>
        <div className="button">
          <Button onClick={() => history.push('/NFTCreate')}>NFT Create</Button>
        </div>
        <div className="filter">
          <ThemeInput
            onPressEnter={onPressEnter}
            prefix={<SearchOutlined style={{ color: 'white', width: '15px' }} />}
            style={ isMobile? { marginRight:'20px' }: { marginRight: '20px' }}
          />
          <StatusSelector onChange={setSelectedStatus} />
        </div>
      </NFTCreateContainer>

      {
        isLoading && <LoadingOutlined />
      }
      <NFTList list={pagingData?.records} />

      {
        !isLoading && (
          <CustomPagination
            current={current}
            total={pagingData?.total}
            onChange={onPageChange}
            pageSize={size}
            pageSizeOptions={['12', '20', '28', '40']}
          />
        )
      }
    </Wrapper>
  )
}

export default marketplace
