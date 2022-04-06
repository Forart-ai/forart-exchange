import LevelUp from '../pages/LevelUp'
import NFTCreate from '../pages/nftCreate'
import Marketplace from '../pages/marketplace'
import NFTDetailPage from '../pages/marketplace/nftDetail'
import AIGen from '../pages/AIGen'
import PersonalCenterPage from '../pages/personal'
import CoNftPage from '../pages/coNft'
import ArtistDetail from '../pages/coNft/artistDetail'
import Staking from '../pages/staking/index'
import { ReactComponent as GanIcon } from '../assets/images/siderIcon/f-idea.svg'
import { ReactComponent as GeneratorIcon } from '../assets/images/siderIcon/generator.svg'
import { ReactComponent as MarketplaceIcon } from '../assets/images/siderIcon/marketplace.svg'
import { ReactComponent as GamesIcon } from '../assets/images/siderIcon/games.svg'
import { ReactComponent as ChatIcon } from '../assets/images/siderIcon/chat.svg'

import NftChatroom from '../pages/nft-chatroom'
import CONFTDetail from '../pages/coNft/nftDetail'

export type Route = {
  path: string
  title: string
  icon?: any
  component: any
  hidden?: boolean
  match?: RegExp
  pools?: boolean
  disable?: boolean
}

const routes: Route[] = [
  // {
  //   path: '/',
  //   title: 'Home',
  //   icon: HomeIcon,
  //   component: Home,
  //   disable: false
  // },
  {
    path: '/',
    title: 'CO-NFT',
    icon: GamesIcon,
    component: CoNftPage,
    disable: false
  },
  {
    path: '/co-nft-detail',
    title: 'CO-NFT Detail',
    component: CONFTDetail,
    hidden: true
  },
  {
    path: '/artistDetail',
    title: 'Artist Detail',
    component: ArtistDetail,
    hidden: true
  },
  {
    path: '/nft-chatroom',
    title: 'NFT-Chatroom',
    icon: ChatIcon,
    component: NftChatroom,

  },
  {
    path: '/Text-to-NFT',
    title: 'Text-to-NFT',
    icon: GanIcon,
    component: AIGen,
    disable: false
  },
  {
    path: '/nftBreed',
    title: 'Style Transformation',
    icon: GeneratorIcon,
    component: LevelUp,
    disable: false
  },

  {
    path: '/marketplace',
    title: 'Marketplace',
    component: Marketplace,
    icon: MarketplaceIcon,
    disable: false,
    hidden: true
  },
  {
    path: '/marketplace/:id',
    title: 'Collectible',
    component: NFTDetailPage,
    hidden: true
  },
  {
    path: '/NFTCreate',
    title: 'NFT Create',
    component: NFTCreate,
    hidden: true
  },
  {
    path:'/personal/home',
    title:'Personal HomePage',
    component: PersonalCenterPage,
    hidden: true
  },
  {
    path:'/staking',
    title:'Staking',
    component: Staking,
    icon: MarketplaceIcon,
  }

]

export default routes
