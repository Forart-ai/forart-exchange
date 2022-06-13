import React, { useCallback, useEffect, useState } from 'react'
import {
  AttrContent, AttrType,
  BodyContent,
  KitContent, MintButton,
  RandomHatsContainer,
  SelectedBody,
  TopContainer
} from '../../../artistMint.style'
import { Box } from '@mui/material'
import { NFTPreview } from '../../../../../components/nft-mint/selectedList'
import Background from '../../../../../assets/images/coPools/create-background.png'
import RandomHats from '../../../../../assets/images/coPools/random-hat.png'
import { SelectableKitList } from '../../../../../components/nft-mint/mintKit'
import { useLocationQuery } from '../../../../../hooks/useLocationQuery'
import { ArtistKit, useArtistKitsQuery } from '../../../../../hooks/queries/useArtistKitsQuery'
import { NFTAttributesData } from '../../../../../types/coNFT'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import useNFTMint from '../../../../../hooks/co-nft/useNFTMint'

const HypeteenCreate:React.FC = () => {
  const { account } = useSolanaWeb3()

  const artistId = useLocationQuery('artistId')

  const { data: artistKit } = useArtistKitsQuery(artistId?.toString())

  const [body, setBody] = useState<ArtistKit>()

  useEffect(()=> {
    setBody(artistKit?.Body[0])
  }, [artistKit])

  const [attr, setAttr] = useState<ArtistKit[]>([])

  return (
    <>
      <TopContainer>
        <Box sx={{ display:'flex', justifyContent:'space-between', flexDirection:'column' }}>
          <BodyContent>
            <SelectedBody>
              {
                body && (
                  <>
                    <NFTPreview body={body} attrList={attr}  />
                  </>
                )
              }
            </SelectedBody>

          </BodyContent>

          <RandomHatsContainer >
            <img className={'background'} src={Background} />
            <Box sx={{ display:'flex', height:'100%', justifyContent:'space-between', alignItems:'center' , padding:'10px' }}>
              <img className={'hat'} src={RandomHats} />
              <span>Hat: HypeTeen Rarity  <br /> randomly by Hat rarity</span>
            </Box>
          </RandomHatsContainer>

        </Box>

        <KitContent >
          {
            artistKit && (
              <>
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
                          if (v) {
                            cloned[index] = v
                          }
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

      <MintButton  />
    </>
  )
}

export default HypeteenCreate
