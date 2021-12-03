import { keccak256 } from 'web3-utils'
import Web3 from 'web3'
import { ExchangeOrder, ExchangeOrderAsset } from './types'

const web3 = new Web3()

function encodeParameter(type: any, parameter: any) {
  return web3.eth.abi.encodeParameter(type, parameter)
}

export function hashExchangeOrderAsset(asset: ExchangeOrderAsset) {
  return keccak256(encodeParameter({
    Asset: {
      settleType: 'uint256',
      baseAsset: {
        code: {
          baseType: 'uint256',
          extraType: 'uint256',
          contractAddr: 'address'
        },
        value: 'uint256'
      },
      extraValue: 'uint256'
    }
  }, asset))
}

export function hashExchangeOrder(order: ExchangeOrder) {
  return keccak256(encodeParameter({
    'Order': {
      'dir': 'uint256',
      'maker': 'address',
      'makerAssetHash': 'bytes32',
      'taker': 'address',
      'takerAssetHash': 'bytes32',
      'fee': 'uint256',
      'feeRecipient': 'address',
      'startTime': 'uint256',
      'endTime': 'uint256',
      'salt': 'uint256'
    }
  }, order))
}
