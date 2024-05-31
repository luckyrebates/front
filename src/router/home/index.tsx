import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Container } from '@mui/material';
import { Tabs } from '@src/component/tabs';
import { Banner } from '@src/router/home/Banner';
import { PartnerGifts } from '@src/router/home/PartnerGifts';
import { PlatformSelfGifts } from './PlatformSelfGifts';
import { CoolFont } from '@src/component/starBackground';
import { InterestingText1 } from '@src/component/loading';
import { useNavigate } from 'react-router-dom';
import { t } from '@src/component/i18n';

function TasKButton() {
  const navigate = useNavigate();
  const [animateClassName, setAnimateClassName] = useState('');

  const elementRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const element = elementRef.current;
    if (element) {
      const { top } = element.getBoundingClientRect();
      // 检查元素是否完全滚出视窗
      if (top < window.innerHeight * 0.7) {
        // 元素滚出视窗，执行相应的操作
        if (!!animateClassName) {
          return;
        }
        setAnimateClassName('animate__animated animate__bounce');
      }
    }
  };

  useEffect(() => {
    // 监听滚动事件
    window.addEventListener('scroll', handleScroll);

    return () => {
      // 清除滚动事件监听
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={elementRef}>
      <Button
        className={animateClassName}
        variant="contained"
        color="success"
        onClick={() => {
          navigate('/activity/tasklist');
        }}
      >
        {t('免费获取积分')}
      </Button>
    </div>
  );
}

export function Home() {
  const [tabsValue, setTabsValue] = useState('RedPacket');

  return (
    <Container maxWidth="lg" className="r_home">
      <CoolFont />
      <Banner />
      <Box sx={{ display: 'flex', alignItems: 'top' }}>
        <Tabs
          style={{ flex: 1 }}
          value={tabsValue}
          buttons={{
            left: [
              { id: 'RedPacket', text: t('积分广场') },
              { id: 'TreasureHunt', text: t('一元夺宝') },
              { id: 'Lottery', text: t('幸运数') },
            ],
          }}
          onChange={(button) => {
            setTabsValue(button.id);
          }}
        />
        <TasKButton />
      </Box>

      {tabsValue === 'Lottery' && <Expect />}
      {tabsValue === 'RedPacket' && (
        <>
          {[t('积分兑换抽奖')].map((i) => (
            <PlatformSelfGifts key={i} title={i} />
          ))}
          {[t('合作方抽奖')].map((i) => (
            <PartnerGifts key={i} title={i} />
          ))}
        </>
      )}
      {tabsValue === 'TreasureHunt' && <Expect />}
    </Container>
  );
}

function Expect() {
  return (
    <div className="r_activity_row">
      <div style={{ height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <InterestingText1 text={t('敬请期待')} />
      </div>
    </div>
  );
}
