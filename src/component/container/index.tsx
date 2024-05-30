import React, { ReactNode, CSSProperties } from 'react';
import { Box, styled } from '@mui/material';

export function DazzleLightContainer(props: { children: ReactNode; className?: string }) {
  return (
    <div className={`r_component_dazzle_light_container ${props.className}`}>
      <div className="r_component_dazzle_light_container_1"></div>
      <div className="r_component_dazzle_light_container_2"></div>
      <div className="r_component_dazzle_light_container_3"></div>
      <div className="r_component_dazzle_light_container_4"></div>
      {props.children}
    </div>
  );
}

export function LinearBorder(props: { children: ReactNode; className?: string }) {
  return <div className={`r_component_linear_border_container ${props.className}`}>{props.children}</div>;
}

export function PureCard(props: {
  children?: ReactNode;
  className?: string;
  titleImage?: string;
  title?: ReactNode;
  operation?: ReactNode;
  style?: CSSProperties;
}) {
  const { children, className, titleImage, title, operation, style = {} } = props;
  return (
    <Box className={`r_component_pure_card ${className}`} sx={{ marginBottom: '90px', ...style }}>
      {!!title && (
        <Box className="r_component_pure_card_title">
          {!!titleImage && <img src={titleImage} alt="..." />}
          {title}
        </Box>
      )}
      {!!operation && <Box className="r_component_pure_card_operation">{operation}</Box>}
      {children}
    </Box>
  );
}
