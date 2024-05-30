import React from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BrowserButton } from '@src/component/button';
import { useNavigate } from 'react-router-dom';
import { TicketsPurchase } from '@src/api';
import { GIFT_STATUS_VALUE_MAP } from '@src/utils/constant';
import { redPacketDataAnalysis } from '@src/utils/tools';
import { t } from '@src/component/i18n';
import moment from 'moment';

export function TicketsPurchaseList(props: { data: (TicketsPurchase & { id: string })[]; loading: boolean }) {
  const { data = [], loading } = props;
  const navigate = useNavigate();
  return (
    <DataGrid
      className="r_global_main_background_color"
      autoHeight
      rows={data}
      getRowId={(row) => {
        return row.id;
      }}
      loading={loading}
      columns={[
        {
          field: 'receiver_address',
          headerName: t('投注地址'),
          flex: 1,
          renderCell: ({ row }) => {
            return <BrowserButton type="address">{row?.receiver_address}</BrowserButton>;
          },
        },
        { field: 'ticket_numbers', headerName: t('投注数量'), flex: 1 },
        {
          field: 'ticket_amount',
          headerName: t('消耗积分'),
          flex: 1,
          renderCell: ({ row }) => {
            return row?.ticket_numbers;
          },
        },
        {
          field: 'block_timestamp',
          headerName: t('投注时间'),
          width: 160,
          renderCell: ({ row }) => {
            const { block_timestamp = 0 } = row;
            return moment(block_timestamp).format('YYYY-MM-DD hh:mm:ss');
          },
        },
        {
          field: 'tx_hash',
          headerName: t('交易哈希'),
          flex: 1,
          renderCell: ({ row }) => {
            return <BrowserButton type="tx">{row?.tx_hash}</BrowserButton>;
          },
        },
        {
          field: 'activity_type',
          headerName: t('抽奖状态'),
          flex: 1,
          renderCell: ({ row }) => {
            return GIFT_STATUS_VALUE_MAP?.[row?.activity?.activity_state]?.describe;
          },
        },
        {
          field: 'activity_name',
          headerName: t('抽奖名称'),
          flex: 1,
          renderCell: ({ row }) => {
            const { alias } = redPacketDataAnalysis(row?.activity);
            return (
              <Button
                onClick={() => {
                  navigate(`/activity/redPacketdetail?activity_id=${row?.activity_id}`);
                }}
              >
                {alias}
              </Button>
            );
          },
        },
        {
          field: 'activity_subtitle',
          headerName: t('抽奖类型'),
          flex: 1,
          renderCell: ({ row }) => {
            const { subTitle } = redPacketDataAnalysis(row?.activity);
            return subTitle;
          },
        },
      ]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10]}
    />
  );
}
