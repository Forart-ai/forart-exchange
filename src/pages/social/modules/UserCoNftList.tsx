import React from 'react'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { useMintResultQuery } from '../../../hooks/queries/useMintResultQuery'
import { Swiper } from 'swiper/react'
import { Pagination } from 'swiper'

const UserCoNftList:React.FC =() => {
  const { account } = useSolanaWeb3()
  const { data: mintedNft } = useMintResultQuery({ wallet: account?.toBase58(), nft:'' } )

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      />
    </>
  )
}

export default UserCoNftList
