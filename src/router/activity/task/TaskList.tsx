import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { InnerPage } from '@src/component/page';
import Grid from '@mui/material/Unstable_Grid2';
import { PureCard } from '@src/component/container';
import { Card, CardContent, CardActions, Typography, Box, Button, Divider } from '@mui/material';
import { SELF_TASK_LIST, PARTNERS_TASK_LIST, TaskType } from './task';
import { useNavigate } from 'react-router-dom';
import { t } from '@src/component/i18n';
import { PureButton } from '@src/component/button';
import { InterestingText1 } from '@src/component/loading';
import { queryTasks, QueryTasksListItem } from '@src/api';
import { Loading1 } from '@src/component/loading';

function TaskMediaCardEmpty() {
  return (
    <Card
      variant="outlined"
      sx={{
        border: 'none',
        width: '344px',
        minHeight: '383px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <InterestingText1 textStyle={{ fontSize: '16px' }} text={t('更多项目方正在接入')}></InterestingText1>
    </Card>
  );
}

function TaskMediaCard(props: TaskType) {
  const navigate = useNavigate();
  const { business, title, content, id, image, officialWebsite } = props;
  return (
    <Card className="r_task_media_list_card" sx={{ width: '344px' }}>
      <div className="r_task_media_list_card_tag">CASHBACK</div>
      <PureButton
        onClick={() => {
          navigate(`/activity/taskdetail?taskid=${id}`);
        }}
      >
        <img src={image} width="100%" />
      </PureButton>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {business}
        </Typography>
        <Typography color="#fdd835">{title}</Typography>
        <Typography
          sx={{
            color: '#ddd',
            fontSize: '14px',
            marginTop: '8px',
            paddingRight: '30px',
            height: '42px',
            overflow: 'hidden',
          }}
        >
          {content}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            navigate(`/activity/taskdetail?taskid=${id}`);
          }}
        >
          {t('任务详情')}
        </Button>
      </CardActions>
    </Card>
  );
}

function TaskCard(props: TaskType & { activity_id: string }) {
  const navigate = useNavigate();
  const { business, title, content, id, activity_id } = props;
  return (
    <Card className="r_task_list_card">
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          </Typography>
          <Typography sx={{ color: '#ddd', fontSize: '14px', marginTop: '8px', paddingRight: '30px' }}>
            {content}
          </Typography>
        </Box>
        <Button
          onClick={() => {
            navigate(`/activity/taskdetail?activity_id=${activity_id}&taskid=${id}`);
          }}
        >
          {t('任务详情')}
        </Button>
      </CardContent>
    </Card>
  );
}

export function TaskList() {
  const SelfTaskList: {
    label: string;
    taskType: TaskType['taskType'];
  }[] = [
    { label: t('流动性质押'), taskType: 'PLEDGED_DEPOSIT' },
    { label: t('跨链桥'), taskType: 'CROSS_CHAIN_CHECK_IN' },
    { label: t('借贷'), taskType: 'LENDING' },
    { label: t('SWAP交易'), taskType: 'SWAP' },
    { label: 'NFT', taskType: 'NFT' },
  ];

  const [activities, setActivities] = useState<QueryTasksListItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    queryTasks()?.then((res) => {
      setActivities(res?.data?.task_list ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <InnerPage title={t('任务列表')}>
      <Container maxWidth="xl" className="r_task_list">
        <Grid container spacing={4}>
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <PureCard title={t('平台积分渠道')}>
              {SelfTaskList.map((taskItem) => (
                <PureCard key={taskItem.taskType} title={taskItem.label} style={{ marginBottom: '40px' }}>
                  <Grid container spacing={{ xs: 2, sm: 3, md: 5 }}>
                    {SELF_TASK_LIST.filter((i) => i.taskType === taskItem.taskType).map((item) => (
                      <Grid key={item.id} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TaskMediaCard key={item.id} {...item} />
                      </Grid>
                    ))}
                    <Grid xs={12} sm={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <TaskMediaCardEmpty />
                    </Grid>
                  </Grid>
                </PureCard>
              ))}
            </PureCard>
          </Grid>
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <PureCard title={t('合作方抽奖任务')}>
              {loading ? (
                <Loading1 />
              ) : (
                PARTNERS_TASK_LIST.map((item) => (
                  <TaskCard
                    key={item.id}
                    {...item}
                    activity_id={activities?.find((i) => i.task_id === item.id)?.task_activity_id ?? ''}
                  />
                ))
              )}
            </PureCard>
          </Grid>
        </Grid>
      </Container>
    </InnerPage>
  );
}
