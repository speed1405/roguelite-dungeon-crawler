// Game Configuration
const TILE_SIZE = 32;
const GRID_WIDTH = 25;
const GRID_HEIGHT = 18;
const PIXEL_ART_OUTLINE_WIDTH = 2;
const PIXEL_ART_BORDER_WIDTH = 1;

// Dungeon texture generation constants
const HASH_MULTIPLIER_X = 73;
const HASH_MULTIPLIER_Y = 131;
const TEXTURE_FREQUENCY = 7;

// Biome Definitions
const BIOMES = {
    FOREST: {
        name: 'Forest',
        floor: '#2d5016',
        wall: '#1a3010',
        decoration: '#3d6b1f',
        enemyTypes: ['Slime', 'Bat', 'Wolf']
    },
    CAVE: {
        name: 'Cave',
        floor: '#3a3a3a',
        wall: '#1a1a1a',
        decoration: '#555555',
        enemyTypes: ['Bat', 'Skeleton', 'Spider']
    },
    DUNGEON: {
        name: 'Dungeon',
        floor: '#4a4a5a',
        wall: '#2a2a3a',
        decoration: '#6a6a7a',
        enemyTypes: ['Skeleton', 'Slime', 'Ghost', 'Knight']
    },
    LAVA: {
        name: 'Lava',
        floor: '#8b3a00',
        wall: '#5a2600',
        decoration: '#ff6600',
        enemyTypes: ['Dragon', 'Demon', 'FireElemental']
    },
    ICE: {
        name: 'Ice Cave',
        floor: '#c0e0ff',
        wall: '#7090b0',
        decoration: '#e0f0ff',
        enemyTypes: ['IceGolem', 'FrostBat', 'Yeti']
    },
    SWAMP: {
        name: 'Swamp',
        floor: '#3a4a2a',
        wall: '#1a2a1a',
        decoration: '#5a6a4a',
        enemyTypes: ['Toad', 'Slime', 'SwampMonster']
    },
    CRYPT: {
        name: 'Crypt',
        floor: '#3a3a4a',
        wall: '#1a1a2a',
        decoration: '#4a4a5a',
        enemyTypes: ['Ghost', 'Skeleton', 'Vampire', 'Wraith']
    },
    VOID: {
        name: 'The Void',
        floor: '#1a0a2a',
        wall: '#0a0010',
        decoration: '#2a1a3a',
        enemyTypes: ['VoidWalker', 'Dragon', 'Demon', 'EldritchHorror']
    }
};

// Enemy Definitions
const ENEMY_TYPES = {
    Slime: {
        color: '#33ff33',
        health: 30,
        damage: 10,
        speed: 1.5,
        size: 20,
        points: 10
    },
    Bat: {
        color: '#663399',
        health: 20,
        damage: 8,
        speed: 2.5,
        size: 15,
        points: 15
    },
    Skeleton: {
        color: '#eeeeee',
        health: 50,
        damage: 15,
        speed: 1.8,
        size: 25,
        points: 25
    },
    Dragon: {
        color: '#ff4444',
        health: 100,
        damage: 25,
        speed: 1.2,
        size: 35,
        points: 50
    },
    Wolf: {
        color: '#8b6914',
        health: 40,
        damage: 12,
        speed: 2.2,
        size: 22,
        points: 20
    },
    Spider: {
        color: '#4a0e4e',
        health: 35,
        damage: 14,
        speed: 2.0,
        size: 18,
        points: 18
    },
    Ghost: {
        color: '#c0c0ff',
        health: 45,
        damage: 18,
        speed: 1.6,
        size: 23,
        points: 30
    },
    Knight: {
        color: '#708090',
        health: 80,
        damage: 20,
        speed: 1.3,
        size: 28,
        points: 40
    },
    Demon: {
        color: '#8b0000',
        health: 90,
        damage: 28,
        speed: 1.5,
        size: 32,
        points: 55
    },
    FireElemental: {
        color: '#ff8c00',
        health: 60,
        damage: 22,
        speed: 1.7,
        size: 26,
        points: 35
    },
    IceGolem: {
        color: '#add8e6',
        health: 100,
        damage: 18,
        speed: 1.0,
        size: 34,
        points: 45
    },
    FrostBat: {
        color: '#b0e0e6',
        health: 25,
        damage: 10,
        speed: 2.8,
        size: 16,
        points: 20
    },
    Yeti: {
        color: '#f0f8ff',
        health: 110,
        damage: 24,
        speed: 1.4,
        size: 36,
        points: 60
    },
    Toad: {
        color: '#556b2f',
        health: 38,
        damage: 11,
        speed: 1.4,
        size: 21,
        points: 16
    },
    SwampMonster: {
        color: '#2f4f2f',
        health: 75,
        damage: 19,
        speed: 1.1,
        size: 30,
        points: 38
    },
    Vampire: {
        color: '#800020',
        health: 85,
        damage: 26,
        speed: 1.9,
        size: 27,
        points: 50
    },
    Wraith: {
        color: '#4b0082',
        health: 55,
        damage: 20,
        speed: 2.1,
        size: 24,
        points: 33
    },
    VoidWalker: {
        color: '#483d8b',
        health: 95,
        damage: 30,
        speed: 1.6,
        size: 29,
        points: 65
    },
    EldritchHorror: {
        color: '#2f0f3f',
        health: 150,
        damage: 35,
        speed: 1.3,
        size: 40,
        points: 100
    }
};

