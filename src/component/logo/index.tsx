import React, { CSSProperties } from 'react';
import { PureButton } from '@src/component/button';
import { useNavigate } from 'react-router-dom';

export function Logo({ style }: { style?: CSSProperties }) {
  const navigate = useNavigate();
  return (
    <PureButton
      onClick={() => {
        navigate('/');
      }}
    >
      <img src="/images/logo.png" style={{ width: '36px', marginRight: '12px', ...style }}></img>
    </PureButton>
  );
}
