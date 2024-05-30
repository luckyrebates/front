import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { RedPacketProductCard } from '@src/component/productCard';
import { getRandomChristmasGiftImage } from '@src/image/christmasGifts';
import { queryActivityListFetch, Activitie } from '@src/api';
import { Loading1 } from '@src/component/loading';
import { useNavigate } from 'react-router-dom';
import { GIFT_STATUS_MAP, GIFT_TYPE_NAME_MAP, GIFT_MODEL_NAME_MAP } from '@src/utils/constant';
import { PureCard } from '@src/component/container';
import { activityIsMustWin } from '@src/utils/tools';
import { t } from '@src/component/i18n';
import { TipsText } from '@src/component/text';

export function PlatformSelfGifts({ title }: { title: string }) {
  const model = GIFT_MODEL_NAME_MAP.GET.value;
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activitie[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    queryActivityListFetch({
      activity_type: GIFT_TYPE_NAME_MAP.gift.value,
      with_tickets: true,
      status: GIFT_STATUS_MAP.OPEN.value,
      model,
      page: 0,
      limit: 6,
    })?.then((res) => {
      setActivities(res?.data?.activities ?? []);
      setLoading(false);
    });
  }, []);
  const getLatestActivitie = (isMustWin: boolean) => {
    return activities
      ?.filter((i) => activityIsMustWin({ max_prize_num: i?.max_prize_num, max_ticket: i?.max_ticket }) === isMustWin)
      ?.sort((a, b) => Number(a?.activity_id ?? '0') - Number(b?.activity_id ?? 0))?.[0];
  };
  const currentMustWinActivitie = getLatestActivitie(true);
  const currentLuckyActivitie = getLatestActivitie(false);
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
              <Grid xs={12} sm={6} md={6}>
                <PureCard
                  title={
                    <TipsText tips={t('参与即可中奖，金额随机')} iconStyle={{ color: '#ddd', fontSize: '20px' }}>
                      {t('普通抽奖')}
                    </TipsText>
                  }
                  style={{ marginBottom: '0px' }}
                >
                  <RedPacketProductCard
                    style={{ margin: '0 auto' }}
                    imgSrc={getRandomChristmasGiftImage(currentMustWinActivitie?.activity_id)}
                    {...currentMustWinActivitie}
                  />
                </PureCard>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <PureCard
                  title={
                    <TipsText
                      tips={t('中奖名额有限，最大赢取全额奖金')}
                      iconStyle={{ color: '#ddd', fontSize: '20px' }}
                    >
                      {t('拼手气抽奖')}
                    </TipsText>
                  }
                  style={{ marginBottom: '0px' }}
                >
                  <RedPacketProductCard
                    style={{ margin: '0 auto' }}
                    imgSrc={getRandomChristmasGiftImage(currentLuckyActivitie?.activity_id)}
                    {...currentLuckyActivitie}
                  />
                </PureCard>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </PureCard>
  );
}
