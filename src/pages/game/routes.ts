import Game from './index'
import { ReactComponent as MarketplaceIcon } from '../../assets/images/siderIcon/marketplace.svg'
import AiArt from './modules/aiArt'
import { Route } from 'src/routes'
import { AiartSvg, GallerySvg } from '../../assets/svgs/game'
import TextToImage from './modules/text-to-image'

export const gameRoutes: Route[] = [
  {
    path: 'aiArt',
    title: 'Soul Card',
    icon: GallerySvg,
    component: AiArt,
    disable: false,
    parent: 'game',
    hidden:true
  },
  {
    path: 'magic-wand',
    title: 'Magic Wand',
    icon: AiartSvg,
    component: TextToImage,
    disable: false,
    parent: 'game',
    hidden:true
  },
]
