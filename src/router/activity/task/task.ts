import { t } from '@src/component/i18n';
import iinchImage from '@src/image/partners/1inch.png';
import aaveImage from '@src/image/partners/aave.png';
import blurImage from '@src/image/partners/blur.png';
import cbridgeImage from '@src/image/partners/cbridge.png';
import chainLinkImage from '@src/image/partners/chainLink.png';
import compoundImage from '@src/image/partners/compound.png';
import etherFiImage from '@src/image/partners/etherFi.png';
import lidoImage from '@src/image/partners/lido.png';
import openseaImage from '@src/image/partners/opensea.png';
import uniswapImage from '@src/image/partners/uniswap.png';

export interface TaskType {
  id: string;
  business?: string;
  title?: string;
  content?: string;
  rule?: string;
  status?: 'open' | 'wait';
  contractTaskName?: string;
  taskAddress: string;
  type?: 'mintToken' | 'getTicket';
  officialWebsite?: string;
  image?: string;
  taskType: 'PLEDGED_DEPOSIT' | 'CROSS_CHAIN_CHECK_IN' | 'SWAP' | 'LENDING' | 'NFT' | 'SIGN_IN' | 'FOLLOW';
  activityPlatform: 'SELF' | 'PARTNERS';
}

export const TASK_ID_MAP = {
  selfLid01: 'self-Lid0-1',
  selfEtherF12: 'self-EtherF1-2',
  selfCCIP3: 'self-CCIP-3',
  selfCbr1dge4: 'self-Cbr1dge-4',
  selfAaue5: 'self-Aaue-5',
  selfComp0und6: 'self-Comp0und-6',
  selfUn1swap7: 'self-Un1swap-7',
  selfIinch8: 'self-iinch-8',
  selfBlvr9: 'self-Blvr-9',
  selfOpemsea10: 'self-Opemsea-10',
  partnerBinonce1: 'partner-binonce-1',
  partnerLuckyTask2: 'partner-Lucky-Task-2',
  partnerForc0stor3: 'partner-Forc0stor-3',
};

export const SELF_TASK_LIST: TaskType[] = [
  {
    id: TASK_ID_MAP.selfLid01,
    business: 'Lid0',
    title: t('质押入金'),
    content: t('立即参与eth质押，即可获得免费抽奖积分'),
    rule: t('通过本渠道参与Lid0质押。0.1eth质押即可获取10抽奖积分，参与不影响质押收益'),
    status: 'open',
    contractTaskName: 'StakeETHTask',
    taskAddress: '0x62DB5227547099F88197bF4250b2d75B01079A2b',
    type: 'mintToken',
    officialWebsite: 'https://lido.fi',
    taskType: 'PLEDGED_DEPOSIT',
    activityPlatform: 'SELF',
    image: lidoImage,
  },
  {
    id: TASK_ID_MAP.selfEtherF12,
    business: 'EtherF1',
    title: t('质押入金'),
    content: t('立即参与eth质押，即可获得免费抽奖积分'),
    rule: t('通过本渠道参与EtherF1质押。0.1eth质押即可获取10抽奖积分，参与不影响质押收益'),
    status: 'wait',
    contractTaskName: '',
    taskAddress: '',
    type: 'mintToken',
    officialWebsite: 'https://www.ether.fi',
    taskType: 'PLEDGED_DEPOSIT',
    activityPlatform: 'SELF',
    image: etherFiImage,
  },
  {
    id: TASK_ID_MAP.selfCCIP3,
    business: 'Chainlink-CCIP',
    title: t('跨链打卡'),
    content: t('完成avalanche链交互，即可获得免费抽奖积分'),
    rule: t('通过本渠道参与一次avalanche链跨链交互，即可获取10积分'),
    status: 'open',
    contractTaskName: 'CrossChainSenderTaskControl',
    taskAddress: '0x1197a9394b5F19469004ac9050911024a3CB23d7',
    type: 'mintToken',
    officialWebsite: 'https://chain.link/cross-chain',
    taskType: 'CROSS_CHAIN_CHECK_IN',
    activityPlatform: 'SELF',
    image: chainLinkImage,
  },
  {
    id: TASK_ID_MAP.selfCbr1dge4,
    business: 'Cbr1dge',
    title: t('跨链打卡'),
    content: t('完成avalanche链交互，即可获得免费抽奖积分'),
    rule: t('通过本渠道参与一次avalanche链跨链交互，即可获取10积分'),
    status: 'wait',
    contractTaskName: '',
    taskAddress: '',
    type: 'mintToken',
    officialWebsite: 'https://cbridge.celer.network',
    taskType: 'CROSS_CHAIN_CHECK_IN',
    activityPlatform: 'SELF',
    image: cbridgeImage,
  },
  {
    id: TASK_ID_MAP.selfAaue5,
    business: 'Aaue',
    title: t('代币借贷'),
    content: t('参与指定代币借贷，即可获得免费抽奖额度'),
    rule: '',
    status: 'wait',
    taskAddress: '',
    officialWebsite: 'https://aave.com',
    taskType: 'LENDING',
    activityPlatform: 'SELF',
    image: aaveImage,
  },
  {
    id: TASK_ID_MAP.selfComp0und6,
    business: 'Comp0und',
    title: t('代币借贷'),
    content: t('参与指定代币借贷，即可获得免费抽奖额度'),
    rule: '',
    status: 'wait',
    taskAddress: '',
    officialWebsite: 'https://compound.finance',
    taskType: 'LENDING',
    activityPlatform: 'SELF',
    image: compoundImage,
  },
  {
    id: TASK_ID_MAP.selfUn1swap7,
    business: 'Un1swap',
    title: t('swap返现'),
    content: t('参与指定swap交易对兑换，即可获得免费抽奖额度'),
    rule: t('通过本渠道参与usdt/usdc交易对兑换，每100兑换额度即可获得1积分'),
    status: 'wait',
    taskAddress: '',
    officialWebsite: 'https://uniswap.org',
    taskType: 'SWAP',
    activityPlatform: 'SELF',
    image: uniswapImage,
  },
  {
    id: TASK_ID_MAP.selfIinch8,
    business: 'iinch',
    title: t('swap返现'),
    content: t('参与指定swap交易对兑换，即可获得免费抽奖额度'),
    rule: t('通过本渠道参与usdt/usdc交易对兑换，每100兑换额度即可获得1积分'),
    status: 'wait',
    taskAddress: '',
    officialWebsite: 'https://app.1inch.io',
    taskType: 'SWAP',
    activityPlatform: 'SELF',
    image: iinchImage,
  },
  {
    id: TASK_ID_MAP.selfBlvr9,
    business: 'Blvr',
    title: t('NFT交易返现'),
    content: t('参与NFT交易，即可获得免费抽奖额度'),
    rule: '',
    status: 'wait',
    taskAddress: '',
    officialWebsite: 'https://blur.io',
    taskType: 'NFT',
    activityPlatform: 'SELF',
    image: blurImage,
  },
  {
    id: TASK_ID_MAP.selfOpemsea10,
    business: 'Opemsea',
    title: t('NFT交易返现'),
    content: t('参与NFT交易，即可获得免费抽奖额度'),
    rule: '',
    status: 'wait',
    taskAddress: '',
    officialWebsite: 'https://opensea.io',
    taskType: 'NFT',
    activityPlatform: 'SELF',
    image: openseaImage,
  },
];

