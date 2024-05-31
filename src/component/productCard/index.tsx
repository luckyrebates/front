import React, { ReactNode, useState } from 'react';
import { Button } from '@mui/material';
import { Activitie } from '@src/api';
import { PureButton } from '@src/component/button';
import { useNavigate } from 'react-router-dom';
import { GIFT_MODEL_NAME_MAP, GIFT_STATUS_MAP } from '@src/utils/constant';
import { redPacketDataAnalysis, numberFormat } from '@src/utils/tools';
import { NumberInput } from '@src/component/input';
import { TaskControlWithTokenGetTicket } from '@src/contract';
import { DazzleLightContainer } from '@src/component/container';
import { CountdownTimer } from '@src/component/countdownTimer';
import { LinearBorder } from '@src/component/container';
import { t } from '@src/component/i18n';
import { TipsText, Boom } from '@src/component/text';
import { decimalParse } from '@src/utils/decimal';

export type ProductCardProps = Partial<Activitie> & {
  style?: React.CSSProperties;
  className?: string;
  imgSrc?: string;
  bodyContent?: ReactNode;
  task_id?: string;
};

export function RedPacketProductCard(props: ProductCardProps) {
  const navigate = useNavigate();
  const {
    style,
    className,
    imgSrc,
    name,
    end_time = 0,
    max_ticket = 0,
    activity_id = '',
    activity_state = 0,
    model = 0,
    ticket_price = 0,
    buy_ticket = 0,
    send_ticket = 0,
    ticket_token = '',
    task_id = '',
    max_prize_num = 0,
  } = props;

  const [buyTicketsAmount, setBuyTicketsAmount] = useState('');
  const [showBuyModel, setShowBuyModel] = useState('');

  let detailPath = `/activity/redPacketdetail?activity_id=${activity_id}`;
  if (!!task_id) {
    detailPath = `${detailPath}&task_id=${task_id}`;
  }
  const goDetail = () => navigate(detailPath);

  const {
    subTitle,
    subTitleTips,
    alias,
    injectAmount,
    totalAmount,
    remainingAvailableForPurchase,
    modelType,
    redPacketType,
  } = redPacketDataAnalysis({ ...props, task_id });

  const injectAmountParse = decimalParse(ticket_token, injectAmount, 'division');
  const totalAmountParse = decimalParse(ticket_token, totalAmount, 'division');
  const buyTicketParse = decimalParse(ticket_token, buy_ticket * ticket_price, 'division');

  return (
    <div style={style} className={`r_component_product_card ${className}`}>
      {!!injectAmount && <Boom className="r_image_boom">{t('限时福利')}</Boom>}
      <div className="r_image" onClick={goDetail}>
        <img src={imgSrc} alt="..." />
        {!!injectAmount && GIFT_MODEL_NAME_MAP.GET.value === model && (
          <LinearBorder className="r_product_card_image_tips">
            {t('平台补贴')}
            <span className="r_number">{numberFormat(injectAmountParse?.value)}</span>
            {injectAmountParse?.coinName}
            {t('奖励')}
          </LinearBorder>
        )}
      </div>
      <div className="r_body">
        <div className="r_body_content">
          <div className="r_name">
            <div>
              <span className="r_title">{!!alias ? alias : name}</span>
            </div>
            <PureButton style={{ fontSize: '12px' }} onClick={goDetail}>
              {t('抽奖详情')}
            </PureButton>
          </div>
          {model === GIFT_MODEL_NAME_MAP.SEND.value && (
            <div className="r_descript">
              {t('抽奖类型')}
              <TipsText iconStyle={{ fontSize: '14px', color: '#ddd' }} className="r_sub_title" tips={subTitleTips}>
                {`${subTitle}`}
              </TipsText>
            </div>
          )}
          <div className="r_descript">
            <span>{t('当前奖池总额度')}</span>
            <div>
              <span className="r_number" style={{ fontSize: '16px', marginRight: '2px' }}>
                {numberFormat(totalAmountParse?.value)}
              </span>
              {totalAmountParse?.coinName}
            </div>
          </div>
          {redPacketType === 'Lucky' && (
            <div className="r_descript">
              <span>{t('中奖名额上限')}</span>
              <div>{max_prize_num}</div>
            </div>
          )}
          {model === GIFT_MODEL_NAME_MAP.GET.value && (
            <div className="r_descript">
              <span>{t('当前投注累计额度')}</span>
              <div>
                <span className="r_number" style={{ marginRight: '2px' }}>
                  {numberFormat(buyTicketParse?.value)}
                </span>
                {buyTicketParse?.coinName}
              </div>
            </div>
          )}
          <div className="r_descript">
            {t('当前已投注数量')}
            <span>{buy_ticket + send_ticket}</span>
          </div>
          {!!max_ticket && model === GIFT_MODEL_NAME_MAP.SEND.value && (
            <>
              <div className="r_descript">
                {t('剩余可投注数量')}
                <span>{remainingAvailableForPurchase}</span>
              </div>
            </>
          )}
        </div>
        {GIFT_STATUS_MAP.OPEN.value === activity_state && GIFT_MODEL_NAME_MAP.GET.value === model && (
          <Button
            variant="contained"
            color="warning"
            size="small"
            sx={{
              flex: 1,
              backgroundColor: '#ffd600',
              '&:hover': { backgroundColor: '#ffea00' },
              width: '100%',
              marginTop: '14px',
              marginBottom: '4px',
            }}
            onClick={() => {
              setShowBuyModel('r_buy_show');
            }}
          >
            {t('参与抽奖')}
          </Button>
        )}

        {GIFT_STATUS_MAP.OPEN.value === activity_state && GIFT_MODEL_NAME_MAP.SEND.value === model && (
          <Button
            variant="contained"
            color="warning"
            size="small"
            sx={{
              flex: 1,
              backgroundColor: '#ffd600',
              '&:hover': { backgroundColor: '#ffea00' },
              width: '100%',
              marginTop: '14px',
              marginBottom: '4px',
            }}
            onClick={() => {
              navigate(`/activity/taskdetail?activity_id=${activity_id}&taskid=${task_id}`);
            }}
          >
            {t('立即参与')}
          </Button>
        )}
        {GIFT_STATUS_MAP.OPEN.value === activity_state && (
          <div className="r_time_tips">
            <span style={{ marginRight: '4px' }}>{t('抽奖倒计时')}:</span>
            <CountdownTimer endTime={end_time} />
          </div>
        )}
        {GIFT_MODEL_NAME_MAP.GET.value === model && (
          <RedPacketBuy
            className={`r_buy ${showBuyModel}`}
            value={buyTicketsAmount}
            onChange={(value) => {
              setBuyTicketsAmount(value);
            }}
            onClose={() => {
              setShowBuyModel('');
            }}
            activity_id={activity_id}
          />
        )}
      </div>
    </div>
  );
}

