import React, { useCallback, useEffect, useState } from 'react'
import { useWhiteList } from '../../../../../hooks/programs/useWhiteList'
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

const IdentifyCreate:React.FC = () => {
  const { checkWhiteList }  = useWhiteList()
  const { openModal } = useModal()

  const { account } = useSolanaWeb3()

  const [mintChance, setMintChance] = useState<number | undefined>(undefined)

  const [body, setBody] = useState<NFTAttributesData>()

  const [attr, setAttr] = useState<NFTAttributesData[]>([])

  const handleCreate = useCallback(
    () => {
      openModal(<AttrReviewDialog body={body} attr={attr} />)

    },[body, attr, account]
  )

  useEffect(() => {
    if (account) {
      checkWhiteList().then(res => {
        setMintChance(res)
      }).catch(err => {
        console.log(err.toString())
      }
      )
    }
    else return
  },[account, mintChance])

  useEffect(() => {
    console.log(mintChance)
  },[mintChance])

  return (
    <Box sx={{ width: '100%' }}>
      <CharacterCustomize artistId={'3312'}
        selected={(body, attributes) => {
          setBody(body)
          setAttr(attributes)
        }}
      />
      <Operation>
        <div className={'message'}> Mint chances: &nbsp;
          {
            !account ? (
              <>-</>
            ):  mintChance ? (
              <> {mintChance} </>
            ) :
              <SyncLoader color={'#8246F5'} size={8}  />
          }
        </div>

        <CustomizeButton size={'large'} variant={'contained'} color={'secondary'} onClick={ handleCreate}> Mint now!</CustomizeButton>

      </Operation>
    </Box>

  )

}

export default IdentifyCreate
