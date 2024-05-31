import { ethers } from 'ethers';
import moment from 'moment';
import { PARTNERS_TASK_LIST } from '@src/router/activity/task/task';
import { QueryActivityDetailResponse } from '@src/api';
import { t } from '@src/component/i18n';

export function truncateString(
  str: string,
  showLength = 8,
  position: 'front' | 'middle' | 'end' = 'middle',
  ellipsis = '...',
): string {
  if (typeof str !== 'string' || typeof showLength !== 'number' || !['front', 'middle', 'end'].includes(position)) {
    return str;
  }
  if (str.length <= showLength) {
    return str;
  }
  if (position === 'front') {
    return `${ellipsis}${str.slice(-showLength)}`;
  } else if (position === 'middle') {
    const frontChars = Math.ceil(showLength / 2);
    const endChars = Math.floor(showLength / 2);
    return `${str.slice(0, frontChars)}${ellipsis}${str.slice(-endChars)}`;
  } else if (position === 'end') {
    return `${str.slice(0, showLength)}${ellipsis}`;
  }
  return str;
}

export function numberWithCommas(number: number) {
  if (!number || Number.isNaN(number)) {
    return number;
  }
  return Number(number).toLocaleString('en-US');
}

export function getAllQueryVariable(): Record<string, string> {
  const query: string = window.location.search.substring(1);
  const vars: string[] = query.split('&');
  const queryVariables: Record<string, string> = {};

  for (let i = 0; i < vars.length; i++) {
    const pair: string[] = vars[i].split('=');
    const key: string = decodeURIComponent(pair[0]);
    const value: string = decodeURIComponent(pair[1]);

    queryVariables[key] = value;
  }

  return queryVariables;
}

export function decimalFormatEtherFromBigInt(wei: bigint) {
  if (!wei) {
    return '0';
  }
  return ethers.formatEther(wei);
}

export function activityIsMustWin({
  max_prize_num = 0,
  max_ticket = 0,
}: {
  max_prize_num?: number;
  max_ticket?: number;
}) {
  return max_prize_num === max_ticket;
}

const RedPacketTypeTips = {
  MustWin: t('参与即可中奖，金额随机数'),
  Lucky: t('中奖名额有限，可抽取大额奖金'),
};

interface RedPacketType {
  subTitle: string;
  subTitleTips: string;
  tips: string;
  redPacketType: 'MustWin' | 'Lucky' | '';
  modelType: 'Self' | 'Partner' | '';
  modelTypeName: string;
}
const RedPacketTypeMap: { [key: string]: RedPacketType } = {
  undefined: {
    subTitle: '',
    subTitleTips: '',
    tips: '',
    redPacketType: '',
    modelType: '',
    modelTypeName: '',
  },
  SelfMustWin: {
    subTitle: t('普通抽奖'),
    subTitleTips: RedPacketTypeTips.MustWin,
    tips: t('参与即可中奖，金额随机'),
    redPacketType: 'MustWin',
    modelType: 'Self',
    modelTypeName: t('积分兑换抽奖'),
  },
  SelfLucky: {
    subTitle: t('拼手气抽奖'),
    subTitleTips: RedPacketTypeTips.Lucky,
    tips: t('中奖名额有限，最大赢取全额奖金'),
    redPacketType: 'Lucky',
    modelType: 'Self',
    modelTypeName: t('积分兑换抽奖'),
  },
  PartnerMustWin: {
    subTitle: t('普通抽奖'),
    subTitleTips: RedPacketTypeTips.MustWin,
    tips: t('合作方锁定奖品到链上，并指定投注规则及中奖数量'),
    redPacketType: 'MustWin',
    modelType: 'Partner',
    modelTypeName: t('合作方抽奖'),
  },
  PartnerLucky: {
    subTitle: t('拼手气抽奖'),
    subTitleTips: RedPacketTypeTips.Lucky,
    tips: t('合作方锁定奖品到链上，并指定投注规则及中奖数量'),
    redPacketType: 'Lucky',
    modelType: 'Partner',
    modelTypeName: t('合作方抽奖'),
  },
};

export function redPacketDataAnalysis(
  data: Partial<QueryActivityDetailResponse & { task_id: string }>,
): RedPacketType & {
  injectAmount: number;
  totalAmount: number;
  remainingAvailableForPurchase: number;
  alias: string;
} {
  const {
    model = 0,
    max_ticket = 0,
    max_prize_num = 0,
    inject_ticket = 0,
    ticket_price = 0,
    buy_ticket = 0,
    send_ticket = 0,
    start_timestamp = 0,
    task_id = '',
  } = data;
  const isMustWin = activityIsMustWin({ max_prize_num, max_ticket });
  const extendedData = {
    injectAmount: 0,
    totalAmount: 0,
    remainingAvailableForPurchase: 0,
    alias: '',
  };
  const defalutValue = { ...RedPacketTypeMap.undefined, ...extendedData };
  if (!model) {
    return defalutValue;
  }
  extendedData.injectAmount = inject_ticket * ticket_price;
  extendedData.totalAmount = (inject_ticket + buy_ticket) * ticket_price;
  extendedData.remainingAvailableForPurchase = max_ticket - buy_ticket - send_ticket;

  if (model === 1 && isMustWin) {
    return {
      ...RedPacketTypeMap.SelfMustWin,
      ...extendedData,
      alias: t('{{name}}期', { name: moment(start_timestamp).format('YYYYMMDDhh') }),
    };
  } else if (model === 1 && !isMustWin) {
    return {
      ...RedPacketTypeMap.SelfLucky,
      ...extendedData,
      alias: t('{{name}}期', { name: moment(start_timestamp).format('YYYYMMDDhh') }),
    };
  } else if (model === 2 && isMustWin) {
    const task = PARTNERS_TASK_LIST.find((i) => i.id === task_id);
    return {
      ...RedPacketTypeMap.PartnerMustWin,
      ...extendedData,
      alias: task?.business ? t('{{taskTitle}}抽奖', { taskTitle: task?.title }) : '',
    };
  } else if (model === 2 && !isMustWin) {
    const task = PARTNERS_TASK_LIST.find((i) => i.id === task_id);
    return {
      ...RedPacketTypeMap.PartnerMustWin,
      ...extendedData,
      alias: task?.business ? t('{{taskTitle}}抽奖', { taskTitle: task?.title }) : '',
    };
  }
  return defalutValue;
}

export function numberFormat(num: number | string | bigint) {
  if (!num) {
    return '0';
  }
  return Number(num).toLocaleString('en-US');
}

export function truncateDecimal(str: string, decimalPlaces = 0) {
  if (!str) {
    return '';
  }
  if (decimalPlaces === 0) {
    return str.split('.')[0];
  }
  const decimalIndex = str.indexOf('.');
  if (decimalIndex === -1 || str.length - decimalIndex <= decimalPlaces + 1) {
    return str;
  }
  return str.substring(0, decimalIndex + decimalPlaces + 1);
}

export function uint256(num: number | bigint) {
  return ethers.AbiCoder.defaultAbiCoder().encode(['uint256'], [BigInt(num)]);
}
