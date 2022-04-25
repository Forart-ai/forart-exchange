import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import useCandyMachine from './programs/useCandyMachine'
import { Keypair } from '@solana/web3.js'

const useOpenBlindBox = () => {

  const { builtMint } = useCandyMachine()

  const openBlindBox = useCallback(
    async () => {
      const mintKeypair = Keypair.generate()

    },[]
  )

  return { openBlindBox }
}

export default useOpenBlindBox
