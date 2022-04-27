import { PublicKey } from '@solana/web3.js'
import { Idl } from '@project-serum/anchor'

const PAINTER_CANDY_MACHINE_ADDR = '4CPhsimB76MwkKjKAJhR1Zf12m1x2e8qGz8ncoD1svuw'

//devnet
// const PAINTER_CANDY_MACHINE_ADDR ='7D2pJfrhSMPdA3R1Po6KHxydbgheaTcGnv1JCjqSaMiy'
const HYPETEEN_CANDY_MACHINE_ADDR = 'FaEuBjb9B6jN52y7uKBHVKu8eY8PkbH5Mq6L42TBFcEj'
const FAUCET_CANDY_MACHINE = '9Fx51FtgEkQwPQGdoe7kQvq1JFKqXUe3QKpkwnzwBcVH'

export const CANDY_MACHINE_PROGRAM_IDL: Idl = require('../candy_machine_program_idl.json')

export const CANDY_MACHINE_PROGRAM_ID = new PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ')

export const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')

export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')

export const PainterCandyMachineAddress = new PublicKey(PAINTER_CANDY_MACHINE_ADDR)

export const HypeteenCandyMachineAddress = new PublicKey(HYPETEEN_CANDY_MACHINE_ADDR)

export const DEFAULT_TIMEOUT = 15000
