import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DrawResult } from '@/types';
import { rarityColors, rarityGlowColors } from '@/data/creatures';
import { Sparkles, X, MapPin, Zap, Flame, Droplets, Mountain, Wind, Circle } from 'lucide-react';

interface CardRevealProps {
  results: DrawResult[];
  onClose: () => void;
  onContinue: () => void;
}

const elementIcons = {
  fire: Flame,
  water: Droplets,
  earth: Mountain,
  wind: Wind,
  lightning: Zap,
  none: Circle
};

function SingleReveal({ result, onComplete }: { result: DrawResult; onComplete: () => void }) {
  const [stage, setStage] = useState<'initial' | 'flipping' | 'revealed'>('initial');
  const { creature, isNew } = result;
  const rarityColor = rarityColors[creature.rarity];
  const rarityGlow = rarityGlowColors[creature.rarity];
  const ElementIcon = elementIcons[creature.element];

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('flipping'), 500);
    const timer2 = setTimeout(() => setStage('revealed'), 1500);
    const timer3 = setTimeout(() => onComplete(), 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <AnimatePresence mode="wait">
        {stage === 'initial' && (
          <motion.div
            key="initial"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="aspect-[3/4] relative"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden card-frame">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-stone-900/80 to-amber-950/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-24 h-24 rounded-full border-4 border-amber-500/30 border-t-amber-500/80"
                />
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'flipping' && (
          <motion.div
            key="flipping"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 180 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="aspect-[3/4] relative preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-stone-900/80 to-amber-950/60" />
            </div>
          </motion.div>
        )}

        {stage === 'revealed' && (
          <motion.div
            key="revealed"
            initial={{ scale: 0.8, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="aspect-[3/4] relative"
          >
            {/* Glow background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -inset-8 rounded-3xl blur-3xl"
              style={{ background: `radial-gradient(circle, ${rarityGlow} 0%, transparent 70%)` }}
            />
            
            {/* Card */}
            <div 
              className="absolute inset-0 rounded-2xl overflow-hidden shanjing-card"
              style={{ boxShadow: `0 0 40px ${rarityGlow}, inset 0 0 0 2px ${rarityColor}60` }}
            >
              {/* Image */}
              <div className="relative h-3/5 overflow-hidden">
                <img 
                  src={creature.image} 
                  alt={creature.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950" />
                
                {/* New badge */}
                {isNew && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-sm font-bold text-stone-900 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    NEW DISCOVERY
                  </motion.div>
                )}
                
                {/* Element badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-stone-900/70 backdrop-blur-sm flex items-center justify-center border border-stone-700/50">
                  <ElementIcon className="w-5 h-5" style={{ color: rarityColor }} />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5 h-2/5 flex flex-col">
                {/* Rarity */}
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: rarityColor, boxShadow: `0 0 12px ${rarityColor}` }}
                  />
                  <span 
                    className="text-xs uppercase tracking-widest font-semibold"
                    style={{ color: rarityColor }}
                  >
                    {creature.rarity}
                  </span>
                </div>
                
                {/* Name */}
                <h2 className="text-xl font-bold text-amber-50 mb-1">
                  {creature.name}
                </h2>
                <p className="text-base text-amber-500/80 font-serif mb-3">
                  {creature.nameCn}
                </p>
                
                {/* Origin */}
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{creature.origin}</span>
                </div>
              </div>
            </div>
            
            {/* Particle effects for high rarity */}
            {(creature.rarity === 'legendary' || creature.rarity === 'mythical') && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: '50%', 
                      y: '50%', 
                      scale: 0,
                      opacity: 1 
                    }}
                    animate={{ 
                      x: `${50 + (Math.random() - 0.5) * 150}%`, 
                      y: `${50 + (Math.random() - 0.5) * 150}%`,
                      scale: Math.random() * 0.5 + 0.5,
                      opacity: 0
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ background: rarityColor }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CardReveal({ results, onClose, onContinue }: CardRevealProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const handleComplete = () => {
    if (currentIndex < results.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const newCount = results.filter(r => r.isNew).length;

  if (showSummary) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/50 hover:bg-stone-700/50 transition-colors"
        >
          <X className="w-6 h-6 text-stone-400" />
        </button>

        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-stone-900" />
            </div>
            <h2 className="text-2xl font-bold text-amber-50 mb-2">Summon Complete</h2>
            <p className="text-stone-400">
              {newCount > 0 ? (
                <span>You discovered <span className="text-amber-400 font-semibold">{newCount}</span> new creature{newCount > 1 ? 's' : ''}!</span>
              ) : (
                'All creatures have been added to your collection.'
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {results.map((result, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square rounded-lg overflow-hidden relative"
                style={{ boxShadow: `0 0 16px ${rarityGlowColors[result.creature.rarity]}` }}
              >
                <img 
                  src={result.creature.image} 
                  alt={result.creature.name}
                  className="w-full h-full object-cover"
                />
                {result.isNew && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5 text-stone-900" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <button onClick={onContinue} className="shanjing-button w-full">
            Continue
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-xl"
    >
      {/* Progress indicator */}
      {results.length > 1 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
          {results.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i <= currentIndex ? 'bg-amber-500' : 'bg-stone-700'
              }`}
            />
          ))}
        </div>
      )}

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/50 hover:bg-stone-700/50 transition-colors z-10"
      >
        <X className="w-6 h-6 text-stone-400" />
      </button>

      <SingleReveal 
        result={results[currentIndex]} 
        onComplete={handleComplete}
      />
    </motion.div>
  );
}
