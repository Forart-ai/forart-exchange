import React, { useCallback, useEffect, useState } from 'react'
import Dialog from '../../../../../contexts/theme/components/Dialog/Dialog'
import { NFTAttributesData } from '../../../../../types/coNFT'
import { styled } from '@mui/material'
import { NFTPreview } from '../../../../../components/nft-mint/selectedList'
import Button from '@mui/material/Button'
import useNFTMint from '../../../../../hooks/co-nft/useNFTMint'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import { useModal } from '../../../../../contexts/modal'
import MintMessageDialog from './mint-message'
import { ClipLoader } from 'react-spinners'
import { Keypair } from '@solana/web3.js'
import { Minting } from '../../../../../hooks/useStorageCheck'

const Wrapper = styled('div')`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  
  .message {
    margin-top: 20px;
    font-size: 18px;
    color: white;
  }
`

const ImagePreview = styled('div')`
  width: 400px;
  height: 400px;
  position: relative;

`

const AttrReviewDialog: React.FC<{
  body?: NFTAttributesData, attr?: NFTAttributesData[], minting?: Minting
}> = ({ body, attr, minting }) => {
  const { openModal } = useModal()

  const { mintNFT, message, loading, remainTime } = useNFTMint()
  const [executed, setExecuted] = useState(false)

  const handleMint = useCallback(
    () => {
      if (!body || !attr?.length) return

      mintNFT(body, attr, minting)
        .catch(err => {
          openModal(<MintMessageDialog message={err.toString()} />)
        })
    },[mintNFT, body, attr, minting]
  )

  useEffect(() => {
    if (minting && !executed) {
      setExecuted(true)
      handleMint()
    }
  }, [handleMint, minting, executed])

  return (
    <Dialog title={'Sure to mint this NFT?'} closeable={true}>
      <Wrapper >
        <ImagePreview>
          <NFTPreview body={body} attrList={attr} />
        </ImagePreview>

        <CustomizeButton disabled={loading || (remainTime !== undefined && remainTime <= 0)} onClick={handleMint} color={'secondary'} variant={'contained'}>
          {
            loading ? (
              <> Start minting... <ClipLoader size={20} color={'#999999'} /> </>
            ) : (
              <>Yes</>
            )
          }
        </CustomizeButton>
        {
          remainTime !== undefined && <div className={'message'}>You have {remainTime} seconds to approve the transaction</div>
        }

        <div className={'message'}> {message}</div>
      </Wrapper>
    </Dialog>
  )
}

export default AttrReviewDialog
