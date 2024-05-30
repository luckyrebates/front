import React from 'react';
import lidoLogo from './lido-logo.svg';
import lidoSun from './lido-sun.svg';
import uniswapLogo from './uniswap-uni-logo.png';
import exchangeImage from './9.jpeg';
import introduceImage from './10.jpeg';
import luckTaskImage from './11.jpeg';
import { useNavigate } from 'react-router-dom';
import { t } from '@src/component/i18n';
import { TASK_ID_MAP, getTask } from '@src/router/activity/task/task';

export function LidoBanner(props: { style?: React.CSSProperties; className?: string }) {
  const navigate = useNavigate();
  const { className, style } = props;
  const task = getTask(TASK_ID_MAP.selfLid01);
  return (
    <div
      className={`r_banner_base r_global_cursor_pointer r_banner_lido_banner  ${className}`}
      style={style}
      onClick={() => {
        navigate(`/activity/taskdetail?taskid=${task.id}`);
      }}
    >
      <img className="r_banner_lido_banner_logo" src={lidoLogo} />
      <img className="r_banner_lido_banner_sun" src={lidoSun} />
      <div className="r_banner_lido_banner_text">
        <div className="r_banner_box_title">
          {task.business} {task.title}
        </div>
        <div className="r_banner_box_content">{task.content}</div>
      </div>
    </div>
  );
}

export function LuckyTaskIntroduceBanner(props: { style?: React.CSSProperties; className?: string }) {
  const { className, style } = props;
  return (
    <div className={`r_banner_base ${className}`} style={style}>
      <div className="r_banner_image" style={{ backgroundImage: `url("${introduceImage}")` }}></div>
      <div style={{ paddingLeft: '100px' }}>
        <div className="r_banner_box_title">{t('Lucky Rebates是什么？')}</div>
        <div className="r_banner_box_content">{t('去中心化的链上抽奖协议')}</div>
        <div className="r_banner_box_content">{t('可支持多链的任务式返现协议')}</div>
        <div className="r_banner_box_content">{t('可免费抽奖的Web3流量分发平台')}</div>
        <div className="r_banner_box_tip">{t('链上托管奖池，确保返现奖金透明且安全')}</div>
        <div className="r_banner_box_tip">{t('采用链上VRF随机数开奖，保障公正')}</div>
      </div>
    </div>
  );
}

// 跨链打卡
export function CrossChainCheckInBanner(props: { style?: React.CSSProperties; className?: string }) {
  const navigate = useNavigate();
  const { className, style } = props;
  const task = getTask(TASK_ID_MAP.selfCCIP3);
  return (
    <div
      className={`r_banner_base r_global_cursor_pointer ${className}`}
      style={style}
      onClick={() => {
        navigate(`/activity/taskdetail?taskid=${task.id}`);
      }}
    >
      <div className="r_banner_image" style={{ backgroundImage: `url("${luckTaskImage}")` }}></div>
      <div style={{ paddingLeft: '100px' }}>
        <div className="r_banner_box_business">{task.business}</div>
        <div className="r_banner_box_title">{task.title}</div>
        <div className="r_banner_box_content">{task.content}</div>
      </div>
    </div>
  );
}

export function UniSwapBanner(props: { style?: React.CSSProperties; className?: string }) {
  const navigate = useNavigate();
  const { className, style } = props;
  const task = getTask(TASK_ID_MAP.selfUn1swap7);
  return (
    <div
      className={`r_banner_base r_global_cursor_pointer r_banner_uniswap_banner ${className}`}
      style={style}
      onClick={() => {
        navigate(`/activity/taskdetail?taskid=${task.id}`);
      }}
    >
      <img className="r_banner_uniswap_banner_logo" src={uniswapLogo} />
      <div style={{ paddingLeft: '100px', paddingRight: '200px' }}>
        <div className="r_banner_box_business">{task.business}</div>
        <div className="r_banner_box_title">{task.title}</div>
        <div className="r_banner_box_content">{task.content}</div>
      </div>
    </div>
  );
}

export function DEXSignUpBanner(props: { style?: React.CSSProperties; className?: string }) {
  const navigate = useNavigate();
  const { className, style } = props;
  const task = getTask(TASK_ID_MAP.partnerBinonce1);
  return (
    <div
      className={`r_banner_base r_global_cursor_pointer  ${className}`}
      style={{ ...style }}
      onClick={() => {
        navigate(`/activity/taskdetail?taskid=${task.id}`);
      }}
    >
      <div className="r_banner_image" style={{ backgroundImage: `url("${exchangeImage}")` }}></div>
      <div style={{ paddingLeft: '100px' }}>
        <div className="r_banner_box_business">{task.business}</div>
        <div className="r_banner_box_title">{task.title}</div>
        <div className="r_banner_box_content">{task.content}</div>
      </div>
    </div>
  );
}
