import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Unstable_Grid2';
import { getAllQueryVariable, redPacketDataAnalysis, numberFormat, activityIsMustWin } from '@src/utils/tools';
import { getRandomChristmasGiftImage } from '@src/image/christmasGifts';
import { queryActivityDetailFetch, QueryActivityDetailResponse } from '@src/api';
import { BrowserButton } from '@src/component/button';
import { Loading1 } from '@src/component/loading';
import { SimpleRedPacket } from '@src/component/productCard';
import { CountdownTimer } from '@src/component/countdownTimer';
import { InnerPage } from '@src/component/page';
import { TipsText } from '@src/component/text';
import moment from 'moment';
import { decimalParse } from '@src/utils/decimal';
import { GIFT_MODEL_NAME_MAP, GIFT_STATUS_VALUE_MAP } from '@src/utils/constant';
import { t } from '@src/component/i18n';

export function RedPacketDetail() {
  const { activity_id, task_id } = getAllQueryVariable();
  const [activityDetail, setActivityDetail] = useState<QueryActivityDetailResponse | {}>({});
  const {
    ticket_token = '',
    buy_ticket = 0,
    ticket_price = 0,
    name = '',
    end_time = 0,
    end_timestamp = 0,
    start_timestamp = 0,
    model = 0,
    max_prize_num = 0,
    max_ticket = 0,
    send_ticket = 0,
    activity_state = 0,
    tickets = [],
    winners = [],
  } = activityDetail as QueryActivityDetailResponse;
  const [tabValue, setTabValue] = useState('tickets');
  const [loading, setLoading] = useState(true);

  const {
    subTitle,
    alias,
    injectAmount,
    totalAmount,
    remainingAvailableForPurchase,
    subTitleTips,
    modelTypeName,
    redPacketType,
  } = redPacketDataAnalysis({
    ...activityDetail,
    task_id,
  });

  useEffect(() => {
    queryActivityDetailFetch({ activity_id })?.then((data) => {
      setActivityDetail(data?.data ?? {});
      setLoading(false);
    });
  }, []);

  const endTimeTips = t('截止后10分钟内链上开奖');

  const injectAmountParse = decimalParse(ticket_token, injectAmount, 'division');
  const totalAmountParse = decimalParse(ticket_token, totalAmount, 'division');
  const buyTicketParse = decimalParse(ticket_token, buy_ticket * ticket_price, 'division');

  const infoList = [
    {
      label: t('活动名称'),
      value: !!alias ? alias : name,
    },
    {
      label: t('活动类型'),
      value: modelTypeName,
    },
    { label: t('抽奖类型'), value: subTitle, tips: subTitleTips },
    { label: t('抽奖状态'), value: GIFT_STATUS_VALUE_MAP?.[activity_state]?.describe },
    {
      label: t('当前总奖金额'),
      value: `${numberFormat(totalAmountParse?.value)} ${totalAmountParse?.coinName}`,
      isHide: model === GIFT_MODEL_NAME_MAP.SEND.value,
    },
    {
      label: t('中奖名额上限'),
      value: max_prize_num,
      isHide: redPacketType === 'MustWin',
    },
    { label: t('赞助金额'), value: `${numberFormat(injectAmountParse?.value)} ${injectAmountParse?.coinName}` },
    {
      label: t('投注累计金额'),
      value: `${numberFormat(buyTicketParse?.value)} ${buyTicketParse?.coinName}`,
      isHide: model === GIFT_MODEL_NAME_MAP.SEND.value,
    },
    { label: t('当前总投注数'), value: buy_ticket + send_ticket },
    { label: t('剩余可投注数'), value: remainingAvailableForPurchase, isHide: !max_ticket },
    {
      label: t('抽奖倒计时'),
      value: <CountdownTimer endTime={end_time} />,
      tips: endTimeTips,
    },
    { label: t('创建时间'), value: moment(start_timestamp).format('YYYY-MM-DD hh:mm:ss') },
    { label: t('停止投注时间'), value: moment(end_time).format('YYYY-MM-DD hh:mm:ss') },
    { label: t('开奖时间'), value: moment(end_timestamp).format('YYYY-MM-DD hh:mm:ss') },
  ];

  return (
    <InnerPage title={t('抽奖详情')} className="r_red_packet_activity_detail">
      <div className="r_base_info">
        {loading ? (
          <Loading1 />
        ) : (
          <Grid container spacing={2}>
            <Grid xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: { xs: '100%', sm: '300px' } }}>
                <SimpleRedPacket
                  imgSrc={getRandomChristmasGiftImage(activity_id)}
                  activity_id={activity_id}
                  model={model}
                  activity_state={activity_state}
                  task_id={task_id}
                />
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <div className="r_form r_global_main_background_color">
                {infoList.map(
                  (item) =>
                    item.isHide !== true && (
                      <div className="r_form_item" key={item.label}>
                        <div className="r_form_label">
                          <TipsText tips={item.tips}>{item.label}</TipsText>
                        </div>
                        <div className="r_form_control">{item.value}</div>
                      </div>
                    ),
                )}
              </div>
            </Grid>
          </Grid>
        )}
      </div>
      <Tabs
        sx={{ marginTop: '20px', marginBottom: '20px' }}
        value={tabValue}
        onChange={(_event, value) => {
          setTabValue(value);
        }}
      >
        <Tab label={t('投注记录')} value="tickets" />
        <Tab label={t('中奖记录')} value="winners" />
      </Tabs>
      {tabValue === 'tickets' && (
        <DataGrid
          className="r_global_main_background_color"
          autoHeight
          rows={tickets}
          getRowId={(row) => row.tx_hash}
          hideFooter={true}
          loading={loading}
          columns={[
            {
              field: 'block_timestamp',
              headerName: t('投注时间'),
              width: 160,
              renderCell: ({ row }) => {
                return moment(row?.block_timestamp ?? 0).format('YYYY-MM-DD hh:mm:ss');
              },
            },
            {
              field: 'receiver_address',
              headerName: t('投注地址'),
              flex: 1,
              renderCell: ({ row }) => {
                return <BrowserButton type="address">{row?.receiver_address}</BrowserButton>;
              },
            },
            { field: 'ticket_num', headerName: t('投注数量'), width: 160 },
            {
              field: 'tx_hash',
              headerName: t('交易哈希'),
              flex: 1,
              renderCell: ({ row }) => {
                return <BrowserButton type="tx">{row?.tx_hash}</BrowserButton>;
              },
            },
          ]}
        />
      )}
      {tabValue === 'winners' && (
        <DataGrid
          className="r_global_main_background_color"
          autoHeight
          rows={winners}
          getRowId={(row) => row.receiver_address}
          hideFooter={true}
          loading={loading}
          columns={[
            {
              field: 'block_timestamp',
              headerName: t('投注时间'),
              width: 200,
              renderCell: ({ row }) => {
                return moment(row?.block_timestamp ?? 0).format('YYYY-MM-DD hh:mm:ss');
              },
            },
            {
              field: 'receiver_address',
              headerName: t('领取地址'),
              flex: 1,
              renderCell: ({ row }) => {
                return <BrowserButton type="address">{row?.receiver_address}</BrowserButton>;
              },
            },
            {
              field: 'ticket_amount',
              headerName: t('中奖金额'),
              flex: 1,
              renderCell: ({ row }) => {
                const { ticket_amount = 0 } = row;
                const amount = decimalParse(ticket_token, ticket_amount, 'division');
                return `${amount?.value}${amount?.coinName}`;
              },
            },
          ]}
        />
      )}
    </InnerPage>
  );
}
