import { useOwnedNFTsQuery } from '../../../hooks/queries/useOwnedNFTsQuery'
import React from 'react'

const UserOwnedNfts: React.FC = () => {
  const holds = useOwnedNFTsQuery()
  console.log(holds)
  return (
    <>
      sssssssssssssss
    </>
  )
}

export default UserOwnedNfts
