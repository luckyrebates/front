import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { t } from '@src/component/i18n';

export const useCountdownTimer = (props: { endTime: number }) => {
  const { endTime } = props;
  if (!endTime) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  // 使用 useState 来保存剩余时间
  const [remainingTime, setRemainingTime] = useState(moment(endTime).diff(moment()));
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  // 更新剩余时间的函数
  const updateRemainingTime = () => {
    // 计算新的剩余时间
    const newRemainingTime = moment(endTime).diff(moment());
    setRemainingTime(newRemainingTime);

    // 如果剩余时间为0或负数，停止更新
    if (newRemainingTime <= 0) {
      return;
    }
    // 设置一个定时器，每秒更新剩余时间
    const timerId = setTimeout(() => {
      updateRemainingTime();
    }, 1000);
    setTimerId(timerId);
  };

  useEffect(() => {
    if (!!endTime) {
      clearTimeout(timerId);
      updateRemainingTime();
    }
    // 使用 useEffect 的 cleanup 函数来清除定时器
    return () => clearTimeout(timerId);
  }, [endTime]);

  // 格式化剩余时间
  // 根据剩余时间计算天、小时、分钟和秒
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return {
    days: days >= 0 ? days : 0,
    hours: hours >= 0 ? hours : 0,
    minutes: minutes >= 0 ? minutes : 0,
    seconds: seconds >= 0 ? seconds : 0,
  };
};

export function CountdownTimer(props: {
  endTime?: number;
  showSeconds?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  const { endTime = 0, showSeconds = false, className, style } = props;
  const { days, hours, minutes, seconds } = useCountdownTimer({ endTime });
  let time = '';
  if (days >= 1) {
    time += t('{{days}}天', { days });
  }
  if (hours >= 1 || days > 0) {
    time += t('{{hours}}时', { hours });
  }
  if (minutes >= 1 || hours > 0 || !showSeconds) {
    time += t('{{minutes}}分', { minutes });
  }
  if (showSeconds) {
    time += t('{{seconds}}秒', { seconds });
  }
  return (
    <span style={style} className={className}>
      {time}
    </span>
  );
}
