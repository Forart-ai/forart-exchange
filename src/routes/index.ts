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
    title: 'GAN-NFT',
    component: AIGen,
    disable: false
  },
  {
    path: '/nftBreed',
    title: 'Al Generation',
    component: LevelUp,
    disable: false
  },

  {
    path: '/marketplace',
    title: 'Marketplace',
    component: Marketplace,
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

]

export default routes
