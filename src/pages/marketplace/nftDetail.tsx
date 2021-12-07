import React, { useCallback, useEffect, useMemo, useState } from 'react'
// @ts-ignore
import styled from 'styled-components'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { useNFTDetailQuery } from '../../hooks/queries/useNFTDetailQuery'
import {
  Wrapper,
  NFTDetailContainer,
  TopRow,
  Title,
  StyledTab,
  StyledTabPane,
  TopBaseInfo,
  TradingContainer,
  OtherArtworksContainer,
  Operating,
  OtherArtworksArea,
  CenterRow,
  FootRow,
  CodingFlag,
  HistoryTradeTable,
  PropertiesItem,
  PropertiesContainer,
  ImageContainer,
  InfoContainer,
  ItemsContainer,
  NFTBaseInfoContainer,
  StyledButton,
  CenterInfo,
  BottomInfo
} from './nftDetail.style'
import { Image, message, Popover, Tabs } from 'antd'
import { NFTDetail } from '../../types/NFTDetail'
import { shortenAddress } from '../../utils'
import copy from 'copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'
import Heart from '../../assets/images/marketplace/like.png'
import Show from '../../assets/images/marketplace/view.svg'
import more1 from '../../assets/images/marketplace/more1.jpg'
import more2 from '../../assets/images/marketplace/more2.jpg'
import more3 from '../../assets/images/marketplace/more3.jpg'
import more4 from '../../assets/images/marketplace/more4.jpg'
import Celo from '../../images/wallet/celo.svg'

import { useWeb3React } from '@web3-react/core'
import { useWalletSelectionModal } from '../../hooks/wallet-selection-modal'
import moment from 'moment'
import ThemeTable from '../../styles/ThemeTable'
import { getNftFavoriteCount } from '../../apis/nft'
import { useNFTLikeQuery } from '../../hooks/queries/useNFTLikeQuery'
import CodingFlagIcon from '../../assets/images/marketplace/coding-flag.png'
import { useSellingModal } from '../../hooks/useSellingModal'
import { useRefreshController } from '../../contexts/refresh-controller'
import { useAuthorizingModal } from '../../hooks/modals/useAuthorizingModal'
import { usePurchaseCheckoutModal } from '../../hooks/modals/usePurchaseCheckoutModal'
import { usePurchaseBlockedModal } from '../../hooks/modals/usePurchaseBlockedModal'
import usePurchaseByFixedPrice from '../../hooks/contract/service/usePurchaseByFixedPrice'
import { usePurchaseTransactionSentModal } from '../../hooks/modals/usePurchaseTransactionSentModal'
import { usePurchaseWaitingConfirmationModal } from '../../hooks/modals/usePurchaseWaitingConfirmationModal'
import { cancelExchange } from '../../apis/exchange/celo'



const { TabPane } = Tabs



const HistoryTrade: React.FC<{ nftDetail?: NFTDetail }> = ({ nftDetail }) => {

  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      width: 10
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 20
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      width: 20
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      width: 20
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    }
  ]

  const historyDataList = nftDetail?.
    logTransferSingleVos?.
    slice(0,4)?.
    map((item: any, index:number) => ({
      key: index,
      event: item?.tokenId,
      price: 20,
      from: shortenAddress(item?.addressFrom),
      to:shortenAddress(item?.addressTo),
      date:moment(item.updateTime).fromNow()
    }))

  return (
    <div>
      <Title>Trading Histories</Title>
      <HistoryTradeTable >
        <ThemeTable columns={ columns }
          dataSource={ historyDataList }
          scroll={{ x: 100 }}
          pagination={false}
        />
      </HistoryTradeTable>
    </div>
  )
}


