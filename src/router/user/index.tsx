import React, { useState, useEffect, ReactNode } from 'react';
import { InnerPage } from '@src/component/page';
import { UserTaskToken } from './UserTaskToken';
import { Tabs, Tab, Box } from '@mui/material';
import { queryUserTicketFetch, QueryUserTicketResponse, PrizeDrawn } from '@src/api';
import { useAccount } from 'wagmi';
import { GIFT_MODEL_NAME_MAP } from '@src/utils/constant';
import { PrizeDrawnList } from './PrizeDrawnList';
import { TicketsPurchaseList } from './TicketsPurchaseList';
import { TicketsGetList } from './TicketsGetList';
import { t } from '@src/component/i18n';

function TabPanel(props: { children?: ReactNode }) {
  return <Box sx={{ flex: 1, height: '100%', overflowY: 'auto', paddingLeft: '20px' }}>{props?.children}</Box>;
}

const defaultUserTicketResponse = {
  address: '',
  claim_prize_list: [],
  prize_drawn_list: [],
  tickets_purchase_list: [],
  tickets_get_list: [],
};

type TabsValueType =
  | 'luckyTaskToken'
  | 'selfPrizeDrawnList'
  | 'partnerPrizeDrawnList'
  | 'tickets_purchase_list'
  | 'tickets_get_list';

function prizeDrawnListFilter(list: PrizeDrawn[]) {
  // 平台中奖记录
  const selfPrizeDrawnList: (PrizeDrawn & { id: number })[] = [];
  // 第三方中奖记录
  const partnerPrizeDrawnList: (PrizeDrawn & { id: number })[] = [];

  list.forEach((item, index) => {
    if (item?.activity?.model === GIFT_MODEL_NAME_MAP.GET.value) {
      selfPrizeDrawnList.push({ id: index, ...item });
    } else if (item?.activity?.model === GIFT_MODEL_NAME_MAP.GET.value) {
      partnerPrizeDrawnList.push({ id: index, ...item });
    }
  });

  return {
    selfPrizeDrawnList,
    partnerPrizeDrawnList,
  };
}

export function User() {
  const [value, setValue] = useState<TabsValueType>('selfPrizeDrawnList');

  const { isConnected, address } = useAccount();
  const [userTicket, setUserTicket] = useState<QueryUserTicketResponse>(defaultUserTicketResponse);
  const [loading, setLoading] = useState(true);

  const { selfPrizeDrawnList, partnerPrizeDrawnList } = prizeDrawnListFilter(userTicket?.prize_drawn_list ?? []);

  useEffect(() => {
    if (isConnected && address) {
      queryUserTicketFetch({ address })?.then((data) => {
        setUserTicket(data.data);
        setLoading(false);
      });
    }
  }, [isConnected]);

  const handleChange = (event: React.SyntheticEvent, newValue: TabsValueType) => {
    setValue(newValue);
  };

  return (
    <InnerPage title={t('个人中心')} className="r_user">
      <div className="r_user_body">
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label={t('平台中奖记录')} value={'selfPrizeDrawnList'} />
            <Tab label={t('第三方中奖记录')} value={'partnerPrizeDrawnList'} />
            <Tab label={t('投注记录')} value={'tickets_purchase_list'} />
            <Tab label={t('Lucky积分领取记录')} value={'luckyTaskToken'} />
            <Tab label={t('合作方任务取记录')} value={'tickets_get_list'} />
          </Tabs>
          {value === 'luckyTaskToken' && (
            <TabPanel>
              <UserTaskToken />
            </TabPanel>
          )}
          {value === 'selfPrizeDrawnList' && (
            <TabPanel>
              <PrizeDrawnList data={selfPrizeDrawnList} loading={loading} />
            </TabPanel>
          )}
          {value === 'partnerPrizeDrawnList' && (
            <TabPanel>
              <PrizeDrawnList data={partnerPrizeDrawnList} loading={loading} />
            </TabPanel>
          )}
          {value === 'tickets_purchase_list' && (
            <TabPanel>
              <TicketsPurchaseList
                data={userTicket?.tickets_purchase_list?.map((item, index) => ({
                  id: `${index}-${item.tx_hash}`,
                  ...item,
                }))}
                loading={loading}
              />
            </TabPanel>
          )}
          {value === 'tickets_get_list' && (
            <TabPanel>
              <TicketsGetList
                data={userTicket?.tickets_get_list?.map((item, index) => ({
                  id: `${index}-${item.tx_hash}`,
                  ...item,
                }))}
                loading={loading}
              />
            </TabPanel>
          )}
        </Box>
      </div>
    </InnerPage>
  );
}
