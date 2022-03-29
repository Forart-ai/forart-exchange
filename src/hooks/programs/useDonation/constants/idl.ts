export type Donation = {
    'version': '0.0.0',
    'name': 'donation',
    'instructions': [
        {
            'name': 'create',
            'accounts': [
                {
                    'name': 'pool',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'poolAccount',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'feeAccount',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'poolSigner',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'authority',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'payer',
                    'isMut': false,
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
                    'name': 'artist',
                    'type': 'publicKey'
                },
                {
                    'name': 'feeRatio',
                    'type': 'u64'
                },
                {
                    'name': 'minDonateAmount',
                    'type': 'u64'
                },
                {
                    'name': 'poolBump',
                    'type': 'u8'
                },
                {
                    'name': 'signerBump',
                    'type': 'u8'
                }
            ]
        },
        {
            'name': 'register',
            'accounts': [
                {
                    'name': 'pool',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'donor',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'user',
                    'isMut': false,
                    'isSigner': true
                },
                {
                    'name': 'payer',
                    'isMut': false,
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
                    'name': 'bump',
                    'type': 'u8'
                }
            ]
        },
        {
            'name': 'donate',
            'accounts': [
                {
                    'name': 'pool',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'donor',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'tokenMint',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'donateAccount',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'poolAccount',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'feeAccount',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'tokenProgram',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'user',
                    'isMut': false,
                    'isSigner': true
                }
            ],
            'args': [
                {
                    'name': 'amount',
                    'type': 'u64'
                }
            ]
        },
        {
            'name': 'stop',
            'accounts': [
                {
                    'name': 'pool',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'authority',
                    'isMut': false,
                    'isSigner': true
                }
            ],
            'args': []
        },
        {
            'name': 'withdraw',
            'accounts': [
                {
                    'name': 'pool',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'poolAccount',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'poolSigner',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'withdrawAccount',
                    'isMut': true,
                    'isSigner': false
                },
                {
                    'name': 'tokenProgram',
                    'isMut': false,
                    'isSigner': false
                },
                {
                    'name': 'authority',
                    'isMut': false,
                    'isSigner': true
                }
            ],
            'args': []
        }
    ],
    'accounts': [
        {
            'name': 'donor',
            'type': {
                'kind': 'struct',
                'fields': [
                    {
                        'name': 'pool',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'key',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'amount',
                        'type': 'u64'
                    },
                    {
                        'name': 'bump',
                        'type': 'u8'
                    }
                ]
            }
        },
        {
            'name': 'pool',
            'type': {
                'kind': 'struct',
                'fields': [
                    {
                        'name': 'name',
                        'type': 'string'
                    },
                    {
                        'name': 'artist',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'minDonateAmount',
                        'type': 'u64'
                    },
                    {
                        'name': 'feeRatio',
                        'type': 'u64'
                    },
                    {
                        'name': 'totalFeeAmount',
                        'type': 'u64'
                    },
                    {
                        'name': 'totalDonateAmount',
                        'type': 'u64'
                    },
                    {
                        'name': 'poolAccount',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'feeAccount',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'authority',
                        'type': 'publicKey'
                    },
                    {
                        'name': 'state',
                        'type': 'u8'
                    },
                    {
                        'name': 'poolBump',
                        'type': 'u8'
                    },
                    {
                        'name': 'signerBump',
                        'type': 'u8'
                    }
                ]
            }
        }
    ],
    'types': [
        {
            'name': 'PoolState',
            'type': {
                'kind': 'enum',
                'variants': [
                    {
                        'name': 'Active'
                    },
                    {
                        'name': 'Finish'
                    },
                    {
                        'name': 'Withdraw'
                    }
                ]
            }
        }
    ],
    'errors': [
        {
            'code': 300,
            'name': 'InvalidDonationAmount',
            'msg': 'Donation amount is too little'
        },
        {
            'code': 301,
            'name': 'InvalidDonationState',
            'msg': 'Donation state is not finish'
        },
        {
            'code': 302,
            'name': 'DonationHasFinished',
            'msg': 'Donation has finished'
        },
        {
            'code': 303,
            'name': 'DonateAmountMustBeInteger',
            'msg': 'Donate amount must be integer'
        }
    ]
};

