import { motion } from 'framer-motion';
import type { Creature } from '@/types';
import { rarityColors, rarityGlowColors } from '@/data/creatures';
import { Sparkles, Flame, Droplets, Mountain, Wind, Zap, Circle } from 'lucide-react';

interface CardProps {
  creature: Creature;
  isRevealed?: boolean;
  isNew?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

const elementIcons = {
  fire: Flame,
  water: Droplets,
  earth: Mountain,
  wind: Wind,
  lightning: Zap,
  none: Circle
};

export function Card({ 
  creature, 
  isRevealed = true, 
  isNew = false,
  onClick, 
  size = 'medium',
  showDetails = true 
}: CardProps) {
  const ElementIcon = elementIcons[creature.element];
  const rarityColor = rarityColors[creature.rarity];
  const rarityGlow = rarityGlowColors[creature.rarity];

  const sizeClasses = {
    small: 'w-24 h-32',
    medium: 'w-40 h-56',
    large: 'w-64 h-96'
  };

  const imageSizes = {
    small: 'h-16',
    medium: 'h-28',
    large: 'h-48'
  };

  if (!isRevealed) {
    return (
      <motion.div
        className={`${sizeClasses[size]} relative cursor-pointer`}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-stone-900/60 to-amber-950/40" />
          <div className="absolute inset-0 card-frame" />
          
          {/* Card back pattern */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-amber-600/30 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border border-amber-500/40" />
            </div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500/40" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500/40" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500/40" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500/40" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} relative cursor-pointer group`}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{
        filter: `drop-shadow(0 8px 24px ${rarityGlow})`
      }}
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
        style={{ background: `linear-gradient(135deg, ${rarityGlow}, transparent)` }}
      />
      
      <div className="absolute inset-0 rounded-xl overflow-hidden shanjing-card">
        {/* Rarity border glow */}
        <div 
          className="absolute inset-0 rounded-xl"
          style={{ 
            boxShadow: `inset 0 0 0 2px ${rarityColor}40, 0 0 20px ${rarityGlow}` 
          }}
        />
        
        {/* Image */}
        <div className={`relative ${imageSizes[size]} overflow-hidden`}>
          <img 
            src={creature.image} 
            alt={creature.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950/80" />
          
          {/* New badge */}
          {isNew && (
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-2 right-2 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-xs font-bold text-stone-900 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              NEW
            </motion.div>
          )}
          
          {/* Element icon */}
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-stone-900/60 backdrop-blur-sm flex items-center justify-center">
            <ElementIcon className="w-3 h-3" style={{ color: rarityColor }} />
          </div>
        </div>
        
        {/* Content */}
        {showDetails && (
          <div className="p-3 flex flex-col h-[calc(100%-7rem)]">
            {/* Rarity indicator */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ background: rarityColor, boxShadow: `0 0 8px ${rarityColor}` }}
              />
              <span 
                className="text-[10px] uppercase tracking-wider font-medium"
                style={{ color: rarityColor }}
              >
                {creature.rarity}
              </span>
            </div>
            
            {/* Name */}
            <h3 className="text-sm font-semibold text-amber-50 leading-tight mb-0.5">
              {creature.name}
            </h3>
            <p className="text-xs text-amber-500/70 font-serif">
              {creature.nameCn}
            </p>
            
            {/* Description */}
            <p className="text-[10px] text-stone-400 leading-relaxed mt-2 line-clamp-2 flex-1">
              {creature.description}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
