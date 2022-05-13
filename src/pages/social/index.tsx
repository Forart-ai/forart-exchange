import React, { useCallback, useEffect, useState } from 'react'
import Post from './post'
import SocialIndex from './socialIndex'
import DefaultPageWrapper from '../../components/default-page-wrapper'
import Background from '../../assets/images/social/social-banner.png'
import { Avatar, Box, styled, TextareaAutosize, TextField } from '@mui/material'
import RainbowButton from '../../contexts/theme/components/RainbowButton'
import StyledTextField from '../../contexts/theme/components/TextField'
import Button from '@mui/material/Button'
import Blogs from './modules/blogs'
import { useMintResultQuery } from '../../hooks/queries/useMintResultQuery'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import UserCoNftList from './modules/UserCoNftList'
import CustomizeButton from '../../contexts/theme/components/Button'
import { ShowCoNftParams } from '../../types/social'
import { SOCIAL_API } from '../../apis/auth'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { usePostQuery } from '../../hooks/queries/usePostQuery'
import { useRefreshController } from '../../contexts/refresh-controller'

const SocialPageWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 60px 0;

`

const MainMessageArea = styled('div')`
  width: 70%;
  height: auto;

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 100%;
  }
`

const Header = styled('div')`
  width: 100%;
  height: 410px;
  margin-bottom: 30px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`

const CoNftContainer = styled('div')`
  width: 100%;
`

const PostArea = styled('div')`
  width: 100%;
  height: 270px;
  border: 1px ${({ theme }) => theme.palette.primary.main} solid;
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  border: none;
  border-radius: 10px;
  color: white;
  padding: 10px;
  
  &:focus {
    //border: ;
    outline: 1px ${({ theme }) => theme.palette.secondary.main} solid;
  }
