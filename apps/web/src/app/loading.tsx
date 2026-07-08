'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      {/* Luxury gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4] 
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-[100px]" 
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), 
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Loading Content */}
      <div className="relative text-center">
        {/* Animated Logo/Icon */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30"
          />
          
          {/* Middle pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-2 rounded-full border border-accent/40"
          />
          
          {/* Inner static ring */}
          <div className="absolute inset-4 rounded-full border border-accent/50" />
          
          {/* Center icon - Compass/Travel */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-6 flex items-center justify-center"
          >
            <svg 
              className="w-full h-full text-accent" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
              />
            </svg>
          </motion.div>
          
          {/* Orbiting dot */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50" />
          </motion.div>
        </div>
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
            Crafting Your Journey
          </h2>
          
          {/* Animated loading text */}
          <div className="flex items-center justify-center gap-2 text-foreground-secondary">
            <span>Please wait</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ·
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              ·
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            >
              ·
            </motion.span>
          </div>
        </motion.div>
        
        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 w-48 mx-auto"
        >
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent"
            />
          </div>
        </motion.div>
        
        {/* Subtle tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-xs text-foreground-secondary tracking-widest uppercase"
        >
          Curated Travel Experiences
        </motion.p>
      </div>
    </div>
  );
}
