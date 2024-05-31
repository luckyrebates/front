import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { BrowserButton } from '@src/component/button';
import { useNavigate } from 'react-router-dom';
import { queryUserTaskTokenFetch, QueryUserTaskTokenResponse } from '@src/api';
import { useAccount } from 'wagmi';
import { luckyTicketDecimalParse } from '@src/utils/decimal';
import { getTaskByTaskAddress } from '@src/router/activity/task/task';
import { t } from '@src/component/i18n';
import moment from 'moment';

const defaultUserTaskTokenResponse = {
  address: '',
  balance: '0',
  ticket_get_list: [],
  token_mint_list: [],
};

export function UserTaskToken() {
  const { isConnected, address } = useAccount();
  const navigate = useNavigate();
  const [userTaskToken, setUserTaskToken] = useState<QueryUserTaskTokenResponse>(defaultUserTaskTokenResponse);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      queryUserTaskTokenFetch({ address, query_type: 0 })?.then((data) => {
        setUserTaskToken(data.data);
        setLoading(false);
      });
    }
  }, [isConnected]);

  return (
    <DataGrid
      className="r_global_main_background_color"
      autoHeight
      rows={userTaskToken?.token_mint_list ?? []}
      getRowId={(row) => row.tx_hash}
      loading={loading}
      columns={[
        {
          field: 'task',
          headerName: t('任务名称'),
          flex: 1,
          renderCell: ({ row }) => {
            const { title, business } = getTaskByTaskAddress(row?.task_addr);
            return `${title} (${business})` ?? '-';
          },
        },
        {
          field: 'task_addr',
          headerName: t('任务地址'),
          flex: 1,
          renderCell: ({ row }) => {
            return <BrowserButton type="address">{row?.task_addr}</BrowserButton>;
          },
        },
        {
          field: 'amount',
          headerName: t('获取数量'),
          flex: 1,
          renderCell: ({ row }) => {
            return luckyTicketDecimalParse(row.amount, 'division').value;
          },
        },
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
          field: 'sender',
          headerName: t('发送方'),
          flex: 1,
          renderCell: ({ row }) => {
            return <BrowserButton type="address">{row?.sender}</BrowserButton>;
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
