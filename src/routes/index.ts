import LevelUp from '../pages/LevelUp'
import NFTCreate from '../pages/nftCreate'
import Marketplace from '../pages/marketplace'
import NFTDetailPage from '../pages/marketplace/nftDetail'
import Home from '../pages/Home'
import AIGen from '../pages/AIGen'

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
    component: Home,
    disable: false
  },
  {
    path: '/AI-Gen',
    title: 'AI-Gen',
    component: AIGen,
    disable: false
  },
  {
    path: '/NFTCreate',
    title: 'NFT Create',
    component: NFTCreate,
    disable: false
  },
  {
    path: '/marketplace',
    title: 'Marketplace',
    component: Marketplace,
    disable: true
  },
  {
    path: '/marketplace/:id',
    title: 'Collectible',
    component: NFTDetailPage,
    hidden: true
  },
  {
    path: '/nftBreed',
    title: 'NFT-Breed',
    component: LevelUp,
    disable: false
  },
]

export default routes
