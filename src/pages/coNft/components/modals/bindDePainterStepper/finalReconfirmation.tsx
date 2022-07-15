import React from 'react'
import Flex from '../../../../../contexts/theme/components/Box/Flex'
import BindEthAndSolanaWallet from './bindEthAndSolanaWallet'
import { useUserBoundedDepainter } from '../../../../../hooks/queries/account/useUserBoundedDepainter'
import { useNFTQuery } from '../../../../../hooks/queries/account/useOwnedNFTsQuery'
import Text from '../../../../../contexts/theme/components/Text/Text'
import { SyncLoader } from 'react-spinners'
import Image from '../../../../../contexts/theme/components/Image'
import CustomizeButton from '../../../../../contexts/theme/components/Button'

const FinalReconfirmation:React.FC = () => {

  const { data: userBoundDePainter } = useUserBoundedDepainter()

  const nft = useNFTQuery(userBoundDePainter?.mintKey)

  return (
    <Flex flexDirection={'column'}>
      <BindEthAndSolanaWallet onBound={() => true} />
      {
        nft ?
          <>
            <Text color={'#ffffff'}>Bound {nft.data?.data?.name}</Text>
            <Image src={nft.data?.data?.image} width={'164px'} height={'164px'} variant={'rectangular'} borderRadius={6} />
          </>
          :
          <SyncLoader color={'white'} size={10} />
      }

      <CustomizeButton size={'small'} variant={'contained'} sx={{ marginTop: 2 }}>Create</CustomizeButton>
    </Flex>
  )
}

export default FinalReconfirmation
