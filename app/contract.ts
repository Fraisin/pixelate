export const PIXELATE_ADDRESS = '0x41BC2c72ED909B26a3FA5b5791976C67e39C1B0D' as const;

export const PIXELATE_ABI = [
  {
    type: 'function',
    name: 'placePixel',
    inputs: [
      { name: 'x', type: 'uint256' },
      { name: 'y', type: 'uint256' },
      { name: 'color', type: 'uint8' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getPixel',
    inputs: [
      { name: 'x', type: 'uint256' },
      { name: 'y', type: 'uint256' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'color', type: 'uint8' },
          { name: 'lastPlacer', type: 'address' },
          { name: 'lastPlacedAt', type: 'uint40' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pixels',
    inputs: [{ name: 'pixelId', type: 'uint256' }],
    outputs: [
      { name: 'color', type: 'uint8' },
      { name: 'lastPlacer', type: 'address' },
      { name: 'lastPlacedAt', type: 'uint40' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'canPlace',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'lastActionTime',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'WIDTH',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'HEIGHT',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'COOLDOWN',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'PALETTE_SIZE',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'PixelPlaced',
    inputs: [
      { name: 'pixelId', type: 'uint256', indexed: true },
      { name: 'color', type: 'uint8', indexed: false },
      { name: 'placer', type: 'address', indexed: true },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'error',
    name: 'XOutOfBounds',
    inputs: [
      { name: 'x', type: 'uint256' },
      { name: 'max', type: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'YOutOfBounds',
    inputs: [
      { name: 'y', type: 'uint256' },
      { name: 'max', type: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'InvalidColor',
    inputs: [
      { name: 'color', type: 'uint8' },
      { name: 'maxColors', type: 'uint8' },
    ],
  },
  {
    type: 'error',
    name: 'CooldownActive',
    inputs: [{ name: 'remainingSeconds', type: 'uint256' }],
  },
] as const;