const NFTBaseInfo: React.FC<{ nftDetail?: NFTDetail }> = ({ nftDetail }) => {
  const { active,account } =useWeb3React()

  const [reasonOfUnableToBuy, setReasonOfUnableToBuy] = useState<string>()

  const uri = useLocationQuery('uri')

  const { open } = useWalletSelectionModal()


  const handleCopy = (content: any) => {
    copy(content) && message.success('Copied successfully.', 1)
  }

  useEffect(() => {
    if (!(nftDetail?.onSale && nftDetail.price)) {
      setReasonOfUnableToBuy('Not on Sale')
      return
    }

    console.log(account, nftDetail?.addressOwner)

    if (nftDetail?.addressOwner === account) {
      setReasonOfUnableToBuy(' Cannot buy your own NFT')
      return
    }

    setReasonOfUnableToBuy(undefined)
  }, [account, nftDetail])


  const { data: nftViewAndFavorite } = useNFTLikeQuery(uri)


  const { purchaseBlockedModal, openPurchaseBlockedModal } = usePurchaseBlockedModal()
  const { authorizingModal, openAuthorizingModal, closeAuthorizingModal } = useAuthorizingModal()
  const { purchaseTransactionSentModal, openPurchaseTransactionSentModal } = usePurchaseTransactionSentModal()
  const { purchaseWaitingConfirmationModal, openPurchaseWaitingConfirmationModal, closePurchaseWaitingConfirmationModal } = usePurchaseWaitingConfirmationModal()


  const { purchaseByFixedPrice } = usePurchaseByFixedPrice()

  const checkoutFailed = () => {
    openPurchaseBlockedModal()
  }



  const checkoutPassed = () => {
    openAuthorizingModal()

    purchaseByFixedPrice({
      nftDetail,
      account: account!,
      onAuthorized: () => {
        closeAuthorizingModal()
        openPurchaseWaitingConfirmationModal()
      },
      onSuccess: () => {
        openPurchaseTransactionSentModal()
        // closePurchaseCheckoutModal()
        closePurchaseWaitingConfirmationModal()
      }
    })

  }


  const { purchaseCheckoutModal, openPurchaseCheckoutModal, closePurchaseCheckoutModal } = usePurchaseCheckoutModal(nftDetail, checkoutPassed, checkoutFailed)


  const handleBuyNow = () => {
    openPurchaseCheckoutModal()
  }

  const isAllowToSell = useMemo(() => {
    if (nftDetail) {
      return  account === nftDetail?.addressOwner
    }
    return false
  },[nftDetail, account])

  const isAllowToSoldOut = useMemo(()=> {
    return nftDetail?.onSale && isAllowToSell
  }, [nftDetail, account])


  const { forceRefresh } = useRefreshController()

  const handleSoldOut = async () => {
    await cancelExchange(nftDetail!.nftPubKey)
  }


  const { sellingModal, openSellingModal, closeSellingModal } = useSellingModal({
    nftDetail,
    onSellingConfirmed() {
      closeSellingModal()
      closeAuthorizingModal()
      forceRefresh()
    },
    onStart: openAuthorizingModal
  })


  return (
    <NFTBaseInfoContainer>
      <div className="top">
        <TopBaseInfo>
          <div className="nft-name"> { nftDetail?.name }</div>
          <div className="nft-view">
            <img src={Show} /> {nftViewAndFavorite?.view}
          </div>
        </TopBaseInfo>

        <CenterInfo>
          <div className="description"> { nftDetail?.description }</div>


          <div className="text">On sale for
            <div className="price"> {nftDetail?.price} Celo</div>
          </div>


          <div className="info-label">Creator </div>
          <div className="info-value"> { nftDetail?.nameArtist || shortenAddress(nftDetail?.addressCreate) }
            <CopyOutlined
              className="icon-copy"
              onClick={() => handleCopy(nftDetail?.addressCreate)}
            />
          </div>

        </CenterInfo>

        <BottomInfo>
          <div className="tabs-container" >
            <StyledTab defaultActiveKey= "details">
              <StyledTabPane  tab="Details" key="details">
                <div className="label"> Holder </div>
                <div className="value"> { shortenAddress(nftDetail?.addressOwner) }
                  <CopyOutlined
                    className="icon-copy"
                    onClick={() => handleCopy(nftDetail?.addressOwner)}
                  />
                </div>

                <div className="label"> Blockchain </div>
                <div className="value">
                  <img src={Celo} />Celo
                </div>
              </StyledTabPane>
              <StyledTabPane  tab="History" key="history" >
                <HistoryTrade nftDetail={nftDetail} />
              </StyledTabPane>
            </StyledTab>
          </div>
        </BottomInfo>
      </div>

      <div className="bottom">
        <TradingContainer>
          <div className="operation">
            {
              !account ? (
                <StyledButton onClick={ open }>Connect To A Wallet</StyledButton>
              ) :
                (
                  !reasonOfUnableToBuy && (
                    <StyledButton onClick={ handleBuyNow } >Buy Now!</StyledButton>
                  )
                )
            }
          </div>
          <div className="owner-operation">

            {
              isAllowToSell && (
                <StyledButton onClick={openSellingModal} > Sell </StyledButton>
              )
            }
            {
              isAllowToSoldOut && (
                <StyledButton onClick= { handleSoldOut}> Sold out</StyledButton>
              )
            }
          </div>
        </TradingContainer>

      </div>

      {/*<div className="nft-info-container-item">*/}
      {/*  <div className="nft-info-container-label">Owner: </div>*/}
      {/*  <div className="nft-info-container-value"> { shortenAddress(nftDetail?.addressOwner) } </div>*/}
      {/*  <CopyOutlined*/}
      {/*    className="icon-copy"*/}
      {/*    onClick={() => handleCopy(nftDetail?.addressOwner)}*/}
      {/*  />*/}
      {/*</div>*/}



      { purchaseCheckoutModal }
      { purchaseTransactionSentModal}
      { authorizingModal }
      { sellingModal }
    </NFTBaseInfoContainer>
  )

}

