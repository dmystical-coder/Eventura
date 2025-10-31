# Web Frontend

Next.js frontend application for the Base Event Ticketing Platform.

## Features

- WalletConnect integration for wallet connection
- Base network support (mainnet and testnet)
- Event browsing and ticket purchasing
- NFT ticket management
- Ticket resale marketplace

## Structure

- `src/app/` - Next.js app directory (pages and layouts)
- `src/components/` - React components
- `src/hooks/` - Custom React hooks for contract interactions
- `src/lib/` - Library code and configurations
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## TODO

- [ ] Configure WalletConnect with project ID
- [ ] Set up Wagmi for Base network
- [ ] Implement wallet connection UI
- [ ] Create event browsing interface
- [ ] Implement ticket purchasing flow
- [ ] Add ticket management dashboard
- [ ] Implement ticket validation system
- [ ] Add marketplace for ticket resales
- [ ] Integrate IPFS for metadata storage
- [ ] Add responsive design
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Create organizer dashboard
