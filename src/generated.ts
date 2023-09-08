import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VapeToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export const vapeTokenABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
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
    inputs: [],
    name: 'MIN_INVEST_TICK',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    name: 'getETHPotValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getEthFeesValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getLastPurchasedTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getMinInvest',
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
    inputs: [],
    name: 'getvapeTokenPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'rewardsContract',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
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
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'vapeTokenPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export const vapeTokenAddress = {
  5: '0x38A305d6250895b9d3f496305F4c2eC8265FD7aA',
} as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export const vapeTokenConfig = {
  address: vapeTokenAddress,
  abi: vapeTokenABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"MIN_INVEST_TICK"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenMinInvestTick<
  TFunctionName extends 'MIN_INVEST_TICK',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'MIN_INVEST_TICK',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"allowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"collectedFee"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenCollectedFee<
  TFunctionName extends 'collectedFee',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'collectedFee',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"decimals"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"devFund"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenDevFund<
  TFunctionName extends 'devFund',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'devFund',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"getETHPotValue"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenGetEthPotValue<
  TFunctionName extends 'getETHPotValue',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'getETHPotValue',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"getEthFeesValue"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenGetEthFeesValue<
  TFunctionName extends 'getEthFeesValue',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'getEthFeesValue',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"getLastPurchasedTime"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenGetLastPurchasedTime<
  TFunctionName extends 'getLastPurchasedTime',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'getLastPurchasedTime',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"getMinInvest"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenGetMinInvest<
  TFunctionName extends 'getMinInvest',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'getMinInvest',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"getMyDividend"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenGetMyDividend<
  TFunctionName extends 'getMyDividend',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'getMyDividend',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"getvapeTokenPrice"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenGetvapeTokenPrice<
  TFunctionName extends 'getvapeTokenPrice',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'getvapeTokenPrice',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"isPaused"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenIsPaused<
  TFunctionName extends 'isPaused',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'isPaused',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"lastPurchasedAddress"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenLastPurchasedAddress<
  TFunctionName extends 'lastPurchasedAddress',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'lastPurchasedAddress',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"lastPurchasedTime"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenLastPurchasedTime<
  TFunctionName extends 'lastPurchasedTime',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'lastPurchasedTime',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"minInvest"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenMinInvest<
  TFunctionName extends 'minInvest',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'minInvest',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"potValueETH"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenPotValueEth<
  TFunctionName extends 'potValueETH',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'potValueETH',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"rewardsContract"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenRewardsContract<
  TFunctionName extends 'rewardsContract',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'rewardsContract',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"totalDividendsValueETH"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenTotalDividendsValueEth<
  TFunctionName extends 'totalDividendsValueETH',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'totalDividendsValueETH',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"vapeTokenPrice"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenVapeTokenPrice<
  TFunctionName extends 'vapeTokenPrice',
  TSelectData = ReadContractResult<typeof vapeTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractRead({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'vapeTokenPrice',
    ...config,
  } as UseContractReadConfig<typeof vapeTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof vapeTokenABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, TFunctionName, TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof vapeTokenABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, 'approve', TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
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
        typeof vapeTokenABI,
        'decreaseAllowance',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, 'decreaseAllowance', TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
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
        typeof vapeTokenABI,
        'increaseAllowance',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, 'increaseAllowance', TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenPause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
          'pause'
        >['request']['abi'],
        'pause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'pause' }
    : UseContractWriteConfig<typeof vapeTokenABI, 'pause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'pause'
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, 'pause', TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"payMyDividend"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenPayMyDividend<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
          'payMyDividend'
        >['request']['abi'],
        'payMyDividend',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'payMyDividend'
      }
    : UseContractWriteConfig<typeof vapeTokenABI, 'payMyDividend', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'payMyDividend'
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, 'payMyDividend', TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'payMyDividend',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"paydDevFee"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenPaydDevFee<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
          'paydDevFee'
        >['request']['abi'],
        'paydDevFee',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'paydDevFee' }
    : UseContractWriteConfig<typeof vapeTokenABI, 'paydDevFee', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'paydDevFee'
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, 'paydDevFee', TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'paydDevFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"takeAVapeHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenTakeAVapeHit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
          'takeAVapeHit'
        >['request']['abi'],
        'takeAVapeHit',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'takeAVapeHit'
      }
    : UseContractWriteConfig<typeof vapeTokenABI, 'takeAVapeHit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'takeAVapeHit'
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, 'takeAVapeHit', TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'takeAVapeHit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"takeTheLastHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenTakeTheLastHit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
          'takeTheLastHit'
        >['request']['abi'],
        'takeTheLastHit',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'takeTheLastHit'
      }
    : UseContractWriteConfig<typeof vapeTokenABI, 'takeTheLastHit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'takeTheLastHit'
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, 'takeTheLastHit', TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'takeTheLastHit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof vapeTokenABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, 'transfer', TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof vapeTokenABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, 'transferFrom', TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenUnpause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof vapeTokenAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof vapeTokenABI,
          'unpause'
        >['request']['abi'],
        'unpause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'unpause' }
    : UseContractWriteConfig<typeof vapeTokenABI, 'unpause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unpause'
      } = {} as any,
) {
  return useContractWrite<typeof vapeTokenABI, 'unpause', TMode>({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, 'decreaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, 'increaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, 'pause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"payMyDividend"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenPayMyDividend(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, 'payMyDividend'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'payMyDividend',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, 'payMyDividend'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"paydDevFee"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenPaydDevFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, 'paydDevFee'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'paydDevFee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, 'paydDevFee'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"takeAVapeHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenTakeAVapeHit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, 'takeAVapeHit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'takeAVapeHit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, 'takeAVapeHit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"takeTheLastHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenTakeTheLastHit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, 'takeTheLastHit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'takeTheLastHit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, 'takeTheLastHit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeTokenABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function usePrepareVapeTokenUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof vapeTokenABI, 'unpause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof vapeTokenABI, 'unpause'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeTokenABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof vapeTokenABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    ...config,
  } as UseContractEventConfig<typeof vapeTokenABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeTokenABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof vapeTokenABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof vapeTokenABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeTokenABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x38A305d6250895b9d3f496305F4c2eC8265FD7aA)
 */
export function useVapeTokenTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof vapeTokenABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof vapeTokenAddress } = {} as any,
) {
  return useContractEvent({
    abi: vapeTokenABI,
    address: vapeTokenAddress[5],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof vapeTokenABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc20ABI, ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({
    abi: erc20ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'approve', TMode>({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof erc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transfer', TMode>({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transferFrom', TMode>({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Transfer'>)
}
