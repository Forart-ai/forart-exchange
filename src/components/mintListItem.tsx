import React, { useCallback, useEffect, useState } from 'react'
import { MintedNFTItem } from '../types/coNFT'
import styled from 'styled-components'
import { useModal } from '../contexts/modal'
import AttributesDialog from './attributes-dialog'


const Wrapper = styled.div<{$empty?: boolean}>`
  width: 210px;
  height: 210px;
  //height: ${props => props.$empty ? '0' : '280px'};
  background-color: #282c34;
  border-radius: 10px;
  margin-bottom: ${props => props.$empty ? '0' : '30px'};;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  
  .spin {
    position: absolute;
    top: 50%;
  }
  
  img {
    object-fit: contain;
    width: 100%;
    border-radius: 10px;
   
  }
  
  .status {
    height: 210px;
    font-size: 1.3em;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

`

const MintListItem: React.FC<{data? : MintedNFTItem, empty?: boolean}> = ({ data, empty }) => {
  const [loading, setLoading] = useState(true)
  const { openModal, configModal } = useModal()

  const getImageUrl = useCallback(() => {
    const url = data?.previewUrl
    return url
  }, [data])


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

  return (
    <>
      <Wrapper $empty={empty} >
        <div className= "nft-container" onClick={() => openModal(<AttributesDialog item={data} />)} >
          {
            data?.previewUrl &&
            <img src={getImageUrl()}
              onLoad={()=>{
                setLoading(false)
              }}
            />
          }
          {
            data?.chainStatus !== 'SUCCESS' && <div className="status"> {data?.chainStatus} </div>
          }
        </div>
      </Wrapper>
    </>
  )


}

export default MintListItem

