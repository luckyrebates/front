export const TaskControlDirectABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenGiftAddr',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_allowBuyTicket',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_allowSendTicket',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_decimals',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'enum ITokenGift.Model',
        name: 'model',
        type: 'uint8',
      },
    ],
    name: 'NotAllowModel',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'taskAddr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'weight',
        type: 'uint256',
      },
    ],
    name: 'TaskAdd',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'taskAddr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'fromAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiveAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ticketNumbers',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'buy',
        type: 'bool',
      },
    ],
    name: 'TicketGet',
    type: 'event',
  },
  {
    inputs: [],
    name: 'allowBuyTicket',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'allowSendTicket',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_taskAddr',
        type: 'address',
      },
    ],
    name: 'getTask',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_taskAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_receiveAddress',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'getTicket',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_taskAddr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_weight',
        type: 'uint256',
      },
    ],
    name: 'setTask',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenGiftAddr',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_allowBuyTicket',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_allowSendTicket',
        type: 'bool',
      },
    ],
    name: 'updateTokenGift',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
