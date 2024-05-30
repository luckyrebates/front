import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { RedPacketProductCard } from '@src/component/productCard';
import { getRandomChristmasGiftImage } from '@src/image/christmasGifts';
import { queryTasks, QueryTasksListItem } from '@src/api';
import { Loading1 } from '@src/component/loading';
import { useNavigate } from 'react-router-dom';
import { GIFT_MODEL_NAME_MAP } from '@src/utils/constant';
import { PureCard } from '@src/component/container';
import { t } from '@src/component/i18n';

export function PartnerGifts({ title }: { title: string }) {
  const model = GIFT_MODEL_NAME_MAP.SEND.value;
  const navigate = useNavigate();
  const [activities, setActivities] = useState<QueryTasksListItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    queryTasks()?.then((res) => {
      setActivities(res?.data?.task_list ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <PureCard
      titleImage={getRandomChristmasGiftImage()}
      title={<span>{title}</span>}
      operation={
        <Button
          variant="text"
          onClick={() => {
            navigate(`/activity/redPacketlist?model=${model}`);
          }}
        >
          {t('开奖历史')}
        </Button>
      }
    >
      {loading ? (
        <Loading1 />
      ) : (
        <>
          <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 5 }}>
              {activities.map((i) => (
                <Grid
                  key={i?.task_activity?.activity_id}
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <RedPacketProductCard
                    imgSrc={getRandomChristmasGiftImage(i?.task_activity.activity_id)}
                    {...i?.task_activity}
                    task_id={i?.task_id}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </PureCard>
  );
}
