export type ForartMint = {
  'version': '0.0.0',
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
      'name': 'init',
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
          'name': 'name',
          'type': 'string'
        },
        {
          'name': 'coplayer',
          'type': 'publicKey'
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
      'args': []
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
            'name': 'coplayer',
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'type': 'u8'
          },
          {
            'name': 'used',
            'type': 'bool'
          }
        ]
      }
    }
  ],
  'types': [
    {
      'name': 'ErrorCode',
      'type': {
        'kind': 'enum',
        'variants': [
          {
            'name': 'InvalidNFTAta'
          },
          {
            'name': 'InvalidNFTMeta'
          },
          {
            'name': 'InvalidCoplayer'
          }
        ]
      }
    }
  ]
};

export const ForartMintIDL: ForartMint = {
  'version': '0.0.0',
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
      'name': 'init',
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
          'name': 'name',
          'type': 'string'
        },
        {
          'name': 'coplayer',
          'type': 'publicKey'
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
      'args': []
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
            'name': 'coplayer',
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'type': 'u8'
          },
          {
            'name': 'used',
            'type': 'bool'
          }
        ]
      }
    }
  ],
  'types': [
    {
      'name': 'ErrorCode',
      'type': {
        'kind': 'enum',
        'variants': [
          {
            'name': 'InvalidNFTAta'
          },
          {
            'name': 'InvalidNFTMeta'
          },
          {
            'name': 'InvalidCoplayer'
          }
        ]
      }
    }
  ]
}
