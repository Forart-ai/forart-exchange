import LevelUp from '../pages/LevelUp'
import NFTCreate from '../pages/nftCreate'

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
    title: 'Level Up',
    component: LevelUp,
    disable: false
  },
  {
    path: '/create',
    title: 'NFT Create',
    component: NFTCreate,
    disable: false
  }
]

export default routes
