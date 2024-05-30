import React, { ReactNode } from 'react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia, avalancheFuji } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WALLET_CONNECT } from '@src/config';

export const SupportChainMap = {
  mainnet,
  sepolia,
  avalancheFuji,
};
const chains = [mainnet, sepolia, avalancheFuji] as const;

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = WALLET_CONNECT.PROJECT_ID;

// 2. Create wagmiConfig
const metadata = {
  name: WALLET_CONNECT.METADATA.name,
  description: WALLET_CONNECT.METADATA.description,
  url: WALLET_CONNECT.METADATA.url, // origin must match your domain & subdomain
  icons: WALLET_CONNECT.METADATA.icons,
};

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export interface Web3ModalProviderProps {
  children?: ReactNode;
}

export function Web3ModalProvider(props: Web3ModalProviderProps) {
  const { children } = props;
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
