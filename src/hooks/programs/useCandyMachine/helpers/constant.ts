import { Cluster, clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { Idl } from '@project-serum/anchor'

const SOLANA_CLUSTER = (process.env.REACT_APP_SOLANA_CLUSTER) as Cluster
const END_POINT = process.env.REACT_APP_SOLANA_END_POINT || clusterApiUrl(SOLANA_CLUSTER)
const PAINTER_CANDY_MACHINE_ADDR = process.env.REACT_APP_CANDY_MACHINE_ADDR as string

//devnet
// const PAINTER_CANDY_MACHINE_ADDR ='AzyBxzWm3s4WZrh3MFksnDEPfSEfcTzKmDzt2L9L7ano'
const HYPETEEN_CANDY_MACHINE_ADDR = 'FaEuBjb9B6jN52y7uKBHVKu8eY8PkbH5Mq6L42TBFcEj'

export const SolanaConnection = new Connection(END_POINT, { disableRetryOnRateLimit: true })

export const CANDY_MACHINE_PROGRAM_IDL: Idl = require('../candy_machine_program_idl.json')

export const CANDY_MACHINE_PROGRAM_ID = new PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ')

export const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')

export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')

export const PainterCandyMachineAddress = new PublicKey(PAINTER_CANDY_MACHINE_ADDR)

export const HypeteenCandyMachineAddress = new PublicKey(HYPETEEN_CANDY_MACHINE_ADDR)

export const DEFAULT_TIMEOUT = 15000
