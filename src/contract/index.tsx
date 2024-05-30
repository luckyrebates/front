import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { useWriteContract, useAccount, useReadContract, useWatchContractEvent } from 'wagmi';
import { Button, Typography, Popover, Box } from '@mui/material';
import { TaskControlWithTokenABI } from '@src/contract/TaskControlWithTokenABI';
import { LuckyTokenGiftABI } from '@src/contract/LuckyTokenGiftABI';
import { TaskControlDirectABI } from '@src/contract/TaskControlDirectABI';
import { CrossChainSenderTaskControlABI } from '@src/contract/CrossChainSenderTaskControlABI';
import { StakeETHTaskABI } from '@src/contract/StakeETHTaskABI';
import { decimalFormatEtherFromBigInt, uint256, truncateDecimal } from '@src/utils/tools';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import { useNavigate } from 'react-router-dom';
import { localStore } from '@src/utils/localStorage';
import LoadingButton from '@mui/lab/LoadingButton';
import { notice } from '@src/component/notice';
import { t } from '@src/component/i18n';
import { ethers } from 'ethers';
import { SupportChainMap } from '@src/component/wallconnect/web3ModalProvider';
import { luckyTicketDecimalParse } from '@src/utils/decimal';
import {
  TaskControlWithTokenAddress,
  LuckyTokenGiftAddress,
  StakeETHTaskAddress,
  TaskControlDirectAddress,
  CrossChainSenderTaskControlAddress,
  EmptyTaskAddress,
} from './address';
import { getTask } from '@src/router/activity/task/task';
import { PureButton } from '@src/component/button';

export function checkCurrentErrorChain({
  chainName = SupportChainMap.sepolia.name,
  chain,
}: {
  chainName: string;
  chain: any;
}) {
  if (chain?.name !== chainName) {
    notice({ content: t('请切换到{{chainName}}链', { chainName }), severity: 'info' });
    return true;
  }
  return false;
}

export function useApproveTaskControlWithToken(props: { callback: () => void; amount: bigint }) {
  const { callback, amount } = props;
  const { writeContract } = useWriteContract();

  const DEFAULT_APPROVE_AMOUNT = BigInt(luckyTicketDecimalParse(10000, 'multiplication').value);

  const approveHandle = () => {
    if (localStore.getApporve().approveAmount >= amount) {
      callback();
      return;
    }
    writeContract(
      {
        abi: TaskControlWithTokenABI,
        address: TaskControlWithTokenAddress,
        functionName: 'approve',
        args: [LuckyTokenGiftAddress, uint256(DEFAULT_APPROVE_AMOUNT)],
      },
      {
        onSuccess: (data: any) => {
          console.log('approve success', data);
          callback();
        },
        onSettled: (data: any) => console.log('approve settled', data),
        onError: (error: any) => console.log('approve error', error),
      },
    );
  };
  return { clickHandle: approveHandle };
}

export function CrossChainSenderTaskControlMintTokenButton(props: { children?: ReactNode }) {
  const { children } = props;
  const { address, chain } = useAccount();
  const { writeContract } = useWriteContract();

  const [loading, setLoading] = useState(false);
  const status = useRef<'success' | 'error' | ''>('');
  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      onClick={() => {
        if (checkCurrentErrorChain({ chainName: SupportChainMap.avalancheFuji.name, chain })) {
          return;
        }
        setLoading(true);

        writeContract(
          {
            abi: CrossChainSenderTaskControlABI,
            address: CrossChainSenderTaskControlAddress,
            functionName: 'mintToken',
            args: [
              EmptyTaskAddress.avalancheFuji,
              address,
              uint256(BigInt(luckyTicketDecimalParse(10, 'multiplication').value)),
            ],
          },
          {
            onSuccess: (data: any, variables: any, context: any) => {
              console.log('MintToken success', data, variables, context);
              status.current = 'success';
            },
            onSettled: (data: any) => {
              if (status.current === 'error') {
                notice({ content: t('任务失败'), severity: status.current });
              }
              status.current = '';
              setLoading(false);
              console.log('MintToken settled', data);
            },
            onError: (data: any) => {
              console.log('MintToken error', data);
              status.current = 'error';
            },
          },
        );
      }}
    >
      {children}
    </LoadingButton>
  );
}

export function useViewStakeETHTaskAmount() {
  const { address } = useAccount();

  const { data } = useReadContract({
    abi: StakeETHTaskABI,
    address: StakeETHTaskAddress,
    functionName: 'balanceOf',
    args: [address],
    chainId: SupportChainMap.sepolia.id,
  }) as { data: bigint };

  return { data };
}

