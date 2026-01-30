import type { Creature } from '@/types';

export const creatures: Creature[] = [
  {
    id: 'nine-tailed-fox',
    name: 'Nine-Tailed Fox',
    nameCn: '九尾狐',
    rarity: 'legendary',
    image: '/creatures/nine-tailed-fox.jpg',
    description: 'A mystical fox spirit with nine flowing tails, dwelling in the realm of Qingqiu.',
    lore: 'The Nine-Tailed Fox appears only during eras of peace and prosperity, serving as an auspicious omen. Legend says that Yu the Great, the legendary ruler who tamed ancient floods, fell in love with a woman from the Tushan tribe after seeing a Nine-Tailed Fox—a sign of divine blessing. Those who consume its flesh are said to gain immunity from enchantments and evil spirits. After a millennium of cultivation, these spirits may ascend to the heavens and join the gods.',
    origin: 'Qingqiu (青丘) - The Green Hill',
    abilities: ['Shapeshifting', 'Bewitchment', 'Fire Breathing', 'Immortality'],
    element: 'fire'
  },
  {
    id: 'qilin',
    name: 'Qilin',
    nameCn: '麒麟',
    rarity: 'mythical',
    image: '/creatures/qilin.jpg',
    description: 'A divine creature of virtue and grace, bringing harmony and prosperity wherever it appears.',
    lore: 'The Qilin is one of the most auspicious creatures in Chinese mythology, appearing only during the reign of a benevolent ruler or before the birth of a great sage. It has the body of a deer covered in shimmering jade scales, the tail of an ox, and the head of a dragon with gentle antlers. The Qilin treads so lightly that it harms not even a single blade of grass, embodying the highest virtues of compassion and wisdom.',
    origin: 'The Celestial Realm',
    abilities: ['Divine Protection', 'Prosperity Blessing', 'Harmony Aura', 'Celestial Vision'],
    element: 'none'
  },
  {
    id: 'bifang',
    name: 'Bifang Bird',
    nameCn: '毕方鸟',
    rarity: 'epic',
    image: '/creatures/bifang.jpg',
    description: 'A sacred one-legged bird associated with fire and the Yellow Emperor.',
    lore: 'The Bifang Niao resembles a crane with a single leg, green body adorned with red markings, and a white beak. Its name comes from the unique sound it makes. This sacred bird was a companion of the Yellow Emperor Huangdi and serves as both a symbol of good fortune and a warning of impending fires. Some legends depict it as a three-legged bird, connecting it to solar mythology and celestial fire.',
    origin: 'Zhang River Mountains',
    abilities: ['Fire Warning', 'Celestial Guidance', 'Flame Control', 'Divine Messenger'],
    element: 'fire'
  },
  {
    id: 'dijiang',
    name: 'Di Jiang',
    nameCn: '帝江',
    rarity: 'epic',
    image: '/creatures/dijiang.jpg',
    description: 'A primordial being of chaos, shaped like a yellow bag with six legs and four wings.',
    lore: 'Di Jiang is one of the most mysterious beings in the Classic of Mountains and Seas—a faceless entity shaped like a yellow bag, glowing with inner red fire like cinnabar. Despite having no eyes, ears, or mouth, it possesses the divine gift of song and dance, performing celestial performances that delight the gods. It represents the primordial chaos before creation, embodying the formless potential from which all existence emerges.',
    origin: 'Tian Mountain (天山) - Heaven Mountain',
    abilities: ['Celestial Dance', 'Primordial Chaos', 'Sound Mimicry', 'Formlessness'],
    element: 'none'
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    nameCn: '凤凰',
    rarity: 'legendary',
    image: '/creatures/phoenix.jpg',
    description: 'The immortal bird of rebirth, rising from ashes with rainbow plumage.',
    lore: 'The Fenghuang, or Chinese Phoenix, symbolizes the union of yin and yang, appearing only when peace and prosperity reign. Unlike the western phoenix, it does not arise from ashes but represents the harmony of all celestial bodies. Its plumage contains the five fundamental colors—black, white, red, green, and yellow—corresponding to the five virtues. The phoenix\'s cry is said to be the source of all musical scales in the world.',
    origin: 'The Southern Vermilion Bird Constellation',
    abilities: ['Rebirth', 'Harmony Blessing', 'Musical Cry', 'Celestial Flight'],
    element: 'fire'
  },
  {
    id: 'xuanwu',
    name: 'Black Tortoise',
    nameCn: '玄武',
    rarity: 'rare',
    image: '/creatures/xuanwu.jpg',
    description: 'The divine guardian of the north, a tortoise entwined with a serpent.',
    lore: 'Xuanwu, the Black Tortoise, is one of the Four Symbols of Chinese constellations, representing the north and winter. The union of tortoise and snake symbolizes the harmony of earth and water, stability and flexibility. As a deity of longevity and wisdom, Xuanwu is often depicted as a powerful warrior who achieved immortality through centuries of Taoist cultivation. Its shell bears celestial patterns that map the northern stars.',
    origin: 'The Northern Heavens',
    abilities: ['Water Control', 'Defensive Aura', 'Longevity Blessing', 'Star Navigation'],
    element: 'water'
  },
  {
    id: 'taotie',
    name: 'Taotie',
    nameCn: '饕餮',
    rarity: 'rare',
    image: '/creatures/taotie.jpg',
    description: 'A gluttonous beast with a human face, symbolizing insatiable greed.',
    lore: 'The Taotie is one of the Four Perils of ancient China, a creature of terrifying appetite with eyes located beneath its armpits, tiger\'s teeth, and human claws. Its cry resembles that of a crying infant, luring unsuspecting victims. This beast serves as a cautionary tale about the dangers of unchecked desire and gluttony. Despite its fearsome nature, images of Taotie commonly adorned ancient bronze ritual vessels as warnings against excess.',
    origin: 'Gouwu Mountain (钩吾山)',
    abilities: ['Insatiable Hunger', 'Deceptive Cry', 'Consumption', 'Greed Manifestation'],
    element: 'earth'
  },
  {
    id: 'huan',
    name: 'Huan',
    nameCn: '讙',
    rarity: 'common',
    image: '/creatures/huan.jpg',
    description: 'A small mountain cat with one eye and three tails, master of mimicry.',
    lore: 'The Huan resembles a small wildcat but possesses only one eye and three magnificent tails. This humble creature has the remarkable ability to mimic the sounds of a hundred different animals and birds. Those who keep a Huan nearby are said to be protected from misfortune and illness. Consuming its flesh is believed to cure various diseases, making it a valuable though elusive creature in the mountains.',
    origin: 'Mountains of the Western Lands',
    abilities: ['Sound Mimicry', 'Fortune Warding', 'Disease Curing', 'Camouflage'],
    element: 'wind'
  }
];

export const rarityWeights: Record<string, number> = {
  common: 40,
  rare: 30,
  epic: 20,
  legendary: 8,
  mythical: 2
};

export const rarityColors: Record<string, string> = {
  common: '#9ca3af',
  rare: '#60a5fa',
  epic: '#c084fc',
  legendary: '#fbbf24',
  mythical: '#f87171'
};

export const rarityGlowColors: Record<string, string> = {
  common: 'rgba(156, 163, 175, 0.3)',
  rare: 'rgba(96, 165, 250, 0.4)',
  epic: 'rgba(192, 132, 252, 0.4)',
  legendary: 'rgba(251, 191, 36, 0.5)',
  mythical: 'rgba(248, 113, 113, 0.5)'
};
