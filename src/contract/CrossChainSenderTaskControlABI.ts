export const CrossChainSenderTaskControlABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_router',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_link',
        type: 'address',
      },
      {
        internalType: 'uint64',
        name: '_destinationChainSelector',
        type: 'uint64',
      },
      {
        internalType: 'address',
        name: '_controlReceiverTask',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'currentBalance',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'calculatedFees',
        type: 'uint256',
      },
    ],
    name: 'NotEnoughBalance',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'messageId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fees',
        type: 'uint256',
      },
    ],
    name: 'MessageSent',
    type: 'event',
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
        name: 'amount',
        type: 'uint256',
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
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
        name: 'receiveAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TokenMint',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
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
        name: 'receiveAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TokenToBeMint',
    type: 'event',
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
        name: '_receiveAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_ticketNumbers',
        type: 'uint256',
      },
    ],
    name: 'getTicket',
    outputs: [],
    stateMutability: 'nonpayable',
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
        name: '_fromAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_receiveAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_ticketNumbers',
        type: 'uint256',
      },
    ],
    name: 'getTicketFrom',
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
    name: 'mintToken',
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
        internalType: 'uint64',
        name: '_destinationChainSelector',
        type: 'uint64',
      },
      {
        internalType: 'address',
        name: '_controlReceiverTask',
        type: 'address',
      },
    ],
    name: 'setDestination',
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
        name: '',
        type: 'address',
      },
    ],
    name: 'taskMap',
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
