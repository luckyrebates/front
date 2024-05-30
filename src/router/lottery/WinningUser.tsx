import React from 'react';
import { Avatar } from '@mui/material';
import { numberWithCommas } from '@src/utils/tools';

export function RecentlyWinningUser() {
  return (
    <div className="r_recently_winning_user">
      <div className="r_round">N.30</div>
      <div className="r_bravo">恭喜</div>
      <Avatar>K</Avatar>
      <div className="r_user_info">
        <div>Username</div>
        <div>
          奖金<span className="r_bonus_number">{numberWithCommas(1500)}</span>
          <span className="r_bonus_unit">usdt</span>
        </div>
      </div>
    </div>
  );
}