export function StakeETHTaskWithdrawButton(props: { children?: ReactNode }) {
  const { children } = props;
  const { chain } = useAccount();
  const { writeContract } = useWriteContract();

  const [loading, setLoading] = useState(false);
  const status = useRef<'success' | 'error' | ''>('');
  return (
    <LoadingButton
      variant="text"
      loading={loading}
      onClick={() => {
        if (checkCurrentErrorChain({ chainName: SupportChainMap.sepolia.name, chain })) {
          return;
        }
        setLoading(true);

        writeContract(
          {
            abi: StakeETHTaskABI,
            address: StakeETHTaskAddress,
            functionName: 'withdraw',
          },
          {
            onSuccess: (data: any, variables: any, context: any) => {
              console.log('MintToken success', data, variables, context);
              status.current = 'success';
            },
            onSettled: (data: any) => {
              if (status.current === 'success') {
                notice({ content: t('押金已取回，等待区块链网络同步结果'), severity: status.current });
              } else if (status.current === 'error') {
                notice({ content: t('押金取回失败'), severity: status.current });
              }
              status.current = '';
              setLoading(false);
              console.log('MintToken settled', data);
            },
            onError: (data: any) => {
              console.log('MintToken error', data);
              status.current = 'error';
            },
          },
        );
      }}
    >
      {children}
    </LoadingButton>
  );
}

export function StakeETHTaskMintTokenButton(props: {
  children?: ReactNode;
  value: string;
  blockBeforeOnClick: () => boolean;
  successCallback?: () => void;
}) {
  const { children, value, blockBeforeOnClick, successCallback } = props;
  const { address, chain } = useAccount();
  const { writeContract } = useWriteContract();

  const [loading, setLoading] = useState(false);
  const status = useRef<'success' | 'error' | ''>('');
  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      onClick={() => {
        if (checkCurrentErrorChain({ chainName: SupportChainMap.sepolia.name, chain })) {
          return;
        }
        if (blockBeforeOnClick()) {
          return;
        }
        setLoading(true);

        writeContract(
          {
            abi: TaskControlWithTokenABI,
            address: TaskControlWithTokenAddress,
            functionName: 'mintToken',
            value: ethers.parseEther(value),
            args: [StakeETHTaskAddress, address, uint256(BigInt(luckyTicketDecimalParse(10, 'multiplication').value))],
          },
          {
            onSuccess: (data: any, variables: any, context: any) => {
              console.log('MintToken success', data, variables, context);
              status.current = 'success';
              successCallback?.();
            },
            onSettled: (data: any) => {
              if (status.current === 'success') {
                notice({ content: t('任务已完成'), severity: status.current });
              } else if (status.current === 'error') {
                notice({ content: t('任务失败'), severity: status.current });
              }
              status.current = '';
              setLoading(false);
              console.log('MintToken settled', data);
            },
            onError: (data: any) => {
              console.log('MintToken error', data);
              status.current = 'error';
            },
          },
        );
      }}
    >
      {children}
    </LoadingButton>
  );
}

export function ViewTicketAmount() {
  const { address, chainId } = useAccount();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(!!anchorEl ? null : event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { data } = useReadContract({
    abi: TaskControlWithTokenABI,
    address: TaskControlWithTokenAddress,
    functionName: 'balanceOf',
    args: [address],
    chainId,
  }) as { data: bigint };

  const POPOVER_ID = 'token-amountmouse-over-popover';
  return (
    <>
      <Button variant="text" aria-owns={open ? POPOVER_ID : undefined} aria-haspopup="true" onClick={handlePopoverOpen}>
        <Typography sx={{ display: 'flex', alignItems: 'center', color: '#fdd835' }}>
          <TokenOutlinedIcon />
          <span style={{ marginRight: '4px' }}>Lucky Ticket</span>
          {truncateDecimal(decimalFormatEtherFromBigInt(data), 2)}
        </Typography>
      </Button>
      <Popover
        id={POPOVER_ID}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box
          sx={{
            padding: '12px 8px',
            textAlign: 'center',
          }}
        >
          <Box>
            {t('Lucky Ticket 总数')} {decimalFormatEtherFromBigInt(data)?.toString()}
          </Box>
        </Box>
      </Popover>
    </>
  );
}

export function TaskControlDirectGetTicketButton(props: { redPacketId: number; taskid: string; children?: ReactNode }) {
  const { redPacketId, children, taskid } = props;
  const navigate = useNavigate();
  const task = getTask(taskid);
  const { address, chain } = useAccount();
  const { writeContract } = useWriteContract();

  const [loading, setLoading] = useState(false);
  const status = useRef<'success' | 'error' | ''>('');

  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      onClick={() => {
        if (checkCurrentErrorChain({ chainName: 'Sepolia', chain })) {
          return;
        }

        setLoading(true);
        writeContract(
          {
            abi: TaskControlDirectABI,
            address: TaskControlDirectAddress,
            functionName: 'getTicket',
            args: [redPacketId, task?.taskAddress ?? '', address, uint256(1000000)],
          },
          {
            onSuccess: (data: any) => {
              console.log('GetTicket success', data);
              status.current = 'success';
            },
            onSettled: (data: any) => {
              if (status.current === 'success') {
                notice({
                  content: (
                    <>
                      {t('任务已完成')}
                      <PureButton
                        onClick={() => {
                          navigate(`/activity/redPacketdetail?activity_id=${redPacketId}&task_id=${taskid}`);
                        }}
                      >
                        {t('前往抽奖详情查看')}
                      </PureButton>
                    </>
                  ),
                  severity: status.current,
                });
              } else if (status.current === 'error') {
                notice({ content: t('任务失败'), severity: status.current });
              }
              status.current = '';
              setLoading(false);
              console.log('GetTicket settled', data);
            },
            onError: (data: any) => {
              console.log('GetTicket error', data);
              status.current = 'error';
            },
          },
        );
      }}
    >
      {children}
    </LoadingButton>
  );
}

