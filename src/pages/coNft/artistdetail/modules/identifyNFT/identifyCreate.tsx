import React, { useCallback, useEffect, useState } from 'react'
import { useWhiteListQuery } from '../../../../../hooks/programs/useWhiteList'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import CharacterCustomize from '../../../../personal/modules/characterCustomize'
import { useModal } from '../../../../../contexts/modal'
import AttrReviewDialog from '../../../components/modals/create/attr-review'
import { Box, styled } from '@mui/material'
import {  SyncLoader } from 'react-spinners'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import useStorageCheck from '../../../../../hooks/useStorageCheck'
import { ArtistKit, useArtistKitsQuery } from '../../../../../hooks/queries/useArtistKitsQuery'
import { useLocationQuery } from '../../../../../hooks/useLocationQuery'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'
import BindDePainterStepper  from '../../../components/modals/bindDePainterStepper'
import useNFTCreate from '../../../../../hooks/co-nft/useNFTCreate'

const Wrapper = styled('div')`
    width: 100%;
  margin: 0 auto;
`

const Operation = styled('div')`
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  .message {
    font-family: KronaOne-Regular;
    color: ${({ theme }) => theme.palette.secondary.light};
    font-size: 16px;
    margin-bottom: 20px;
  }
`

const IdentifyCreate: React.FC = () => {
  const { createNFT } = useNFTCreate()

  const artistId = useLocationQuery('artistId')
  const { data, isFetching, error } = useWhiteListQuery()
  const { data: artistKit } = useArtistKitsQuery(artistId)
  const { account } = useSolanaWeb3()
  const { account: ethAccount } = useWeb3React()

  const { openModal } = useModal()

  useStorageCheck()

  const [body, setBody] = useState<ArtistKit>()
  const [attr, setAttr] = useState<ArtistKit[]>()

  const handleCreate = useCallback(
    () => openModal(<AttrReviewDialog body={body} attr={attr} />),
    [body, attr, account]
  )

  const beforeCreateNft = useCallback(
    () => {
      if (!body || !attr) return
      createNFT(body, attr)
    }, [body,account,attr]
  )

  const randomGenerate = useCallback(() => {
    if (!artistKit) return

    const availableBodies = artistKit.Body || artistKit.Helmets
    setBody(availableBodies[Math.floor(Math.random() * availableBodies.length)])

    setAttr(
      Object.entries(artistKit)
        .filter(([key]) =>( key!=='Body') &&  key!=='Helmets')
        .reduce<ArtistKit[]>((res, next) => {
          const kits = next[1] as any[]

          return [
            ...res,
            kits[Math.floor(Math.random() * kits.length)]
          ]
        }, [])
    )
  }, [artistKit])

  useEffect(()=> {
    if ( !artistKit) {
      return
    }
    if (artistKit.Body) {
      setBody(artistKit.Body[0])
      return
    }

    if (artistKit.Helmets) {
      setBody(artistKit.Helmets[0])
      return
    }

  }, [artistKit])

  if (!artistId) {
    return <></>
  }

  return (
    <Wrapper>

      <Operation>
        <CustomizeButton
          size={'large'}
          variant={'contained'}
          color={'secondary'}
          onClick={randomGenerate}
        >
          Generate randomly
        </CustomizeButton>
      </Operation>

      <CharacterCustomize
        artistId={artistId}
        body={body}
        attr={attr}
        selected={(body, attributes) => {
          setBody(body)
          setAttr(attributes)
        }}
      />

      {
        artistId === '1024' &&
          <Operation>
            {
              account ? (
                <div className={'message'}>
                  Mint chances: &nbsp;
                  {
                    error
                      ? <>{(error as any).message}</>
                      : (
                        !isFetching ? data : <SyncLoader color={'#8246F5'} size={8} />
                      )
                  }
                </div>
              ) : (
                <div className={'message'}>wallet unconnected</div>
              )
            }

            <Box display={'grid'} gridTemplateColumns={'repeat(2, max-content)'} gap={'16px'}>
              <CustomizeButton
                size={'large'}
                variant={'contained'}
                color={'secondary'}
                // onClick={randomGenerate}
              >
                Generate randomly
              </CustomizeButton>
              {
                data !== '0' ? (
                  <CustomizeButton
                    disabled={!data}
                    size={'large'}
                    variant={'contained'}
                    color={'secondary'}
                    onClick={handleCreate}
                  >
                    Mint now!
                  </CustomizeButton>
                ) : (
                  <CustomizeButton disabled={true} size={'large'} variant={'contained'} color={'secondary'}>
                    Run out of tickets
                  </CustomizeButton>
                )
              }
            </Box>

          </Operation>
      }

      {
        artistId === '1025' &&
        <Operation>

          <Box display={'grid'} gridTemplateColumns={'repeat(2, max-content)'} gap={'16px'}>

            <CustomizeButton variant={'contained'} onClick={() => openModal(<BindDePainterStepper />)}> Start creating!</CustomizeButton>

            <CustomizeButton variant={'contained'} onClick={beforeCreateNft}>Test create</CustomizeButton>

          </Box>

        </Operation>
      }
    </Wrapper>

  )

}

export default IdentifyCreate
