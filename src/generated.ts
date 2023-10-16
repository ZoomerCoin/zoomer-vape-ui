import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
  Address,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'operator', type: 'address', indexed: true },
      { name: 'approved', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'id', type: 'uint256' },
      { name: 'data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', type: 'address' },
      { name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'index', type: 'uint256' },
    ],
    name: 'tokenByIndex',
    outputs: [{ name: 'tokenId', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VapeGame
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export const vapeGameABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_gameTime', internalType: 'uint256', type: 'uint256' },
      { name: '_zoomer', internalType: 'address', type: 'address' },
      { name: '_nfts', internalType: 'address[]', type: 'address[]' },
      { name: '_linkAddress', internalType: 'address', type: 'address' },
      { name: '_vrfV2Wrapper', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalDividendsValueETH',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GotDividend',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LottoWon',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'vapeTokenValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'potValueETH',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'lottoValueETH',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalDividendsValueETH',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'nextHitPrice',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TookAHit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TookTheLastHit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'GAME_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_INVEST_TICK',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_ZOOMER',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ZOOMER_HITS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'collectedFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'devFund',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'finalLottoValueETH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'finalLottoWinner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'finalPotValueETH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'useraddress', internalType: 'address', type: 'address' }],
    name: 'getMyDividend',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'hasEnoughZoomer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'hasNft',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'hitters',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastPurchasedAddress',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastPurchasedTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'linkAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lottoValueETH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'minInvest',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'nfts',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'numHits',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'payMyDividend',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'paydDevFee',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'potValueETH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_requestId', internalType: 'uint256', type: 'uint256' },
      { name: '_randomWords', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'rawFulfillRandomWords',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'startGame',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'sweep',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'takeAVapeHit',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'takeTheLastHit',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalDividendsValueETH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'vapeTokenPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdrawLink',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'zoomer',
    outputs: [{ name: '', internalType: 'contract ERC20', type: 'address' }],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export const vapeGameAddress = {
  5: '0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6',
} as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export const vapeGameConfig = {
  address: vapeGameAddress,
  abi: vapeGameABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ZoomerCoin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export const zoomerCoinABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'detailsHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_newName', internalType: 'string', type: 'string' },
      { name: '_newSymbol', internalType: 'string', type: 'string' },
      { name: '_newDecimals', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'setDetails',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_detailsHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setDetailsHash',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export const zoomerCoinAddress = {
  5: '0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1',
} as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export const zoomerCoinConfig = {
  address: zoomerCoinAddress,
  abi: zoomerCoinABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc721ABI, ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721GetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"name"`.
 */
export function useErc721Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721OwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useErc721TokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721TokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc721TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, TFunctionName, TMode>({
    abi: erc721ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc721ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'approve', TMode>({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721SafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'safeTransferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721SetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof erc721ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'setApprovalForAll', TMode>({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'transferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function usePrepareErc721Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"GAME_TIME"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameGameTime<
  TFunctionName extends 'GAME_TIME',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'GAME_TIME',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"MIN_INVEST_TICK"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameMinInvestTick<
  TFunctionName extends 'MIN_INVEST_TICK',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'MIN_INVEST_TICK',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"MIN_ZOOMER"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameMinZoomer<
  TFunctionName extends 'MIN_ZOOMER',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'MIN_ZOOMER',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"ZOOMER_HITS"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameZoomerHits<
  TFunctionName extends 'ZOOMER_HITS',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'ZOOMER_HITS',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"allowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"collectedFee"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameCollectedFee<
  TFunctionName extends 'collectedFee',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'collectedFee',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"decimals"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"devFund"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameDevFund<
  TFunctionName extends 'devFund',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'devFund',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"finalLottoValueETH"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameFinalLottoValueEth<
  TFunctionName extends 'finalLottoValueETH',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'finalLottoValueETH',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"finalLottoWinner"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameFinalLottoWinner<
  TFunctionName extends 'finalLottoWinner',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'finalLottoWinner',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"finalPotValueETH"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameFinalPotValueEth<
  TFunctionName extends 'finalPotValueETH',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'finalPotValueETH',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"getMyDividend"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameGetMyDividend<
  TFunctionName extends 'getMyDividend',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'getMyDividend',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"hasEnoughZoomer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameHasEnoughZoomer<
  TFunctionName extends 'hasEnoughZoomer',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'hasEnoughZoomer',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"hasNft"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameHasNft<
  TFunctionName extends 'hasNft',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'hasNft',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"hitters"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameHitters<
  TFunctionName extends 'hitters',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'hitters',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"isPaused"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameIsPaused<
  TFunctionName extends 'isPaused',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'isPaused',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"lastPurchasedAddress"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameLastPurchasedAddress<
  TFunctionName extends 'lastPurchasedAddress',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'lastPurchasedAddress',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"lastPurchasedTime"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameLastPurchasedTime<
  TFunctionName extends 'lastPurchasedTime',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'lastPurchasedTime',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"linkAddress"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameLinkAddress<
  TFunctionName extends 'linkAddress',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'linkAddress',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"lottoValueETH"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameLottoValueEth<
  TFunctionName extends 'lottoValueETH',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'lottoValueETH',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"minInvest"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameMinInvest<
  TFunctionName extends 'minInvest',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'minInvest',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"nfts"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameNfts<
  TFunctionName extends 'nfts',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'nfts',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"numHits"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameNumHits<
  TFunctionName extends 'numHits',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'numHits',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"potValueETH"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGamePotValueEth<
  TFunctionName extends 'potValueETH',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'potValueETH',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"totalDividendsValueETH"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameTotalDividendsValueEth<
  TFunctionName extends 'totalDividendsValueETH',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'totalDividendsValueETH',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"vapeTokenPrice"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameVapeTokenPrice<
  TFunctionName extends 'vapeTokenPrice',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'vapeTokenPrice',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"zoomer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameZoomer<
  TFunctionName extends 'zoomer',
  TSelectData = ReadContractResult<typeof vapeGameABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'zoomer',
    ...config,
  } as UseContractReadConfig<typeof vapeGameABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof vapeGameABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, TFunctionName, TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"acceptOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameAcceptOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'acceptOwnership'
        >['request']['abi'],
        'acceptOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'acceptOwnership'
      }
    : UseContractWriteConfig<typeof vapeGameABI, 'acceptOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'acceptOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'acceptOwnership', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'acceptOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof vapeGameABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'approve', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      }
    : UseContractWriteConfig<typeof vapeGameABI, 'decreaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'decreaseAllowance', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      }
    : UseContractWriteConfig<typeof vapeGameABI, 'increaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'increaseAllowance', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"payMyDividend"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGamePayMyDividend<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'payMyDividend'
        >['request']['abi'],
        'payMyDividend',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'payMyDividend'
      }
    : UseContractWriteConfig<typeof vapeGameABI, 'payMyDividend', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'payMyDividend'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'payMyDividend', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'payMyDividend',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"paydDevFee"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGamePaydDevFee<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'paydDevFee'
        >['request']['abi'],
        'paydDevFee',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'paydDevFee' }
    : UseContractWriteConfig<typeof vapeGameABI, 'paydDevFee', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'paydDevFee'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'paydDevFee', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'paydDevFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"rawFulfillRandomWords"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameRawFulfillRandomWords<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'rawFulfillRandomWords'
        >['request']['abi'],
        'rawFulfillRandomWords',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'rawFulfillRandomWords'
      }
    : UseContractWriteConfig<
        typeof vapeGameABI,
        'rawFulfillRandomWords',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'rawFulfillRandomWords'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'rawFulfillRandomWords', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'rawFulfillRandomWords',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"startGame"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameStartGame<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'startGame'
        >['request']['abi'],
        'startGame',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'startGame' }
    : UseContractWriteConfig<typeof vapeGameABI, 'startGame', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'startGame'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'startGame', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'startGame',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"sweep"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameSweep<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'sweep'
        >['request']['abi'],
        'sweep',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'sweep' }
    : UseContractWriteConfig<typeof vapeGameABI, 'sweep', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'sweep'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'sweep', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'sweep',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"takeAVapeHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameTakeAVapeHit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'takeAVapeHit'
        >['request']['abi'],
        'takeAVapeHit',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'takeAVapeHit'
      }
    : UseContractWriteConfig<typeof vapeGameABI, 'takeAVapeHit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'takeAVapeHit'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'takeAVapeHit', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'takeAVapeHit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"takeTheLastHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameTakeTheLastHit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'takeTheLastHit'
        >['request']['abi'],
        'takeTheLastHit',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'takeTheLastHit'
      }
    : UseContractWriteConfig<typeof vapeGameABI, 'takeTheLastHit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'takeTheLastHit'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'takeTheLastHit', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'takeTheLastHit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof vapeGameABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'transfer', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof vapeGameABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'transferFrom', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof vapeGameABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'transferOwnership', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"withdrawLink"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameWithdrawLink<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeGameAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeGameABI,
          'withdrawLink'
        >['request']['abi'],
        'withdrawLink',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawLink'
      }
    : UseContractWriteConfig<typeof vapeGameABI, 'withdrawLink', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawLink'
      } = {} as any,
) {
  return useContractWrite<typeof vapeGameABI, 'withdrawLink', TMode>({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'withdrawLink',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"acceptOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameAcceptOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'acceptOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'acceptOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'acceptOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'decreaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'increaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"payMyDividend"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGamePayMyDividend(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'payMyDividend'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'payMyDividend',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'payMyDividend'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"paydDevFee"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGamePaydDevFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'paydDevFee'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'paydDevFee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'paydDevFee'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"rawFulfillRandomWords"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameRawFulfillRandomWords(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'rawFulfillRandomWords'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'rawFulfillRandomWords',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof vapeGameABI,
    'rawFulfillRandomWords'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"startGame"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameStartGame(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'startGame'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'startGame',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'startGame'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"sweep"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameSweep(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'sweep'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'sweep',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'sweep'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"takeAVapeHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameTakeAVapeHit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'takeAVapeHit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'takeAVapeHit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'takeAVapeHit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"takeTheLastHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameTakeTheLastHit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'takeTheLastHit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'takeTheLastHit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'takeTheLastHit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"withdrawLink"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function usePrepareVapeGameWithdrawLink(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeGameABI, 'withdrawLink'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    functionName: 'withdrawLink',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeGameABI, 'withdrawLink'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeGameABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof vapeGameABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    ...config,
  } as UseContractEventConfig<typeof vapeGameABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeGameABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof vapeGameABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof vapeGameABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeGameABI}__ and `eventName` set to `"GotDividend"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameGotDividendEvent(
  config: Omit<
    UseContractEventConfig<typeof vapeGameABI, 'GotDividend'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    eventName: 'GotDividend',
    ...config,
  } as UseContractEventConfig<typeof vapeGameABI, 'GotDividend'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeGameABI}__ and `eventName` set to `"LottoWon"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameLottoWonEvent(
  config: Omit<
    UseContractEventConfig<typeof vapeGameABI, 'LottoWon'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    eventName: 'LottoWon',
    ...config,
  } as UseContractEventConfig<typeof vapeGameABI, 'LottoWon'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeGameABI}__ and `eventName` set to `"OwnershipTransferRequested"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameOwnershipTransferRequestedEvent(
  config: Omit<
    UseContractEventConfig<typeof vapeGameABI, 'OwnershipTransferRequested'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    eventName: 'OwnershipTransferRequested',
    ...config,
  } as UseContractEventConfig<typeof vapeGameABI, 'OwnershipTransferRequested'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeGameABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof vapeGameABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof vapeGameABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeGameABI}__ and `eventName` set to `"TookAHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameTookAHitEvent(
  config: Omit<
    UseContractEventConfig<typeof vapeGameABI, 'TookAHit'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    eventName: 'TookAHit',
    ...config,
  } as UseContractEventConfig<typeof vapeGameABI, 'TookAHit'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeGameABI}__ and `eventName` set to `"TookTheLastHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameTookTheLastHitEvent(
  config: Omit<
    UseContractEventConfig<typeof vapeGameABI, 'TookTheLastHit'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    eventName: 'TookTheLastHit',
    ...config,
  } as UseContractEventConfig<typeof vapeGameABI, 'TookTheLastHit'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeGameABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6)
 */