// Game State
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        // Disable anti-aliasing for pixel art
        this.ctx.imageSmoothingEnabled = false;
        this.level = 1;
        this.score = 0;
        this.currentBiome = null;
        this.dungeon = [];
        this.player = null;
        this.enemies = [];
        this.particles = [];
        this.ambientParticles = [];
        this.keys = {};
        this.lastTime = 0;
        this.gameOver = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startNewLevel();
        this.gameLoop(0);
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (e.key === ' ') {
                e.preventDefault();
                this.player.attack();
            }
            if (e.key === 'Enter' && this.enemies.length === 0 && !this.gameOver) {
                this.nextLevel();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
        
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });
    }
    
    startNewLevel() {
        this.selectBiome();
        this.generateDungeon();
        this.spawnPlayer();
        this.spawnEnemies();
        this.createAmbientParticles();
        this.updateUI();
    }
    
    selectBiome() {
        const biomeKeys = Object.keys(BIOMES);
        // Progress through biomes as level increases (2 levels per biome)
        const biomeIndex = Math.min(Math.floor((this.level - 1) / 2), biomeKeys.length - 1);
        this.currentBiome = BIOMES[biomeKeys[biomeIndex]];
    }
    
    generateDungeon() {
        // Initialize grid with walls
        this.dungeon = Array(GRID_HEIGHT).fill(null).map(() => 
            Array(GRID_WIDTH).fill(1)
        );
        
        // Cellular automata for organic dungeon generation
        this.generateCellularAutomata();
        this.ensureConnectivity();
    }
    
    generateCellularAutomata() {
        // Random initialization
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                this.dungeon[y][x] = Math.random() < 0.45 ? 0 : 1;
            }
        }
        
        // Apply cellular automata rules
        for (let i = 0; i < 5; i++) {
            const newDungeon = Array(GRID_HEIGHT).fill(null).map(() => 
                Array(GRID_WIDTH).fill(1)
            );
            
            for (let y = 1; y < GRID_HEIGHT - 1; y++) {
                for (let x = 1; x < GRID_WIDTH - 1; x++) {
                    const walls = this.countAdjacentWalls(x, y);
                    newDungeon[y][x] = walls >= 5 ? 1 : 0;
                }
            }
            
            this.dungeon = newDungeon;
        }
        
        // Ensure borders are walls
        for (let x = 0; x < GRID_WIDTH; x++) {
            this.dungeon[0][x] = 1;
            this.dungeon[GRID_HEIGHT - 1][x] = 1;
        }
        for (let y = 0; y < GRID_HEIGHT; y++) {
            this.dungeon[y][0] = 1;
            this.dungeon[y][GRID_WIDTH - 1] = 1;
        }
    }
    
    countAdjacentWalls(x, y) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < GRID_WIDTH && ny >= 0 && ny < GRID_HEIGHT) {
                    count += this.dungeon[ny][nx];
                }
            }
        }
        return count;
    }
    
    ensureConnectivity() {
        // Find first floor tile for player spawn
        for (let y = 1; y < GRID_HEIGHT - 1; y++) {
            for (let x = 1; x < GRID_WIDTH - 1; x++) {
                if (this.dungeon[y][x] === 0) {
                    return; // At least one floor tile exists
                }
            }
        }
        
        // If no floor tiles, create a room in center
        const cx = Math.floor(GRID_WIDTH / 2);
        const cy = Math.floor(GRID_HEIGHT / 2);
        for (let dy = -3; dy <= 3; dy++) {
            for (let dx = -3; dx <= 3; dx++) {
                if (cx + dx > 0 && cx + dx < GRID_WIDTH - 1 &&
                    cy + dy > 0 && cy + dy < GRID_HEIGHT - 1) {
                    this.dungeon[cy + dy][cx + dx] = 0;
                }
            }
        }
    }
    
    spawnPlayer() {
        // Find a floor tile for player spawn
        for (let y = 1; y < GRID_HEIGHT - 1; y++) {
            for (let x = 1; x < GRID_WIDTH - 1; x++) {
                if (this.dungeon[y][x] === 0) {
                    this.player = new Player(x * TILE_SIZE + TILE_SIZE / 2, 
                                            y * TILE_SIZE + TILE_SIZE / 2);
                    return;
                }
            }
        }
    }
    
    spawnEnemies() {
        this.enemies = [];
        const enemyCount = 3 + this.level * 2;
        const availableTypes = this.currentBiome.enemyTypes;
        
        for (let i = 0; i < enemyCount; i++) {
            let x, y;
            let attempts = 0;
            do {
                x = Math.floor(Math.random() * (GRID_WIDTH - 2)) + 1;
                y = Math.floor(Math.random() * (GRID_HEIGHT - 2)) + 1;
                attempts++;
            } while ((this.dungeon[y][x] === 1 || this.isNearPlayer(x, y)) && attempts < 100);
            
            if (attempts < 100) {
                const typeIndex = Math.floor(Math.random() * availableTypes.length);
                const enemyType = availableTypes[typeIndex];
                this.enemies.push(new Enemy(
                    x * TILE_SIZE + TILE_SIZE / 2,
                    y * TILE_SIZE + TILE_SIZE / 2,
                    enemyType
                ));
            }
        }
    }
    
    isNearPlayer(x, y) {
        if (!this.player) return false;
        const px = Math.floor(this.player.x / TILE_SIZE);
        const py = Math.floor(this.player.y / TILE_SIZE);
        return Math.abs(x - px) < 5 && Math.abs(y - py) < 5;
    }
    
    createAmbientParticles() {
        this.ambientParticles = [];
        // Create ambient particles based on biome
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            this.ambientParticles.push(new AmbientParticle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                this.currentBiome
            ));
        }
    }
    
    update(deltaTime) {
        if (this.gameOver) return;
        
        // Update player
        this.player.update(this.keys, this.dungeon, deltaTime);
        
        // Update enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update(this.player, this.dungeon, deltaTime);
            
            // Check collision with player
            if (this.checkCollision(this.player, enemy)) {
                this.player.takeDamage(enemy.damage);
                enemy.takeDamage(this.player.damage);
            }
            
            // Check if player attack hits enemy
            if (this.player.isAttacking && this.player.attackCooldown > 0.3) {
                const dist = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y);
                if (dist < this.player.attackRange) {
                    enemy.takeDamage(this.player.damage);
                    this.createParticles(enemy.x, enemy.y, enemy.color);
                }
            }
            
            // Remove dead enemies
            if (enemy.health <= 0) {
                this.score += enemy.points;
                this.createParticles(enemy.x, enemy.y, enemy.color, 15);
                this.enemies.splice(i, 1);
            }
        }
        
        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update(deltaTime);
            if (this.particles[i].life <= 0) {
                this.particles.splice(i, 1);
            }
        }
        
        // Update ambient particles
        for (const particle of this.ambientParticles) {
            particle.update(deltaTime, this.canvas);
        }
        
        // Check game over
        if (this.player.health <= 0) {
            this.endGame();
        }
        
        this.updateUI();
    }
    
    checkCollision(obj1, obj2) {
        const dist = Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y);
        return dist < (obj1.size + obj2.size) / 2;
    }
    
    createParticles(x, y, color, count = 5) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, color));
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw dungeon
        this.renderDungeon();
        
        // Draw ambient particles (behind entities)
        this.ambientParticles.forEach(p => p.render(this.ctx));
        
        // Draw particles
        this.particles.forEach(p => p.render(this.ctx));
        
        // Draw enemies
        this.enemies.forEach(e => e.render(this.ctx));
        
        // Draw player
        this.player.render(this.ctx);
        
        // Draw enhanced level clear message
        if (this.enemies.length === 0 && !this.gameOver) {
            // Background with border
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
            this.ctx.fillRect(180, 230, 440, 140);
            
            // Border glow effect
            this.ctx.strokeStyle = '#33ff33';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(180, 230, 440, 140);
            
            // Inner highlight
            this.ctx.strokeStyle = 'rgba(51, 255, 51, 0.3)';
            this.ctx.lineWidth = 6;
            this.ctx.strokeRect(183, 233, 434, 134);
            
            // "Level Clear!" text with glow
            this.ctx.font = 'bold 32px Arial';
            this.ctx.textAlign = 'center';
            
            // Text shadow/glow
            this.ctx.fillStyle = 'rgba(51, 255, 51, 0.5)';
            this.ctx.fillText('Level Clear!', 402, 292);
            this.ctx.fillText('Level Clear!', 398, 288);
            
            // Main text
            this.ctx.fillStyle = '#33ff33';
            this.ctx.fillText('Level Clear!', 400, 290);
            
            // Score display
            this.ctx.font = 'bold 20px Arial';
            this.ctx.fillStyle = '#ffff00';
            this.ctx.fillText(`Score: ${this.score}`, 400, 325);
            
            // Instructions with pulsing effect
            this.ctx.font = '18px Arial';
            const pulseAlpha = 0.5 + Math.sin(Date.now() / 300) * 0.5;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha})`;
            this.ctx.fillText('Press Enter for Next Level', 400, 355);
        }
    }
    
    renderDungeon() {
        // Set line width once for performance
        this.ctx.lineWidth = PIXEL_ART_BORDER_WIDTH;
        
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const px = x * TILE_SIZE;
                const py = y * TILE_SIZE;
                
                if (this.dungeon[y][x] === 1) {
                    // Enhanced wall rendering with 3D depth effect
                    this.ctx.fillStyle = this.currentBiome.wall;
                    this.ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                    
                    // Top highlight for 3D effect
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
                    this.ctx.fillRect(px, py, TILE_SIZE, 4);
                    this.ctx.fillRect(px, py, 4, TILE_SIZE);
                    
                    // Bottom/right shadow for depth
                    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                    this.ctx.fillRect(px, py + TILE_SIZE - 4, TILE_SIZE, 4);
                    this.ctx.fillRect(px + TILE_SIZE - 4, py, 4, TILE_SIZE);
                    
                    // Add texture variation based on position
                    const seed = (x * HASH_MULTIPLIER_X + y * HASH_MULTIPLIER_Y) % 100;
                    if (seed < 30) {
                        this.ctx.fillStyle = this.currentBiome.decoration;
                        this.ctx.globalAlpha = 0.2;
                        const brickX = px + (seed % 3) * 8;
                        const brickY = py + (Math.floor(seed / 3) % 3) * 8;
                        this.ctx.fillRect(brickX, brickY, 6, 6);
                        this.ctx.globalAlpha = 1;
                    }
                    
                    // Border for definition
                    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
                    this.ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
                } else {
                    // Enhanced floor rendering with varied texture
                    this.ctx.fillStyle = this.currentBiome.floor;
                    this.ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                    
                    // Checkerboard pattern for subtle variation
                    if ((x + y) % 2 === 0) {
                        this.ctx.fillStyle = this.currentBiome.decoration;
                        this.ctx.globalAlpha = 0.15;
                        this.ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                        this.ctx.globalAlpha = 1;
                    }
                    
                    // Add deterministic pixel details for variety
                    const seed = x * HASH_MULTIPLIER_X + y * HASH_MULTIPLIER_Y;
                    if (seed % TEXTURE_FREQUENCY === 0) {
                        this.ctx.fillStyle = this.currentBiome.decoration;
                        this.ctx.globalAlpha = 0.3;
                        const pixelX = px + ((seed * 3) % (TILE_SIZE - 6)) + 2;
                        const pixelY = py + ((seed * 5) % (TILE_SIZE - 6)) + 2;
                        this.ctx.fillRect(pixelX, pixelY, 3, 3);
                        this.ctx.globalAlpha = 1;
                    }
                    
                    // Random crack/detail variations
                    if (seed % 13 === 0) {
                        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                        const crackX = px + ((seed * 7) % (TILE_SIZE - 8)) + 2;
                        const crackY = py + ((seed * 11) % (TILE_SIZE - 4)) + 2;
                        this.ctx.fillRect(crackX, crackY, 6, 2);
                    }
                    
                    // Subtle ambient shadow near walls
                    let shadowIntensity = 0;
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const nx = x + dx;
                            const ny = y + dy;
                            if (nx >= 0 && nx < GRID_WIDTH && ny >= 0 && ny < GRID_HEIGHT) {
                                if (this.dungeon[ny][nx] === 1) {
                                    shadowIntensity += 0.05;
                                }
                            }
                        }
                    }
                    if (shadowIntensity > 0) {
                        this.ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(shadowIntensity, 0.3)})`;
                        this.ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                    }
                }
            }
        }
    }
    
    updateUI() {
        const healthPercent = (this.player.health / this.player.maxHealth) * 100;
        document.getElementById('health-fill').style.width = healthPercent + '%';
        document.getElementById('health-text').textContent = 
            `${Math.max(0, this.player.health)}/${this.player.maxHealth}`;
        document.getElementById('level-text').textContent = this.level;
        document.getElementById('biome-text').textContent = this.currentBiome.name;
        document.getElementById('score-text').textContent = this.score;
    }
    
    nextLevel() {
        this.level++;
        this.particles = [];
        this.ambientParticles = [];
        this.startNewLevel();
    }
    
    endGame() {
        this.gameOver = true;
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-level').textContent = this.level;
        document.getElementById('game-over').classList.remove('hidden');
    }
    
    restart() {
        this.level = 1;
        this.score = 0;
        this.gameOver = false;
        this.particles = [];
        this.ambientParticles = [];
        document.getElementById('game-over').classList.add('hidden');
        this.startNewLevel();
    }
    
    gameLoop(timestamp) {
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        
        if (deltaTime < 0.1) { // Cap delta time
            this.update(deltaTime);
            this.render();
        }
        
        requestAnimationFrame((t) => this.gameLoop(t));
    }
}

