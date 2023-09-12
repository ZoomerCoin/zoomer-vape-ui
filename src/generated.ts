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
// VapeGame
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const vapeGameABI = [
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
    inputs: [{ name: 'useraddress', internalType: 'address', type: 'address' }],
    name: 'getMyDividend',
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
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
    inputs: [],
    name: 'startGame',
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'vapeTokenPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const vapeGameAddress = {
  5: '0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A',
} as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const vapeGameConfig = {
  address: vapeGameAddress,
  abi: vapeGameABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"MIN_INVEST_TICK"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"allowance"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"getMyDividend"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"isPaused"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"minInvest"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"startGame"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"takeAVapeHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"startGame"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link vapeGameABI}__ and `functionName` set to `"takeAVapeHit"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeGameABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link vapeGameABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
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
