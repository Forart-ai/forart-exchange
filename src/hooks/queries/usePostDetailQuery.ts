import { useQuery, UseQueryResult } from 'react-query'
import { SOCIAL_API } from '../../apis/auth'
import {  PostListItem } from '../../types/social'
import { useRefreshController } from '../../contexts/refresh-controller'

export const usePostDetailQuery = (id: string | undefined): UseQueryResult<PostListItem> => {

  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['POST_DETAIL', id, quietRefreshFlag],
    async () => {
      return await SOCIAL_API.getPostById(id)
        .then(res => res)
    }
  )
}
