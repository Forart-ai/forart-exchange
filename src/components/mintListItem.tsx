import React, { useCallback, useEffect, useState } from 'react'
import { MintedNFTItem } from '../types/coNFT'
import styled from 'styled-components'
import { useModal } from '../contexts/modal'
import AttributesDialog from './attributes-dialog'
import { Progress } from 'antd'

const Wrapper = styled.div<{$empty?: boolean}>`
  width: 240px;
  //height: ${props => props.$empty ? '0' : '210px'};
  border-radius: 10px;
  margin-bottom: ${props => props.$empty ? '0' : '30px'};;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  margin: 10px 9px;
  
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
    flex-direction: column;
  }

`

const MintListItem: React.FC<{data? : MintedNFTItem, empty?: boolean}> = ({ data, empty }) => {
  const [loading, setLoading] = useState(true)
  const { openModal } = useModal()

  const getImageUrl = useCallback(() => {
    const url = data?.previewUrl
    return url
  }, [data])

  const [progress, setProgress] = useState(0)

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

  const cb = useCallback(() => {
    if (data?.chainStatus === 'SUCCESS') {
      openModal(<AttributesDialog item={data} />)
    }
  }, [data])

  return (
    <>
      <Wrapper $empty={empty} >
        <div className= "nft-container" onClick={cb} >
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
      </Wrapper>
    </>
  )
}

export default MintListItem

