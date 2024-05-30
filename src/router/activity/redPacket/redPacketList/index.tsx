import React, { useState, useEffect } from 'react';
import { queryActivityListFetch, Activitie } from '@src/api';
import Grid from '@mui/material/Unstable_Grid2';
import { RedPacketProductCard } from '@src/component/productCard';
import { Loading1 } from '@src/component/loading';
import { InnerPage } from '@src/component/page';
import { getRandomChristmasGiftImage } from '@src/image/christmasGifts';
import { GIFT_MODEL_VALUE_MAP, GIFT_STATUS_MAP, GIFT_TYPE_NAME_MAP } from '@src/utils/constant';
import { getAllQueryVariable } from '@src/utils/tools';
import { PureCard } from '@src/component/container';
import { t } from '@src/component/i18n';

export function RedPacketList() {
  const { model = '0' } = getAllQueryVariable();
  const [closeActivities, setCloseActivities] = useState<Activitie[]>([]);
  const [claimableActivities, setClaimableActivities] = useState<Activitie[]>([]);
  const [closeLoading, setCloseLoading] = useState(true);
  const [claimableLoading, setClaimableLoading] = useState(true);

  const CloseActivityList = () => {
    queryActivityListFetch({
      activity_type: GIFT_TYPE_NAME_MAP.gift.value,
      with_tickets: true,
      model: Number(model),
      status: GIFT_STATUS_MAP.WAIT.value,
      page: 0,
      limit: 20,
    })?.then((res) => {
      setCloseActivities(res?.data?.activities ?? []);
      setCloseLoading(false);
    });
  };

  const ClaimableActivityList = () => {
    queryActivityListFetch({
      activity_type: GIFT_TYPE_NAME_MAP.gift.value,
      with_tickets: true,
      model: Number(model),
      status: GIFT_STATUS_MAP.COMPLETED.value,
      page: 0,
      limit: 20,
    })?.then((res) => {
      setClaimableActivities(res?.data?.activities ?? []);
      setClaimableLoading(false);
    });
  };

  useEffect(() => {
    CloseActivityList();
    ClaimableActivityList();
  }, []);

  return (
    <InnerPage title={`${GIFT_MODEL_VALUE_MAP?.[model]?.title}${t('历史开奖记录')}`}>
      <PureCard title={t('待开奖')}>
        {claimableLoading ? (
          <Loading1 />
        ) : (
          <Grid container spacing={{ xs: 2, sm: 3, md: 5 }}>
            {closeActivities.map((i) => (
              <Grid key={i.activity_id} xs={12} sm={6} md={4} lg={3}>
                <RedPacketProductCard imgSrc={getRandomChristmasGiftImage(i.activity_id)} {...i} />
              </Grid>
            ))}
          </Grid>
        )}
      </PureCard>
      <PureCard title={t('已开奖')}>
        {closeLoading ? (
          <Loading1 />
        ) : (
          <Grid container spacing={{ xs: 2, sm: 3, md: 5 }}>
            {claimableActivities.map((i) => (
              <Grid key={i.activity_id} xs={12} sm={6} md={4} lg={3}>
                <RedPacketProductCard imgSrc={getRandomChristmasGiftImage(i.activity_id)} {...i} />
              </Grid>
            ))}
          </Grid>
        )}
      </PureCard>
    </InnerPage>
  );
}
