import React, { ReactNode, useState, CSSProperties } from 'react';
import { Popover } from '@mui/material';
import HelpOutline from '@mui/icons-material/HelpOutline';
import { PureButton } from '@src/component/button';
import { ethers } from 'ethers';

export function TipsText(props: {
  children?: string;
  tips?: ReactNode;
  className?: string;
  type?: 'icon' | 'underline';
  iconStyle?: CSSProperties;
}) {
  const { children = '', tips, className, iconStyle } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? ethers.id(`${window.location.pathname}/${children}`).slice(-8) : undefined;

  return (
    <span className={`r_component_tips_text ${className}`}>
      {children}
      {!!tips && (
        <>
          <PureButton ariaDescribedby={id} onClick={handleClick}>
            <HelpOutline sx={{ ...iconStyle }} className="help_icon" />
          </PureButton>
          <Popover
            id={id}
            open={open ?? false}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <div className="r_global_red_packet_activity_detail_help_tips">{tips}</div>
          </Popover>
        </>
      )}
    </span>
  );
}