const NFTMetaData: React.FC<{ nftDetail?: NFTDetail }> = ({ nftDetail }) => {
  const type = useLocationQuery('type')

  return (
    <ItemsContainer>
      <div className="border">
        <div className="row">
          <div className="label">NFT Contract ID: </div>
          <div className="value">
            {
              type === 'own' ?
                <div className="item-value">---</div> :
                <div className="item-value">
                  {shortenAddress(nftDetail?.addressContract)}
                </div>
            }
          </div>
        </div>

        <div className="row">
          <div className="label">Token &nbsp; ID:</div>
          <div className="value"> { shortenAddress(nftDetail?.addressOwner)} </div>
        </div>
      </div>

      <div className="border">
        <div className="row">
          <div className="label">Creator&apos;s Address： </div>
          <div className="value"> {shortenAddress(nftDetail?.addressCreate)} </div>
        </div>
        <div className="row">
          <div className="label">Owner&apos;s Address：</div>
          <div className="value" >
            {shortenAddress(nftDetail?.addressOwner)}
          </div>
        </div>
      </div>
    </ItemsContainer>
  )
}

const Properties: React.FC = () => {

  return (
    <div>
      <Title>Properties</Title>

      <PropertiesContainer >
        <CodingFlag src={CodingFlagIcon} />

        <PropertiesItem>
          <div className="key">CHARACTER</div>
          <div className="value">Cats</div>
          <div className="percent">25% have this trait</div>
        </PropertiesItem>
        <PropertiesItem>
          <div className="key">CHARACTER</div>
          <div className="value">Cats</div>
          <div className="percent">25% have this trait</div>
        </PropertiesItem>
        <PropertiesItem>
          <div className="key">CHARACTER</div>
          <div className="value">Cats</div>
          <div className="percent">25% have this trait</div>
        </PropertiesItem>
        <PropertiesItem>
          <div className="key">CHARACTER</div>
          <div className="value">Cats</div>
          <div className="percent">25% have this trait</div>
        </PropertiesItem>
      </PropertiesContainer>
    </div>
  )
}


