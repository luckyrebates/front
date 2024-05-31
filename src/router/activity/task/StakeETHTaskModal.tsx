import React, { useState, ChangeEvent } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { StakeETHTaskMintTokenButton } from '@src/contract';
import { ethers } from 'ethers';
import { t } from '@src/component/i18n';

interface StakeETHTaskModalProps {
  open?: boolean;
  successCallback?: () => void;
  closeCallback?: () => void;
}

export function StakeETHTaskModal(props: StakeETHTaskModalProps) {
  const { open = false, closeCallback } = props;

  const [amount, setAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    error: false,
    msg: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // 使用正则表达式匹配只能输入小数点后4位的数字
    const regex = /^\d+(\.\d{0,4})?$/;
    if (regex.test(value) || value === '') {
      setErrorMsg({
        error: false,
        msg: '',
      });
      setAmount(value);
    }
  };

  const handleClose = () => {
    setErrorMsg({
      error: false,
      msg: '',
    });
    setAmount('');
    closeCallback?.();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>{t('质押入金')}</DialogTitle>
      <DialogContent>
        <TextField
          error={errorMsg.error}
          helperText={errorMsg.msg}
          autoFocus
          required
          type="text"
          fullWidth
          variant="outlined"
          placeholder={t('请输入质押数量')}
          value={amount}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('取消')}
        </Button>
        <StakeETHTaskMintTokenButton
          value={amount}
          blockBeforeOnClick={() => {
            if (!!amount && ethers.parseEther(amount) >= ethers.parseEther('0.1')) {
              return false;
            }
            setErrorMsg({
              error: true,
              msg: t('数量不能少于0.1eth'),
            });
            return true;
          }}
          successCallback={handleClose}
        >
          {t('确定')}
        </StakeETHTaskMintTokenButton>
      </DialogActions>
    </Dialog>
  );
}
