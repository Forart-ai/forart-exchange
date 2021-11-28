import React, { useCallback, useEffect, useMemo, useState } from 'react'
// @ts-ignore
import styled from 'styled-components'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { useNFTDetailQuery } from '../../hooks/queries/useNFTDetailQuery'
import { Wrapper, NFTDetailContainer, TopRow, Title, OtherArtworksContainer, OtherArtworksArea, CenterRow, FootRow, CodingFlag, HistoryTradeTable, PropertiesItem, PropertiesContainer,  ImageContainer, InfoContainer, ItemsContainer, NFTBaseInfoContainer, StyledButton } from './nftDetail.style'
import { Image, message, Popover } from 'antd'
import { NFTDetail } from '../../types/NFTDetail'
import { shortenAddress } from '../../utils'
import copy from 'copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'
import Heart from '../../assets/images/marketplace/like.png'
import Show from '../../assets/images/marketplace/show.png'
import more1 from '../../assets/images/marketplace/more1.jpg'
import more2 from '../../assets/images/marketplace/more2.jpg'
import more3 from '../../assets/images/marketplace/more3.jpg'
import more4 from '../../assets/images/marketplace/more4.jpg'

import { useWeb3React } from '@web3-react/core'
import { useWalletSelectionModal } from '../../hooks/wallet-selection-modal'
import moment from 'moment'
import ThemeTable from '../../styles/ThemeTable'
import { getNftFavoriteCount } from '../../apis/nft'
import { useNFTLikeQuery } from '../../hooks/queries/useNFTLikeQuery'
import CodingFlagIcon from '../../assets/images/marketplace/coding-flag.png'





const NFTBaseInfo: React.FC<{ nftDetail?: NFTDetail }> = ({ nftDetail }) => {

  const uri = useLocationQuery('uri')

  const handleCopy = (content: any) => {
    copy(content) && message.success('Copied successfully.', 1)
  }

  const { data: nftViewAndFavorite } = useNFTLikeQuery(uri)


  return (
    <NFTBaseInfoContainer>
      <div className="nft-name"> { nftDetail?.name }</div>
      <div className="nft-info-container">
        <div className="nft-info-container-item">
          <div className="nft-info-container-label">Artist: </div>
          <div className="nft-info-container-value"> { nftDetail?.nameArtist || shortenAddress(nftDetail?.addressCreate) } </div>
          <CopyOutlined
            className="icon-copy"
            onClick={() => handleCopy(nftDetail?.addressCreate)}
          />
        </div>

        <div className="nft-info-container-item">
          <div className="nft-info-container-label">Owner: </div>
          <div className="nft-info-container-value"> { shortenAddress(nftDetail?.addressOwner) } </div>
          <CopyOutlined
            className="icon-copy"
            onClick={() => handleCopy(nftDetail?.addressOwner)}
          />
        </div>

        <div className="nft-info-container-item" style={{ marginTop: '120px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', width:'100%' }}>
            <div className="info-favorite" >
              <img
                src={Heart}
                alt=""
                className="icon-favorite"
              />
              <div className="nft-info-container-value">
                {nftViewAndFavorite?.favorite ?? 0}
              </div>
            </div>

            <div className="info-favorite" >
              <img
                src={Show}
                alt=""
                className="icon-favorite"
              />
              <div className="nft-info-container-value">
                {nftViewAndFavorite?.view ?? 0}
              </div>
            </div>
          </div>
        </div>

      </div>
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

const HistoryTrade: React.FC<{ nftDetail?: NFTDetail }> = ({ nftDetail }) => {

  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      width: 20
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

              <div className="liked">5 KSE</div>
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

              <div className="liked">5 KSE</div>
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

              <div className="liked">5 KSE</div>
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

              <div className="liked">5 KSE</div>
            </div>
          </div>

        </div>

      </OtherArtworksContainer>
    </OtherArtworksArea>
  )
}


const NFTDetailPage: React.FC = () => {
  const { active,account } =useWeb3React()

  const { open } = useWalletSelectionModal()

  const [reasonOfUnableToBuy, setReasonOfUnableToBuy] = useState<string>()


  const uri = useLocationQuery('uri') ?? ''

  const addressContract = useLocationQuery('addressContract')

  const { data: nftDetail } = useNFTDetailQuery({ uri, addressContract })

  useEffect(() => {
    if (!(nftDetail?.onSale && nftDetail.price)) {
      setReasonOfUnableToBuy('Not on Sale')
      return
    }
  }, [account, nftDetail])


  // const allowToSell = useMemo(() => {
  //   if (nftDetail?.typeChain === 'Solana') {
  //     return nftDetail?.nftPubKey?.length > 0 && account?.toBase58() === nftDetail?.addressOwner
  //   }
  //
  //   return false
  // }, [nftDetail, account])
  //
  // const allowToSoldOut = useMemo(() => {
  //   return nftDetail?.onSale && allowToSell
  // },[nftDetail, allowToSell])


  return (
    <Wrapper>
      <NFTDetailContainer>
        <TopRow>
          <ImageContainer>
            <Image src={nftDetail?.image} width="250px" />
          </ImageContainer>
          <InfoContainer >
            <NFTBaseInfo nftDetail={nftDetail} />
            {
              account === undefined ? (
                <StyledButton onClick={open}>Connect To A Wallet</StyledButton>
              ) :
                (
                  !reasonOfUnableToBuy ? (
                    <StyledButton >Buy Now!</StyledButton>
                  ) :
                    (
                      <div style={{ width:'200px' }}>
                        <Popover content={reasonOfUnableToBuy} >
                          <StyledButton  disabled={true}>
                            Buy Now
                          </StyledButton>
                        </Popover>
                      </div>

                    )
                )
            }
            <NFTMetaData nftDetail={nftDetail} />
          </InfoContainer>
        </TopRow>

        <CenterRow >
          <Properties />
          <HistoryTrade nftDetail={nftDetail} />
        </CenterRow>

        <FootRow>
          <MoreArtworks />
        </FootRow>
      </NFTDetailContainer>
    </Wrapper>
  )

}

export default NFTDetailPage