export const PARTNERS_TASK_LIST: TaskType[] = [
  {
    id: TASK_ID_MAP.partnerBinonce1,
    business: 'Binonce',
    title: t('DEX互动奖励'),
    content: t('完成指定交易所互动，即可参与交易所独家抽奖活动，赢取BNB大奖'),
    rule: t('通过本渠道完成指定交易所互动，即可获取（指定抽奖名称）1投注'),
    status: 'open',
    contractTaskName: 'TaskControlDirect',
    taskAddress: '0x27f1e02c360af7d756B27F26f41779ACCa6d7399',
    type: 'getTicket',
    taskType: 'SIGN_IN',
    activityPlatform: 'PARTNERS',
  },
  {
    id: TASK_ID_MAP.partnerLuckyTask2,
    business: 'Lucky Rebates',
    title: t('Lucky Rebates互动'),
    content: t('完成Lucky Rebates互动，即可参与积分抽奖活动，赢取Lucky Rebates积分大奖'),
    rule: t('通过本渠道完成指定Lucky Rebates互动，即可获取（指定抽奖名称）1投注'),
    status: 'open',
    contractTaskName: 'TaskControlDirect',
    taskAddress: '0x82b4Ad5FC81d1C715B4016ab0dFF3B31f976ba19',
    type: 'getTicket',
    taskType: 'SIGN_IN',
    activityPlatform: 'PARTNERS',
  },
  {
    id: TASK_ID_MAP.partnerForc0stor3,
    business: 'Forc0stor',
    title: t('SocialFi关注'),
    content: t('关注指定KOL，即可获得免费抽奖额度'),
    rule: t('通过本渠道关注Lucky Rebates，即可获取（指定抽奖）1投注'),
    status: 'open',
    contractTaskName: 'TaskControlDirect',
    taskAddress: '0xeFd1804f48bD6998a4A4791daa046C536D930dec',
    type: 'getTicket',
    taskType: 'FOLLOW',
    activityPlatform: 'PARTNERS',
  },
];

const ALL_TASK_LIST = [...SELF_TASK_LIST, ...PARTNERS_TASK_LIST];

const defaultTask: TaskType = {
  id: '0',
  business: '',
  title: '',
  content: '',
  rule: '',
  status: 'wait',
  contractTaskName: '',
  type: 'getTicket',
  taskAddress: '',
  taskType: 'SWAP',
  activityPlatform: 'SELF',
};

export function getTask(id: string): TaskType {
  let task = ALL_TASK_LIST.find((i) => i.id.toLocaleUpperCase() === id.toLocaleUpperCase());
  if (!task) {
    task = defaultTask;
  }
  return task;
}

export function getTaskByTaskAddress(taskAddress: string) {
  const allTaskList = [...SELF_TASK_LIST, ...PARTNERS_TASK_LIST].filter((i) => !!i.taskAddress);
  let task = allTaskList.find((i) => i.taskAddress.toLocaleUpperCase() === taskAddress.toLocaleUpperCase());
  if (!task) {
    task = defaultTask;
  }
  return task;
}
