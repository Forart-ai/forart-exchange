import React, { useEffect, useState } from 'react'
import { Box, Button, styled } from '@mui/material'
import {
  AttrContent,
  AttrType,
  BodyContent,
  KitContent,
  RandomHatsContainer,
  SelectedBody
} from '../../coNft/artistMint.style'
import { NFTPreview } from '../../../components/nft-mint/selectedList'
import Background from '../../../assets/images/coPools/create-background.png'
import RandomHats from '../../../assets/images/coPools/random-hat.png'
import { SelectableKitList } from '../../../components/nft-mint/mintKit'
import { NFTAttributesData } from '../../../types/coNFT'
import { useArtistKitQuery } from '../../../hooks/queries/useArtistKitQuery'

const Wrapper = styled('div')`
  width: 100%;
  height: fit-content;
  margin: 60px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  


`

export const TopContainer = styled('div') `
  width: 100%;
  height: 900px;
  display: flex;
  padding: 0 100px;
  justify-content: center;
  
  @media screen and (max-width: 1080px) {
    flex-direction: column;
    height: auto;
    padding: 0;
  }
`

const CharacterCustomize:React.FC = () => {
  const { data: artistKit } = useArtistKitQuery('3312')
  const [body, setBody] = useState<NFTAttributesData>(artistKit?.Body[0])
  const [attr, setAttr] = useState<NFTAttributesData[]>([])
  useEffect(()=> {
    setBody(artistKit?.Body[0])
  }, [artistKit])

  return (
    <Wrapper >
      <TopContainer>
        <Box sx={{ display:'flex', justifyContent:'flex-start', flexDirection:'column' }}>
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

          <Box sx={{ width: '100%', marginTop: '20px' }}>
            <Button variant={'contained'} sx={{ width: '200px' }}> Edit </Button>
          </Box>

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
    </Wrapper>
  )
}

export default CharacterCustomize