// Player Class
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 24;
        this.speed = 120;
        this.health = 100;
        this.maxHealth = 100;
        this.damage = 25;
        this.color = '#4da6ff';
        this.attackRange = 50;
        this.isAttacking = false;
        this.attackCooldown = 0;
        this.attackDuration = 0.5;
    }
    
    update(keys, dungeon, deltaTime) {
        let dx = 0;
        let dy = 0;
        
        if (keys['arrowup'] || keys['w']) dy -= 1;
        if (keys['arrowdown'] || keys['s']) dy += 1;
        if (keys['arrowleft'] || keys['a']) dx -= 1;
        if (keys['arrowright'] || keys['d']) dx += 1;
        
        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
            dx *= 0.707;
            dy *= 0.707;
        }
        
        // Move and check collisions
        const newX = this.x + dx * this.speed * deltaTime;
        const newY = this.y + dy * this.speed * deltaTime;
        
        if (!this.checkWallCollision(newX, this.y, dungeon)) {
            this.x = newX;
        }
        if (!this.checkWallCollision(this.x, newY, dungeon)) {
            this.y = newY;
        }
        
        // Update attack
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
            if (this.attackCooldown <= 0) {
                this.isAttacking = false;
            }
        }
    }
    
    checkWallCollision(x, y, dungeon) {
        const gridX = Math.floor(x / TILE_SIZE);
        const gridY = Math.floor(y / TILE_SIZE);
        
        // Check 4 corners of player hitbox
        const corners = [
            [x - this.size / 2, y - this.size / 2],
            [x + this.size / 2, y - this.size / 2],
            [x - this.size / 2, y + this.size / 2],
            [x + this.size / 2, y + this.size / 2]
        ];
        
        for (const [cx, cy] of corners) {
            const gx = Math.floor(cx / TILE_SIZE);
            const gy = Math.floor(cy / TILE_SIZE);
            
            if (gx < 0 || gx >= GRID_WIDTH || gy < 0 || gy >= GRID_HEIGHT) {
                return true;
            }
            
            if (dungeon[gy][gx] === 1) {
                return true;
            }
        }
        
        return false;
    }
    
    attack() {
        if (this.attackCooldown <= 0) {
            this.isAttacking = true;
            this.attackCooldown = this.attackDuration;
        }
    }
    
    takeDamage(amount) {
        this.health -= amount;
    }
    
    render(ctx) {
        // Draw player with enhanced pixel art style
        const halfSize = Math.floor(this.size / 2);
        const x = Math.floor(this.x - halfSize);
        const y = Math.floor(this.y - halfSize);
        
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x + 2, y + this.size - 2, this.size - 2, 4);
        
        // Main body with gradient effect
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.size, this.size);
        
        // Highlight (top-left)
        ctx.fillStyle = '#6bc4ff';
        ctx.fillRect(x, y, this.size / 2, 4);
        ctx.fillRect(x, y, 4, this.size / 2);
        
        // Darker shade (bottom-right)
        ctx.fillStyle = '#2d7db8';
        ctx.fillRect(x + this.size / 2, y + this.size - 4, this.size / 2, 4);
        ctx.fillRect(x + this.size - 4, y + this.size / 2, 4, this.size / 2);
        
        // Enhanced eyes with white background
        ctx.fillStyle = '#ffffff';
        const eyeSize = 6;
        const eyeOffset = 5;
        ctx.fillRect(Math.floor(this.x - eyeOffset - 1), Math.floor(this.y - eyeOffset), eyeSize, eyeSize);
        ctx.fillRect(Math.floor(this.x + eyeOffset - eyeSize + 1), Math.floor(this.y - eyeOffset), eyeSize, eyeSize);
        
        // Eye pupils with better positioning
        ctx.fillStyle = '#0066cc';
        const pupilSize = 3;
        ctx.fillRect(Math.floor(this.x - eyeOffset), Math.floor(this.y - eyeOffset + 1), pupilSize, pupilSize);
        ctx.fillRect(Math.floor(this.x + eyeOffset - pupilSize), Math.floor(this.y - eyeOffset + 1), pupilSize, pupilSize);
        
        // Add a smile/mouth
        ctx.fillStyle = '#000000';
        ctx.fillRect(Math.floor(this.x - 3), Math.floor(this.y + 4), 6, 2);
        
        // Outline with pixel art style
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = PIXEL_ART_OUTLINE_WIDTH;
        ctx.strokeRect(x, y, this.size, this.size);
        
        // Inner dark outline for depth
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 1, y + 1, this.size - 2, this.size - 2);
        
        // Draw enhanced attack indicator with slash effect
        if (this.isAttacking && this.attackCooldown > 0.3) {
            const animProgress = (this.attackCooldown - 0.3) / 0.2;
            
            // Circular attack range indicator
            ctx.strokeStyle = 'rgba(255, 255, 0, 0.4)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(Math.floor(this.x), Math.floor(this.y), this.attackRange, 0, Math.PI * 2);
            ctx.stroke();
            
            // Animated slash effect
            ctx.strokeStyle = `rgba(255, 255, 100, ${animProgress})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            const slashAngle = animProgress * Math.PI * 0.5;
            const slashRadius = this.attackRange * 0.8;
            ctx.arc(Math.floor(this.x), Math.floor(this.y), slashRadius, -Math.PI/4 + slashAngle, Math.PI/4 + slashAngle);
            ctx.stroke();
        }
    }
}

// Enemy Class
class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        const config = ENEMY_TYPES[type];
        this.color = config.color;
        this.health = config.health;
        this.maxHealth = config.health;
        this.damage = config.damage;
        this.speed = config.speed;
        this.size = config.size;
        this.points = config.points;
        this.direction = Math.random() * Math.PI * 2;
        this.changeDirectionTimer = 0;
    }
    
    update(player, dungeon, deltaTime) {
        // Simple AI: move towards player
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist > 0) {
            const moveX = (dx / dist) * this.speed * TILE_SIZE * deltaTime;
            const moveY = (dy / dist) * this.speed * TILE_SIZE * deltaTime;
            
            const newX = this.x + moveX;
            const newY = this.y + moveY;
            
            if (!this.checkWallCollision(newX, this.y, dungeon)) {
                this.x = newX;
            }
            if (!this.checkWallCollision(this.x, newY, dungeon)) {
                this.y = newY;
            }
        }
    }
    
    checkWallCollision(x, y, dungeon) {
        const gridX = Math.floor(x / TILE_SIZE);
        const gridY = Math.floor(y / TILE_SIZE);
        
        if (gridX < 0 || gridX >= GRID_WIDTH || gridY < 0 || gridY >= GRID_HEIGHT) {
            return true;
        }
        
        return dungeon[gridY][gridX] === 1;
    }
    
    takeDamage(amount) {
        this.health -= amount;
    }
    
    render(ctx) {
        // Draw enemy with enhanced pixel art style
        const halfSize = Math.floor(this.size / 2);
        const x = Math.floor(this.x - halfSize);
        const y = Math.floor(this.y - halfSize);
        
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x + 2, y + this.size - 2, this.size - 2, 4);
        
        // Main body
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.size, this.size);
        
        // Add shading for depth based on color
        const darkerColor = this.getDarkerShade(this.color);
        ctx.fillStyle = darkerColor;
        ctx.fillRect(x + this.size / 2, y + this.size - 4, this.size / 2, 4);
        ctx.fillRect(x + this.size - 4, y + this.size / 2, 4, this.size / 2);
        
        // Add highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(x, y, this.size / 2, 3);
        ctx.fillRect(x, y, 3, this.size / 2);
        
        // Enhanced eyes with glowing effect
        const eyeSize = Math.max(3, Math.floor(this.size / 8));
        const eyeOffset = Math.floor(this.size / 4);
        
        // Eye glow
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(Math.floor(this.x - eyeOffset - 1), Math.floor(this.y - eyeOffset - 1), eyeSize + 2, eyeSize + 2);
        ctx.fillRect(Math.floor(this.x + eyeOffset - eyeSize - 1), Math.floor(this.y - eyeOffset - 1), eyeSize + 2, eyeSize + 2);
        
        // Eyes
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(Math.floor(this.x - eyeOffset), Math.floor(this.y - eyeOffset), eyeSize, eyeSize);
        ctx.fillRect(Math.floor(this.x + eyeOffset - eyeSize), Math.floor(this.y - eyeOffset), eyeSize, eyeSize);
        
        // Eye highlights for menacing look
        ctx.fillStyle = '#ff6666';
        const highlightSize = Math.max(1, Math.floor(eyeSize / 2));
        ctx.fillRect(Math.floor(this.x - eyeOffset), Math.floor(this.y - eyeOffset), highlightSize, highlightSize);
        ctx.fillRect(Math.floor(this.x + eyeOffset - eyeSize), Math.floor(this.y - eyeOffset), highlightSize, highlightSize);
        
        // Outline with pixel art style
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = PIXEL_ART_OUTLINE_WIDTH;
        ctx.strokeRect(x, y, this.size, this.size);
        
        // Draw enhanced health bar with border
        const barWidth = this.size + 4;
        const barHeight = 5;
        const healthPercent = this.health / this.maxHealth;
        
        // Health bar background/border
        ctx.fillStyle = '#000000';
        ctx.fillRect(Math.floor(this.x - barWidth / 2) - 1, Math.floor(this.y - halfSize - 10) - 1, barWidth + 2, barHeight + 2);
        
        // Health bar red background
        ctx.fillStyle = '#660000';
        ctx.fillRect(Math.floor(this.x - barWidth / 2), Math.floor(this.y - halfSize - 10), barWidth, barHeight);
        
        // Health bar green fill with gradient effect
        const healthWidth = Math.floor(barWidth * healthPercent);
        if (healthWidth > 0) {
            // Green part
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(Math.floor(this.x - barWidth / 2), Math.floor(this.y - halfSize - 10), healthWidth, barHeight);
            
            // Highlight on health bar
            ctx.fillStyle = '#88ff88';
            ctx.fillRect(Math.floor(this.x - barWidth / 2), Math.floor(this.y - halfSize - 10), healthWidth, 2);
        }
    }
    
    getDarkerShade(color) {
        // Simple function to darken a hex color
        const hex = color.replace('#', '');
        const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - 40);
        const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - 40);
        const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - 40);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
}

// Particle Class for visual effects
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 100;
        this.vy = (Math.random() - 0.5) * 100;
        this.color = color;
        this.life = 1;
        this.decay = 2;
        this.size = Math.random() * 4 + 2;
    }
    
    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.life -= this.decay * deltaTime;
    }
    
    render(ctx) {
        // Enhanced particle rendering with glow effect
        const pixelSize = Math.max(2, Math.floor(this.size));
        
        // Outer glow
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life * 0.3;
        ctx.fillRect(
            Math.floor(this.x - pixelSize),
            Math.floor(this.y - pixelSize),
            pixelSize * 2,
            pixelSize * 2
        );
        
        // Main particle
        ctx.globalAlpha = this.life;
        ctx.fillRect(
            Math.floor(this.x - pixelSize / 2),
            Math.floor(this.y - pixelSize / 2),
            pixelSize,
            pixelSize
        );
        
        // Bright center
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = this.life * 0.7;
        const centerSize = Math.max(1, Math.floor(pixelSize / 2));
        ctx.fillRect(
            Math.floor(this.x - centerSize / 2),
            Math.floor(this.y - centerSize / 2),
            centerSize,
            centerSize
        );
        
        ctx.globalAlpha = 1;
    }
}

// Ambient Particle Class for atmospheric effects
class AmbientParticle {
    constructor(x, y, biome) {
        this.x = x;
        this.y = y;
        this.biome = biome;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 10 + 5;
        this.direction = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulseSpeed = Math.random() * 2 + 1;
        this.pulseOffset = Math.random() * Math.PI * 2;
        
        // Set color based on biome
        this.color = this.getBiomeParticleColor(biome.name);
    }
    
    getBiomeParticleColor(biomeName) {
        switch(biomeName) {
            case 'Forest': return '#90ee90';
            case 'Cave': return '#888888';
            case 'Dungeon': return '#9999aa';
            case 'Lava': return '#ff6600';
            case 'Ice Cave': return '#aaddff';
            case 'Swamp': return '#669966';
            case 'Crypt': return '#8888bb';
            case 'The Void': return '#9966cc';
            default: return '#ffffff';
        }
    }
    
    update(deltaTime, canvas) {
        // Floating movement
        this.x += Math.cos(this.direction) * this.speed * deltaTime;
        this.y += Math.sin(this.direction) * this.speed * deltaTime;
        
        // Wrap around screen
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
    }
    
    render(ctx) {
        // Pulsing opacity effect
        const pulse = Math.sin(Date.now() / 1000 * this.pulseSpeed + this.pulseOffset) * 0.5 + 0.5;
        const alpha = this.opacity * pulse;
        
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        
        const size = Math.floor(this.size);
        ctx.fillRect(
            Math.floor(this.x - size / 2),
            Math.floor(this.y - size / 2),
            size,
            size
        );
        
        ctx.globalAlpha = 1;
    }
}

// Start the game
window.addEventListener('load', () => {
    window.game = new Game();
});
