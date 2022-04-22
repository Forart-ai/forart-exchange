import React, { useCallback, useEffect } from 'react'
import Dialog from '../../../../../contexts/theme/components/Dialog/Dialog'
import { NFTAttributesData } from '../../../../../types/coNFT'
import { styled } from '@mui/material'
import { NFTPreview } from '../../../../../components/nft-mint/selectedList'
import Button from '@mui/material/Button'
import useNFTMint from '../../../../../hooks/useNFTMint'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import { useModal } from '../../../../../contexts/modal'
import MintMessageDialog from './mint-message'
import { ClipLoader } from 'react-spinners'
import { Keypair } from '@solana/web3.js'

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

const AttrReviewDialog:React.FC<{body?: NFTAttributesData, attr: NFTAttributesData[]}> = ({ body, attr }) => {
  const { account } = useSolanaWeb3()

  const { openModal, closeModal } = useModal()

  const mintKeypair = Keypair.generate()

  const { mintNFT, message, loading } = useNFTMint()

  const handleMint = useCallback(
    () => {
      mintNFT(body, attr, mintKeypair)
        .catch(err => {
          openModal(<MintMessageDialog message={err.toString()} />)
        })
    },[body, attr, account]
  )

  return (
    <Dialog title={'Sure to mint this NFT?'} closeable={true}>
      <Wrapper >
        <ImagePreview>
          <NFTPreview body={body} attrList={attr} />
        </ImagePreview>

        <CustomizeButton disabled={loading} onClick={handleMint} color={'secondary'} variant={'contained'}>
          {
            loading ? (
              <> Start minting... <ClipLoader  size={20} color={'#999999'}  /> </>
            ) : (
              <>Yes</>
            )
          }
        </CustomizeButton>

        <div className={'message'}> {message}</div>
      </Wrapper>
    </Dialog>
  )
}

export default AttrReviewDialog
