import React from 'react';
import { InnerPage } from '@src/component/page';
import { PureCard } from '@src/component/container';
import { t } from '@src/component/i18n';

export function CreateRedPacket() {
  return (
    <InnerPage title={t('创建抽奖活动')}>
      <PureCard>
        <div>{t('请通过邮箱联系平台运营人员创建抽奖活动')}</div>
        <div style={{ marginTop: '12px' }}>email: luckyrebates.eth@gmail.com</div>
      </PureCard>
    </InnerPage>
  );
}
