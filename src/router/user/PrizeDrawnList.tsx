import React from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BrowserButton } from '@src/component/button';
import { useNavigate } from 'react-router-dom';
import { PrizeDrawn } from '@src/api';
import { decimalParse } from '@src/utils/decimal';
import { redPacketDataAnalysis } from '@src/utils/tools';
import { t } from '@src/component/i18n';
import moment from 'moment';
import { ethers } from 'ethers';

export function PrizeDrawnList(props: { data: (PrizeDrawn & { id: number })[]; loading: boolean }) {
  const { data = [], loading } = props;
  const navigate = useNavigate();

  return (
    <DataGrid
      className="r_global_main_background_color"
      autoHeight
      rows={data}
      getRowId={(row) => row.id}
      loading={loading}
      columns={[
        {
          field: 'amount',
          headerName: t('中奖数量'),
          flex: 1,
          renderCell: ({ row }) => {
            const { amount = 0 } = row;
            const { value } = decimalParse(row?.activity?.ticket_token, amount, 'division');
            return value;
          },
        },
        {
          field: 'number',
          headerName: t('中奖金额'),
          flex: 1,
          renderCell: ({ row }) => {
            const { amount = 0 } = row;
            const { decimal, coinName } = decimalParse(row?.activity?.ticket_token, amount, 'division');
            const ticket_price = row?.activity?.ticket_price ?? 0;
            const value = ethers.formatUnits(amount * ticket_price, decimal + decimal);
            return `${value} ${coinName}`;
          },
        },
        {
          field: 'block_timestamp',
          headerName: t('开奖时间'),
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
          field: 'activity_subTitle',
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
