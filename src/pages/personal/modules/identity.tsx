import React from 'react'
import DefaultPageWrapper from '../../../components/default-page-wrapper'
import { Box, styled } from '@mui/material'
import Avatar from '../../../assets/images/artistDetail/hyteen.jpg'
import CustomizedAccordions from '../../../contexts/theme/components/Accordition'
import IdentityPrice from '../components/identity-price'
import IdentityGrade from '../components/identity-grade'
import { useOwnedNFTsQuery } from '../../../hooks/queries/useOwnedNFTsQuery'
import { PublicKey } from '@solana/web3.js'
import {  NFTInfo, Owner, Messages, PriceContainer, Grid } from '../modules/css/modules.style'
import SolanaIcon from '../../../assets/images/wallets/solanaLogoMark.svg'
import { shortenAddress } from '../../../utils'
import moment from 'moment'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { Link } from 'react-router-dom'

const Wrapper = styled('div')`
  width: 100%;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-template-rows: repeat(auto-fill,  400px);
  grid-gap: 16px;
  padding: 30px 20px;
  margin: 20px 0;
  min-height: 70vh; 

  @media screen and (max-width: 1100px) {
    justify-content: center;
  }
  
`

const RainbowText = styled('div')`
  text-align: left;
  span {
    font-size: 54px;
    background-image: -webkit-linear-gradient( right, ${({ theme }) => theme.palette.secondary.light}, ${({ theme }) => theme.palette.secondary.main}, ${({ theme }) => theme.palette.primary.light});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: KronaOne-Regular;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    span {
      font-size: 36px;
    }
  }
`

const LeftContainer = styled('div')`
  height: 100%;
  width: 40%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`

const RightContainer = styled('div')`
  height: 100%;
  width: 55%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`

const ImageContainer = styled('div')`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  
  img {
    width: 90%;
    height: 90%;
    border-radius: 10px;
  }
  .info {
    padding: 5px 10px;
    color: #ffffff;
  }
`

const HistoryContainer = styled('div')`
  width: 100%;
  max-height: 600px;
`

const NFTItemsContainer = styled('div')`
  width: 260px;
  min-height: 350px;
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
    margin: 0 auto;

    .spin {
      position: absolute;
      top: 50%;
    }

    img {
      margin-top: 15px;
      object-fit: contain;
      width: 95%;
      height: 95%;
      border-radius: 20px;
    }
  }
`

const Info = styled('div')`
  width: 100%;
  margin-top: 10px;

  .label {
    font-family: Aldrich-Regular;
    color: #ffffff;
    font-size: 20px;
  }
`

const NFTItem:React.FC<{item?: any }> = ({ item }) => {

  const { account } = useSolanaWeb3()

  const toDetailUrl = '/nft-detail?mint=' +item?.mint

  return (
    <Link to={toDetailUrl}>
      <NFTItemsContainer>
        {
          (item.data && account) ? (
            <>
              <ImageContainer>
                <img src={item.data.image} />
              </ImageContainer>
              <NFTInfo>
                <Owner>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'space-between', alignItems:'start', marginLeft:'10px' }}>
                    <div className={'label'}>{item.data.collection.family}</div>
                    <div className={'username'}>{item.data.name}</div>
                  </Box>
                  <img className={'solana-icon'} src={SolanaIcon} />
                </Owner>

                <Messages >
                  <Grid>
                    <div className={'label'}>Owned By</div>
                    <div className={'account'}>{shortenAddress(account?.toBase58())}</div>
                  </Grid>
                  {/*<Grid>*/}
                  {/*  <div className={'label'}>Time</div>*/}
                  {/*  <div className={'account'} />*/}
                  {/*</Grid>*/}
                </Messages>

              </NFTInfo>

              {/*<PriceContainer>*/}
              {/*  <div className={'text'}>Price</div>*/}
              {/*  <div className={'value'}>- SOL</div>*/}
              {/*</PriceContainer>*/}
            </>
          ) :
            (
              <></>
            )
        }
      </NFTItemsContainer>
    </Link>

  )
}

const Identity:React.FC = () => {

  const holds = useOwnedNFTsQuery(new PublicKey('7qk4GmEjX2E8rwx3U3FdNzzi5LuSv53fxGAYG9oJuqNZ'))
  const { data, isLoading } = holds

  console.log(data)
  return (
    <Wrapper >
      {
        data?.map((nft: any, index: number) => (
          <NFTItem item={nft} key={index} />
        ))
      }
    </Wrapper>
  )
}

export default Identity