export function useVapeGameTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof vapeGameABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vapeGameAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeGameABI,
    address: vapeGameAddress[5],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof vapeGameABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link zoomerCoinABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof zoomerCoinABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return useContractRead({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    ...config,
  } as UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"allowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof zoomerCoinABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return useContractRead({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof zoomerCoinABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return useContractRead({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"decimals"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof zoomerCoinABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return useContractRead({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"detailsHash"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinDetailsHash<
  TFunctionName extends 'detailsHash',
  TSelectData = ReadContractResult<typeof zoomerCoinABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return useContractRead({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'detailsHash',
    ...config,
  } as UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof zoomerCoinABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return useContractRead({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof zoomerCoinABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return useContractRead({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof zoomerCoinABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return useContractRead({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof zoomerCoinABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof zoomerCoinABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, TFunctionName, TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof zoomerCoinABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, 'approve', TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinBurn<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          'burn'
        >['request']['abi'],
        'burn',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burn' }
    : UseContractWriteConfig<typeof zoomerCoinABI, 'burn', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, 'burn', TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      }
    : UseContractWriteConfig<
        typeof zoomerCoinABI,
        'decreaseAllowance',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, 'decreaseAllowance', TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      }
    : UseContractWriteConfig<
        typeof zoomerCoinABI,
        'increaseAllowance',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, 'increaseAllowance', TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<typeof zoomerCoinABI, 'initialize', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, 'initialize', TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof zoomerCoinABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, 'mint', TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"setDetails"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinSetDetails<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          'setDetails'
        >['request']['abi'],
        'setDetails',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setDetails' }
    : UseContractWriteConfig<typeof zoomerCoinABI, 'setDetails', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setDetails'
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, 'setDetails', TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'setDetails',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"setDetailsHash"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinSetDetailsHash<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          'setDetailsHash'
        >['request']['abi'],
        'setDetailsHash',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setDetailsHash'
      }
    : UseContractWriteConfig<typeof zoomerCoinABI, 'setDetailsHash', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setDetailsHash'
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, 'setDetailsHash', TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'setDetailsHash',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof zoomerCoinABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, 'transfer', TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof zoomerCoinABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, 'transferFrom', TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof zoomerCoinAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof zoomerCoinABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<
        typeof zoomerCoinABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof zoomerCoinABI, 'transferOwnership', TMode>({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'decreaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'increaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"initialize"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"setDetails"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinSetDetails(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'setDetails'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'setDetails',
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'setDetails'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"setDetailsHash"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinSetDetailsHash(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'setDetailsHash'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'setDetailsHash',
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'setDetailsHash'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link zoomerCoinABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function usePrepareZoomerCoinTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof zoomerCoinABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link zoomerCoinABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof zoomerCoinABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return useContractEvent({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    ...config,
  } as UseContractEventConfig<typeof zoomerCoinABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link zoomerCoinABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof zoomerCoinABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return useContractEvent({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof zoomerCoinABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link zoomerCoinABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1)
 */
export function useZoomerCoinTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof zoomerCoinABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof zoomerCoinAddress } = {} as any,
) {
  return useContractEvent({
    abi: zoomerCoinABI,
    address: zoomerCoinAddress[5],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof zoomerCoinABI, 'Transfer'>)
}
