import { useQuery } from 'react-query'
import CONFT_API from '../../apis/co-nft'

export type ArtistKit = {
  id: number
  seriesId: number
  url: string
  price: number
  rarity: number
  bodyType: string
  stockLimit: number
  chainMeta: string
  stock: number
}

export type ArtistKitKey = 'Body' | string

export type ArtistKits = Record<ArtistKitKey, ArtistKit[]>

export const useArtistKitsQuery = (id: number | string | undefined) => {
  return useQuery<ArtistKits>(
    ['ARTIST_KIT_LIST', id],
    () => {
      return CONFT_API.core.kits.getArtistAssembler(id).then(res => res) as any
    },
    { refetchInterval: false, refetchOnWindowFocus: false }
  )
}
