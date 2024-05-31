import { t } from '@src/component/i18n';

interface COMMON_NAME_MAP_TYPE<ExpandObject> {
  [props: string]: { value: number; describe: string } & ExpandObject;
}
interface COMMON_VALUE_MAP_TYPE<ExpandObject> {
  [props: string]: { value: number; describe: string; name: string } & ExpandObject;
}
function CommonValueMap<ExpandObject>(nameMap: COMMON_NAME_MAP_TYPE<ExpandObject>) {
  const data = {} as COMMON_VALUE_MAP_TYPE<ExpandObject>;
  Object.keys(nameMap).forEach((i) => {
    data[nameMap[i].value] = { ...nameMap[i], name: i };
  });
  return data;
}

export const GIFT_STATUS_MAP = {
  OPEN: { value: 1, describe: t('可投注') },
  WAIT: { value: 2, describe: t('投注期已结束，等待开奖') },
  COMPLETED: { value: 3, describe: t('已开奖') },
};

export const GIFT_STATUS_VALUE_MAP = CommonValueMap(GIFT_STATUS_MAP);

export const GIFT_MODEL_NAME_MAP = {
  GET: { value: 1, describe: t('完成任务，获取Lucky Ticket，使用Lucky Ticket进行投注'), title: t('积分兑换抽奖') },
  SEND: { value: 2, describe: t('完成任务后，合约会自动对任务指定的抽奖进行投注'), title: t('合作方抽奖') },
};

export const GIFT_MODEL_VALUE_MAP = CommonValueMap<{ title: string }>(GIFT_MODEL_NAME_MAP);

export const GIFT_TYPE_NAME_MAP = {
  gift: { value: 1, describe: t('抽奖活动') },
};
