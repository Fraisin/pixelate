'use client';

import { useState } from 'react';

const GRID_SIZE = 64;

const PALETTE = [
  // Index 0: Default/unplaced (grey)
  '#2A2A2A',
  // Row 1: Warm tones (1-7)
  '#FF6969', '#FF4191', '#E4003A', '#FF7F3E', '#F9D689', '#FFD635', '#FFA800',
  // Row 2: Cool tones (8-15)
  '#37B7C3', '#0083C7', '#0052FF', '#0000EA', '#9B86BD', '#604CC3', '#820080', '#CF6EE4',
  // Row 3: Nature tones (16-23)
  '#0A6847', '#02BE01', '#94E044', '#597445', '#91DDCF', '#00D3DD', '#00CCC0', '#00A368',
  // Row 4: Neutrals & accents (24-31)
  '#FFFFFF', '#E5E1DA', '#C4C4C4', '#888888', '#640D6B', '#561C24', '#A06A42', '#6D482F',
];

export default function Home() {
  const [pixels, setPixels] = useState<number[]>(Array(GRID_SIZE * GRID_SIZE).fill(0));
  const [selectedColor, setSelectedColor] = useState(1);
  const [hoveredPixel, setHoveredPixel] = useState<number | null>(null);

  const handlePixelClick = (index: number) => {
    const x = index % GRID_SIZE;
    const y = Math.floor(index / GRID_SIZE);
    console.log(`Placing pixel at (${x}, ${y}) with color ${selectedColor}`);
    
    setPixels((prev) => {
      const newPixels = [...prev];
      newPixels[index] = selectedColor;
      return newPixels;
    });
  };

  const getCoords = (index: number) => {
    const x = index % GRID_SIZE;
    const y = Math.floor(index / GRID_SIZE);
    return { x, y };
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-white">Pixelate</h1>

      {/* Wallet placeholder - teammate working on this */}
      <div className="mb-4 text-sm text-gray-500">
        [Wallet connection coming soon]
      </div>
      
      {/* Color Palette */}
      <div className="flex flex-wrap gap-3 justify-center mb-6 max-w-md">
        {PALETTE.map((color, i) => (
          <button
            key={i}
            onClick={() => setSelectedColor(i)}
            className="relative flex justify-center items-center"
          >
            <div
              className="w-7 h-7 rounded-full border-none z-10"
              style={{ backgroundColor: color }}
            />
            {selectedColor === i && (
              <div className="z-0 w-9 h-9 ring-2 ring-[#0052FF] absolute rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Hover Info */}
      <div className="h-6 mb-3 text-sm text-gray-400 font-mono">
        {hoveredPixel !== null ? (
          <span>({getCoords(hoveredPixel).x}, {getCoords(hoveredPixel).y})</span>
        ) : (
          <span className="text-gray-600">hover over canvas</span>
        )}
      </div>

      {/* Canvas */}
      <div className="relative">
        <div
          className="border border-gray-800 rounded-lg overflow-hidden shadow-2xl"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 8px)`,
            gap: 0,
          }}
        >
          {pixels.map((colorIndex, i) => (
            <div
              key={i}
              className="w-2 h-2 cursor-pointer transition-opacity hover:opacity-75"
              style={{ backgroundColor: PALETTE[colorIndex] || PALETTE[0] }}
              onClick={() => handlePixelClick(i)}
              onMouseEnter={() => setHoveredPixel(i)}
              onMouseLeave={() => setHoveredPixel(null)}
            />
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Click a pixel to place · 60s cooldown (when connected)
      </p>
    </main>
  );
}
