export type FreeMint = {
    'version': '0.1.0',
    'name': 'free_mint',
    'instructions': [
        {
            'name': 'create',
            'accounts': [
                {
                    'name': 'pool',
                    'isMut': true,
                    'isSigner': true
                },
                {
                    'name': 'mint',
                    'isMut': true,
                    'isSigner': true
                },
                {
                    'name': 'mintAuthority',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'authority',
                    'isMut': true,
                    'isSigner': true
                },
                {
                    'name': 'rent',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'systemProgram',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'tokenProgram',
                    'isMut': false,
                    'isSigner': false
                }
            ],
            'args': [
                {
                    'name': 'ticketPerKey',
                    'type': 'u64'
                },
                {
                    'name': 'totalTicketCount',
                    'type': 'u64'
                },
                {
                    'name': 'startTime',
                    'type': 'u64'
                },
                {
                    'name': 'endTime',
                    'type': 'u64'
                }
            ]
        },
        {
            'name': 'update',
            'accounts': [
                {
                    'name': 'pool',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'authority',
                    'isMut': true,
                    'isSigner': true
                }
            ],
            'args': [
                {
                    'name': 'ticketPerKey',
                    'type': 'u64'
                },
                {
                    'name': 'totalTicketCount',
                    'type': 'u64'
                },
                {
                    'name': 'startTime',
                    'type': 'u64'
                },
                {
                    'name': 'endTime',
                    'type': 'u64'
                }
            ]
        },
        {
            'name': 'request',
            'accounts': [
                {
                    'name': 'pool',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'pocket',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'token',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'mint',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'mintAuthority',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'user',
                    'isMut': true,
                    'isSigner': true
                },
                {
                    'name': 'rent',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'systemProgram',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'tokenProgram',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'associatedTokenProgram',
                    'isMut': false,
                    'isSigner': false
                }
            ],
            'args': []
        }
    ],
    'accounts': [
        {
            'name': 'pool',
            'type': {
                'kind': 'struct',
                'fields': [
                    {
                        'name': 'ticketMint',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'ticketPerKey',
                        'type': 'u64'
                    },
                    {
                        'name': 'totalTicketCount',
                        'type': 'u64'
                    },
                    {
                        'name': 'claimedTicketCount',
                        'type': 'u64'
                    },
                    {
                        'name': 'startTime',
                        'type': 'u64'
                    },
                    {
                        'name': 'endTime',
                        'type': 'u64'
                    },
                    {
                        'name': 'authority',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'bump',
                        'type': 'u8'
                    }
                ]
            }
        },
        {
            'name': 'pocket',
            'type': {
                'kind': 'struct',
                'fields': [
                    {
                        'name': 'pool',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'user',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'ticketCount',
                        'type': 'u64'
                    },
                    {
                        'name': 'bump',
                        'type': 'u8'
                    }
                ]
            }
        }
    ],
    'errors': [
        {
            'code': 6000,
            'name': 'InvalidReqTime',
            'msg': 'invalid request time'
        },
        {
            'code': 6001,
            'name': 'UserTicketLimit',
            'msg': 'user ticket limit'
        },
        {
            'code': 6002,
            'name': 'TicketExhausted',
            'msg': 'ticket exhausted'
        }
    ]
};

export const FreeMintIDL: FreeMint = {
  'version': '0.1.0',
  'name': 'free_mint',
  'instructions': [
    {
      'name': 'create',
      'accounts': [
        {
          'name': 'pool',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'mint',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'mintAuthority',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'authority',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'ticketPerKey',
          'type': 'u64'
        },
        {
          'name': 'totalTicketCount',
          'type': 'u64'
        },
        {
          'name': 'startTime',
          'type': 'u64'
        },
        {
          'name': 'endTime',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'update',
      'accounts': [
        {
          'name': 'pool',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'authority',
          'isMut': true,
          'isSigner': true
        }
      ],
      'args': [
        {
          'name': 'ticketPerKey',
          'type': 'u64'
        },
        {
          'name': 'totalTicketCount',
          'type': 'u64'
        },
        {
          'name': 'startTime',
          'type': 'u64'
        },
        {
          'name': 'endTime',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'request',
      'accounts': [
        {
          'name': 'pool',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'pocket',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'token',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mintAuthority',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'rent',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'associatedTokenProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    }
  ],
  'accounts': [
    {
      'name': 'pool',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'ticketMint',
            'type': 'publicKey'
          },
          {
            'name': 'ticketPerKey',
            'type': 'u64'
          },
          {
            'name': 'totalTicketCount',
            'type': 'u64'
          },
          {
            'name': 'claimedTicketCount',
            'type': 'u64'
          },
          {
            'name': 'startTime',
            'type': 'u64'
          },
          {
            'name': 'endTime',
            'type': 'u64'
          },
          {
            'name': 'authority',
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'pocket',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'pool',
            'type': 'publicKey'
          },
          {
            'name': 'user',
            'type': 'publicKey'
          },
          {
            'name': 'ticketCount',
            'type': 'u64'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    }
  ],
  'errors': [
    {
      'code': 6000,
      'name': 'InvalidReqTime',
      'msg': 'invalid request time'
    },
    {
      'code': 6001,
      'name': 'UserTicketLimit',
      'msg': 'user ticket limit'
    },
    {
      'code': 6002,
      'name': 'TicketExhausted',
      'msg': 'ticket exhausted'
    }
  ]
}
