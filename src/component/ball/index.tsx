import React from 'react';
import { Avatar } from '@mui/material';
import { BallLightColor } from '@src/theme/constant/ballLight';

export interface BallProps {
  text: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Ball(props: BallProps) {
  const { text, style, className } = props;
  return (
    <Avatar style={style} className={className} sx={{ bgcolor: BallLightColor[text] }}>
      {text}
    </Avatar>
  );
}

export interface BallGroupProps {
  texts: string[];
  style?: React.CSSProperties;
  className?: string;
}
export function BallGroup(props: BallGroupProps) {
  const { texts, style, className } = props;
  return (
    <div style={style} className={`r_component_ball_group ${className}`}>
      {texts.map((text, index) => (
        <Ball key={`${text}${index}`} text={text} />
      ))}
    </div>
  );
}
