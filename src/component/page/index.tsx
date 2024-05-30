import React, { ReactNode, CSSProperties } from 'react';
import { Container, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { PureButton } from '@src/component/button';
import { useNavigate } from 'react-router-dom';

export function InnerPage(props: {
  children?: ReactNode;
  title?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const navigate = useNavigate();
  const { children, title, style, className } = props;

  return (
    <Container maxWidth="xl" className={`r_component_inner_page ${className}`} style={style}>
      <h3>
        <PureButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </PureButton>
        {title}
      </h3>
      <Box sx={{ marginTop: '40px' }}>{children}</Box>
    </Container>
  );
}