const MoreArtworks: React.FC = () => {
  return (
    <OtherArtworksArea>
      <Title>More Artworks</Title>
      <OtherArtworksContainer>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more1} style={{ objectFit:'cover' }} alt="" />
            </div>
            <div className="artwork-describe">Face #001</div>

            <div className="artwork-like">
              <div className="liked">
                <img
                  src={Heart}
                  alt=""
                  style={{
                    width: '2.4rem,',
                    height: '1.4rem',
                    display: 'flex',
                    alignSelf: 'center',
                    marginRight: '0.2rem'
                  }}
                />
                0
              </div>

              <div className="liked">5 CELO</div>
            </div>
          </div>

        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more2} style={{ objectFit:'cover' }} alt="" />
            </div>
            <div className="artwork-describe">Face #001</div>

            <div className="artwork-like">
              <div className="liked">
                <img
                  src={Heart}
                  alt=""
                  style={{
                    width: '2.4rem,',
                    height: '1.4rem',
                    display: 'flex',
                    alignSelf: 'center',
                    marginRight: '0.2rem'
                  }}
                />
                0
              </div>

              <div className="liked">5 CELO</div>
            </div>
          </div>

        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more3} style={{ objectFit:'cover' }} alt="" />
            </div>
            <div className="artwork-describe">Face #001</div>

            <div className="artwork-like">
              <div className="liked">
                <img
                  src={Heart}
                  alt=""
                  style={{
                    width: '2.4rem,',
                    height: '1.4rem',
                    display: 'flex',
                    alignSelf: 'center',
                    marginRight: '0.2rem'
                  }}
                />
                0
              </div>

              <div className="liked">5 CELO</div>
            </div>
          </div>

        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more4} style={{ objectFit:'cover' }} alt="" />
            </div>
            <div className="artwork-describe">Face #001</div>

            <div className="artwork-like">
              <div className="liked">
                <img
                  src={Heart}
                  alt=""
                  style={{
                    width: '2.4rem,',
                    height: '1.4rem',
                    display: 'flex',
                    alignSelf: 'center',
                    marginRight: '0.2rem'
                  }}
                />
                0
              </div>

              <div className="liked">5 CELO</div>
            </div>
          </div>

        </div>

      </OtherArtworksContainer>
    </OtherArtworksArea>
  )
}


const NFTDetailPage: React.FC = () => {
  const { active,account } =useWeb3React()


  // const { forceRefresh } = useRefreshController()

  const uri = useLocationQuery('uri') ?? ''

  const addressContract = useLocationQuery('addressContract')

  const { data: nftDetail } = useNFTDetailQuery({ uri, addressContract })

  const coverImageUrl = useCallback(() => {
    return nftDetail?.image?.startsWith('ipfs:/')
      ? `https://forart.mypinata.cloud${nftDetail?.image?.slice(6)}`
      : `https://forart.mypinata.cloud${nftDetail?.image?.slice(-52)}`
  }, [nftDetail])



  // const isAllowToSell = useMemo(() => {
  //   if (nftDetail) {
  //     return  account === nftDetail?.addressOwner
  //   }
  //   return false
  // },[nftDetail, account])
  //
  // const { authorizingModal, openAuthorizingModal, closeAuthorizingModal } = useAuthorizingModal()
  //
  //
  //
  //
  // const { sellingModal, openSellingModal, closeSellingModal } = useSellingModal({
  //   nftDetail,
  //   onSellingConfirmed: forceRefresh,
  //   onStart: openAuthorizingModal
  // })


  return (
    <Wrapper>
      <NFTDetailContainer>
        {/*<Operating>*/}
        {/*  {*/}
        {/*    isAllowToSell && (*/}
        {/*      <StyledButton onClick={openSellingModal} > Sell </StyledButton>*/}
        {/*    )*/}
        {/*  }*/}

        {/*</Operating>*/}
        <TopRow>
          <ImageContainer>
            <Image src={coverImageUrl()} />
          </ImageContainer>
          <InfoContainer >
            <NFTBaseInfo nftDetail={nftDetail} />


            {/*<NFTMetaData nftDetail={nftDetail} />*/}
          </InfoContainer>
        </TopRow>

        {/*<CenterRow >*/}
        {/*  <Properties />*/}
        {/*  <HistoryTrade nftDetail={nftDetail} />*/}
        {/*</CenterRow>*/}

        {/*<FootRow>*/}
        {/*  <MoreArtworks />*/}
        {/*</FootRow>*/}

      </NFTDetailContainer>

      {/*{ authorizingModal }*/}
      {/*{ sellingModal }*/}
    </Wrapper>
  )

}

export default NFTDetailPage
