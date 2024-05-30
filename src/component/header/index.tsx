import React, { useEffect } from 'react';
import { colors, AppBar, Container, Toolbar, Typography, Box, Button } from '@mui/material';
import { WalletConnectButton } from '@src/component/wallconnect/connectButton';
import { useAccount, useSignMessage } from 'wagmi';
import { SignMessageData, SignMessageVariables } from 'wagmi/query';
import { getLoginNonceFetch, userLoginFetch } from '@src/api';
import { ViewTicketAmount } from '@src/contract';
import { localStore } from '@src/utils/localStorage';
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAllowance } from '@src/contract';
import { Logo } from '@src/component/logo';
import { Language, t } from '@src/component/i18n';

export function Header() {
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();
  const { signMessage } = useSignMessage();
  useAllowance();

  useEffect(() => {
    // 钱包连接成功 并且未登录过，就进行签名登录
    if (isConnected && address && !!localStore.getSign()) {
      // 获取需要签名的凭证
      getLoginNonceFetch({ address })?.then((data) => {
        const nonce = data?.data?.nonce;
        if (!nonce) {
          return;
        }
        // 签名
        signMessage(
          { message: nonce },
          {
            onSuccess: (data: SignMessageData, variables: SignMessageVariables) => {
              console.log(data, variables);
              // 登录
              userLoginFetch({
                address,
                nonce,
                sign: data,
              })?.then((res) => {
                if (res.data.nonce) {
                  localStore.setSign(data);
                }
              });
            },
          },
        );
      });
    }
  }, [isConnected]);

  return (
    <>
      <AppBar
        position="sticky"
        className="r_component_header-appbar"
        sx={{ boxShadow: 'none', backgroundColor: '#121212' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
                color: '#fff',
              }}
            >
              Lucky Rebates
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
              {isConnected && (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate('/activity/createRedPacket');
                    }}
                  >
                    {t('创建抽奖活动')}
                  </Button>
                </>
              )}
            </Box>
            {isConnected && (
              <Box sx={{ flexGrow: 0 }}>
                <ViewTicketAmount />
              </Box>
            )}
            <Box sx={{ flexGrow: 0, marginRight: '12px' }}>
              <Button
                variant="text"
                color="success"
                onClick={() => {
                  navigate('/activity/tasklist');
                }}
              >
                {t('免费获取积分')}
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0, marginRight: '12px' }}>
              <WalletConnectButton />
            </Box>
            {isConnected && (
              <Box sx={{ flexGrow: 0, marginRight: '12px' }}>
                <Button
                  variant="text"
                  onClick={() => {
                    navigate('/user');
                  }}
                >
                  <AccountCircleOutlinedIcon sx={{ marginRight: '4px' }} />
                  {t('个人中心')}
                </Button>
              </Box>
            )}
            <Box sx={{ flexGrow: 0 }}>
              <Language />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
