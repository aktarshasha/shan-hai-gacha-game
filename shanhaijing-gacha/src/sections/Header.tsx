import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scroll, BookOpen, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeSection: 'draw' | 'bestiary';
  onSectionChange: (section: 'draw' | 'bestiary') => void;
}

export function Header({ activeSection, onSectionChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'draw' as const, label: 'Summon', icon: Sparkles },
    { id: 'bestiary' as const, label: 'Bestiary', icon: BookOpen },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-stone-950/80 backdrop-blur-xl border-b border-stone-800/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => onSectionChange('draw')}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30 group-hover:shadow-amber-900/50 transition-shadow">
                <Scroll className="w-5 h-5 text-amber-100" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-amber-50 leading-tight">Shan Hai Jing</h1>
                <p className="text-xs text-amber-500/70 font-serif">山海经</p>
              </div>
            </motion.button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                      isActive 
                        ? 'text-amber-100' 
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-stone-800/50 rounded-lg"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-stone-800/50 hover:bg-stone-700/50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-stone-300" />
              ) : (
                <Menu className="w-5 h-5 text-stone-300" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 md:hidden"
          >
            <div className="mx-4 p-4 rounded-xl bg-stone-950/95 backdrop-blur-xl border border-stone-800/50 shadow-2xl">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSectionChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ${
                        isActive 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                          : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
