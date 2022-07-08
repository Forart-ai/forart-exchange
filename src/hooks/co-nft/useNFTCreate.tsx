import { useCallback } from 'react'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useWeb3React } from '@web3-react/core'
import { NFTAttributesData } from '../../types/coNFT'
import { ArtistKit } from '../queries/useArtistKitsQuery'
import CONFT_API from '../../apis/co-nft'
import { Keypair } from '@solana/web3.js'

const useNFTCreate = () => {
  const { account: solAccount } = useSolanaWeb3()
  const { account: ethAccount } = useWeb3React()

  const createNFT = useCallback(
    async (body: ArtistKit, kit: ArtistKit[]) => {

      if (!solAccount || !ethAccount) return

      const components = kit.filter(o => !!o).map(o => o.id).concat(body.id)

      const mintKeypair = Keypair.generate()

      console.log(components)

      await CONFT_API.core.nft.nftCreate({
        series: 1025,
        components,
        wallet: solAccount.toBase58(),
        walletAvx: ethAccount,
        mintKey: mintKeypair.publicKey.toBase58(),
        mintPrivateKey: Buffer.from(mintKeypair.secretKey).toString('base64'),
      })
        .then(() => {})
        .catch(err => {})
    },
    [solAccount, ethAccount],
  )

  return { createNFT }

}

export default useNFTCreate
