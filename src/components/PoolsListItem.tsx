import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { PoolsListData } from '../types/coNFT'
import { Link } from 'react-router-dom'
import { useModal } from '../contexts/modal'
import DonateDialog from './modals/donation/donate-dialog'
import { Button } from '@mui/material'

const PoolsCardContainer = styled.div< { loading?: string }>`
  width: 600px;
  height: 270px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #000;
  box-shadow: 16px 14px 20px #0000008c;
  position: relative;
  overflow: hidden;
  //box-shadow: inset 20px 20px 20px #0000008c;

  

  @media screen and (max-width: 1080px) {
  width: 100%;
}
 

`

const ImageContent = styled.div`
  width: 50%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 90%;
    height: 90%;
    object-fit: cover;
    border-radius: 20px;
  }
  
`

const InfoContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  z-index: 1;
  
  .name {
    font-size: 1.5em;
    color: #fff;
    font-weight: bold;
  }
  
  .description {
    font-size: 1em;
    color: #b2b2b2;
  }
  
  .button-column{
    width: 100%;
    display: flex;
    justify-content: space-between;

    a{
      color: white;
    }
  }
  @media screen and (max-width: 1080px) {
    padding: 3px 2px;
  }
  
`

const DataContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  
 

  .data-column {
    flex-direction: column;

    .label {
      font-size: 1.1em;
      color: #FF468B;
    }

    .value {
      font-size: 1.1em;
      color: #FF468B;
    }
    
  }
`

const PoolsListItem: React.FC<{data?: PoolsListData, status?: string}> = ({ data, status }) => {

  const [loading, setLoading] = useState<string>('false')

  useMemo(() => {
    if (data?.status === 'closing') {
      setLoading('true')
    }
  },[status])

  const toArtistDetailUrl = '/artistDetail?' + new URLSearchParams({
    artistId: data?.artistId ?? ''
  }).toString()

  const { openModal } = useModal()

  const openDonateModal = useCallback(() => {
    openModal(<DonateDialog />)
  },[])

  return (
    <PoolsCardContainer loading={loading}>
      <ImageContent>
        <img src={data?.image} />
      </ImageContent>
      <InfoContent>
        <div className="name"> {data?.name }</div>
        <div className="description"> {data?.describe}</div>

        <DataContent >
          <div className="data-column">
            <div className= "label">NFTs</div>
            <div className= "value">{data?.nfts}</div>
          </div>

          <div className="data-column">
            <div className= "label">Creators</div>
            <div className= "value">{data?.minters}</div>
          </div>
        </DataContent>

        <div className="button-column">
          {
            data?.status === 'closing' ?
              (
                <>

                  <Button sx={{ margin:'0 4px' }} variant={'contained'}  >
                    <Link to={toArtistDetailUrl}>
                      Create
                    </Link>
                  </Button >
                  <Button   variant={'contained'} onClick={openDonateModal} >Donate</Button>
                </>
              ) :
              (
                <>

                </>
              )

          }
        </div>
      </InfoContent>
    </PoolsCardContainer>
  )
}

export default PoolsListItem
