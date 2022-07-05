
import AIGen from '../pages/AIGen'
import PersonalCenterPage from '../pages/personal'
import CoNftPage from '../pages/coNft/homepage'
import ArtistDetail from '../pages/coNft/artistdetail'
import Game from '../pages/game/index'
import Goblin from '../pages/goblin'

import { ReactComponent as GanIcon } from '../assets/images/siderIcon/f-idea.svg'
import { ReactComponent as GeneratorIcon } from '../assets/images/siderIcon/generator.svg'
import { ReactComponent as MarketplaceIcon } from '../assets/images/siderIcon/marketplace.svg'
import { ReactComponent as GamesIcon } from '../assets/images/siderIcon/games.svg'
import { ReactComponent as ChatIcon } from '../assets/images/siderIcon/chat.svg'

import NftChatroom from '../pages/social'
import CONFTDetail from '../pages/nftDetail/coNftDetail'
import WalletNftDetail from '../pages/nftDetail/walletNftDetail'
import AiArt from '../pages/game/modules/aiArt'
import SocialHomepage from '../pages/social/modules/home'

export type Route = {
  path: string
  title: string
  icon?: any
  exact?: boolean
  component: any
  hidden?: boolean
  match?: RegExp
  disable?: boolean
  parent?:string
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
    path: '/nft-detail',
    title: 'NFT Detail',
    component: WalletNftDetail,
    hidden: true
  },
  {
    path: '/co-nft/artistDetail',
    title: 'Artist Detail',
    component: ArtistDetail,
    hidden: true
  },
  {
    path: '/goblintownai',
    title:'Goblintownai',
    component: Goblin,
    icon: MarketplaceIcon,
    hidden: true
  },
  {
    path: '/social',
    match: /^\/social/,
    title: 'Social',
    exact: false,
    icon: ChatIcon,
    component: NftChatroom,
    disable: true
  },
  {
    path: '/Text-to-NFT',
    title: 'Text-to-NFT',
    icon: GanIcon,
    component: AIGen,
    disable: true,
    hidden: true

  },
  {
    path:'/account',
    title:'Personal HomePage',
    component: PersonalCenterPage,
    hidden: true
  },
  {
    path: '/game',
    title:'Game',
    match: /^\/game/,
    exact: false,
    component: Game,
    icon: MarketplaceIcon,
    disable: true
  },
]

export default routes
