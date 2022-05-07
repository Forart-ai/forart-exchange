import Routes, { Route } from './index'
import AiArt from '../pages/game/modules/aiArt'

const gameRoutes: Route[] = [
  {
    path: '/game/aiArt',
    title: 'Style Transformation',
    icon: '',
    component: AiArt,
    disable: false,
  },

]

export default gameRoutes
