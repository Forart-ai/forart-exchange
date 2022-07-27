import { styled } from '@mui/system'
import {
  IconButton, MenuItem,
  Popover, SvgIcon, Switch,
  TextareaAutosize,
} from '@mui/material'
import { useSolanaWeb3 } from '../../../../contexts/solana-web3'
import React, { useCallback, useEffect, useState } from 'react'
import { SOCIAL_API } from '../../../../apis/auth'
import CustomizeButton from '../../../../contexts/theme/components/Button'
import Blogs from '../blogs/blogs'
import { useMintResultQuery } from '../../../../hooks/queries/useMintResultQuery'
import {  ShowCoNftParams } from '../../../../types/social'
import { usePostQuery } from '../../../../hooks/queries/usePostQuery'
import { useRefreshController } from '../../../../contexts/refresh-controller'
import Background from '../../../../assets/images/social/social-banner.png'
import UserCoNftList from '../UserCoNftList'
import Flex from '../../../../contexts/theme/components/Box/Flex'
import Picker from 'emoji-picker-react'
import { Clown_Emoji, PaperPlain_Filled } from '../../../../contexts/svgIcons'
import StyledSelector from '../../../../contexts/theme/components/Selector'
import { MetadataResult } from '../../../../utils/metaplex/metadata'
import UserOwnedNftList from '../userOwnedNftList'
import Text from '../../../../contexts/theme/components/Text/Text'

export const SocialPageWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 60px 0;

  ${({ theme }) => theme.breakpoints.down('xl')} {
    justify-content: center 
  }
  
`

export const MainMessageArea = styled('div')`
  height: auto;
  width: 860px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 100%;
  }
`

const Header = styled('div')`
  width: 100%;
  height: 310px;
  margin-bottom: 30px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`

const CoNftContainer = styled('div')`
  width: 100%;
  max-height: 280px;
`

const PostArea = styled('div')`
  border: 1px ${({ theme }) => theme.palette.primary.main} solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 20px;
  margin-bottom: 30px;
`

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  border: none;
  border-radius: 6px;
  color: white;
  padding: 5px;
  
  &:focus {
    outline: 1px ${({ theme }) => theme.palette.secondary.main} solid;
  }
`

const SocialHomepage: React.FC = () => {
  const [postMessage, setPostMessage] = useState<string>('')
  const [nftType, setNftType] = useState<string | undefined>('co-nft')
  const { account } = useSolanaWeb3()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const [selectedNFt, setSelectedNFt] = useState<ShowCoNftParams |  undefined>()
  const [selectedOwnedNFt, setSelectedOwnedNFt] = useState<MetadataResult |  undefined>()

  const { data: mintedNft } = useMintResultQuery({ wallet: account?.toBase58(), nft:'' } )
  const [loading, setLoading] = useState(false)

  const [size, ] = useState(20)
  const [, setCurrent] = useState(1)
  const { forceRefresh } = useRefreshController()

  const handleNftPost = useCallback(() => {
    setLoading(true)
    if (selectedNFt) {
      SOCIAL_API.postNft(selectedNFt).then(() => {
        forceRefresh()
        setLoading(false)
        return
      })
    }
    setLoading(false)

  }, [selectedNFt])

  const { data: pagingData, fetchNextPage, hasNextPage } = usePostQuery({
    size,
    orders: [{ field:'', order:'' }],
    wallet: '',
    createDay: undefined
  })

  const handleNextPage = useCallback(() => {
    if (!hasNextPage) return

    setCurrent(prev => {
      fetchNextPage({ pageParam: prev + 1 })
      return prev + 1
    })
  }, [fetchNextPage, hasNextPage])

  useEffect(() => {
    console.log(postMessage)

  }, [postMessage])

  const onEmojiClick = useCallback(
    (event, emojiObject) => {
      setPostMessage((prev: any) => prev.concat(emojiObject?.emoji))
    }, [])

  return (
    <>
      <Header>
        <img src={Background} />
      </Header>
      <PostArea>
        <Flex width={'100%'} alignItems={'center'}>
          <StyledTextarea minRows={3}  value={postMessage}  onChange={e => {setPostMessage(e.target.value)}} placeholder={'Something to say?'}  />
          <IconButton  aria-describedby={id} size="small" onClick={event => setAnchorEl(event.currentTarget)} >
            <Clown_Emoji />
          </IconButton>

          <Popover
            id={id}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >

            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              native
            />

          </Popover>
        </Flex>

        <StyledSelector
          value={nftType}
          onChange={(v: any) => {setNftType(v.target.value)}}
          sx={{ margin: '10px 0',  }}
        >
          <MenuItem value={'co-nft'}>CO-NFT</MenuItem>
          <MenuItem value={'owned-nft'}>Wallet NFT</MenuItem>
          <MenuItem value={'aiart'}>AiArt</MenuItem>
        </StyledSelector>

        <CoNftContainer>
          {
            nftType === 'co-nft' &&  <UserCoNftList list={mintedNft} selectedValue={selectedNFt} onSelect={v => setSelectedNFt(v)} />
          }
          {
            nftType === 'owned-nft' &&  <UserOwnedNftList selectedValue={selectedOwnedNFt} onSelect={v => setSelectedOwnedNFt(v)} />

          }
        </CoNftContainer>

        <Flex justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
          <Flex alignItems={'center'}>
            <Text fontSize={16} fontFamily={'Kanit-Regular'}>View on Magic Eden</Text>
            <Switch defaultChecked color="primary" />
          </Flex>

          <CustomizeButton
            disabled={loading}
            variant={'contained'}
            onClick={handleNftPost}
            endIcon={<SvgIcon > <PaperPlain_Filled /> </SvgIcon>}
          >
            Post
          </CustomizeButton>
        </Flex>

      </PostArea>

      {
        pagingData?.pages.flat(1).map((item, index) => (
          item.nft && <Blogs key={index} item={item} />
        ))
      }
      <Flex flexDirection={'column'} alignItems={'center'}>
        <CustomizeButton
          onClick={handleNextPage}
          color={'secondary'}
          sx={{ mt: 2 }}
        >
          Load more
        </CustomizeButton>
      </Flex>

    </>

  )
}

export default SocialHomepage
