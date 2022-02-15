import { SellingOrder } from '../../hooks/contract/service/exchange/types'
import forartRequest, { ForartApiResponseBody } from '../../utils/request'

export function sellOrder(data: SellingOrder) {
  return forartRequest.post<ForartApiResponseBody<any>>('/marketplace/order/create', data)
}

export function chooseOrder(data: any) {
  return forartRequest.post<ForartApiResponseBody<any>>('/marketplace/order/select', data)
}

export function completeOrder(data: any) {
  return forartRequest.post<ForartApiResponseBody<any>>('/marketplace/order/complete', data)
}

export function cancelExchange(nftPubKey: string) {
  return forartRequest.post('/transfer/exchange/cancel', { nftPubKey })
}

