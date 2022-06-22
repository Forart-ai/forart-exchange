import React, { useEffect, useState } from 'react'
import { Box, Button, styled } from '@mui/material'
import {
  AttrContent,
  AttrType,
  BodyContent,
  KitContent,
  SelectedBody
} from '../../coNft/artistMint.style'
import { NFTPreview } from '../../../components/nft-mint/selectedList'
import { SelectableKitList } from '../../../components/nft-mint/mintKit'
import { NFTAttributesData } from '../../../types/coNFT'
import { ArtistKit, useArtistKitsQuery } from '../../../hooks/queries/useArtistKitsQuery'

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
  height: fit-content;
  display: flex;
  padding: 0 100px;

  justify-content: center;
  
  @media screen and (max-width: 1080px) {
    flex-direction: column;
    height: auto;
    padding: 0;
  }
`

const CharacterCustomize: React.FC<{ artistId: string, selected: (body?: ArtistKit, attr?: ArtistKit[]) => void, body?: ArtistKit, attr?: ArtistKit[] }> = ({ artistId, selected, body, attr }) => {
  const { data: artistKit } = useArtistKitsQuery(artistId)

  console.log(body,attr)

  return (
    <Wrapper >
      <TopContainer>
        <Box sx={{ display:'flex', justifyContent:'flex-start', flexDirection:'column' }} >
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
        </Box>

        <KitContent >
          {
            artistKit && (
              <>
                <AttrContent>
                  <AttrType>Body</AttrType>
                  <SelectableKitList
                    selectedValue={body}
                    onSelect={v => selected(v)}
                    list={artistKit.Body || artistKit.Helmets}
                  />
                </AttrContent>

                {
                  Object.keys(artistKit).filter(item => (item !== 'Body') && (item !== 'Hat') && (item !== 'Helmets')).map((type,index) => (
                    <AttrContent key={index}>
                      <AttrType> {type} </AttrType>
                      <SelectableKitList
                        selectedValue={attr?.[index]}
                        onSelect={v => {
                          const cloned = attr ? [...attr] : []
                          if (v) {
                            cloned[index] = v
                          } else {
                            cloned.splice(index, 1)
                          }
                          selected(body, cloned)
                        }}
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
