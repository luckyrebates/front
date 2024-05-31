import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

export function Boom(props: { children?: ReactNode; className?: string }) {
  const { children, className } = props;
  return (
    <Box className={`r_component_boom ${className}`}>
      <span>{children}</span>
    </Box>
  );
}