`

const NftChatroom: React.FC = () => {
  const { account } = useSolanaWeb3()

  const [postNft, setPostNft] = useState<boolean>(false)
  const [selectedNFt, setSelectedNFt] = useState<ShowCoNftParams | undefined>()
  const mintedNft = [
    {
      'id': '1024-1a37e6f4cda7904128c2bb43984a5da6',
      'series': 3312,
      'components': [
        982,
        1212,
        5914,
        3323,
        3195,
        3909,
        5371
      ],
      'previewUrl': 'https://api.forart.ai/api/forart/minio/2b07a287a695bc82238a9134683c92d2.png',
      'wallet': '4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s',
      'chainStatus': 'SUCCESS',
      'chainError': null,
      'chainNftName': 'HypeTeen #543',
      'chainImageUri': null,
      'chainMetaUri': null,
      'chainManifestUri': null,
      'createTime': '2022-04-01T07:51:52.000+0000',
      'updateTime': '2022-04-20T09:18:25.000+0000',
      'discordId': '906101244014260265',
      'tag': 'RUN_TO_CREATE',
      'chainBlockMinted': null,
      'mintWallet': null,
      'mintDiscordId': null,
      'rarity': 'Common',
      'rarityScore': 380,
      'mintKey': null,
      'mintPrivateKey': null,
      'chainBlockMintCheckRetryCount': 0,
      'version': null,
      'rank': null,
      'star': 0,
      'mintRemainTime': -3549575
    },
    {
      'id': '1024-12570c5f2b32306ea988cbe89fbd29bd',
      'series': 3312,
      'components': [
        676,
        982,
        1139,
        2421,
        2978,
        4484,
        4582,
        7280,
        9260
      ],
      'previewUrl': 'https://api.forart.ai/api/forart/minio/3fba7f4d70722549dcf214b3a2638aaf.png',
      'wallet': '4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s',
      'chainStatus': 'SUCCESS',
      'chainError': null,
      'chainNftName': 'HypeTeen #7',
      'chainImageUri': null,
      'chainMetaUri': null,
      'chainManifestUri': null,
      'createTime': '2022-03-04T07:06:33.000+0000',
      'updateTime': '2022-04-20T09:18:27.000+0000',
      'discordId': '906101244014260265',
      'tag': 'RUN_TO_CREATE',
      'chainBlockMinted': null,
      'mintWallet': null,
      'mintDiscordId': null,
      'rarity': 'Common',
      'rarityScore': 380,
      'mintKey': null,
      'mintPrivateKey': null,
      'chainBlockMintCheckRetryCount': 0,
      'version': null,
      'rank': null,
      'star': 1,
      'mintRemainTime': -5971494
    },
    // {
    //   'id': '1024-27aefe786faf12b71aa118d7b827470b',
    //   'series': 3312,
    //   'components': [
    //     88,
    //     810,
    //     1865,
    //     2088,
    //     2250,
    //     3391,
    //     4582,
    //     6336,
    //     7950,
    //     8365,
    //     9342
    //   ],
    //   'previewUrl': 'https://api.forart.ai/api/forart/minio/44d183fa206f0ea97a0a100a8e714d96.png',
    //   'wallet': '4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s',
    //   'chainStatus': 'SUCCESS',
    //   'chainError': null,
    //   'chainNftName': 'HypeTeen #511',
    //   'chainImageUri': null,
    //   'chainMetaUri': null,
    //   'chainManifestUri': null,
    //   'createTime': '2022-03-31T07:36:08.000+0000',
    //   'updateTime': '2022-04-20T09:18:42.000+0000',
    //   'discordId': '906101244014260265',
    //   'tag': 'RUN_TO_CREATE',
    //   'chainBlockMinted': null,
    //   'mintWallet': null,
    //   'mintDiscordId': null,
    //   'rarity': 'Common',
    //   'rarityScore': 380,
    //   'mintKey': null,
    //   'mintPrivateKey': null,
    //   'chainBlockMintCheckRetryCount': 0,
    //   'version': null,
    //   'rank': null,
    //   'star': 1,
    //   'mintRemainTime': -3636919
    // },
    // {
    //   'id': '1024-1a37e6f4cda7904128c2bb43984a5da6',
    //   'series': 3312,
    //   'components': [
    //     982,
    //     1212,
    //     5914,
    //     3323,
    //     3195,
    //     3909,
    //     5371
    //   ],
    //   'previewUrl': 'https://api.forart.ai/api/forart/minio/2b07a287a695bc82238a9134683c92d2.png',
    //   'wallet': '4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s',
    //   'chainStatus': 'SUCCESS',
    //   'chainError': null,
    //   'chainNftName': 'HypeTeen #543',
    //   'chainImageUri': null,
    //   'chainMetaUri': null,
    //   'chainManifestUri': null,
    //   'createTime': '2022-04-01T07:51:52.000+0000',
    //   'updateTime': '2022-04-20T09:18:25.000+0000',
    //   'discordId': '906101244014260265',
    //   'tag': 'RUN_TO_CREATE',
    //   'chainBlockMinted': null,
    //   'mintWallet': null,
    //   'mintDiscordId': null,
    //   'rarity': 'Common',
    //   'rarityScore': 380,
    //   'mintKey': null,
    //   'mintPrivateKey': null,
    //   'chainBlockMintCheckRetryCount': 0,
    //   'version': null,
    //   'rank': null,
    //   'star': 0,
    //   'mintRemainTime': -3549575
    // },
    // {
    //   'id': '1024-12570c5f2b32306ea988cbe89fbd29bd',
    //   'series': 3312,
    //   'components': [
    //     676,
    //     982,
    //     1139,
    //     2421,
    //     2978,
    //     4484,
    //     4582,
    //     7280,
    //     9260
    //   ],
    //   'previewUrl': 'https://api.forart.ai/api/forart/minio/3fba7f4d70722549dcf214b3a2638aaf.png',
    //   'wallet': '4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s',
    //   'chainStatus': 'SUCCESS',
    //   'chainError': null,
    //   'chainNftName': 'HypeTeen #7',
    //   'chainImageUri': null,
    //   'chainMetaUri': null,
    //   'chainManifestUri': null,
    //   'createTime': '2022-03-04T07:06:33.000+0000',
    //   'updateTime': '2022-04-20T09:18:27.000+0000',
    //   'discordId': '906101244014260265',
    //   'tag': 'RUN_TO_CREATE',
    //   'chainBlockMinted': null,
    //   'mintWallet': null,
    //   'mintDiscordId': null,
    //   'rarity': 'Common',
    //   'rarityScore': 380,
    //   'mintKey': null,
    //   'mintPrivateKey': null,
    //   'chainBlockMintCheckRetryCount': 0,
    //   'version': null,
    //   'rank': null,
    //   'star': 1,
    //   'mintRemainTime': -5971494
    // },
    // {
    //   'id': '1024-27aefe786faf12b71aa118d7b827470b',
    //   'series': 3312,
    //   'components': [
    //     88,
    //     810,
    //     1865,
    //     2088,
    //     2250,
    //     3391,
    //     4582,
    //     6336,
    //     7950,
    //     8365,
    //     9342
    //   ],
    //   'previewUrl': 'https://api.forart.ai/api/forart/minio/44d183fa206f0ea97a0a100a8e714d96.png',
    //   'wallet': '4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s',
    //   'chainStatus': 'SUCCESS',
    //   'chainError': null,
    //   'chainNftName': 'HypeTeen #511',
    //   'chainImageUri': null,
    //   'chainMetaUri': null,
    //   'chainManifestUri': null,
    //   'createTime': '2022-03-31T07:36:08.000+0000',
    //   'updateTime': '2022-04-20T09:18:42.000+0000',
    //   'discordId': '906101244014260265',
    //   'tag': 'RUN_TO_CREATE',
    //   'chainBlockMinted': null,
    //   'mintWallet': null,
    //   'mintDiscordId': null,
    //   'rarity': 'Common',
    //   'rarityScore': 380,
    //   'mintKey': null,
    //   'mintPrivateKey': null,
    //   'chainBlockMintCheckRetryCount': 0,
    //   'version': null,
    //   'rank': null,
    //   'star': 1,
    //   'mintRemainTime': -3636919
    // },
  ]

  const [size, setSize] = useState(20)
  const current = parseInt(useLocationQuery('page') ?? '1')
  const { forceRefresh } = useRefreshController()

  const { data:pagingData, isLoading } = usePostQuery({
    size,
    current,
    orders: [{ field:'', order:'' }],
    wallet: '',
    createDay: undefined
  })

  useEffect(() => {
    console.log(pagingData)
  },[pagingData, isLoading])

  useEffect(() => {
    console.log(selectedNFt)
  }, [selectedNFt])

  const handleNftPost = useCallback(() => {
    if (selectedNFt) {
      SOCIAL_API.postNft(selectedNFt).then(() => {
        forceRefresh()
      })
    }
  },
  [selectedNFt],
  )

  return (
    <DefaultPageWrapper>
      <SocialPageWrapper>
        <MainMessageArea>
          <Header>
            <img src={Background} />
          </Header>
          <PostArea>
            <RainbowButton onClick={() => setPostNft(!postNft)}> {!postNft? 'Post CO-NFT' : 'Post blog'} </RainbowButton>
            {
              postNft  ?
                <CoNftContainer>
                  <UserCoNftList list={mintedNft} selectedValue={selectedNFt} onSelect={v => setSelectedNFt(v)} />
                </CoNftContainer>
                :
                <StyledTextarea minRows={5}  onChange={() => {}} placeholder={'Something to say?'}  />
            }
            <CustomizeButton variant={'contained'} onClick={handleNftPost}> Post </CustomizeButton>
          </PostArea>

          {
            pagingData?.map((item, index) => (
              item.nft && <Blogs key={index} item={item} />
            ))
          }
        </MainMessageArea>
      </SocialPageWrapper>
    </DefaultPageWrapper>
  )
}

export default NftChatroom
