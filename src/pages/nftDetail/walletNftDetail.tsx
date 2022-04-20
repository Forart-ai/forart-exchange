import { Wrapper, NFTInfo, Options, LeftArea, RightArea, Canvas, RightTopArea, RightBottomArea,
  TopTitle, SeriesTitle, Rainbow } from './index.style'
import React from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { Alert, Snackbar, Tooltip } from '@mui/material'
import UploadIcon from '../../assets/images/coPools/download.svg'
import { shortenAddress } from '../../utils'
import { AttributesItem, AttributesItemForWalletNft } from '../../components/attributes-item'
import Button from '@mui/material/Button'
import { LevelLabel } from './coNftDetail'
import { useNFTQuery } from '../../hooks/queries/useOwnedNFTsQuery'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { PublicKey } from '@solana/web3.js'
import { useMediaQuery } from 'react-responsive'
import moment from 'moment'
import html2canvas from 'html2canvas'

const WalletNftDetail:React.FC = () => {

  const mint = useLocationQuery('mint')

  const nft = useNFTQuery(new PublicKey(mint!))

  const exportImage = () => {
    html2canvas(document.querySelector('#canvas')!, {
      allowTaint: true,
      useCORS: true,
    }).then(res => {
      const data = new Image()
      data.src = res.toDataURL('image/png')
      const alink = document.createElement('a')
      alink.href = data.src
      alink.download = 'test.png'
      alink.click()
    })
  }

  return (
    <Wrapper>
      <Canvas id={'canvas'}>
        <NFTInfo >
          <LeftArea >
            <img  src={nft.data?.data?.image} />
          </LeftArea>
          <RightArea>
            <RightTopArea>
              <TopTitle>
                <div style={{ display:'flex', alignItems: 'center' }}>
                  <div className="name" > { nft.data?.data?.name}</div>

                </div>
                <Options>

                  <Tooltip title={'Copy link'}>
                    <img src={UploadIcon} onClick={() => exportImage()} />
                  </Tooltip>
                </Options>

              </TopTitle>
              <SeriesTitle>
                <div>
                  { nft.data?.data?.collection.family}
                </div>
              </SeriesTitle>
              {/*<Rainbow>*/}
              {/*  <span>Update time: </span>*/}
              {/*  {*/}
              {/*    !isMobile ?  <div className="wallet">{nft.dataUpdatedAt && moment(nft.dataUpdatedAt).format('YYYY-MM-DD ')}</div> : <></>*/}
              {/*  }*/}
              {/*</Rainbow>*/}
            </RightTopArea>
            <RightBottomArea >
              <AttributesItemForWalletNft item={nft.data?.data?.attributes} />
            </RightBottomArea>
          </RightArea>

        </NFTInfo>

      </Canvas>

    </Wrapper>
  )
}

export default WalletNftDetail
