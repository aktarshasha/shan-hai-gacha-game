import { useState, useEffect, useCallback } from 'react';
import type { CollectionState, DrawResult, Creature } from '@/types';
import { creatures, rarityWeights } from '@/data/creatures';

const STORAGE_KEY = 'shanjing-collection';

const getInitialState = (): CollectionState => ({
  unlockedCreatures: [],
  drawCount: 0,
  lastDrawTime: null
});

export function useCollection() {
  const [collection, setCollection] = useState<CollectionState>(getInitialState());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCollection({
          ...getInitialState(),
          ...parsed
        });
      }
    } catch (error) {
      console.error('Failed to load collection:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
      } catch (error) {
        console.error('Failed to save collection:', error);
      }
    }
  }, [collection, isLoaded]);

  const getRandomCreature = useCallback((): Creature => {
    // Group creatures by rarity
    const byRarity: Record<string, Creature[]> = {};
    creatures.forEach(c => {
      if (!byRarity[c.rarity]) byRarity[c.rarity] = [];
      byRarity[c.rarity].push(c);
    });

    // Calculate total weight
    const totalWeight = Object.entries(rarityWeights).reduce(
      (sum, [rarity, weight]) => sum + (byRarity[rarity]?.length ? weight : 0),
      0
    );

    // Roll for rarity
    let roll = Math.random() * totalWeight;
    let selectedRarity = 'common';
    
    for (const [rarity, weight] of Object.entries(rarityWeights)) {
      if (!byRarity[rarity]?.length) continue;
      roll -= weight;
      if (roll <= 0) {
        selectedRarity = rarity;
        break;
      }
    }

    // Select random creature from that rarity
    const pool = byRarity[selectedRarity] || creatures;
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  const draw = useCallback((): DrawResult => {
    const creature = getRandomCreature();
    const isNew = !collection.unlockedCreatures.includes(creature.id);
    
    setCollection(prev => ({
      ...prev,
      unlockedCreatures: isNew 
        ? [...prev.unlockedCreatures, creature.id]
        : prev.unlockedCreatures,
      drawCount: prev.drawCount + 1,
      lastDrawTime: Date.now()
    }));

    return { creature, isNew };
  }, [collection.unlockedCreatures, getRandomCreature]);

  const drawMultiple = useCallback((count: number): DrawResult[] => {
    const results: DrawResult[] = [];
    const newUnlocked = new Set(collection.unlockedCreatures);
    
    for (let i = 0; i < count; i++) {
      const creature = getRandomCreature();
      const isNew = !newUnlocked.has(creature.id);
      
      if (isNew) {
        newUnlocked.add(creature.id);
      }
      
      results.push({ creature, isNew });
    }
    
    setCollection(prev => ({
      ...prev,
      unlockedCreatures: Array.from(newUnlocked),
      drawCount: prev.drawCount + count,
      lastDrawTime: Date.now()
    }));

    return results;
  }, [collection.unlockedCreatures, getRandomCreature]);

  const resetCollection = useCallback(() => {
    setCollection(getInitialState());
  }, []);

  const getUnlockedCreatures = useCallback((): Creature[] => {
    return creatures.filter(c => collection.unlockedCreatures.includes(c.id));
  }, [collection.unlockedCreatures]);

  const getCreatureById = useCallback((id: string): Creature | undefined => {
    return creatures.find(c => c.id === id);
  }, []);

  const isUnlocked = useCallback((id: string): boolean => {
    return collection.unlockedCreatures.includes(id);
  }, [collection.unlockedCreatures]);

  const collectionProgress = useCallback((): number => {
    return Math.round((collection.unlockedCreatures.length / creatures.length) * 100);
  }, [collection.unlockedCreatures.length]);

  return {
    collection,
    isLoaded,
    draw,
    drawMultiple,
    resetCollection,
    getUnlockedCreatures,
    getCreatureById,
    isUnlocked,
    collectionProgress,
    totalCreatures: creatures.length
  };
}
