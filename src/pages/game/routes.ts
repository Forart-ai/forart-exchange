import Game from './index'
import { ReactComponent as MarketplaceIcon } from '../../assets/images/siderIcon/marketplace.svg'
import AiArt from './modules/aiArt'
import { Route } from 'src/routes'
import { AiartSvg, GallerySvg } from '../../assets/svgs/game'

export const gameRoutes: Route[] = [
  {
    path: 'aiArt',
    title: 'Aiart',
    icon: GallerySvg,
    component: AiArt,
    disable: false,
    parent: 'game',
    hidden:true
  },
  {
    path: '2',
    title: 'Transformation',
    icon: AiartSvg,
    component: AiArt,
    disable: false,
    parent: 'game',
    hidden:true
  },
]
