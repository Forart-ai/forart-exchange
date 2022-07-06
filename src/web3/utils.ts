import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { useConnectionConfig } from '../contexts/solana-connection-config'

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

export const useCurrentSlotTime = () => {
  const [time, setTime] = useState<number>()
  const { connection } = useConnectionConfig()

  useEffect(() => {
    const getTimeFromBlockChain = () => {
      connection.getSlot('confirmed')
        .then(slot => {
          return connection.getBlockTime(slot)
        })
        .then(time => {
          if (time) setTime(time)
          else getTimeFromBlockChain()
        })
    }
    getTimeFromBlockChain()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => (prev ? prev + 1 : undefined))
    },1000)

    return () => {
      clearInterval(id)
    }

  }, [])

  return time

}
