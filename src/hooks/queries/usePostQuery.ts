import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query'
import { SOCIAL_API } from '../../apis/auth'
import { useRefreshController } from '../../contexts/refresh-controller'
import { PostListItem, UserPostListQueryParams } from '../../types/social'

export const usePostQuery =  (params: UserPostListQueryParams): UseInfiniteQueryResult<Array<PostListItem>> => {
  const { quietRefreshFlag } = useRefreshController()

  return useInfiniteQuery(
    ['USER_POST_LIST', params, quietRefreshFlag],
    async ({ pageParam = 1 }) => {
      return await SOCIAL_API.getUserPostList({ ...params, current: pageParam })
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return !!(lastPage as unknown as Array<any>).length
      },
      refetchInterval:false,
      keepPreviousData: true
    }
  )
}

// export const usePostQuery =  (params: UserPostListQueryParams): UseInfiniteQueryResult<Array<PostListItem>> => {
//   const { quietRefreshFlag } = useRefreshController()
//
//   return useInfiniteQuery(
//     ['USER_POST_LIST', params, quietRefreshFlag],
//     async ({ pageParam = 1 }) => {
//       return await SOCIAL_API.getUserPostList({ ...params, current: pageParam }).then((res:any) => {
//         return  res.map((item: any) => ({
//           ...item,
//           avatar:  `${item.avatar}?a=${new Date().getTime()}`
//         }))
//       })
//     },
//     {
//       getNextPageParam: (lastPage, allPages) => {
//         return !!(lastPage as unknown as Array<any>).length
//       },
//       refetchOnWindowFocus:false,
//       refetchInterval:false,
//       keepPreviousData: true
//     }
//   )
// }
