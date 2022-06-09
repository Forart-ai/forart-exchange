import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useWhiteListQuery } from '../../../../../hooks/programs/useWhiteList'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import CharacterCustomize from '../../../../personal/modules/characterCustomize'
import { NFTAttributesData } from '../../../../../types/coNFT'
import Button from '@mui/material/Button'
import { useModal } from '../../../../../contexts/modal'
import AttrReviewDialog from '../../../components/modals/create/attr-review'
import { Box, styled, SvgIcon } from '@mui/material'
import { MoonLoader, SyncLoader } from 'react-spinners'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import useStorageCheck from '../../../../../hooks/useStorageCheck'
import { Keypair } from '@solana/web3.js'
import { ArtistKit, useArtistKitsQuery } from '../../../../../hooks/queries/useArtistKitsQuery'
import { useLocationQuery } from '../../../../../hooks/useLocationQuery'
import Countdown, { CountdownRendererFn } from 'react-countdown'
import MetamaskSvgIcon from '../../../../../images/wallet/metamask.svg'
import EthereumWalletSelectionModal from '../../../../../components/wallet/EthereumWalletSelectionModal'
import { useWeb3React } from '@web3-react/core'
import { shortenAddress } from '../../../../../utils'
import Flex from '../../../../../contexts/theme/components/Box/Flex'
import { useNavigate } from 'react-router-dom'
import BindDePainterStepper  from '../../../components/modals/bindDePainterStepper'
import NFTWithCheckbox from '../../../../../contexts/theme/components/NFT-With-Checkbox'
import Text from '../../../../../contexts/theme/components/Text/Text'
import Image from '../../../../../contexts/theme/components/Image'

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

const IdentifyCreate: React.FC = () => {
  const artistId = useLocationQuery('artistId')
  const { data, isFetching, error } = useWhiteListQuery()
  const { data: artistKit } = useArtistKitsQuery(artistId)
  const { account } = useSolanaWeb3()
  const { account: ethAccount } = useWeb3React()
  const navigate = useNavigate()

  const { openModal } = useModal()

  useStorageCheck()

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
    if ( !artistKit) {
      return
    }
    if (artistKit.Body) {
      setBody(artistKit.Body[0])
    }

  }, [artistKit])

  if (!artistId) {
    return <></>
  }

  const toDepainter = useCallback(
    () => {
      if (!account) return
      navigate(`/account/${account.toBase58()}?tab=dePainter`, )

    },
    [account, ethAccount],
  )

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
                onClick={randomGenerate}
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
            <CustomizeButton
              size={'large'}
              variant={'contained'}
              color={'secondary'}
              onClick={randomGenerate}
            >
              Generate randomly
            </CustomizeButton>

            <CustomizeButton variant={'contained'} onClick={() => openModal(<BindDePainterStepper />)}> Start creating!</CustomizeButton>

            {/*{*/}
            {/*  ethAccount ?*/}
            {/*    (*/}
            {/*      <Flex gap={1.6}>*/}
            {/*        <CustomizeButton variant={'contained'} color={'primary'} onClick={toDepainter}>Bind DePainter</CustomizeButton>*/}
            {/*        <CustomizeButton color={'warning'} onClick={disconnect}>disconnect {shortenAddress(ethAccount,4)} ?</CustomizeButton>*/}
            {/*      </Flex>*/}
            {/*    )*/}
            {/*    :*/}
            {/*    (*/}
            {/*      <CustomizeButton variant={'contained'} onClick={() => openModal(<EthereumWalletSelectionModal />)}>*/}
            {/*        Connect to Metamask<img width={24} height={24} style={{ marginLeft:'10px' }} src={MetamaskSvgIcon} />*/}
            {/*      </CustomizeButton>*/}
            {/*    )*/}
            {/*}*/}

          </Box>

        </Operation>
      }
    </Box>

  )

}

export default IdentifyCreate
