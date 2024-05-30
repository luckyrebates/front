import React from 'react';
import { numberWithCommas } from '@src/utils/tools';
import { Button, TextField } from '@mui/material';
import { BallGroup } from '@src/component/ball';

export function Lottery() {
  return (
    <div className="r_lottery">
      <div className="r_lottery_title">
        <div className="r_name">彩票</div>
        <div className="r_current_total">
          <div className="r_round">N.31</div>
          <div>
            <span className="r_bonus_number">{numberWithCommas(20200202)}</span>
            <span className="r_bonus_unit">usdt</span>
          </div>
        </div>
      </div>
      <div className="r_lottery_body">
        <div className="r_tips">
          <span>开奖倒计时</span>
          <span>15:20:00</span>
        </div>
        <div className="r_tips">
          <span>本期投注人数</span>
          <span>{numberWithCommas(321313)}/人</span>
        </div>
        <div className="r_button_group">
          <Button variant="contained" size="small">
            投注选号
          </Button>
          <div>
            <TextField type="number" variant="standard" size="small" sx={{ width: '40px', marginRight: '12px' }} />
            <Button variant="contained" color="success" size="small">
              增加随机号
            </Button>
          </div>
        </div>
        <div className="r_ball_group">
          <BallGroup texts={['1', '5', '1', '1', '1']} />
        </div>
        <div className="r_ball_group">
          <BallGroup texts={['2', '5', '1', '1', '1']} />
        </div>
        <div className="r_ball_group">
          <BallGroup texts={['3', '5', '1', '1', '1']} />
        </div>
        <div className="r_all_ball_group_button">
          <Button variant="text" size="small">
            查看所有投注
          </Button>
        </div>
        <div className="r_button_group">
          <Button variant="contained" size="small" color="warning">
            付款投注
          </Button>
          <Button variant="text" size="small">
            免费领取
          </Button>
        </div>
      </div>
    </div>
  );
}
