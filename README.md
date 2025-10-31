# Base Event Ticketing Platform

A decentralized event ticketing platform built on Base blockchain with WalletConnect integration.

## Overview

This project provides a complete scaffold for building an event ticketing platform where:
- Event organizers can create events and mint NFT tickets
- Users can purchase tickets using cryptocurrency on Base network
- Tickets are represented as NFTs for authenticity and transferability
- Secondary marketplace for ticket resales
- WalletConnect integration for seamless wallet connectivity

## Project Structure

```
base-event-ticketing-platform/
├── apps/
│   └── web/                    # Next.js frontend application
│       ├── src/
│       │   ├── app/           # Next.js app directory
│       │   ├── components/    # React components
│       │   ├── hooks/         # Custom hooks
│       │   ├── lib/           # Library code
│       │   ├── types/         # TypeScript types
│       │   └── utils/         # Utility functions
│       └── public/            # Static assets
├── packages/
│   ├── contracts/             # Smart contracts (Hardhat)
│   │   ├── contracts/        # Solidity contracts
│   │   ├── scripts/          # Deployment scripts
│   │   ├── test/             # Contract tests
│   │   └── deploy/           # Deployment configs
│   └── wallet/               # WalletConnect configuration
│       └── src/              # Wallet utilities and hooks
└── docs/                      # Documentation (TODO)
```

## Tech Stack

### Blockchain
- **Base** - Ethereum L2 for low-cost transactions
- **Solidity** - Smart contract development
- **Hardhat** - Smart contract development framework
- **OpenZeppelin** - Secure smart contract libraries

### Frontend
- **Next.js 14** - React framework with app directory
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **WalletConnect** - Wallet connection
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript library for Ethereum

### Infrastructure
- **Turbo** - Monorepo build system
- **IPFS** - Decentralized metadata storage

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- A WalletConnect Project ID ([Get one here](https://cloud.walletconnect.com/))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd base-event-ticketing-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your configuration
```

Required environment variables:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Your WalletConnect project ID
- `BASE_RPC_URL` - Base mainnet RPC URL
- `BASE_TESTNET_RPC_URL` - Base Sepolia testnet RPC URL
- `DEPLOYER_PRIVATE_KEY` - Private key for contract deployment (testnet only!)

### Development

Start the development server:
```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

### Smart Contracts

#### Compile contracts:
```bash
npm run contracts:compile
```

#### Run tests:
```bash
npm run contracts:test
```

#### Deploy to testnet:
```bash
npm run contracts:deploy
```

## Implementation Roadmap

This is a scaffold project. Here's what needs to be implemented:

### Smart Contracts
- [ ] Event creation and management logic
- [ ] NFT ticket minting with metadata
- [ ] Ticket validation system
- [ ] Access control for event organizers
- [ ] Marketplace for ticket resales
- [ ] Royalty/fee distribution
- [ ] Refund mechanisms
- [ ] Comprehensive test coverage

### Frontend
- [ ] WalletConnect integration
- [ ] Wallet connection UI
- [ ] Event browsing interface
- [ ] Ticket purchasing flow
- [ ] User dashboard (my tickets)
- [ ] Organizer dashboard (create events, manage sales)
- [ ] Ticket validation UI (QR codes)
- [ ] Marketplace interface
- [ ] IPFS integration for metadata

### Infrastructure
- [ ] IPFS pinning service setup
- [ ] Event indexing (The Graph or similar)
- [ ] Email notifications
- [ ] Analytics dashboard

## Architecture

### Smart Contracts

1. **EventFactory.sol** - Factory contract for creating and managing events
2. **EventTicketing.sol** - Main NFT contract for tickets
3. **TicketMarketplace.sol** - Secondary marketplace for resales

### Frontend Architecture

- **App Router** - Next.js 14 app directory structure
- **Component-based** - Reusable React components
- **Custom Hooks** - For contract interactions and wallet management
- **Type-safe** - Full TypeScript coverage

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

## Security

This is a scaffold project and has not been audited. Before deploying to mainnet:
- [ ] Complete security audit of smart contracts
- [ ] Implement comprehensive testing
- [ ] Add circuit breakers and pause mechanisms
- [ ] Review all access controls
- [ ] Test on testnet extensively

## License

MIT

## Resources

- [Base Documentation](https://docs.base.org/)
- [WalletConnect Docs](https://docs.walletconnect.com/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Hardhat Documentation](https://hardhat.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

## Support

For questions and support, please open an issue in the repository.
