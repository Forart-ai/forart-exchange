export type ForartMint = {
    'version': '0.1.0',
    'name': 'forart_mint',
    'instructions': [
        {
            'name': 'create',
            'accounts': [
                {
                    'name': 'collection',
                    'isMut': true,
                    'isSigner': true
                },
                {
                    'name': 'collectionSigner',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'rewardTicketAta',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'authority',
                    'isMut': true,
                    'isSigner': true
                },
                {
                    'name': 'systemProgram',
                    'isMut': false,
                    'isSigner': false
                }
            ],
            'args': [
                {
                    'name': 'creator',
                    'type': 'publicKey'
                },
                {
                    'name': 'platformAddr',
                    'type': 'publicKey'
                },
                {
                    'name': 'coplayerAmount',
                    'type': 'u64'
                },
                {
                    'name': 'platformAmount',
                    'type': 'u64'
                }
            ]
        },
        {
            'name': 'settle',
            'accounts': [
                {
                    'name': 'collection',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'asset',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'collectionSigner',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'assetAta',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'assetMetadata',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'coplayer',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'platformAddr',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'rewardTicketAta',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'ownerTicketAta',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'payer',
                    'isMut': true,
                    'isSigner': true
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
                    'name': 'name',
                    'type': 'string'
                }
            ]
        }
    ],
    'accounts': [
        {
            'name': 'collection',
            'type': {
                'kind': 'struct',
                'fields': [
                    {
                        'name': 'creator',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'authority',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'platformAddr',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'rewardTicketAta',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'coplayerAmount',
                        'type': 'u64'
                    },
                    {
                        'name': 'platformAmount',
                        'type': 'u64'
                    },
                    {
                        'name': 'signerBump',
                        'type': 'u8'
                    }
                ]
            }
        },
        {
            'name': 'asset',
            'type': {
                'kind': 'struct',
                'fields': [
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
            'name': 'InvalidNFTAta',
            'msg': 'invalid NFT ata'
        },
        {
            'code': 6001,
            'name': 'InvalidNFTMeta',
            'msg': 'invalid NFT meta'
        },
        {
            'code': 6002,
            'name': 'InvalidCoplayer',
            'msg': 'invalid coplayer'
        }
    ]
};

export const ForartMintIDL: ForartMint = {
  'version': '0.1.0',
  'name': 'forart_mint',
  'instructions': [
    {
      'name': 'create',
      'accounts': [
        {
          'name': 'collection',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'collectionSigner',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'rewardTicketAta',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'authority',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'creator',
          'type': 'publicKey'
        },
        {
          'name': 'platformAddr',
          'type': 'publicKey'
        },
        {
          'name': 'coplayerAmount',
          'type': 'u64'
        },
        {
          'name': 'platformAmount',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'settle',
      'accounts': [
        {
          'name': 'collection',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'asset',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'collectionSigner',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'assetAta',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'assetMetadata',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'coplayer',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'platformAddr',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'rewardTicketAta',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'ownerTicketAta',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'payer',
          'isMut': true,
          'isSigner': true
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
          'name': 'name',
          'type': 'string'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'collection',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'creator',
            'type': 'publicKey'
          },
          {
            'name': 'authority',
            'type': 'publicKey'
          },
          {
            'name': 'platformAddr',
            'type': 'publicKey'
          },
          {
            'name': 'rewardTicketAta',
            'type': 'publicKey'
          },
          {
            'name': 'coplayerAmount',
            'type': 'u64'
          },
          {
            'name': 'platformAmount',
            'type': 'u64'
          },
          {
            'name': 'signerBump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'asset',
      'type': {
        'kind': 'struct',
        'fields': [
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
      'name': 'InvalidNFTAta',
      'msg': 'invalid NFT ata'
    },
    {
      'code': 6001,
      'name': 'InvalidNFTMeta',
      'msg': 'invalid NFT meta'
    },
    {
      'code': 6002,
      'name': 'InvalidCoplayer',
      'msg': 'invalid coplayer'
    }
  ]
}