function LuckyTokenGiftBuyTicket(props: { amount: number; redPacketId: number; children?: ReactNode }) {
  const { amount, redPacketId, children } = props;
  const num = BigInt(amount);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const buyTicketsHandle = () => {
    writeContract(
      {
        abi: LuckyTokenGiftABI,
        address: LuckyTokenGiftAddress,
        functionName: 'buyTickets',
        args: [redPacketId, address, num],
      },
      {
        onSuccess: (data: any) => console.log('EOA Buy Ticket success', data),
        onSettled: (data: any) => console.log('EOA Buy Ticket settled', data),
        onError: (error: any) => console.log('EOA Buy Ticket error', error),
      },
    );
  };
  const { clickHandle } = useApproveTaskControlWithToken({
    callback: buyTicketsHandle,
    amount: BigInt(luckyTicketDecimalParse(amount, 'multiplication').value),
  });

  return (
    <Button
      variant="contained"
      sx={{ flex: 1, backgroundColor: '#ffd600', '&:hover': { backgroundColor: '#ffea00' } }}
      onClick={() => {
        clickHandle();
      }}
    >
      {children}
    </Button>
  );
}

export function TaskControlWithTokenGetTicket(props: {
  amount: number;
  redPacketId: number;
  children?: ReactNode;
  successCallback?: () => void;
}) {
  const { amount, redPacketId, children, successCallback } = props;
  const { address, chain } = useAccount();
  const { writeContract } = useWriteContract();

  const [loading, setLoading] = useState(false);
  const status = useRef<'success' | 'error' | ''>('');

  const getTicketsHandle = () => {
    writeContract(
      {
        abi: TaskControlWithTokenABI,
        address: TaskControlWithTokenAddress,
        functionName: 'getTicket',
        args: [redPacketId, address, BigInt(amount)],
      },
      {
        onSuccess: (data: any) => {
          console.log('TaskControlWithTokenGetTicket success', data);
          status.current = 'success';
          successCallback?.();
        },
        onSettled: (data: any) => {
          if (status.current === 'success') {
            notice({ content: t('投注完成'), severity: status.current });
          } else if (status.current === 'error') {
            notice({ content: t('投注失败'), severity: status.current });
          }
          status.current = '';
          setLoading(false);
          console.log('TaskControlWithTokenGetTicket settled', data);
        },
        onError: (error: any) => {
          console.log('TaskControlWithTokenGetTicket error', error);
          status.current = 'error';
        },
      },
    );
  };
  const { clickHandle } = useApproveTaskControlWithToken({
    callback: getTicketsHandle,
    amount: BigInt(luckyTicketDecimalParse(amount, 'multiplication').value),
  });

  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      sx={{ flex: 1, backgroundColor: '#ffd600', '&:hover': { backgroundColor: '#ffea00' } }}
      onClick={() => {
        if (checkCurrentErrorChain({ chainName: SupportChainMap.sepolia.name, chain })) {
          return;
        }
        setLoading(true);
        clickHandle();
      }}
    >
      {children}
    </LoadingButton>
  );
}

export function useAllowance() {
  const { address } = useAccount();
  const data = useReadContract({
    abi: TaskControlWithTokenABI,
    address: TaskControlWithTokenAddress,
    functionName: 'allowance',
    args: [address, LuckyTokenGiftAddress],
  });

  useEffect(() => {
    if (data?.isFetched) {
      localStore.setApprove({
        approveAmount: (data?.data ?? 0n) as bigint,
      });
    }
  }, [data?.data, data?.isFetched]);
  return data;
}

export function useWatchCrossChainSenderTaskControlContractEvent() {
  return useWatchContractEvent({
    address: CrossChainSenderTaskControlAddress,
    abi: CrossChainSenderTaskControlABI,
    chainId: SupportChainMap.avalancheFuji.id,
    eventName: 'MessageSent',
    onLogs(logs: any) {
      const messageId = logs?.[0]?.args?.messageId ?? '';
      notice({
        content: (
          <>
            {t('跨链任务已完成，去浏览器')}
            <a
              style={{ color: '#3949ab' }}
              className="r_global_a"
              href={`https://ccip.chain.link/msg/${messageId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('查看任务信息')}
            </a>
          </>
        ),
        severity: 'success',
        autoHideDuration: null,
      });
    },
  });
}
