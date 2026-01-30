export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythical';

export interface Creature {
  id: string;
  name: string;
  nameCn: string;
  rarity: Rarity;
  image: string;
  description: string;
  lore: string;
  origin: string;
  abilities: string[];
  element: 'fire' | 'water' | 'earth' | 'wind' | 'lightning' | 'none';
}

export interface CollectionState {
  unlockedCreatures: string[];
  drawCount: number;
  lastDrawTime: number | null;
}

export interface DrawResult {
  creature: Creature;
  isNew: boolean;
}
