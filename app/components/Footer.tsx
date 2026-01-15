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
    <aside className="fixed left-0 top-20 z-40 p-6 flex flex-col items-start space-y-4">
      <span className="pixel-font text-[10px] text-gray-500 uppercase tracking-widest mb-2">
        ACTIONS
      </span>
      <button
        onClick={handleSnapshot}
        className="w-28 h-24 retro-btn bg-[#262626] border-[#333] pixel-font text-[12px] flex flex-col items-center justify-center group"
      >
        <Camera className="w-8 h-8 mb-2 text-[#87CEEB] group-hover:accent-glow-blue" />
        SNAP
      </button>
      <button
        onClick={handleMint}
        className="w-28 h-24 retro-btn bg-[#D64545] border-[#0a0a0a] text-white pixel-font text-[12px] flex flex-col items-center justify-center group"
      >
        <Sparkles className="w-8 h-8 mb-2 text-[#FFD700] accent-glow-gold" />
        MINT
      </button>
    </aside>
  );
}
