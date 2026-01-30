import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Lock, BookOpen, Grid3X3, LayoutList } from 'lucide-react';
import { Card } from '@/components/Card';
import { LoreModal } from '@/components/LoreModal';
import type { Creature, Rarity } from '@/types';
import { creatures, rarityColors } from '@/data/creatures';

interface BestiarySectionProps {
  unlockedCreatures: Creature[];
  isUnlocked: (id: string) => boolean;
  progress: number;
}

const rarityFilters: { value: Rarity | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'All', color: '#9ca3af' },
  { value: 'common', label: 'Common', color: rarityColors.common },
  { value: 'rare', label: 'Rare', color: rarityColors.rare },
  { value: 'epic', label: 'Epic', color: rarityColors.epic },
  { value: 'legendary', label: 'Legendary', color: rarityColors.legendary },
  { value: 'mythical', label: 'Mythical', color: rarityColors.mythical },
];

export function BestiarySection({ unlockedCreatures, isUnlocked, progress }: BestiarySectionProps) {
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCreatures = useMemo(() => {
    return creatures.filter(creature => {
      const matchesRarity = selectedRarity === 'all' || creature.rarity === selectedRarity;
      const matchesSearch = 
        creature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creature.nameCn.includes(searchQuery);
      return matchesRarity && matchesSearch;
    });
  }, [selectedRarity, searchQuery]);

  const handleCreatureClick = (creature: Creature) => {
    if (isUnlocked(creature.id)) {
      setSelectedCreature(creature);
      setIsModalOpen(true);
    }
  };

  return (
    <section className="min-h-screen px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-amber-500" />
            <span className="text-sm uppercase tracking-widest text-amber-500/80">The Ancient Tome</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-50 mb-3">
            Bestiary
          </h2>
          <p className="text-stone-400 max-w-md mx-auto">
            Your collection of discovered creatures from the Classic of Mountains and Seas
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-stone-400">Collection Progress</span>
            <span className="text-sm font-semibold text-amber-400">
              {unlockedCreatures.length} / {creatures.length} ({progress}%)
            </span>
          </div>
          <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="Search creatures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-900/50 border border-stone-700/50 text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-2 p-1 rounded-lg bg-stone-900/50 border border-stone-700/50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-stone-700 text-amber-400' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-stone-700 text-amber-400' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Rarity filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {rarityFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedRarity(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedRarity === filter.value
                  ? 'ring-2 ring-offset-2 ring-offset-stone-950'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                background: `${filter.color}20`,
                color: filter.value === 'all' ? '#d4d4d8' : filter.color,
                border: `1px solid ${filter.color}40`,
                '--tw-ring-color': selectedRarity === filter.value ? filter.color : 'transparent',
              } as React.CSSProperties}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Creatures grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${selectedRarity}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6'
                : 'space-y-3'
            }
          >
            {filteredCreatures.map((creature, index) => {
              const unlocked = isUnlocked(creature.id);
              
              if (viewMode === 'grid') {
                return (
                  <motion.div
                    key={creature.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    {!unlocked && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-stone-900/80 backdrop-blur-sm flex items-center justify-center border border-stone-700/50">
                          <Lock className="w-5 h-5 text-stone-500" />
                        </div>
                      </div>
                    )}
                    <div className={!unlocked ? 'opacity-40 grayscale' : ''}>
                      <Card
                        creature={creature}
                        isRevealed={true}
                        isNew={false}
                        onClick={() => handleCreatureClick(creature)}
                        size="medium"
                        showDetails={true}
                      />
                    </div>
                  </motion.div>
                );
              }

              // List view
              return (
                <motion.div
                  key={creature.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCreatureClick(creature)}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    unlocked 
                      ? 'shanjing-card hover:scale-[1.02]' 
                      : 'bg-stone-900/30 border border-stone-800/50 opacity-50'
                  }`}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={creature.image} 
                      alt={creature.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ background: rarityColors[creature.rarity] }}
                      />
                      <span 
                        className="text-xs uppercase tracking-wider"
                        style={{ color: rarityColors[creature.rarity] }}
                      >
                        {creature.rarity}
                      </span>
                    </div>
                    <h3 className="font-semibold text-amber-50 truncate">{creature.name}</h3>
                    <p className="text-sm text-amber-500/70 font-serif">{creature.nameCn}</p>
                  </div>
                  
                  {!unlocked && (
                    <Lock className="w-5 h-5 text-stone-600 flex-shrink-0" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredCreatures.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Filter className="w-12 h-12 text-stone-600 mx-auto mb-4" />
            <p className="text-stone-500">No creatures match your filters</p>
          </motion.div>
        )}
      </div>

      {/* Lore modal */}
      <LoreModal
        creature={selectedCreature}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCreature(null);
        }}
      />
    </section>
  );
}
