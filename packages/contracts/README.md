# Smart Contracts

Smart contracts for the Base Event Ticketing Platform.

## Structure

- `contracts/` - Solidity smart contracts
  - `EventTicketing.sol` - Main ticketing NFT contract
  - `EventFactory.sol` - Factory for creating events
  - `TicketMarketplace.sol` - Secondary marketplace for resales
- `scripts/` - Deployment scripts
- `test/` - Contract tests
- `deploy/` - Deployment configurations

## Setup

```bash
npm install
```

## Compile Contracts

```bash
npm run compile
```

## Run Tests

```bash
npm run test
```

## Deploy

### Testnet (Base Sepolia)
```bash
npm run deploy:testnet
```

### Mainnet (Base)
```bash
npm run deploy:mainnet
```

## TODO

- [ ] Implement EventTicketing contract logic
- [ ] Implement EventFactory contract logic
- [ ] Implement TicketMarketplace contract logic
- [ ] Add comprehensive tests
- [ ] Add event metadata structures
- [ ] Implement ticket validation mechanisms
- [ ] Add royalty/fee distribution logic
- [ ] Implement access control for event organizers
- [ ] Add upgrade mechanisms if needed
- [ ] Security audit preparation
