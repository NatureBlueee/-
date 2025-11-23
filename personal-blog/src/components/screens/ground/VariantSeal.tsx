import { motion } from 'framer-motion';

export function VariantSeal() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#E6E4D5]">
      {/* 背景：极简，只有微弱的噪点 */}
      
      {/* === 印章本体 (The Seal) === */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, rotate: 45, y: 50 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 45, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 40, damping: 15 }}
        className="relative w-[320px] h-[320px] bg-[#F2F1E8] flex items-center justify-center group"
        style={{
          // 拟态风格阴影 + 纸张压痕效果
          boxShadow: `
            1px 1px 0px rgba(0,0,0,0.05),
            2px 2px 0px rgba(0,0,0,0.05),
            3px 3px 0px rgba(0,0,0,0.05),
            20px 20px 40px rgba(0,0,0,0.1),
            -10px -10px 40px rgba(255,255,255,0.8)
          `
        }}
      >
        {/* 石头纹理叠加 */}
        <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
        
        {/* 印章边框 (内凹效果 - 阴刻) */}
        <div className="absolute inset-3 border-[1px] border-[#C5A059] opacity-40 mix-blend-multiply" />
        <div className="absolute inset-5 border-[1px] border-[#C5A059] opacity-20 mix-blend-multiply" />

        {/* === 内部内容 (旋转回正) === */}
        <div className="-rotate-45 flex flex-col items-center justify-center w-full h-full p-6 text-center relative z-10">
            
            {/* 顶部：名 (Name) */}
            <div className="flex flex-col items-center gap-2 border-b border-[#C5A059] border-opacity-30 pb-4 w-3/4">
                <span className="font-serif text-2xl text-[#333] tracking-[0.4em] font-bold ml-2">张晨曦</span>
                <span className="font-mono text-[8px] text-[#999] tracking-[0.3em] uppercase">Nature Chen</span>
            </div>
            
            {/* 核心阵列：创造·爱·创造 */}
            <div className="flex items-center justify-center gap-6 my-6 w-full">
                {/* 左护法：创造 */}
                <div className="writing-mode-vertical font-serif text-xs text-[#666] opacity-60 tracking-widest border-l border-[#C5A059] border-opacity-20 pl-2 h-16 flex items-center" style={{ writingMode: 'vertical-rl' }}>
                    创造
                </div>
                
                {/* 核心字：爱 (朱砂红印泥质感) */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative w-20 h-20 flex items-center justify-center rounded-sm bg-[#B22222] text-[#F2F1E8] shadow-inner overflow-hidden"
                >
                    {/* 印泥纹理 */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/rough-cloth.png')] mix-blend-multiply" />
                    <div className="absolute inset-0 opacity-20 bg-black mix-blend-overlay" /> {/* 增加厚重感 */}
                    
                    <span className="font-serif text-5xl font-bold relative z-10" style={{ filter: 'blur(0.3px)' }}>爱</span>
                </motion.div>

                {/* 右护法：创造 */}
                <div className="writing-mode-vertical font-serif text-xs text-[#666] opacity-60 tracking-widest border-r border-[#C5A059] border-opacity-20 pr-2 h-16 flex items-center" style={{ writingMode: 'vertical-rl' }}>
                    创造
                </div>
            </div>

            {/* 底部：状态 (Status) */}
            <div className="flex flex-col items-center gap-2 border-t border-[#C5A059] border-opacity-30 pt-4 w-3/4">
                <span className="font-mono text-[8px] text-[#666] tracking-[0.2em]">BUILDING WOWOK.NET</span>
                <span className="font-mono text-[8px] text-[#999] tracking-[0.2em]">BJ / NEU (26 FALL)</span>
            </div>
        </div>
        
        {/* 边角金缮 (Kintsugi Corners) */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-[1px] border-l-[1px] border-[#C5A059] opacity-80" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-[1px] border-r-[1px] border-[#C5A059] opacity-80" />
        
        {/* 缺角效果 (Wabi-sabi) */}
        <div className="absolute top-[-5px] right-[-5px] w-8 h-8 bg-[#E6E4D5] rotate-45 transform translate-y-2" />
        
      </motion.div>
    </div>
  );
}
