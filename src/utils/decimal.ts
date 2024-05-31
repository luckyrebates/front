import { ethers } from 'ethers';
import { TaskControlWithTokenAddress } from '@src/contract/address';
const USDTAddress = '0x314765C2B696e7Ac04e8c61f65aE0372eb33F060';
const BNBAddress = '0x1f33f414067E6aA5fAFAB725232D50ce259D1843';

interface CoinInfoType {
  coinName: string;
  decimal: number;
}

export const COIN_INFO_MAP_BY_ADDRESS: {
  [key: string]: CoinInfoType;
} = {
  [USDTAddress.toLocaleUpperCase()]: {
    coinName: 'USDT',
    decimal: 6,
  },
  [BNBAddress.toLocaleUpperCase()]: {
    coinName: 'BNB',
    decimal: 6,
  },
  [TaskControlWithTokenAddress.toLocaleUpperCase()]: {
    coinName: 'Lucky Ticket',
    decimal: 18,
  },
};

export function decimalParse(
  address: string = '',
  num: string | bigint | number = 0,
  type: 'multiplication' | 'division' = 'multiplication',
) {
  const coinInfo: CoinInfoType = COIN_INFO_MAP_BY_ADDRESS?.[address?.toLocaleUpperCase()] ?? {};
  if (!coinInfo?.coinName) {
    if (!!address) {
      console.error(`The decimalParse function passed in an unexpected contract address: ${address}`);
    }
    return {
      coinName: '',
      decimal: 0,
      value: num.toString(),
    };
  }
  const { decimal = 0 } = coinInfo;
  const numericalValue = Math.pow(10, decimal);
  let value = '0';
  if (type === 'multiplication') {
    value = (BigInt(num) * BigInt(numericalValue)).toString();
  } else if (type === 'division') {
    value = ethers.formatUnits(BigInt(num), decimal);
  }
  return {
    ...coinInfo,
    value,
  };
}

export function usdtDecimalParse(num: string | bigint | number, type: 'multiplication' | 'division') {
  return decimalParse(USDTAddress, num, type);
}

export function bnbDecimalParse(num: string | bigint | number, type: 'multiplication' | 'division') {
  return decimalParse(BNBAddress, num, type);
}

export function luckyTicketDecimalParse(num: string | bigint | number, type: 'multiplication' | 'division') {
  return decimalParse(TaskControlWithTokenAddress, num, type);
}
