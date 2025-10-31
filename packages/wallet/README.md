# Wallet Package

WalletConnect and Base network configuration for the event ticketing platform.

## Features

- Base mainnet and Sepolia testnet chain configurations
- WalletConnect integration
- Custom hooks for wallet interactions
- Utility functions for address formatting and validation

## Usage

```typescript
import { baseMainnet, baseSepolia, useBaseWallet } from '@base-ticketing/wallet';

// In your component
const { isOnBase, switchToBase } = useBaseWallet();
```

## Configuration

Make sure to set the `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` environment variable.

Get your project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).

## TODO

- [ ] Complete Wagmi configuration
- [ ] Implement wallet connection hooks
- [ ] Add network switching logic
- [ ] Add transaction helpers
- [ ] Implement proper error handling
- [ ] Add multi-wallet support (MetaMask, Coinbase Wallet, etc.)
