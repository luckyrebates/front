import React from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BrowserButton } from '@src/component/button';
import { useNavigate } from 'react-router-dom';
import { TicketsGetListItem } from '@src/api';
import { GIFT_STATUS_VALUE_MAP } from '@src/utils/constant';
import { t } from '@src/component/i18n';
import moment from 'moment';

export function TicketsGetList(props: { data: (TicketsGetListItem & { id: string })[]; loading: boolean }) {
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
        { field: 'ticket_numbers', headerName: t('获得奖注数量'), flex: 1 },
        {
          field: 'block_timestamp',
          headerName: t('领取时间'),
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
          field: 'task_name',
          headerName: t('任务名称'),
          flex: 1,
          renderCell: () => {
            return '-';
          },
        },
        {
          field: 'task_type',
          headerName: t('任务类型'),
          flex: 1,
          renderCell: () => {
            return '-';
          },
        },
        {
          field: 'activity_state',
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
          renderCell: () => {
            return '-';
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
