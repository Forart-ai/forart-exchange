import { TOKEN_PROGRAM_ID } from '../../utils/metaplex/constant'
import { useQuery, UseQueryResult } from 'react-query'
import { loadMetadata, MetadataResult } from '../../utils/metaplex/metadata'
import {   useSolanaWeb3 } from '../../contexts/solana-web3'
import { useRefreshController } from '../../contexts/refresh-controller'
import { useConnectionConfig } from '../../contexts/solana-connection-config'
import { ParsedAccountData, PublicKey, TokenAmount } from '@solana/web3.js'

const belongsToCollection = (data: MetadataResult, creator?: PublicKey) => {
  if (!creator) return true

  return data?.creators?.[0]?.address === creator.toBase58()
}

export const useOwnedNFTsQuery = (creator?: PublicKey): UseQueryResult<MetadataResult[] | undefined> => {
  const { connection } = useConnectionConfig()
  const { account } = useSolanaWeb3()
  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['OWNED_NFTS', account, creator, quietRefreshFlag],
    async (): Promise<MetadataResult[] | undefined> => {
      if (!account || !connection) {
        return undefined
      }

      console.log(quietRefreshFlag)

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        account, { programId: TOKEN_PROGRAM_ID }
      ).then(r => r.value.map(o => o.account.data))

      const isNFTAccount = (account: ParsedAccountData) => {
        const tokenAmount: TokenAmount = account.parsed.info.tokenAmount
        return tokenAmount && (tokenAmount.amount === '1' && tokenAmount.decimals === 0)
      }

      const NFTAccounts = tokenAccounts.filter(isNFTAccount)

      const mints = NFTAccounts.map(acc => new PublicKey(acc.parsed.info.mint))

      const tokens: MetadataResult[] = (await Promise.all(mints.map(mint => loadMetadata(connection, mint)))).filter(o => o !== undefined) as MetadataResult[]

      return tokens.filter(token => belongsToCollection(token, creator))
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      keepPreviousData: true
    }
  )
}

export const useNFTQuery = (mint: PublicKey): UseQueryResult<MetadataResult | undefined> => {
  const { connection } = useConnectionConfig()
  const { account } = useSolanaWeb3()
  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['NFT_DETAIL', account, mint, quietRefreshFlag],
    async (): Promise<any | undefined> => {
      if (!account || !connection) {
        return undefined
      }

      return  loadMetadata(connection, mint)

    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      keepPreviousData: true
    }
  )
}

