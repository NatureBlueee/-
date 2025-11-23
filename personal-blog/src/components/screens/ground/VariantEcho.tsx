/**
 * 变体 B：【重影 · 混沌】(The Echo)
 *
 * 关键词：水墨晕染、纠缠、双生
 * 表达"二元对立与统一" —— 双蛇仗 (Caduceus)
 */

'use client';

import { motion } from 'framer-motion';

export function VariantEcho() {
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
      {/* === 背景层：水墨双蛇 === */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
          opacity: 0.15,
        }}
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="ink-wash-echo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="noise" />
            <feDisplacementMap in="blur" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="smoke-flow-echo" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* 左蛇 */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          d="M160,100 Q240,200 160,300 Q80,400 160,500 Q240,600 160,700"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="20"
          filter="url(#ink-wash-echo)"
          strokeLinecap="round"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 4.5, ease: "easeInOut" }}
          d="M160,100 Q240,200 160,300 Q80,400 160,500 Q240,600 160,700"
          fill="none"
          stroke="#555555"
          strokeWidth="40"
          filter="url(#smoke-flow-echo)"
          strokeLinecap="round"
        />

        {/* 右蛇 */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 4, delay: 0.3, ease: "easeInOut" }}
          d="M240,100 Q160,200 240,300 Q320,400 240,500 Q160,600 240,700"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="20"
          filter="url(#ink-wash-echo)"
          strokeLinecap="round"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 4.5, delay: 0.3, ease: "easeInOut" }}
          d="M240,100 Q160,200 240,300 Q320,400 240,500 Q160,600 240,700"
          fill="none"
          stroke="#555555"
          strokeWidth="40"
          filter="url(#smoke-flow-echo)"
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
        {/* 上虚影 */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            opacity: [0.15, 0.25, 0.15],
            filter: ["blur(3px)", "blur(1.5px)", "blur(3px)"]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '18%',
            fontFamily: 'var(--font-serif)',
            fontSize: '48px',
            color: '#555',
            mixBlendMode: 'multiply',
            userSelect: 'none',
          }}
        >
          创造
        </motion.div>

        {/* 下虚影 */}
        <motion.div
          animate={{
            y: [8, -8, 8],
            opacity: [0.15, 0.25, 0.15],
            filter: ["blur(3px)", "blur(1.5px)", "blur(3px)"]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '18%',
            fontFamily: 'var(--font-serif)',
            fontSize: '48px',
            color: '#555',
            mixBlendMode: 'multiply',
            userSelect: 'none',
          }}
        >
          创造
        </motion.div>

        {/* 核心：爱 */}
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
            <motion.circle
              cx="35" cy="40" r="1.2"
              fill="#C5A059"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2 }}
            />
            <motion.circle
              cx="55" cy="32" r="0.8"
              fill="#C5A059"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            />
          </svg>
        </div>

        {/* 信息层 */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.5,
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C5A059' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', color: '#444', textTransform: 'uppercase' }}>
            Nature Chen
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.5,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', color: '#444', textTransform: 'uppercase' }}>
            Genesis Architect
          </span>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C5A059' }} />
        </div>
      </div>
    </div>
  );
}
