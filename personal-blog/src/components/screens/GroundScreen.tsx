/**
 * 地界（坛城）- 第三屏
 *
 * 核心美学：宋代高古 (Old Song) x 神秘学 (Mysticism)
 * 核心布局：绝对居中 (The Altar)
 * 核心文案：创造 · 爱 · 创造
 */

'use client';

import { useState } from 'react';

import { VariantAxis } from './ground/VariantAxis';
import { VariantEcho } from './ground/VariantEcho';
import { VariantSeal } from './ground/VariantSeal';

type AltarVariant = 'axis' | 'echo' | 'seal';

export function GroundScreen() {
  const [variant, setVariant] = useState<AltarVariant>('axis');

  return (
    <section className="screen screen-ground flex flex-col items-center justify-center overflow-hidden" id="ground">
      {/* 丝绸纹理 */}
      <div className="silk-texture" />

      {/* 变体切换器 (开发用) */}
      <div className="absolute top-8 right-8 z-50 flex gap-4 font-mono text-xs opacity-50 hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setVariant('axis')}
          className={`px-2 py-1 border ${variant === 'axis' ? 'border-[#C5A059] text-[#C5A059]' : 'border-gray-400 text-gray-500'}`}
        >
          AXIS
        </button>
        <button 
          onClick={() => setVariant('echo')}
          className={`px-2 py-1 border ${variant === 'echo' ? 'border-[#C5A059] text-[#C5A059]' : 'border-gray-400 text-gray-500'}`}
        >
          ECHO
        </button>
        <button 
          onClick={() => setVariant('seal')}
          className={`px-2 py-1 border ${variant === 'seal' ? 'border-[#C5A059] text-[#C5A059]' : 'border-gray-400 text-gray-500'}`}
        >
          SEAL
        </button>
      </div>

      {/* 变体 A: 中轴 · 生命树 (The Axis) */}
      {variant === 'axis' && <VariantAxis />}

      {/* 变体 B: 重影 · 双蛇仗 (The Echo) */}
      {variant === 'echo' && <VariantEcho />}

      {/* 变体 C: 金印 · 魔法师 (The Seal) */}
      {variant === 'seal' && <VariantSeal />}
    </section>
  );
}
