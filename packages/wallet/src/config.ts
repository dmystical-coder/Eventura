// WalletConnect configuration
// TODO: Import necessary WalletConnect and Wagmi modules
// import { createConfig } from 'wagmi';
// import { walletConnect } from 'wagmi/connectors';
import { baseMainnet, baseSepolia } from './chains';

export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const walletConnectConfig = {
  projectId: WALLETCONNECT_PROJECT_ID,
  metadata: {
    name: 'Base Event Ticketing',
    description: 'Decentralized event ticketing platform on Base',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  },
};

// TODO: Create Wagmi config
// export const config = createConfig({
//   chains: [baseMainnet, baseSepolia],
//   connectors: [
//     walletConnect({
//       projectId: WALLETCONNECT_PROJECT_ID,
//       metadata: walletConnectConfig.metadata,
//       showQrModal: true,
//     }),
//   ],
//   // Add transports and other configurations
// });

export { baseMainnet, baseSepolia };
