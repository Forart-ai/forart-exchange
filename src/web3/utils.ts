import BigNumber from 'bignumber.js'


export function toBigNumber(value: string | number): BigNumber {
  return new BigNumber(value)
}


export function toWei(amount: number | string): string {
  return toBigNumber(amount).multipliedBy(toBigNumber('1e+18')).toString(10)
}

