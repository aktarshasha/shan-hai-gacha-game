import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, History, Gem } from 'lucide-react';
import { CardReveal } from '@/components/CardReveal';
import type { DrawResult } from '@/types';

interface DrawSectionProps {
  onDraw: () => DrawResult;
  onDrawMultiple: (count: number) => DrawResult[];
  drawCount: number;
}

export function DrawSection({ onDraw, onDrawMultiple, drawCount }: DrawSectionProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [results, setResults] = useState<DrawResult[]>([]);

  const handleDraw = () => {
    const result = onDraw();
    setResults([result]);
    setIsRevealing(true);
  };

  const handleDrawTen = () => {
    const newResults = onDrawMultiple(3);
    setResults(newResults);
    setIsRevealing(true);
  };

  const handleCloseReveal = () => {
    setIsRevealing(false);
    setResults([]);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-500/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
        
        {/* Gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span className="text-sm uppercase tracking-widest text-amber-500/80">Mystical Summoning</span>
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-50 mb-3">
            Summon the Beasts
          </h1>
          <p className="text-stone-400 text-lg">
            Draw from the ancient tome to discover mythical creatures
          </p>
        </motion.div>

        {/* Draw buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <button
            onClick={handleDraw}
            className="shanjing-button w-full max-w-xs mx-auto flex items-center justify-center gap-3 text-lg py-4 mystical-glow"
          >
            <Sparkles className="w-5 h-5" />
            Summon Once
          </button>
          
          <button
            onClick={handleDrawTen}
            className="shanjing-button-secondary w-full max-w-xs mx-auto flex items-center justify-center gap-3 py-4"
          >
            <Gem className="w-5 h-5" />
            Summon x3
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-8"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-stone-400 mb-1">
              <History className="w-4 h-4" />
              <span className="text-sm">Total Summons</span>
            </div>
            <p className="text-2xl font-bold text-amber-100">{drawCount}</p>
          </div>
          
          <div className="w-px h-12 bg-stone-700/50" />
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-stone-400 mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Collection</span>
            </div>
            <p className="text-2xl font-bold text-amber-100">View Bestiary</p>
          </div>
        </motion.div>

        {/* Decorative seal */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-10 right-10 w-24 h-24 rounded-full border-4 border-amber-600/30 flex items-center justify-center"
        >
          <div className="text-amber-600/40 text-xs font-serif writing-vertical">山海经</div>
        </motion.div>
      </div>

      {/* Card reveal overlay */}
      <AnimatePresence>
        {isRevealing && (
          <CardReveal
            results={results}
            onClose={handleCloseReveal}
            onContinue={handleCloseReveal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
