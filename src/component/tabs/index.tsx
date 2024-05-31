import React, { CSSProperties } from 'react';
import { Button, Box } from '@mui/material';

interface ButtonType {
  id: string;
  text: string;
  remind?: boolean;
}

export interface TabsProps {
  buttons: {
    left?: ButtonType[];
    right?: ButtonType[];
  };
  value: string;
  onChange?: (button: ButtonType) => void;
  style?: CSSProperties;
  className?: string;
}

export function Tabs(props: TabsProps) {
  const { buttons, value = buttons?.left?.[0]?.id ?? buttons?.right?.[0]?.id, onChange, style, className } = props;

  const RButton = (props: { info: ButtonType }) => (
    <Button
      sx={{ minWidth: '90px', borderRadius: '0px', transform: 'skew(-20deg)' }}
      variant="outlined"
      className={`${value === props.info.id && 'r_active'} ${props?.info?.remind && value !== props.info.id && 'r_global_border_blink'}`}
      onClick={() => {
        onChange?.(props.info);
      }}
    >
      {props.info.text}
    </Button>
  );

  return (
    <div className={`r_component_tabs ${className}`} style={style}>
      <div className="r_component_tabs_left">{buttons?.left?.map((item) => <RButton key={item.id} info={item} />)}</div>
      <div className="r_component_tabs_right">
        {buttons?.right?.map((item) => <RButton key={item.id} info={item} />)}
      </div>
    </div>
  );
}
