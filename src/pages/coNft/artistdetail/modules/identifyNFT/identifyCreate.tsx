import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useWhiteListQuery } from '../../../../../hooks/programs/useWhiteList'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import CharacterCustomize from '../../../../personal/modules/characterCustomize'
import { NFTAttributesData } from '../../../../../types/coNFT'
import { Modal } from 'antd'
import Button from '@mui/material/Button'
import { useModal } from '../../../../../contexts/modal'
import AttrReviewDialog from '../../../components/modals/create/attr-review'
import { Box, styled } from '@mui/material'
import { MoonLoader, SyncLoader } from 'react-spinners'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import useStorageCheck from '../../../../../hooks/useStorageCheck'
import { Keypair } from '@solana/web3.js'
import { ArtistKit, useArtistKitsQuery } from '../../../../../hooks/queries/useArtistKitsQuery'
import { useLocationQuery } from '../../../../../hooks/useLocationQuery'
import Countdown, { CountdownRendererFn } from 'react-countdown'

const Operation = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .message {
    font-family: KronaOne-Regular;
    color: ${({ theme }) => theme.palette.secondary.light};
    font-size: 16px;
    margin-bottom: 20px;
  }
`

const StyledCountdown = styled('div')`
  color: ${({ theme }) => theme.palette.secondary.light};
  font-size: 22px;
  font-family: Aldrich-Regular;
  margin-top: 30px;
`

const renderer: CountdownRendererFn = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <StyledCountdown />
  } else {
    // Render a countdown
    return (
      <StyledCountdown>
        {hours}:{minutes}:{seconds}
      </StyledCountdown>
    )
  }
}

const IdentifyCreate: React.FC = () => {
  const artistId = useLocationQuery('artistId')
  const { data, isFetching, error } = useWhiteListQuery()
  const { data: artistKit } = useArtistKitsQuery(artistId)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const endTime = 1653472800000

  const countdown = useMemo(() => {
    if (Date.now() > endTime ) {
      console.log('later')
      return undefined
    }

    return endTime
  }, [data])

  useEffect(() => {
    if (Date.now() > endTime) {
      setButtonDisabled(true)
    }
  }, [countdown,data])

  const { openModal } = useModal()

  useStorageCheck()

  const { account } = useSolanaWeb3()

  const [body, setBody] = useState<ArtistKit>()
  const [attr, setAttr] = useState<ArtistKit[]>()

  const handleCreate = useCallback(
    () => openModal(<AttrReviewDialog body={body} attr={attr} />),
    [body, attr, account]
  )

  const randomGenerate = useCallback(() => {
    if (!artistKit) return

    const availableBodies = artistKit.Body
    setBody(availableBodies[Math.floor(Math.random() * availableBodies.length)])

    setAttr(
      Object.entries(artistKit)
        .filter(([key]) => key!=='Body')
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
    if (artistKit) {
      setBody(artistKit.Body[0])
    }
  }, [artistKit])

  if (!artistId) {
    return <></>
  }

  return (
    <Box sx={{ width: '100%' }}>
      <CharacterCustomize
        artistId={artistId}
        body={body}
        attr={attr}
        selected={(body, attributes) => {
          setBody(body)
          setAttr(attributes)
        }}
      />
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
            onClick={randomGenerate}
          >
            Generate randomly
          </CustomizeButton>
          {
            data !== '0' ? (
              <CustomizeButton
                disabled={!data || buttonDisabled}
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
        {
          countdown && <Countdown renderer={renderer} onComplete={() => setButtonDisabled(true)} date={countdown} />
        }
      </Operation>
    </Box>

  )

}

export default IdentifyCreate
