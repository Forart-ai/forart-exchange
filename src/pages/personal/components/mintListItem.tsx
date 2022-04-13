import React, { useCallback, useEffect, useState } from 'react'
import { MintedNFTItem } from '../../../types/coNFT'
import { useModal } from '../../../contexts/modal'
import AttributesDialog from '../../../components/attributes-dialog'
import { Progress } from 'antd'
import { Link } from 'react-router-dom'
import { Box, styled } from '@mui/material'
import SolanaIcon from '../../../assets/images/wallets/solanaLogoMark.svg'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { shortenAddress } from '../../../utils'
import moment from 'moment'

const Wrapper = styled('div')`
  width: 260px;
  height: 400px;
  //border-top-left-radius: 20px;
  //border-top-right-radius: 20px;
  border-radius: 20px;
  position: relative;
  background-color: #28005A;
  font-family: Arial;
  display: flex;
  flex-direction: column;
  
  .nft-container {
    height: 220px;
    width: 220px;
    cursor: pointer;
    padding: 20px 10px 0 10px;
    margin: 0 auto;


    .spin {
      position: absolute;
      top: 50%;
    }

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
 
  
  .status {
    height: 210px;
    font-size: 1.3em;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

`

const NFTInfo = styled('div')`
  padding: 20px 20px 10px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Owner = styled('div')`
  border-left: 2px ${({ theme }) => theme.palette.primary.main} solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .label {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.primary.main} ;
  }
  
  .username {
    font-family: arialBold;
    font-size: 18px;
    color: #ffffff ;
  }
  
  .solana-icon {
    width: 20px;
  }
`

const Messages = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;

`

const Grid = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;


  .label {
    color: #ffffff;
    font-size: 14px;
  }
  
  .account {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.primary.main} ;
    display: flex;
  }
  
`

const PriceContainer = styled('div')`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .text {
    font-size: 18px;
   
    color: #ffffff ;
  }
  
  .value {
    font-size: 18px;
    font-family: Aldrich-Regular;
    color: ${({ theme }) => theme.palette.primary.main} ;
  }
`

const MintListItem: React.FC<{data? : MintedNFTItem, empty?: boolean}> = ({ data, empty }) => {
  const [loading, setLoading] = useState(true)

  const getImageUrl = useCallback(() => {
    const url = data?.previewUrl
    return url
  }, [data])

  const [progress, setProgress] = useState(0)

  const { account } = useSolanaWeb3()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (data?.chainStatus === 'MIXING' && prev >= 97) {
          return prev
        }

        if (data?.chainStatus === 'UPDATING'  && prev >= 98) {
          return prev
        }

        return prev + 1

      })
    }, 150)

    return () => {
      clearInterval(interval)
    }

  },[])

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
                  <Progress percent={progress} />
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

                  <div>
                    <Progress percent={10} size="small" status="exception" />
                  </div>
                </div>
              </>
          }
        </div>
      </Link>
      <NFTInfo>
        <Owner>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'space-between', alignItems:'start', marginLeft:'10px' }}>
            <div className={'label'}>Owned By</div>
            <div className={'username'}>Monica</div>
          </Box>
          <img className={'solana-icon'} src={SolanaIcon} />
        </Owner>

        <Messages >
          <Grid>
            <div className={'label'}>Owned By</div>
            <div className={'account'}>{shortenAddress(account?.toBase58())}</div>
          </Grid>
          <Grid>
            <div className={'label'}>Time</div>
            <div className={'account'}>{data && moment(data.updateTime).format('YYYY-MM-DD ') }</div>
          </Grid>
        </Messages>

      </NFTInfo>

      <PriceContainer>
        <div className={'text'}>Price</div>
        <div className={'value'}>- SOL</div>
      </PriceContainer>

    </Wrapper>
  )
}

export default MintListItem