export const DonationIDL: Donation = {
  'version': '0.0.0',
  'name': 'donation',
  'instructions': [
    {
      'name': 'create',
      'accounts': [
        {
          'name': 'pool',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'poolAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'feeAccount',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'poolSigner',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'authority',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'payer',
          'isMut': false,
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
          'name': 'artist',
          'type': 'publicKey'
        },
        {
          'name': 'feeRatio',
          'type': 'u64'
        },
        {
          'name': 'minDonateAmount',
          'type': 'u64'
        },
        {
          'name': 'poolBump',
          'type': 'u8'
        },
        {
          'name': 'signerBump',
          'type': 'u8'
        }
      ]
    },
    {
      'name': 'register',
      'accounts': [
        {
          'name': 'pool',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'donor',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'user',
          'isMut': false,
          'isSigner': true
        },
        {
          'name': 'payer',
          'isMut': false,
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
          'name': 'bump',
          'type': 'u8'
        }
      ]
    },
    {
      'name': 'donate',
      'accounts': [
        {
          'name': 'pool',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'donor',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'tokenMint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'donateAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'poolAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'feeAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'user',
          'isMut': false,
          'isSigner': true
        }
      ],
      'args': [
        {
          'name': 'amount',
          'type': 'u64'
        }
      ]
    },
    {
      'name': 'stop',
      'accounts': [
        {
          'name': 'pool',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'authority',
          'isMut': false,
          'isSigner': true
        }
      ],
      'args': []
    },
    {
      'name': 'withdraw',
      'accounts': [
        {
          'name': 'pool',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'poolAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'poolSigner',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'withdrawAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'authority',
          'isMut': false,
          'isSigner': true
        }
      ],
      'args': []
    }
  ],
  'accounts': [
    {
      'name': 'donor',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'pool',
            'type': 'publicKey'
          },
          {
            'name': 'key',
            'type': 'publicKey'
          },
          {
            'name': 'amount',
            'type': 'u64'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'pool',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'artist',
            'type': 'publicKey'
          },
          {
            'name': 'minDonateAmount',
            'type': 'u64'
          },
          {
            'name': 'feeRatio',
            'type': 'u64'
          },
          {
            'name': 'totalFeeAmount',
            'type': 'u64'
          },
          {
            'name': 'totalDonateAmount',
            'type': 'u64'
          },
          {
            'name': 'poolAccount',
            'type': 'publicKey'
          },
          {
            'name': 'feeAccount',
            'type': 'publicKey'
          },
          {
            'name': 'authority',
            'type': 'publicKey'
          },
          {
            'name': 'state',
            'type': 'u8'
          },
          {
            'name': 'poolBump',
            'type': 'u8'
          },
          {
            'name': 'signerBump',
            'type': 'u8'
          }
        ]
      }
    }
  ],
  'types': [
    {
      'name': 'PoolState',
      'type': {
        'kind': 'enum',
        'variants': [
          {
            'name': 'Active'
          },
          {
            'name': 'Finish'
          },
          {
            'name': 'Withdraw'
          }
        ]
      }
    }
  ],
  'errors': [
    {
      'code': 300,
      'name': 'InvalidDonationAmount',
      'msg': 'Donation amount is too little'
    },
    {
      'code': 301,
      'name': 'InvalidDonationState',
      'msg': 'Donation state is not finish'
    },
    {
      'code': 302,
      'name': 'DonationHasFinished',
      'msg': 'Donation has finished'
    },
    {
      'code': 303,
      'name': 'DonateAmountMustBeInteger',
      'msg': 'Donate amount must be integer'
    }
  ]
}
