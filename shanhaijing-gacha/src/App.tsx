import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/sections/Header';
import { DrawSection } from '@/sections/DrawSection';
import { BestiarySection } from '@/sections/BestiarySection';
import { useCollection } from '@/hooks/useCollection';
import { Sparkles } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState<'draw' | 'bestiary'>('draw');
  const { 
    draw, 
    drawMultiple, 
    getUnlockedCreatures, 
    isUnlocked, 
    collectionProgress,
    collection,
    isLoaded 
  } = useCollection();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-4 border-amber-500/30 border-t-amber-500"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/20 to-stone-950" />
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(217, 119, 6, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(217, 119, 6, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Header */}
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main content */}
      <main className="relative z-10 pt-16">
        <AnimatePresence mode="wait">
          {activeSection === 'draw' ? (
            <motion.div
              key="draw"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DrawSection 
                onDraw={draw}
                onDrawMultiple={drawMultiple}
                drawCount={collection.drawCount}
              />
            </motion.div>
          ) : (
            <motion.div
              key="bestiary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BestiarySection 
                unlockedCreatures={getUnlockedCreatures()}
                isUnlocked={isUnlocked}
                progress={collectionProgress()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-stone-800/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-500">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Shan Hai Jing Gacha</span>
          </div>
          
          <p className="text-xs text-stone-600 text-center">
            Inspired by the Classic of Mountains and Seas (山海经)
            <br className="md:hidden" />
            <span className="hidden md:inline"> · </span>
            Ancient Chinese Mythology
          </p>
          
          <div className="text-xs text-stone-600">
            {collection.unlockedCreatures.length} / {8} Creatures Discovered
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
