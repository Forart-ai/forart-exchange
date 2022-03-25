import React from 'react'
import { notification } from 'antd'

function notify({
  message = '',
  description = undefined as any,
  txid = '',
  type = 'info',
  placement = 'topLeft',
}) {
  if (txid) {
    //   <Link
    //     external
    //     to={'https://explorer.solana.com/tx/' + txid}
    //     style={{ color: '#0000ff' }}
    //   >
    //     View transaction {txid.slice(0, 8)}...{txid.slice(txid.length - 8)}
    //   </Link>

    description = <></>
  }
  (notification as any)[type]({
    message: <span style={{ color: 'white' }}>{message}</span>,
    description: (
      <span style={{ color: 'white', opacity: 0.5 }}>{description}</span>
    ),
    placement,
    style: {
      backgroundColor: 'rgb(48,8,73)',
      borderRadius: '1em'
    },
  })
}

export default notify
