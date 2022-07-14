import React, { useCallback } from 'react'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useWeb3React } from '@web3-react/core'
import { NFTAttributesData } from '../../types/coNFT'
import { ArtistKit } from '../queries/useArtistKitsQuery'
import CONFT_API from '../../apis/co-nft'
import { Keypair } from '@solana/web3.js'
import Dialog, { DialogVariantProps } from '../../contexts/theme/components/Dialog/Dialog'
import { variant } from 'styled-system'
import { styled } from '@mui/system'
import { useModal } from '../../contexts/modal'
import { useRefreshController } from '../../contexts/refresh-controller'

const Wrapper = styled('div')`
  width: 400px;: 
  width: 90%;
  color: white;
  font-size: 18px;
  
  a{
    white-space: nowrap;
  }
`

const MessageDialog:React.FC<{variant?: DialogVariantProps , msg?: string}> = ({ variant, msg }) => {
  return (
    <Dialog title={'SPACETRONAUT'} variant={variant} closeable >
      <Wrapper>
        {
          msg ? <>{msg}</> :
            (
              <>
                Create successfully!<br />
                Stay tuned to us for the mint in <a href="https://marketplace.kalao.io/" target="view_window"> Kalao Launchpad </a>
              </>
            )
        }
      </Wrapper>
    </Dialog>
  )
}

const useNFTCreate = () => {
  const { account: solAccount } = useSolanaWeb3()
  const { account: ethAccount } = useWeb3React()
  const { openModal } = useModal()
  const { forceRefresh } = useRefreshController()

  const createNFT = useCallback(
    async (body: ArtistKit, kit: ArtistKit[]) => {

      if (!solAccount || !ethAccount) return

      const components = kit.filter(o => !!o).map(o => o.id).concat(body.id)

      const mintKeypair = Keypair.generate()

      await CONFT_API.core.nft.nftCreate({
        series: 1025,
        components,
        wallet: solAccount.toBase58(),
        walletAvx: ethAccount,
        mintKey: mintKeypair.publicKey.toBase58(),
        mintPrivateKey: Buffer.from(mintKeypair.secretKey).toString('base64'),
      })
        .then(res => {
          forceRefresh()
          openModal(<MessageDialog variant={'success'} />)
        })
        .catch(err => {
          openModal(<MessageDialog variant={'warning'} msg={err.toString()} />)
        })

    },
    [solAccount, ethAccount],
  )

  return { createNFT }

}

export default useNFTCreate
