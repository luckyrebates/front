import React from 'react';
import { List, ListItem, Divider } from '@mui/material';
import { BallGroup } from '@src/component/ball';
import { ExposedFragment } from '@src/component/exposedFragment';

function generateWinningNumber() {
  const numbers: string[][] = [];
  for (let round = 0; round < 5; round++) {
    const roundNumbers: string[] = [];
    for (let i = 0; i < 5; i++) {
      roundNumbers.push(Math.floor(Math.random() * 10).toString());
    }
    numbers.push(roundNumbers);
  }
  return numbers;
}

export function RecentlyWinning() {
  const winningNumbers = generateWinningNumber();
  return (
    <div className="r_recently_winning_number">
      <List className="r_list">
        <ListItem key="x.x.x.x" className="r_list_title">
          <div className="r_list_title_round">回合</div>
          <div className="r_list_title_number">中奖号码</div>
        </ListItem>
        {winningNumbers.map((round, index) => {
          return (
            <ExposedFragment key={round.join('')}>
              <ListItem className="r_list_content">
                <div className="r_list_label">{`N.${30 - index}`}</div>
                <BallGroup texts={round} />
              </ListItem>
              <Divider className="r_divider" component="li" />
            </ExposedFragment>
          );
        })}
        <ListItem key="y.y.y.y" className="r_list_footer">
          查看更多历史
        </ListItem>
      </List>
    </div>
  );
}
