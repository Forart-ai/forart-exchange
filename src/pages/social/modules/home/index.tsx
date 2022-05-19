import { styled } from '@mui/system'
import { Box, TextareaAutosize } from '@mui/material'
import { useSolanaWeb3 } from '../../../../contexts/solana-web3'
import React, { useCallback, useEffect, useState } from 'react'
import { SOCIAL_API } from '../../../../apis/auth'
import DefaultPageWrapper from '../../../../components/default-page-wrapper'
import CustomizeButton from '../../../../contexts/theme/components/Button'
import Blogs from '../blogs/blogs'
import { useMintResultQuery } from '../../../../hooks/queries/useMintResultQuery'
import RainbowButton from '../../../../contexts/theme/components/RainbowButton'
import { ShowCoNftParams } from '../../../../types/social'
import { useLocationQuery } from '../../../../hooks/useLocationQuery'
import { usePostQuery } from '../../../../hooks/queries/usePostQuery'
import { useRefreshController } from '../../../../contexts/refresh-controller'
import Background from '../../../../assets/images/social/social-banner.png'
import UserCoNftList from '../UserCoNftList'

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
  height: 270px;
  border: 1px ${({ theme }) => theme.palette.primary.main} solid;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 20px;
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

const SocialHomepage: React.FC = () => {
  const { account } = useSolanaWeb3()

  const [postNft, setPostNft] = useState<boolean>(true)
  const [selectedNFt, setSelectedNFt] = useState<ShowCoNftParams | undefined>()
  const { data: mintedNft } = useMintResultQuery({ wallet: account?.toBase58(), nft:'' } )
  const [loading, setLoading] = useState(false)

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

  const handleNftPost = useCallback(() => {
    setLoading(true)
    if (selectedNFt) {
      SOCIAL_API.postNft(selectedNFt).then(() => {
        forceRefresh()
        setLoading(false)
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
            <CustomizeButton disabled={loading} variant={'contained'} onClick={handleNftPost}> Post </CustomizeButton>
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

export default SocialHomepage
