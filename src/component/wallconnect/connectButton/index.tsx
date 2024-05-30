import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Button } from '@mui/material';
import { useAccount } from 'wagmi';
import { truncateString } from '@src/utils/tools';

export function WalletConnectButton() {
  const { open } = useWeb3Modal();
  const { isConnected, address = '', chain } = useAccount();

  return (
    <Button
      variant="text"
      onClick={() => {
        open();
      }}
    >
      {isConnected ? `${chain?.name} | ${truncateString(address)}` : 'Connect Wallet'}
    </Button>
  );
}
