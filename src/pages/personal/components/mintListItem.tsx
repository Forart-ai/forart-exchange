import React, { useCallback, useEffect, useState } from 'react'
import { MintedNFTItem } from '../../../types/coNFT'
import styled from 'styled-components'
import { useModal } from '../../../contexts/modal'
import AttributesDialog from '../../../components/attributes-dialog'
import { Progress } from 'antd'
import { Link } from 'react-router-dom'

const Wrapper = styled.div<{$empty?: boolean}>`
  width: 240px;
  height: 240px;
  border-radius: 10px;
  font-weight: bold;
  position: relative;
  cursor: pointer;
  background: #2a2e35;
  
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

  const toDetailUrl = '/co-nft-detail?' + new URLSearchParams({
    id: data?.id ?? '',
  }).toString()

  return (
    <>
      <Wrapper $empty={empty} >
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
      </Wrapper>
    </>
  )
}

export default MintListItem

