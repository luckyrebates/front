import React, { useState } from 'react';
import { Container } from '@mui/material';
import { InnerPage } from '@src/component/page';
import { PureCard } from '@src/component/container';
import { Card, CardContent, Typography, Box, Button, CardActions, Divider } from '@mui/material';
import { getTask } from './task';
import { getAllQueryVariable, decimalFormatEtherFromBigInt } from '@src/utils/tools';
import {
  CrossChainSenderTaskControlMintTokenButton,
  TaskControlDirectGetTicketButton,
  useWatchCrossChainSenderTaskControlContractEvent,
  useViewStakeETHTaskAmount,
  StakeETHTaskWithdrawButton,
} from '@src/contract';
import { StakeETHTaskModal } from '@src/router/activity/task/StakeETHTaskModal';
import { t } from '@src/component/i18n';
import { AExternal } from '@src/component/button';

export function TaskDetail() {
  const { taskid, activity_id } = getAllQueryVariable();
  const { title, business, content, rule, status, contractTaskName = '', type, image } = getTask(taskid);
  useWatchCrossChainSenderTaskControlContractEvent();
  const { data } = useViewStakeETHTaskAmount();
  const [openStakeETHTaskModal, setOpenStakeETHTaskModal] = useState(false);

  return (
    <InnerPage title={t('任务详情')}>
      <Container maxWidth="lg" className="r_task_detail">
        <PureCard>
          <Card>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {!!image && <img className="r_task_detail_image" src={image} />}
              <Box sx={{ flex: 1 }}>
                <Typography>
                  <span style={{ fontSize: '20px', color: '#fdd835' }}>{title}</span>
                  {!!business && (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        marginLeft: '10px',
                        fontSize: '14px',
                        borderRadius: '14px',
                        backgroundColor: '#333',
                        color: '#ddd',
                      }}
                    >
                      {t('渠道方：')}
                      {business}
                    </span>
                  )}
                  {status === 'open' && type === 'mintToken' && contractTaskName === 'StakeETHTask' && !!data && (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        marginLeft: '10px',
                        fontSize: '14px',
                        borderRadius: '14px',
                        backgroundColor: '#333',
                        color: '#ddd',
                      }}
                    >
                      {t('已质押')}
                      {decimalFormatEtherFromBigInt(data ?? '0')}eth
                    </span>
                  )}
                </Typography>
                <Typography sx={{ color: '#ddd', fontSize: '14px', marginTop: '8px', paddingRight: '30px' }}>
                  {t('任务内容：')}
                  {content}
                </Typography>
                <Typography sx={{ color: '#ddd', fontSize: '14px', marginTop: '8px', paddingRight: '30px' }}>
                  {t(' 任务规则：')}
                  {rule}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
              {status === 'open' && type === 'mintToken' && contractTaskName === 'CrossChainSenderTaskControl' && (
                <CrossChainSenderTaskControlMintTokenButton>{t('去完成')}</CrossChainSenderTaskControlMintTokenButton>
              )}
              {status === 'open' && type === 'mintToken' && contractTaskName === 'StakeETHTask' && (
                <>
                  <StakeETHTaskWithdrawButton>{t('取回押金')}</StakeETHTaskWithdrawButton>
                  <Button
                    onClick={() => {
                      setOpenStakeETHTaskModal(true);
                    }}
                  >
                    {t('去完成')}
                  </Button>
                </>
              )}
              {status === 'open' && type === 'getTicket' && contractTaskName === 'TaskControlDirect' && (
                <TaskControlDirectGetTicketButton redPacketId={Number(activity_id)} taskid={taskid}>
                  {t('去完成')}
                </TaskControlDirectGetTicketButton>
              )}
              {status === 'wait' && (
                <Button variant="text" disabled>
                  {t('暂未开放，敬请期待')}
                </Button>
              )}
            </CardActions>
          </Card>
        </PureCard>
        <StakeETHTaskModal
          open={openStakeETHTaskModal}
          closeCallback={() => {
            setOpenStakeETHTaskModal(false);
          }}
        />
      </Container>
    </InnerPage>
  );
}
