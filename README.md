# Pixelate

An onchain pixel canvas on Base. See [PROJECT.md](./PROJECT.md) for the full project plan.

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Contracts

```bash
cd contracts
forge install    # Install dependencies
forge build      # Compile
forge test       # Run tests
```

## Deploy

### Vercel (frontend)

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Deploy

### Contract (Base Sepolia)

```bash
cd contracts
source ../.env
forge script script/Pixelate.s.sol \
    --private-key $PRIVATE_KEY \
    --rpc-url https://sepolia.base.org \
    --broadcast \
    --verify \
    --verifier blockscout \
    --verifier-url https://base-sepolia.blockscout.com/api/
```

## Contract

**Base Sepolia:** `0xAe0318F839594d0A3dA45e80cA9B57C8543D2235`  
**Basescan:** [View](https://sepolia.basescan.org/address/0xae0318f839594d0a3da45e80ca9b57c8543d2235)
