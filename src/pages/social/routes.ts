import { Route } from '../../routes'
import ReplyList from './modules/detail/replyList'
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
    component: ReplyList,

  }
]
