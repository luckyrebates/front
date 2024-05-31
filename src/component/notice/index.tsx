import React, { ReactNode } from 'react';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack';
import { IconButton } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export function notice(props: {
  onClose?: () => void;
  severity?: 'success' | 'info' | 'warning' | 'error' | 'default';
  content: ReactNode;
  autoHideDuration?: null | number;
}) {
  const { onClose, severity = 'default', content, autoHideDuration = 5000 } = props;

  const action = (snackbarId: SnackbarKey) => (
    <IconButton
      size="small"
      onClick={() => {
        closeSnackbar(snackbarId);
        onClose?.();
      }}
    >
      <CloseOutlinedIcon />
    </IconButton>
  );

  const key = enqueueSnackbar(content, {
    action,
    variant: severity,
    autoHideDuration,
  });
  return key;
}
