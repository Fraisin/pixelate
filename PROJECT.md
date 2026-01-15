# Pixelate — Project Plan

A shared pixel canvas on Base where anyone can place one pixel every 60 seconds — like r/place, but onchain.

---

## 🎯 Core Concept

- **64×64 pixel grid** stored entirely onchain
- **One pixel per wallet every 60 seconds** (cooldown enforced by smart contract)
- **16-color palette** to choose from
- **Hover to see** who placed each pixel and when (resolved to Basenames)
- **Snapshots as NFTs** — mint a moment in time as an NFT

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐
│    Frontend     │  ←────→ │  Smart Contract │
│   (Next.js)     │   RPC   │     (Base)      │
└─────────────────┘         └─────────────────┘
        │
        ↓
┌─────────────────┐
│  Basename API   │  (resolve 0xABC → frank.base)
└─────────────────┘
```

### Onchain (Smart Contract)
- Pixel grid state (color, placer, timestamp per pixel)
- Cooldown enforcement per wallet
- Color palette validation
- Events for real-time updates

### Offchain (Frontend)
- Render the 64×64 canvas
- Wallet connection
- Hover tooltips with Basename resolution
- Cooldown timer UI

---

## 📜 Smart Contract Design

### Data Structures

```solidity
struct Pixel {
    uint8 color;           // 0-15 (palette index)
    address lastPlacer;    // who placed it
    uint40 lastPlacedAt;   // timestamp
}

mapping(uint256 => Pixel) public pixels;        // pixelId => Pixel
mapping(address => uint256) public lastActionTime;  // cooldown tracking
```

### Pixel ID Calculation
Grid is flattened: `pixelId = y * 64 + x`
- `pixels[0]` = top-left (0,0)
- `pixels[4095]` = bottom-right (63,63)

### Core Functions

| Function | Gas | Description |
|----------|-----|-------------|
| `placePixel(x, y, color)` | ~65k | Place a pixel (write) |
| `getPixel(x, y)` | Free | Read pixel data |
| `canPlace(address)` | Free | Check cooldown status |

### Events

```solidity
event PixelPlaced(
    uint256 indexed pixelId,
    uint8 color,
    address indexed placer,
    uint256 timestamp
);
```

Frontend subscribes to this for real-time updates.

### Custom Errors (gas efficient)

```solidity
error XOutOfBounds(uint256 x, uint256 max);
error YOutOfBounds(uint256 y, uint256 max);
error InvalidColor(uint8 color, uint8 maxColors);
error CooldownActive(uint256 remainingSeconds);
```

---

## 🖼️ Frontend Design

### Canvas Rendering
- 64×64 grid = 4096 pixels
- Each pixel is a clickable cell
- Colors from predefined palette
- Zoom/pan for mobile

### User Flow
1. Connect wallet
2. Click a pixel on the canvas
3. Pick a color from palette
4. Confirm transaction in wallet
5. See pixel update in ~2 seconds
6. Wait 60 seconds for next placement

### Hover Behavior
- Show tooltip on pixel hover
- Display: "Placed by frank.base, 42s ago"
- Resolve `0xABC...` → Basename using Base's resolver

### Real-time Updates
- Subscribe to `PixelPlaced` events via WebSocket
- Update canvas instantly when any pixel changes
- No polling needed

---

## 🎨 Color Palette

16 colors (indices 0-15). Options:

**Classic r/place:**
```
#FFFFFF #E4E4E4 #888888 #222222
#FFA7D1 #E50000 #E59500 #A06A42
#E5D900 #94E044 #02BE01 #00D3DD
#0083C7 #0000EA #CF6EE4 #820080
```

**Base brand:**
```
#0052FF (Base blue) + complementary colors
```

---

## 📸 Snapshot System (Stretch Goal)

### Concept
- A snapshot captures the canvas state at a specific block
- Multiple users can mint the same moment as an NFT
- NFT displays the canvas image at that moment

### Contract Storage

```solidity
struct Snapshot {
    uint256 blockNumber;
    uint256 timestamp;
    bytes32 canvasHash;    // hash of pixel data for verification
    string imageURI;       // IPFS link to rendered image
}

mapping(uint256 => Snapshot) public snapshots;
mapping(uint256 => uint256) public tokenToSnapshot;  // NFT tokenId => snapshotId
```

### Flow
1. User clicks "Mint Snapshot"
2. Backend captures current canvas state
3. Generates image, uploads to IPFS
4. Computes hash of pixel data
5. User mints NFT pointing to snapshot

---

## ✅ Progress Tracker

### Phase 1: Smart Contract ✅
- [x] Pixel storage struct
- [x] placePixel with cooldown
- [x] Custom errors
- [x] Events
- [x] Unit tests (10 passing)
- [x] Deploy to Base Sepolia
- [x] Verify on Basescan

### Phase 2: Frontend Canvas
- [ ] Set up wagmi + viem
- [ ] Wallet connect button
- [ ] Render 64×64 grid
- [ ] Read all pixels from contract
- [ ] Display colors

### Phase 3: Pixel Placement
- [ ] Click to select pixel
- [ ] Color picker UI
- [ ] Call placePixel transaction
- [ ] Transaction status feedback
- [ ] Cooldown timer display

### Phase 4: Real-time + Polish
- [ ] Subscribe to PixelPlaced events
- [ ] Live canvas updates
- [ ] Hover tooltip
- [ ] Basename resolution
- [ ] Mobile responsive

### Phase 5: Snapshots (Stretch)
- [ ] Snapshot contract logic
- [ ] Image generation service
- [ ] IPFS upload
- [ ] NFT minting UI
- [ ] Gallery page

---

## 🔗 Deployed Contract

**Network:** Base Sepolia  
**Address:** `0xAe0318F839594d0A3dA45e80cA9B57C8543D2235`  
**Basescan:** https://sepolia.basescan.org/address/0xae0318f839594d0a3da45e80ca9b57c8543d2235

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, Tailwind CSS |
| Wallet | wagmi, viem, RainbowKit |
| Contracts | Solidity 0.8.20, Foundry |
| Chain | Base (Sepolia for testnet) |
| Name Resolution | Basenames |
| Storage (snapshots) | IPFS |

---

## 📚 Resources

- [Base Docs](https://docs.base.org)
- [wagmi Docs](https://wagmi.sh)
- [viem Docs](https://viem.sh)
- [Foundry Book](https://book.getfoundry.sh)
- [Basenames](https://www.base.org/names)
- [Original r/place](https://www.reddit.com/r/place/)

