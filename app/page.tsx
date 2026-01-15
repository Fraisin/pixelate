'use client';

import { useState } from 'react';

const GRID_SIZE = 64;

const PALETTE = [
  // Row 1: Warm tones
  '#FF6969', '#FF4191', '#E4003A', '#BE0039',
  '#FF7F3E', '#F9D689', '#FFD635', '#FFA800',
  // Row 2: Cool tones  
  '#37B7C3', '#0083C7', '#0052FF', '#0000EA',
  '#9B86BD', '#604CC3', '#820080', '#CF6EE4',
  // Row 3: Nature tones
  '#0A6847', '#02BE01', '#94E044', '#9E9FA5',
  '#597445', '#91DDCF', '#00D3DD', '#00CCC0',
  // Row 4: Neutrals & Earth
  '#E5E1DA', '#C4C4C4', '#888888', '#222222',
  '#640D6B', '#561C24', '#A06A42', '#6D482F',
];

export default function Home() {
  const [pixels, setPixels] = useState<number[]>(Array(GRID_SIZE * GRID_SIZE).fill(26));
  const [selectedColor, setSelectedColor] = useState(0);
  const [hoveredPixel, setHoveredPixel] = useState<number | null>(null);

  const handlePixelClick = (index: number) => {
    const newPixels = [...pixels];
    newPixels[index] = selectedColor;
    setPixels(newPixels);
  };

  const getCoords = (index: number) => {
    const x = index % GRID_SIZE;
    const y = Math.floor(index / GRID_SIZE);
    return { x, y };
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-white">Pixelate</h1>
      
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
            style={{ backgroundColor: PALETTE[colorIndex] }}
            onClick={() => handlePixelClick(i)}
            onMouseEnter={() => setHoveredPixel(i)}
            onMouseLeave={() => setHoveredPixel(null)}
          />
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Click to place pixels · Local only
      </p>
    </main>
  );
}
