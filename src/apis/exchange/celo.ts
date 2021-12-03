import { SellingOrder } from '../../hooks/contract/service/exchange/types'
import forartRequest, { ForartApiResponseBody } from '../../utils/request'


export function sellOrder(data: SellingOrder) {
  return forartRequest.post<ForartApiResponseBody<any>>('/transfer/order/create', data)
}
