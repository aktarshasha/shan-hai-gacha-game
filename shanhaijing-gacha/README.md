# 🐉 Shan Hai Jing Gacha

A mobile-friendly gacha (card-drawing) game website inspired by the **Classic of Mountains and Seas (山海经)** - an ancient Chinese text filled with mythical geography and fantastic creatures.

![Shan Hai Jing Gacha](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)

## 🌟 Features

### 🎨 Visual Design
- **Minimalist yet fantastical** aesthetic blending clean layouts with traditional Chinese artistic elements
- Dark, immersive color palette with amber gold accents
- Traditional Chinese fonts (Noto Serif SC & Noto Sans SC)
- Floating particle effects and ethereal animations
- Ink wash painting-inspired card designs

### 🐉 8 AI-Generated Mythical Creatures
Each creature is rendered in traditional Shan Hai Jing artistic style:

| Creature | Chinese Name | Rarity | Element |
|----------|--------------|--------|---------|
| Nine-Tailed Fox | 九尾狐 | Legendary | Fire |
| Qilin | 麒麟 | Mythical | None |
| Bifang Bird | 毕方鸟 | Epic | Fire |
| Di Jiang | 帝江 | Epic | None |
| Phoenix | 凤凰 | Legendary | Fire |
| Black Tortoise | 玄武 | Rare | Water |
| Taotie | 饕餮 | Rare | Earth |
| Huan | 讙 | Common | Wind |

### 🎮 Gacha System
- Smooth card reveal animations with 3D flip effects
- Rarity-based drawing (Common → Mythical)
- Single and multi-draw options
- Particle effects for legendary/mythical draws
- New discovery badges

### 📚 Bestiary Collection
- Grid and list view modes
- Rarity filtering and search
- Collection progress tracking
- Detailed lore modal for each creature
- Locked creatures shown in grayscale

### 💾 Persistence
- Local storage saves collection between sessions
- Tracks total summon count

### 📱 Mobile-Optimized
- Fully responsive design
- Touch-friendly interactions
- Mobile navigation menu

## 🚀 Live Demo

**[Play Now →](https://fbphbyybsnz7y.ok.kimi.link)**

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 3.4
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📁 Project Structure

```
shanhaijing-gacha/
├── public/
│   └── creatures/          # AI-generated creature images
├── src/
│   ├── components/         # Reusable components
│   │   ├── Card.tsx       # Creature card component
│   │   ├── CardReveal.tsx # Card reveal animation
│   │   └── LoreModal.tsx  # Creature lore display
│   ├── sections/          # Page sections
│   │   ├── Header.tsx     # Navigation header
│   │   ├── DrawSection.tsx # Gacha draw interface
│   │   └── BestiarySection.tsx # Collection view
│   ├── hooks/             # Custom React hooks
│   │   └── useCollection.ts # Collection management
│   ├── data/              # Static data
│   │   └── creatures.ts   # Creature definitions
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── lib/               # Utility functions
│   ├── App.tsx            # Main app component
│   ├── index.css          # Global styles
│   └── main.tsx           # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shanhaijing-gacha.git
cd shanhaijing-gacha
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🎨 Design System

### Colors
- **Background:** `#1a1814` (warm dark)
- **Primary:** `#d4a853` (amber gold)
- **Secondary:** `#78716c` (warm gray)
- **Accent:** `#dc2626` (cinnabar red)
- **Text:** `#fafaf9` (off-white)

### Rarity Colors
- Common: `#9ca3af`
- Rare: `#60a5fa`
- Epic: `#c084fc`
- Legendary: `#fbbf24`
- Mythical: `#f87171`

## 📜 Credits

- **Classic of Mountains and Seas (山海经)** - Ancient Chinese text
- **AI Art Generation** - Creature illustrations
- **shadcn/ui** - UI component library
- **Framer Motion** - Animation library

## 📄 License

MIT License - feel free to use this project for learning or personal projects!

---

<p align="center">
  <sub>Built with ❤️ and ancient Chinese mythology</sub>
</p>
