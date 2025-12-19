# Roguelite Dungeon Crawler

A browser-based roguelite dungeon crawler game with procedural generation, multiple biomes, and various enemy types.

## Features

### Core Gameplay
- **Roguelite Mechanics**: Permadeath with procedurally generated dungeons each playthrough
- **Real-time Combat**: Attack enemies using space bar with cooldown-based combat
- **Progressive Difficulty**: Enemy count and difficulty increase with each level

### Procedural Generation
- **Cellular Automata Algorithm**: Creates organic, cave-like dungeon layouts
- **Random Generation**: Every level is unique with different layouts and enemy placements
- **Connected Rooms**: Ensures playable dungeons with accessible paths

### 8 Unique Biomes
1. **Forest** (Levels 1-2) - Green wilderness with Slimes, Bats, and Wolves
2. **Cave** (Levels 3-4) - Dark caverns with Bats, Skeletons, and Spiders
3. **Dungeon** (Levels 5-6) - Ancient halls with Skeletons, Slimes, Ghosts, and Knights
4. **Lava** (Levels 7-8) - Volcanic region with Dragons, Demons, and Fire Elementals
5. **Ice Cave** (Levels 9-10) - Frozen caverns with Ice Golems, Frost Bats, and Yetis
6. **Swamp** (Levels 11-12) - Murky wetlands with Toads, Slimes, and Swamp Monsters
7. **Crypt** (Levels 13-14) - Undead tombs with Ghosts, Skeletons, Vampires, and Wraiths
8. **The Void** (Levels 15+) - Mysterious realm with Void Walkers, Dragons, Demons, and Eldritch Horrors

### 19 Enemy Types
Each enemy has unique stats (health, damage, speed, size, points):
- **Slime** - Basic enemy, low health and damage
- **Bat** - Fast-moving flying enemy
- **Wolf** - Quick forest predator
- **Spider** - Agile cave dweller
- **Skeleton** - Balanced undead warrior
- **Ghost** - Ethereal enemy
- **Knight** - Heavily armored foe
- **Dragon** - Powerful boss-type enemy
- **Demon** - High damage enemy
- **Fire Elemental** - Lava region enemy
- **Ice Golem** - Slow but tanky
- **Frost Bat** - Fast ice enemy
- **Yeti** - Powerful ice monster
- **Toad** - Swamp creature
- **Swamp Monster** - Strong swamp enemy
- **Vampire** - Fast, deadly undead
- **Wraith** - Quick ghost-type
- **Void Walker** - Mysterious void enemy
- **Eldritch Horror** - Ultimate boss enemy

## How to Play

### Controls
- **Arrow Keys / WASD** - Move the player
- **Space** - Attack nearby enemies
- **Enter** - Advance to next level (when all enemies defeated)

### Objective
Survive as long as possible, defeating enemies and progressing through increasingly difficult levels and biomes.

### Game Over
When health reaches 0, the game ends. You can restart to try again with a new procedurally generated dungeon.

## Installation & Running

Simply open `index.html` in a modern web browser. No build process or dependencies required.

```bash
# Option 1: Open directly
open index.html

# Option 2: Run a local server
python3 -m http.server 8080
# Then navigate to http://localhost:8080
```

## Technical Details

- **Engine**: HTML5 Canvas with JavaScript
- **Rendering**: 60 FPS canvas-based rendering
- **Collision Detection**: Circle-based collision for entities, tile-based for walls
- **AI**: Simple pursuit AI for enemies
- **Visual Effects**: Particle system for combat feedback

## Game Statistics

- **Canvas Size**: 800x600 pixels
- **Grid**: 25x18 tiles
- **Tile Size**: 32 pixels
- **Player Health**: 100 HP
- **Player Damage**: 25 per attack
- **Attack Range**: 50 pixels
- **Attack Cooldown**: 0.5 seconds