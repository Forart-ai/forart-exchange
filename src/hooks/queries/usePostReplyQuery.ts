import {  ReplyListItem, UserPostReplyListQueryParams } from '../../types/social'
import { useQuery, UseQueryResult } from 'react-query'
import { useRefreshController } from '../../contexts/refresh-controller'
import { SOCIAL_API } from '../../apis/auth'

export const usePostReplyQuery = (params:UserPostReplyListQueryParams ): UseQueryResult<Array<ReplyListItem>> => {
  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['USER_POST_REPLY_LIST',quietRefreshFlag],
    async () => {
      return await SOCIAL_API.getPostReplyList(params).then(res => res)
    },{
      refetchOnWindowFocus:false,
      refetchInterval:false,
      keepPreviousData: true
    }
  )
}
