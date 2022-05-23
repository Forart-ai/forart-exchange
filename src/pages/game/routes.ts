import Game from './index'
import { ReactComponent as MarketplaceIcon } from '../../assets/images/siderIcon/marketplace.svg'
import AiArt from './modules/aiArt'
import { Route } from 'src/routes'

export const gameRoutes: Route[] = [
  {
    path: 'aiArt',
    title: 'Aiart',
    icon: '',
    component: AiArt,
    disable: false,
    parent: 'game',
    hidden:true
  },
  {
    path: '2',
    title: 'Transformation',
    icon: '',
    component: AiArt,
    disable: false,
    parent: 'game',
    hidden:true
  },
]
