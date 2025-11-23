/**
 * 变体 B：【重影 · 混沌】(The Echo) - 最终重构 v6：散落的信物
 *
 * 核心意象：
 * 1. 视觉骨架：实线双蛇 (Solid Caduceus) + 墨迹流淌
 * 2. 布局：散落的信物 (Scattered Artifacts) - 独立旋转的碎片
 * 3. 质感：泥金 (Gold Mud) + 沙砾 (Sand Grain)
 */

'use client';

import { motion } from 'framer-motion';

export function VariantEcho() {
  // 虚影动画参数 (呼吸)
  const ghostAnimation = {
    y: [-8, 8, -8],
    opacity: [0.5, 0.7, 0.5], // 提高基础可见度 (0.5)
    filter: ["blur(3px)", "blur(1.5px)", "blur(3px)"]
  };

  const ghostTransition = {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut"
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* === 全局滤镜定义 === */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          {/* 1. 墨迹流淌 (用于双蛇内部) */}
          <filter id="ink-flow-internal">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" values="0.015;0.025;0.015" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
            <feGaussianBlur stdDeviation="1" />
          </filter>

          {/* 2. 沙砾质感 (用于文字) */}
          <filter id="sand-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
            <feBlend mode="multiply" in="composite" in2="SourceGraphic" />
          </filter>

          {/* 3. 泥金噪点 (用于 Nature) */}
          <filter id="gold-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="noise" />
            <feComposite operator="in" in="noise" in2="SourceGraphic" result="composite" />
            <feBlend mode="overlay" in="composite" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      {/* === 背景层：实线双蛇 (Solid Caduceus) === */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
          opacity: 0.2, // 整体淡一点，不抢戏
        }}
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 左蛇 - 实线 + 内部流淌 */}
        <motion.path
          d="M160,100 Q240,200 160,300 Q80,400 160,500 Q240,600 160,700"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="22" // 加粗一点
          filter="url(#ink-flow-internal)"
          strokeLinecap="round"
        />
        
        {/* 右蛇 - 实线 + 内部流淌 */}
        <motion.path
          d="M240,100 Q160,200 240,300 Q320,400 240,500 Q160,600 240,700"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="22"
          filter="url(#ink-flow-internal)"
          strokeLinecap="round"
        />
      </svg>

      {/* === 内容层 === */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {/* 1. 顶部组合：Nature (泥金) > 创造 */}
        <div style={{ position: 'absolute', top: '12%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* 名字 (Nature) - 泥金质感 */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{
                    fontFamily: 'var(--font-serif)', 
                    fontStyle: 'italic', // 斜体
                    fontSize: '32px', 
                    fontWeight: 600,
                    color: '#C5A059', // 泥金
                    letterSpacing: '0.05em',
                    marginBottom: '20px', // 拉开距离
                    zIndex: 20,
                    position: 'relative',
                    filter: 'url(#gold-noise)', // 叠加噪点
                }}
            >
                Nature
            </motion.h1>
            
            {/* 创造 (虚影) */}
            <motion.div
              animate={ghostAnimation}
              transition={ghostTransition}
              whileHover={{ opacity: 1, filter: "blur(0px)", scale: 1.05 }}
              transition={{ duration: 0.3 }} // 瞬间响应
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '48px',
                color: '#555',
                mixBlendMode: 'multiply',
                userSelect: 'none',
                zIndex: 10,
                cursor: 'default',
              }}
            >
              创造
            </motion.div>
        </div>

        {/* 2. 核心：爱 (实体) */}
        <div style={{ position: 'relative' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '120px',
              lineHeight: 1,
              fontWeight: 300,
              color: '#111',
              letterSpacing: '0.05em',
              mixBlendMode: 'multiply',
            }}
          >
            爱
          </motion.div>

          {/* 金缮 */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              overflow: 'visible',
              zIndex: 20,
            }}
            viewBox="0 0 100 100"
          >
            <defs>
              <filter id="gold-glow-echo">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
              d="M15,25 L35,40 L55,32 L75,55"
              fill="none"
              stroke="#C5A059"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#gold-glow-echo)"
            />
          </svg>
        </div>

        {/* 3. 底部组合：生命 + 生命之花 */}
        <div style={{ position: 'absolute', bottom: '12%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* 生命之花 (背景光纹) */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px',
                    opacity: 0.15,
                    pointerEvents: 'none',
                }}
            >
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#C5A059" strokeWidth="0.5" />
                    <circle cx="50" cy="30" r="20" fill="none" stroke="#C5A059" strokeWidth="0.5" />
                    <circle cx="50" cy="70" r="20" fill="none" stroke="#C5A059" strokeWidth="0.5" />
                    <circle cx="32.6" cy="40" r="20" fill="none" stroke="#C5A059" strokeWidth="0.5" />
                    <circle cx="67.4" cy="40" r="20" fill="none" stroke="#C5A059" strokeWidth="0.5" />
                    <circle cx="32.6" cy="60" r="20" fill="none" stroke="#C5A059" strokeWidth="0.5" />
                    <circle cx="67.4" cy="60" r="20" fill="none" stroke="#C5A059" strokeWidth="0.5" />
                </svg>
            </motion.div>

            {/* 生命 (虚影) */}
            <motion.div
              animate={ghostAnimation}
              transition={{ ...ghostTransition, duration: 9 }} // 错开相位
              whileHover={{ opacity: 1, filter: "blur(0px)", scale: 1.05 }}
              transition={{ duration: 0.3 }} // 瞬间响应
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '48px',
                color: '#555',
                mixBlendMode: 'multiply',
                userSelect: 'none',
                zIndex: 10,
                cursor: 'default',
              }}
            >
              生命
            </motion.div>
        </div>

        {/* 4. 散落的信物 (Scattered Artifacts) - 独立碎片 */}
        
        {/* 碎片 A: 北京 (左下偏中) */}
        <motion.div 
            initial={{ opacity: 0, y: 20, rotate: -10 }} whileInView={{ opacity: 1, y: 0, rotate: -5 }} transition={{ delay: 0.5 }}
            style={{ 
                position: 'absolute', bottom: '22%', left: '25%', 
                fontFamily: 'var(--font-serif)', fontSize: '16px', color: '#2A2A2A', 
                filter: 'url(#sand-grain)', whiteSpace: 'nowrap'
            }}
        >
            北京 · 大四在读
        </motion.div>

        {/* 碎片 B: NEU (左下底角) */}
        <motion.div 
            initial={{ opacity: 0, y: 20, rotate: 0 }} whileInView={{ opacity: 0.8, y: 0, rotate: 3 }} transition={{ delay: 0.7 }}
            style={{ 
                position: 'absolute', bottom: '10%', left: '15%', 
                fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#444', 
                filter: 'url(#sand-grain)', whiteSpace: 'nowrap'
            }}
        >
            NEU 26 Fall
        </motion.div>

        {/* 碎片 C: wowok (左侧边缘) */}
        <motion.a 
            href="https://wowok.net" target="_blank"
            initial={{ opacity: 0, x: -20, rotate: -15 }} whileInView={{ opacity: 1, x: 0, rotate: -8 }} transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.1, color: '#C5A059' }}
            style={{ 
                position: 'absolute', bottom: '35%', left: '10%', 
                fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '18px', color: '#C5A059', 
                textDecoration: 'none', cursor: 'pointer', filter: 'url(#sand-grain)', whiteSpace: 'nowrap'
            }}
        >
            wowok.net
        </motion.a>

        {/* 碎片 D: 写作 (右下偏中) */}
        <motion.div 
            initial={{ opacity: 0, y: 20, rotate: 10 }} whileInView={{ opacity: 1, y: 0, rotate: 4 }} transition={{ delay: 0.6 }}
            style={{ 
                position: 'absolute', bottom: '22%', right: '25%', 
                fontFamily: 'var(--font-serif)', fontSize: '16px', color: '#2A2A2A', 
                filter: 'url(#sand-grain)', whiteSpace: 'nowrap'
            }}
        >
            写作 & 视觉艺术
        </motion.div>

        {/* 碎片 E: 哲学 (右下底角) */}
        <motion.div 
            initial={{ opacity: 0, y: 20, rotate: 0 }} whileInView={{ opacity: 0.8, y: 0, rotate: -2 }} transition={{ delay: 0.8 }}
            style={{ 
                position: 'absolute', bottom: '10%', right: '15%', 
                fontFamily: 'var(--font-serif)', fontSize: '16px', color: '#444', 
                filter: 'url(#sand-grain)', whiteSpace: 'nowrap'
            }}
        >
            存在主义哲学
        </motion.div>

        {/* 碎片 F: 灵性 (右侧边缘) */}
        <motion.div 
            initial={{ opacity: 0, x: 20, rotate: 15 }} whileInView={{ opacity: 1, x: 0, rotate: 6 }} transition={{ delay: 1.0 }}
            style={{ 
                position: 'absolute', bottom: '35%', right: '10%', 
                fontFamily: 'var(--font-serif)', fontSize: '16px', color: '#2A2A2A', 
                filter: 'url(#sand-grain)', whiteSpace: 'nowrap'
            }}
        >
            跨文化灵性
        </motion.div>

      </div>
    </div>
  );
}
