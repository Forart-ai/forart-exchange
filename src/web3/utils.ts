import BigNumber from 'bignumber.js'
import Web3 from 'web3'

export const web3Utils = new Web3().utils

export function toBigNumber(value: string | number): BigNumber {
  return new BigNumber(value)
}

export function toWei(amount: number | string): string {
  return toBigNumber(amount).multipliedBy(toBigNumber('1e+18')).toString(10)
}

export function weiToBigNumber(value: BigNumber, decimalPlaces = 18): BigNumber {
  if (value === undefined) {
    return new BigNumber(0)
  }
  return new BigNumber(web3Utils.fromWei(value.toString())).dp(decimalPlaces, BigNumber.ROUND_DOWN)
}

