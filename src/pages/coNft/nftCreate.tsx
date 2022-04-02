import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import useUserQuery from '../../hooks/queries/useUserQuery'
import { useCheckWhiteListModal } from '../../hooks/modals/useCheckWhiteListModal'
import useDiscordAccessToken from '../../hooks/useDiscordAccessToken'
import useNFTMint from '../../hooks/useNFTMint'
import {
  BodyContent,
  KitContent,
  MintButton,
  MintWrapper,
  SelectedBody,
  TopContainer,
  AttrType,
  AttrContent
} from './artistMint.style'
import { NFTPreview } from '../../components/nft-mint/selectedList'
import {  createFromIconfontCN } from '@ant-design/icons'
import { SelectableKitList } from '../../components/nft-mint/mintKit'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { useArtistKitQuery } from '../../hooks/queries/useArtistKitQuery'
import { NFTAttributesData } from '../../types/coNFT'
import RandomHats from '../../assets/images/coPools/random-hat.png'
import { Button } from '@mui/material'
import { Modal } from 'antd'

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_3200605_6t4q1tggh3l.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
  ],
})

const NftCreate: React.FC = () => {

  const { account } = useSolanaWeb3()

  const { openModal } = useModal()

  const artistId = useLocationQuery('artistId')

  const { data: artistKit } = useArtistKitQuery(artistId?.toString())

  const openWallet = useCallback(() => {
    openModal(<WalletSelectionModal />)
  },[])

  const [body, setBody] = useState<NFTAttributesData>(artistKit?.Body[0])

  const { data: userData } = useUserQuery()

  useEffect(()=> {
    setBody(artistKit?.Body[0])
  }, [artistKit])

  const [attr, setAttr] = useState<NFTAttributesData[]>([])
  const [, setStyle] = useState('')
  const [show] = useState<boolean>(true)

  const { checkWhiteListModal, openCheckWhiteListModal } = useCheckWhiteListModal()
  const discordAccessToken = useDiscordAccessToken()
  const { mintNFT } = useNFTMint()

  useEffect(() => {
    console.log(body, attr)
  },[body, attr])

  useEffect(() => {
    if (discordAccessToken) {
      openCheckWhiteListModal()
    }
    else return
  },[discordAccessToken])

  useEffect(() => {
    if (!show) {
      setStyle('')
    }
  },[show])

  const handleCreate = useCallback(
    () => {
      Modal.confirm({
        closable: true,
        style:{  height:'90%', display:'flex', alignItems:'center' },
        width: 500,
        title: (
          <div style={{ color: '#fff' }}>
            Create
          </div>
        ),
        content: (
          <div style={{ color: '#fff' }} >
            <div>
              Are you sure want to create this NFT?
            </div>
          </div>
        ),
        onOk: () => mintNFT(body,attr)
      })

    },[body, attr, account]
  )

  return (
    <MintWrapper>
      <TopContainer>
        <BodyContent>
          <SelectedBody>
            {
              body && (
                <>
                  <NFTPreview body={body} attrList={attr} />
                </>
              )
            }
          </SelectedBody>

        </BodyContent>

        <KitContent >
          {
            artistKit && (
              <>
                <AttrContent>
                  <AttrType>Hat: Hypeteen Rarity randomly by Hat rarity</AttrType>
                  <img src={RandomHats} style={{ width: '230px' }} />
                </AttrContent>

                {
                  Object.keys(artistKit).filter(item => item === 'Body').map((type,index) => (
                    <AttrContent key={index}>
                      <AttrType> {type} </AttrType>
                      <SelectableKitList
                        onSelect={v => setBody(v)}
                        list={artistKit[type]}
                      />
                    </AttrContent>
                  ))
                }

                {
                  Object.keys(artistKit).filter(item => (item !== 'Body') && (item !== 'Hat') ).map((type,index) => (
                    <AttrContent key={index}>
                      <AttrType> {type} </AttrType>
                      <SelectableKitList
                        onSelect={v => setAttr(prev => {
                          const cloned = [...prev]
                          cloned[index] = v
                          return cloned
                        })}
                        list={artistKit[type]}
                      />
                    </AttrContent>
                  ))
                }
              </>
            )
          }

        </KitContent>
      </TopContainer>

      <MintButton >

        { account  && (
          <p >
            Accesses left: {userData?.getQualification | 0}
            <IconFont style={{ cursor:'pointer', marginLeft: '20px' }} type={'icon-Question'}  onClick={ openCheckWhiteListModal } />
          </p>
        )}

        {
          !account ? (
            <Button variant={'contained'} size={'large'}  onClick={ openWallet }>
              Connect Wallet
            </Button>
          ) : (
            (userData?.getQualification !== 0) ? (
              <Button variant={'contained'} size={'large'}  onClick={handleCreate}> Create </Button>

            ) : (
              <Button variant={'contained'} size={'large'} onClick={ openCheckWhiteListModal }>
                Get Qualification
              </Button>
            )
          )
        }
      </MintButton>

      {checkWhiteListModal}

    </MintWrapper>
  )
}

export default NftCreate
