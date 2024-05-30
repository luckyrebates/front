import React, { ReactNode } from 'react';
import { TextField } from '@mui/material';

export function PureInput(props: {
  type?: 'text' | 'password';
  value?: string;
  onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
}) {
  const { type = 'text', value = '', onChange, style, className, placeholder = '' } = props;
  return (
    <input
      style={{ ...style }}
      className={`r_component_pure_input ${className}`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event) => {
        onChange?.(event.target.value, event);
      }}
    />
  );
}

export function NumberInput(props: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  tips?: ReactNode;
}) {
  const { placeholder, value, onChange, tips } = props;
  return (
    <div className="r_component_pure_input_number">
      <div style={{ display: 'flex' }}>
        <TextField
          size="small"
          sx={{ flex: 1 }}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            onChange?.(event.target.value.replace(/\b0*([1-9][0-9]*)\b/g, '$1').replace(/\D/g, ''));
          }}
        />
      </div>
      {!!tips && <div className="r_component_pure_input_number_tips">{tips}</div>}
    </div>
  );
}
