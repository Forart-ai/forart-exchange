import { Route } from '../../routes'
import SocialList from '../nftDetail/socialList'
import SocialHomepage from './modules/home'

export const socialRoutes:Route[] = [
  {
    path: 'home',
    title: 'Social NFT',
    component: SocialHomepage,
  },
  {
    path: 'post',
    title: 'Social List',
    component: SocialList,

  }
]
