import React, { useCallback, useEffect, useState } from 'react'
import { MintedNFTItem } from '../../../types/coNFT'
import { useModal } from '../../../contexts/modal'
import AttributesDialog from '../../../components/attributes-dialog'
import { Link } from 'react-router-dom'
import { Box, styled } from '@mui/material'
import SolanaIcon from '../../../assets/images/wallets/solanaLogoMark.svg'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { shortenAddress } from '../../../utils'
import moment from 'moment'
import { Wrapper, NFTInfo, Owner, Messages, PriceContainer, Grid } from '../modules/css/modules.style'
import { ChainType, NftSeriesType } from '../../../apis/nft'
import { BounceLoader, ClockLoader, MoonLoader } from 'react-spinners'

const NftSeriesThumbnailMapper: { [key in NftSeriesType]?: string } = {
  '3312': 'HypeTeen',
  '1024': 'DePainter'
}

const MintListItem: React.FC<{data? : MintedNFTItem, empty?: boolean}> = ({ data, empty }) => {
  const [loading, setLoading] = useState(true)

  const getImageUrl = useCallback(() => {
    const url = data?.previewUrl
    return url
  }, [data])

  // const [progress, setProgress] = useState(0)

  const { account } = useSolanaWeb3()

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress(prev => {
  //       if (data?.chainStatus === 'MIXING' && prev >= 97) {
  //         return prev
  //       }
  //
  //       if (data?.chainStatus === 'UPDATING'  && prev >= 98) {
  //         return prev
  //       }
  //
  //       return prev + 1
  //
  //     })
  //   }, 150)
  //
  //   return () => {
  //     clearInterval(interval)
  //   }
  //
  // },[])

  useEffect(() => {
    if (!loading) {
      return
    }
    const img = new Image()
    img.src = getImageUrl() as string
    if (img.complete) {
      setLoading(false)
    }
  }, [loading])

  const toDetailUrl = '/co-nft-detail?' + new URLSearchParams({
    id: data?.id ?? '',
  }).toString()

  return (
    <Wrapper>
      <Link to={toDetailUrl}>
        <div className= "nft-container" >
          {
            (data?.previewUrl && data?.chainStatus === 'SUCCESS') &&
              <img src={getImageUrl()}
                onLoad={() => {
                  setLoading(false)
                }}
              />
          }
          {
            (data?.chainStatus !== 'SUCCESS' && data?.chainStatus !== 'FAILED') &&
              <>
                <div className="status">
                  <div>  {data?.chainStatus}  </div>
                  {/*<Progress percent={progress} />*/}
                  <ClockLoader size={40} color={'#ffffff'} />
                  {/*<div> <SyncOutlined  spin={true} /> </div>*/}
                </div>

              </>
          }
          {
            data?.chainStatus === 'FAILED' &&
              <>
                <div className="status">
                  <div>  {data?.chainStatus}  </div>
                  <div> DONT WORRY, IT WILL TRY TO UPDATE AGAIN </div>

                </div>
              </>
          }
        </div>
      </Link>
      <NFTInfo>
        <Owner>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'space-between', alignItems:'start', marginLeft:'10px' }}>
            <div className={'label'}>Name</div>
            <div className={'username'}>{data?.chainNftName}</div>
          </Box>
          <img className={'solana-icon'} src={SolanaIcon} />
        </Owner>

        <Messages >
          <Grid>
            <div className={'label'}>Owner</div>
            <div className={'account'}>{shortenAddress(account?.toBase58())}</div>
          </Grid>
          <Grid>
            <div className={'label'}>Time</div>
            <div className={'account'}>{data && moment(data?.updateTime).format('YYYY-MM-DD ') }</div>
          </Grid>
        </Messages>

      </NFTInfo>

      {/*<PriceContainer>*/}
      {/*  <div className={'text'}>Price</div>*/}
      {/*  <div className={'value'}>- SOL</div>*/}
      {/*</PriceContainer>*/}

    </Wrapper>
  )
}

export default MintListItem

