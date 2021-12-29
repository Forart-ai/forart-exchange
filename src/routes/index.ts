import LevelUp from '../pages/LevelUp'
import NFTCreate from '../pages/nftCreate'
import Marketplace from '../pages/marketplace'
import NFTDetailPage from '../pages/marketplace/nftDetail'
import Home from '../pages/Home'
import AIGen from '../pages/AIGen'
import PersonalCenterPage from '../pages/personal'
import CoNftPage from '../pages/coNft'
import ArtistDetail from '../pages/coNft/artistDetail'

import HomeIcon from '../assets/images/siderIcon/homepage_fill.svg'
import GanIcon from '../assets/images/siderIcon/f-idea.svg'
import GeneratorIcon from '../assets/images/siderIcon/generator.svg'
import MarketplaceIcon from '../assets/images/siderIcon/marketplace.svg'
import GamesIcon from '../assets/images/siderIcon/games.svg'
import NftChatroom from '../components/nft-chatroom'

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
  {
    path: '/',
    title: 'Home',
    icon: HomeIcon,
    component: Home,
    disable: false
  },
  {
    path: '/co-nft',
    title: 'CO-NFT',
    icon: GamesIcon,
    component: CoNftPage,
    disable: false
  },
  {
    path: '/co-nft/artistDetail/:id',
    title: 'Artist Detail',
    component: ArtistDetail,
    hidden: true
  },
  {
    path: '/nft-chatroom',
    title: 'NFT-Chatroom',
    icon: GamesIcon,
    component: NftChatroom,
    disable: true
  },
  {
    path: '/AI-Gen',
    title: 'GAN-NFT',
    icon: GanIcon,
    component: AIGen,
    disable: false
  },
  {
    path: '/nftBreed',
    title: 'Al Generation',
    icon: GeneratorIcon,
    component: LevelUp,
    disable: false
  },

  {
    path: '/marketplace',
    title: 'Marketplace',
    component: Marketplace,
    icon: MarketplaceIcon,
    disable: false
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
  }

]

export default routes