export function SimpleRedPacket(props: ProductCardProps) {
  const navigate = useNavigate();
  const { className, imgSrc, style, activity_id, model, activity_state = 0, task_id } = props;
  const [buyTicketsAmount, setBuyTicketsAmount] = useState('');
  const [showBuyModel, setShowBuyModel] = useState('');

  return (
    <div style={{ ...style }} className={`r_component_product_card ${className}`}>
      <div className="r_image">
        <img src={imgSrc} alt="..." />
      </div>
      <div className="r_body">
        {GIFT_STATUS_MAP.OPEN.value === activity_state && GIFT_MODEL_NAME_MAP.GET.value === model && (
          <Button
            variant="contained"
            color="warning"
            size="small"
            sx={{
              flex: 1,
              backgroundColor: '#ffd600',
              '&:hover': { backgroundColor: '#ffea00' },
              width: '100%',
              marginTop: '20px',
              marginBottom: '10px',
            }}
            onClick={() => {
              setShowBuyModel('r_buy_show');
            }}
          >
            {t('参与抽奖')}
          </Button>
        )}
        {GIFT_STATUS_MAP.OPEN.value === activity_state && GIFT_MODEL_NAME_MAP.SEND.value === model && (
          <Button
            variant="contained"
            color="warning"
            size="small"
            sx={{
              flex: 1,
              backgroundColor: '#ffd600',
              '&:hover': { backgroundColor: '#ffea00' },
              width: '100%',
              marginTop: '20px',
              marginBottom: '10px',
            }}
            onClick={() => {
              navigate(`/activity/taskdetail?activity_id=${activity_id}&taskid=${task_id}`);
            }}
          >
            {t('立即参与')}
          </Button>
        )}
        {GIFT_MODEL_NAME_MAP.GET.value === model && (
          <RedPacketBuy
            className={`r_buy ${showBuyModel}`}
            value={buyTicketsAmount}
            onChange={(value) => {
              setBuyTicketsAmount(value);
            }}
            onClose={() => {
              setShowBuyModel('');
            }}
            activity_id={activity_id}
          />
        )}
      </div>
    </div>
  );
}

export function RedPacketBuy(
  props: ProductCardProps & {
    value?: string;
    onChange?: (value: string) => void;
    onClose?: () => void;
  },
) {
  const { className = '', value, onChange, activity_id = '', onClose } = props;
  const closeHandle = () => {
    onChange?.('');
    onClose?.();
  };
  return (
    <DazzleLightContainer className={className}>
      <div style={{ flex: 1 }}>
        <NumberInput value={value} placeholder={t('请输入lucky ticket数量')} onChange={onChange} />
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <TaskControlWithTokenGetTicket
            amount={Number(value)}
            redPacketId={Number(activity_id)}
            successCallback={closeHandle}
          >
            {t('投注')}
          </TaskControlWithTokenGetTicket>
          <Button variant="outlined" size="small" sx={{ width: '60px', marginLeft: '10px' }} onClick={closeHandle}>
            {t('返回')}
          </Button>
        </div>
      </div>
    </DazzleLightContainer>
  );
}
