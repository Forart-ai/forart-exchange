import { useSolanaWeb3 } from '../contexts/solana-web3'
import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../contexts/modal'
import Dialog from '../contexts/theme/components/Dialog/Dialog'
import { Alert, AlertTitle, Snackbar, styled } from '@mui/material'
import CONFT_API from '../apis/co-nft'
import { useQuery, UseQueryResult } from 'react-query'
import CustomizeButton from '../contexts/theme/components/Button'
import MintMessageDialog from '../pages/coNft/components/modals/create/mint-message'
import useNFTMint from './useNFTMint'
import { sleep } from '../utils'
import useCandyMachine from './programs/useCandyMachine'
import { useConnectionConfig } from '../contexts/solana-connection-config'
import { NFTPreview } from '../components/nft-mint/selectedList'
import { NFTAttributesData } from '../types/coNFT'
import { Keypair } from '@solana/web3.js'
import { useRefreshController } from '../contexts/refresh-controller'

const Content = styled('div')`
  width: 500px;
  max-width: 98vw;
  
  span {
    color: #999999;
    font-size: 20px;
  
  }
`
const Row = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  img {
    width: 200px;
    border-radius: 20px;
    margin-bottom: 20px;
  }
  
  .operation {
    width: 80%;
    display: flex;
    justify-content: space-around;
  }
`

const PreviewArea = styled('div')`
  width: 100%;
  height: 300px;
  position: relative;
`

const MintItem: React.FC<{mintList: any[]}> = ({ mintList }) => {
  const { account } = useSolanaWeb3()

  const { mint } = useCandyMachine()
  const { connection } = useConnectionConfig()

  const [body, setBody] = useState<NFTAttributesData>()
  const [attr, setAttr] = useState<NFTAttributesData[]>()

  const [message, setMessage] = useState<string>('')

  const [open, setOpen] = React.useState(false)

  const { closeModal } = useModal()

  const [notExisted, setNotExisted] = useState<boolean>(false)

  useEffect(() => {
    CONFT_API.core.nft.findComponentsById(mintList[0].components)
      .then((res: any) => {
        console.log([...res])
        const index = res.map((o: { bodyType: any }) => o.bodyType).indexOf('Body')
        const body = (res as any[]).splice(index, 1)
        const attr = res

        setBody(body[0])
        setAttr(attr)
      })

  }, [mintList?.[0]?.components])

  const check = useCallback(
    async (item: any) => {
      const keypair = Keypair.fromSecretKey(new Buffer(item.mintPrivateKey, 'base64'))
      const account = await connection.getParsedAccountInfo(keypair.publicKey)

      if (!account.value) {
        setMessage('Sorry, you haven\'t paid yet.')
        setNotExisted(true)
        return
      }

      CONFT_API.core.nft.nftMint({
        nft: item.id,
        wallet: item.mintWallet,
        mintKey: item.mintKey
      }).then(() => {
        setMessage('Start minting, you can see your nft in your wallet')
      }).catch(err => {
        setMessage( err.message || err.toString())
      })
    },
    [],
  )

  const giveUp = useCallback(
    async (item: any) => {

      CONFT_API.core.nft.nftRemove(item.id, item.mintWallet, item.mintKey).then(res => {
        setMessage('Give up this order successfully, you may close this dialog now.')
        closeModal()
      })
    },
    [],
  )

  const handleMint = useCallback(
    (item: any) => {
      const keypair = Keypair.fromSecretKey(new Buffer(item.mintPrivateKey, 'base64'))

      mint(keypair)
        .then(async _signature => {
          return connection.confirmTransaction(_signature)
        })
        .then(() => {
          CONFT_API.core.nft.nftMint({ nft: item.id, wallet: item.mintWallet, mintKey: item.mintKey })
            .then(res => {console.log(res)})
            .then(() =>sleep(1500))
        })
        .catch(console.error)

    },[account])

  return (
    <Dialog title={'An unprocessed mint was detected'} closeable >
      <Content >
        <span>Please give priority to this order</span>
        <div>
          {
            mintList?.map((item, index) => (
              <Row key={index}>
                <PreviewArea>
                  <NFTPreview body={body} attrList={attr} />
                </PreviewArea>
                <div className={'operation'}>
                  <CustomizeButton onClick={() => giveUp(item)} color={'secondary'} variant={'contained'}>Give up</CustomizeButton>
                  <CustomizeButton onClick={() =>handleMint(item)} variant={'contained'}>Pay</CustomizeButton>
                  <CustomizeButton onClick={() =>check(item)} variant={'contained'} disabled={notExisted}>I have purchased</CustomizeButton>
                </div>

                <span> {message}</span>
              </Row>
            ))
          }
        </div>

        {/*<Snackbar open={open} autoHideDuration={9000} >*/}
        {/*  <Alert severity="error">*/}
        {/*    <AlertTitle>Error</AlertTitle>*/}
        {/*    Sorry, you haven&apos;t paid yet*/}
        {/*  </Alert>*/}
        {/*</Snackbar>*/}
      </Content>
    </Dialog>
  )
}

const useMinting = (wallet?: string): UseQueryResult<any> => {
  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['USER_MINTING', wallet, quietRefreshFlag],
    async () => {
      return await CONFT_API.core.user.getUserMinting(wallet).then(res => res)
    }
  )
}

const useStorageCheck = () => {
  const { account } = useSolanaWeb3()

  const { openModal, closeModal } = useModal()

  const { data } = useMinting(account?.toBase58())

  const [mintList, setMintList] = useState<any>()

  useEffect(() => {
    if (data?.length) {
      openModal(<MintItem mintList={data} />)
    } else {
      closeModal()
    }
  }, [account, data])

  return
}

export default useStorageCheck
