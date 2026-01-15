'use client';

import { Camera, Sparkles } from 'lucide-react';

export function Footer() {
  const handleSnapshot = () => {
    console.log('Snapshot clicked');
  };

  const handleMint = () => {
    console.log('Mint clicked');
  };

  return (
    <footer className="h-40 border-t-4 border-black/40 bg-[#121212] z-40 p-6 flex items-center justify-end space-x-8">
      <div className="flex items-center space-x-4 pr-4">
        <button
          onClick={handleSnapshot}
          className="h-20 px-8 retro-btn bg-[#262626] border-[#333] pixel-font text-[12px] flex flex-col items-center justify-center group"
        >
          <Camera className="w-6 h-6 mb-2 text-[#87CEEB] group-hover:accent-glow-blue" />
          SNAP
        </button>
        <button
          onClick={handleMint}
          className="h-20 px-12 retro-btn bg-[#D64545] border-[#0a0a0a] text-white pixel-font text-[12px] flex flex-col items-center justify-center group"
        >
          <Sparkles className="w-6 h-6 mb-2 text-[#FFD700] accent-glow-gold" />
          MINT
        </button>
      </div>
    </footer>
  );
}
