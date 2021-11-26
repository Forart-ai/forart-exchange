import LevelUp from '../pages/LevelUp'
import NFTCreate from '../pages/nftCreate'
import Marketplace from '../pages/marketplace'
import NFTDetailPage from '../pages/marketplace/nftDetail'

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
    path: '/gamingPools',
    title: 'Gaming Pools',
    component: LevelUp,
    disable: true
  },
]

export default routes
