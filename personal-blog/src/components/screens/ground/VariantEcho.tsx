import { motion } from 'framer-motion';

export function VariantEcho() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#E6E4D5]">
      {/* === 背景层：水墨双蛇 (Ink Wash Caduceus) === */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none mix-blend-multiply">
         <svg width="100%" height="100%" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* 水墨扩散滤镜 */}
              <filter id="ink-wash" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="5" result="noise" />
                <feDisplacementMap in="blur" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                <feColorMatrix in="displaced" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
              </filter>
              
              {/* 烟雾流动滤镜 */}
              <filter id="smoke-flow">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            {/* 左蛇 - 浓墨 */}
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 4, ease: "easeInOut" }}
              d="M150,100 Q250,200 150,300 T150,500 T150,700" 
              fill="none" 
              stroke="#1a1a1a" 
              strokeWidth="25" 
              filter="url(#ink-wash)" 
              strokeLinecap="round"
            />
            {/* 左蛇 - 淡墨晕染 (Layering) */}
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 4.5, ease: "easeInOut" }}
              d="M150,100 Q250,200 150,300 T150,500 T150,700" 
              fill="none" 
              stroke="#555" 
              strokeWidth="50" 
              filter="url(#smoke-flow)" 
              strokeLinecap="round"
            />

            {/* 右蛇 - 浓墨 */}
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
              d="M250,100 Q150,200 250,300 T250,500 T250,700" 
              fill="none" 
              stroke="#1a1a1a" 
              strokeWidth="25" 
              filter="url(#ink-wash)" 
              strokeLinecap="round"
            />
         </svg>
      </div>

      {/* === 内容层：重影与实体 === */}
      <div className="z-10 flex flex-col items-center justify-center h-full relative w-full">
        
        {/* 1. 上虚影：创造 (Echo Past) */}
        <motion.div 
          animate={{ y: [-10, 10, -10], opacity: [0.1, 0.3, 0.1], filter: ["blur(4px)", "blur(2px)", "blur(4px)"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] font-serif text-5xl text-[#555] select-none mix-blend-multiply"
        >
          创造
        </motion.div>
        
        {/* 2. 下虚影：创造 (Echo Future) */}
        <motion.div 
          animate={{ y: [10, -10, 10], opacity: [0.1, 0.3, 0.1], filter: ["blur(4px)", "blur(2px)", "blur(4px)"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] font-serif text-5xl text-[#555] select-none mix-blend-multiply"
        >
          创造
        </motion.div>

        {/* 3. 核心实体：爱 (The Solid Core) */}
        <div className="relative group">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-serif text-[120px] leading-none text-[#111] font-light tracking-widest relative z-10 mix-blend-multiply"
          >
            爱
          </motion.div>
          
          {/* 金缮修复 (Kintsugi) - 锐利的金线 */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-20">
            <defs>
              <filter id="gold-glow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
              d="M10,20 L40,40 L60,30 L90,60" 
              fill="none" 
              stroke="#C5A059" 
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#gold-glow)"
            />
            {/* 金粉散落 */}
            <motion.circle cx="40" cy="40" r="1.5" fill="#C5A059" initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:2}} />
            <motion.circle cx="60" cy="30" r="1" fill="#C5A059" initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:2.2}} />
          </svg>
        </div>

        {/* 4. 信息层：极简标注 */}
        <div className="absolute top-12 flex flex-col items-center gap-2 opacity-60">
           <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
           <span className="font-mono text-[10px] tracking-[0.3em] text-[#444] uppercase">Nature Chen</span>
        </div>
        
        <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-60">
           <span className="font-mono text-[10px] tracking-[0.3em] text-[#444] uppercase">Genesis Architect</span>
           <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
        </div>

      </div>
    </div>
  );
}
