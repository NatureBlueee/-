import { motion } from 'framer-motion';

export function VariantAxis() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#E6E4D5]">
      {/* === 背景层：铁线描生命之树 (Iron Wire Tree) === */}
      {/* 使用 SVG Filter 模拟毛笔的“涩”感 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="iron-wire-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
            {/* 腐蚀效果，让线条边缘不那么平滑 */}
            <feMorphology operator="erode" radius="0.5" />
          </filter>
          <linearGradient id="ink-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c2c2c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2c2c2c" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* 中轴线 - 劲挺有力 */}
        <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M200,50 L200,750" 
          stroke="url(#ink-fade)" 
          strokeWidth="1.5" 
          fill="none"
          filter="url(#iron-wire-filter)"
        />

        {/* 树冠结构 - 模拟宋画衣纹 */}
        <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
          d="M200,150 C120,180 80,250 100,350" 
          stroke="#3a3a3a" 
          strokeWidth="1" 
          fill="none"
          filter="url(#iron-wire-filter)"
          opacity="0.6"
        />
        <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
          d="M200,150 C280,180 320,250 300,350" 
          stroke="#3a3a3a" 
          strokeWidth="1" 
          fill="none"
          filter="url(#iron-wire-filter)"
          opacity="0.6"
        />

        {/* 根系结构 */}
        <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 1, ease: "easeOut" }}
          d="M200,650 C150,700 120,750 130,780" 
          stroke="#3a3a3a" 
          strokeWidth="1" 
          fill="none"
          filter="url(#iron-wire-filter)"
          opacity="0.5"
        />
         <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 1, ease: "easeOut" }}
          d="M200,650 C250,700 280,750 270,780" 
          stroke="#3a3a3a" 
          strokeWidth="1" 
          fill="none"
          filter="url(#iron-wire-filter)"
          opacity="0.5"
        />

        {/* 节点晕染 - 墨点 */}
        <circle cx="200" cy="150" r="3" fill="#2c2c2c" filter="url(#iron-wire-filter)" opacity="0.8" />
        <circle cx="200" cy="400" r="4" fill="#2c2c2c" filter="url(#iron-wire-filter)" opacity="0.9" />
        <circle cx="200" cy="650" r="3" fill="#2c2c2c" filter="url(#iron-wire-filter)" opacity="0.8" />
      </svg>

      {/* === 内容层：绝对中轴 (The Absolute Axis) === */}
      <div className="z-10 flex flex-col items-center justify-between h-[70vh] py-12">
        
        {/* 1. 塔尖：身份 (Identity) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#555] opacity-50" />
          <h2 className="font-serif text-base tracking-[0.4em] text-[#444] font-medium">张晨曦</h2>
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#888] uppercase scale-90">Nature Chen</span>
        </motion.div>

        {/* 2. 核心：咒语 (The Mantra) */}
        <div className="flex flex-col items-center gap-16 relative">
          {/* 上：创造 (Keter) */}
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 0.5, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="writing-mode-vertical font-serif text-lg text-[#555] tracking-widest select-none"
            style={{ writingMode: 'vertical-rl' }}
          >
            创造
          </motion.div>

          {/* 中：爱 (Tiferet) - 视觉锚点 */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative group cursor-default"
          >
            {/* 汉字主体 */}
            <span className="font-serif text-7xl text-[#C5A059] font-bold tracking-widest relative z-10 drop-shadow-sm mix-blend-multiply">
              爱
            </span>
            
            {/* 呼吸光晕 (Breathing Glow) */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#C5A059] blur-[50px] rounded-full -z-10" 
            />
            
            {/* 细微的金粉粒子 (装饰) */}
            <div className="absolute -top-4 -right-4 w-1 h-1 bg-[#C5A059] rounded-full opacity-60" />
            <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-[#C5A059] rounded-full opacity-40" />
          </motion.div>

          {/* 下：创造 (Malkuth) */}
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 0.5, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="writing-mode-vertical font-serif text-lg text-[#555] tracking-widest select-none"
            style={{ writingMode: 'vertical-rl' }}
          >
            创造
          </motion.div>
        </div>

        {/* 3. 基座：现实 (Reality) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex flex-col items-center gap-1">
             <span className="font-mono text-[10px] tracking-[0.2em] text-[#666]">BUILDING WOWOK.NET</span>
             <span className="font-mono text-[10px] tracking-[0.2em] text-[#999]">BJ / NEU (26 FALL)</span>
          </div>
          <div className="w-[1px] h-12 bg-gradient-to-t from-transparent to-[#555] opacity-50" />
        </motion.div>
      </div>
    </div>
  );
}
