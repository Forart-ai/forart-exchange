import { SellingOrder } from '../../hooks/contract/service/exchange/types'
import forartRequest, { ForartApiResponseBody } from '../../utils/request'


export function sellOrder(data: SellingOrder) {
  return forartRequest.post<ForartApiResponseBody<any>>('/transfer/order/create', data)
}


export function chooseOrder(data: any) {
  return forartRequest.post<ForartApiResponseBody<any>>('/transfer/order/select', data)
}


export function completeOrder(data: any) {
  return forartRequest.post<ForartApiResponseBody<any>>('/transfer/order/complete', data)
}


