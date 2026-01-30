import { motion, AnimatePresence } from 'framer-motion';
import type { Creature } from '@/types';
import { rarityColors, rarityGlowColors } from '@/data/creatures';
import { X, MapPin, Zap, Flame, Droplets, Mountain, Wind, Circle, BookOpen, Sparkles } from 'lucide-react';

interface LoreModalProps {
  creature: Creature | null;
  isOpen: boolean;
  onClose: () => void;
}

const elementIcons = {
  fire: Flame,
  water: Droplets,
  earth: Mountain,
  wind: Wind,
  lightning: Zap,
  none: Circle
};

const elementNames = {
  fire: 'Fire',
  water: 'Water',
  earth: 'Earth',
  wind: 'Wind',
  lightning: 'Lightning',
  none: 'None'
};

export function LoreModal({ creature, isOpen, onClose }: LoreModalProps) {
  if (!creature) return null;

  const ElementIcon = elementIcons[creature.element];
  const rarityColor = rarityColors[creature.rarity];
  const rarityGlow = rarityGlowColors[creature.rarity];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/70 backdrop-blur-sm hover:bg-stone-800/70 transition-colors border border-stone-700/50"
            >
              <X className="w-5 h-5 text-stone-400" />
            </button>

            {/* Card container */}
            <div 
              className="rounded-2xl overflow-hidden shanjing-card"
              style={{ boxShadow: `0 0 60px ${rarityGlow}` }}
            >
              {/* Header with image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src={creature.image} 
                  alt={creature.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
                
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Rarity badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: rarityColor, boxShadow: `0 0 12px ${rarityColor}` }}
                      />
                      <span 
                        className="text-sm uppercase tracking-widest font-semibold"
                        style={{ color: rarityColor }}
                      >
                        {creature.rarity}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-50 mb-1">
                      {creature.name}
                    </h2>
                    <p className="text-xl text-amber-500/80 font-serif">
                      {creature.nameCn}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Stats row */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  {/* Element */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900/50 border border-stone-700/50">
                    <ElementIcon className="w-4 h-4" style={{ color: rarityColor }} />
                    <span className="text-sm text-stone-300">{elementNames[creature.element]}</span>
                  </div>
                  
                  {/* Origin */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900/50 border border-stone-700/50">
                    <MapPin className="w-4 h-4 text-stone-400" />
                    <span className="text-sm text-stone-300">{creature.origin}</span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-stone-300 leading-relaxed text-lg">
                    {creature.description}
                  </p>
                </motion.div>

                {/* Lore */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-semibold text-amber-100">Ancient Lore</h3>
                  </div>
                  <div className="relative p-5 rounded-xl bg-gradient-to-br from-stone-900/80 to-stone-950/80 border border-stone-700/30">
                    <div 
                      className="absolute top-0 left-0 w-full h-0.5 rounded-t-xl"
                      style={{ background: `linear-gradient(90deg, transparent, ${rarityColor}60, transparent)` }}
                    />
                    <p className="text-stone-400 leading-relaxed">
                      {creature.lore}
                    </p>
                  </div>
                </motion.div>

                {/* Abilities */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-semibold text-amber-100">Mystical Abilities</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {creature.abilities.map((ability, i) => (
                      <motion.span
                        key={ability}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="px-3 py-1.5 rounded-full text-sm font-medium"
                        style={{ 
                          background: `${rarityColor}20`,
                          color: rarityColor,
                          border: `1px solid ${rarityColor}40`
                        }}
                      >
                        {ability}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
