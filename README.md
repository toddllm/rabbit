# RABBIT: The Ultimate MMO Rabbit Universe

**An enormous, persistent, online, multi-series universe where players are intelligent rabbits/bunnies who evolve through power tiers, fight gods, titans, AI, demons, shadows, and void anomalies, while also racing, building, trading, puzzling, and surviving.**

> **🎯 First Principles Approach**: This project is **NOT** built on a fixed tech stack. Each component's technology is chosen based on specific requirements. See [FIRST-PRINCIPLES-APPROACH.md](docs/FIRST-PRINCIPLES-APPROACH.md) for details.

---

## 🌟 What is RABBIT?

RABBIT is a **genre-fusion MMO** combining:
- **Action RPG** (combat, abilities, builds)
- **Obby/Parkour Platformer** (extreme mobility, skill-based movement)
- **Dungeon Crawler** (instanced raids, boss encounters)
- **Survival Builder** (clan bases, crafting, building)
- **Social MMO** (clans, trading, economy)
- **Puzzle & Raid Game** (Lexicon Archives, boss mechanics)
- **PvP & Clan Warfare** (ranked ladders, guild wars)
- **Seasonal Live World** (dynamic events, limited-time content)

### Core Unique Features

🐰 **Play as a Rabbit/Bunny** with extreme movement capabilities
👂 **Functional Ears** - Grab, throw, block, hook, carry objects and friends
🌌 **Multi-Series Universe** - Infinite expansion across Warren Origins, Titans Awaken, Mirda's Eclipse, Dimensional Fracture, Golden OMEGA Trials, The End Arcs, and beyond
🔥 **70+ Evolution Forms** across 13+ unique paths (Elemental, Metal, Cosmic, Titanborne, Demon-Slayer, Shadow, Voidstride, Lexicon, and more)
⚔️ **50+ Unique Bosses** with evolution states (Base → Enraged → Ascended → Void → Supreme)
🎮 **No Pay-to-Win** - Cosmetics only, fair competitive gameplay
♾️ **Infinite Expansion** - Built for years of content growth

---

## 📁 Project Structure

This repository contains the **complete first-principles design** of RABBIT as an **engine-agnostic**, **microservices-based** game system.

```
rabbit-game/
├── docs/
│   ├── 00-ARCHITECTURE-OVERVIEW.md      # System architecture & philosophy
│   ├── 02-MICROSERVICES-ARCHITECTURE.md # Service design & APIs
│   ├── RABBIT-GAME-DESIGN.md            # Complete game design document
│   └── IMPLEMENTATION-ROADMAP.md        # Development phases & timeline
├── data-models/
│   ├── 01-core-entities.ts              # Entity-Component-System definitions
│   └── boss-database.ts                 # All bosses, mini-bosses, enemies
├── services/
│   ├── evolution-service/
│   │   └── evolution-system.ts          # Evolution trees & progression
│   └── combat-service/
│       └── combat-system.ts             # Combat formulas & boss mechanics
└── README.md                            # You are here!
```

---

## 🏗️ Architecture Philosophy

RABBIT is designed from **first principles** with:

### 1. Engine-Agnostic Design
All game logic lives in **backend microservices**, not tied to any rendering engine. This means:
- Unity, Unreal, Godot, or custom WebGL clients can all connect
- Game logic is portable and replaceable
- Clients are "dumb terminals" that render and send inputs

### 2. Entity-Component-System (ECS)
Every game object (player, boss, projectile, item) is an **entity** composed of **components**:
```typescript
Entity = ID + Components
Components = Pure data (transform, stats, abilities, etc.)
Systems = Pure logic (movement system, combat system, etc.)
```

### 3. Microservices Architecture
12 independent services communicating via events:
- **Player Service**: Profiles, authentication, progression
- **Entity Service**: Entity lifecycle management
- **Combat Service**: Damage, abilities, buffs
- **Evolution Service**: XP, leveling, form unlocks
- **Boss Service**: AI, mechanics, loot
- **Faction Service**: Reputation, rewards
- **World Service**: Zones, instances
- **Event Service**: Seasonal events
- **Trading Service**: Economy, marketplace
- **PvP Service**: Matchmaking, rankings
- **Match Service**: Instance orchestration
- **Gateway**: API gateway, WebSocket management

### 4. Event-Driven Communication
Services communicate asynchronously via message bus (NATS/Kafka):
- Loosely coupled: Services don't depend on each other
- Easy to extend: Add new reactions to events without modifying existing code
- Natural audit trail: All events logged for debugging

### 5. Scalability First
- **Horizontal scaling**: Spin up N instances of any service
- **Stateless services**: All state in Redis/PostgreSQL
- **Geographic distribution**: Multi-region support
- **1000+ concurrent players** per server cluster

---

## 🎮 Gameplay Overview

### Movement & Mechanics
- **Triple Jump** + air control
- **Burrow Dash** (underground invuln dash)
- **Wall Run** + wall jump
- **Ear Grab** (pick up objects/enemies)
- **Ear Shield** (directional block)
- **Ear Hook** (grapple to ledges)
- **Ear Carry** (carry downed teammates)

### Evolution System
Start as **Burrowling** → progress to **Super Bunny** → choose specialization:

**Elemental Paths**:
- Fire: Ember Bunny → Flame Warren Knight → Inferno Warren Lord
- Water: Tide Hopper → Abyss Diver → Patunluea's Chosen

**Precious Metal Paths**:
- Emerald, Silver, Gold, Diamond, Platinum variants
- Each grants unique bonuses and cosmetics

**Mythic Paths**:
- **Cosmic Star**: Mindy Starchild's Herald (starlight powers)
- **Titanborne**: Titan Breaker (giant-slaying abilities)
- **Demon-Slayer**: Demonis Bane (anti-demon specialist)
- **Lexicon**: Mega Lexicon Keeper (puzzle master)
- **Shadow**: Shadow Court Blade (stealth assassin)
- **Voidstride**: Void Tamer (void corruption powers)

### Boss Battles
Fight 50+ unique bosses across multiple series:

**Tier 1 Bosses** (Warren Origins):
- Warren Guardian, Crystal Golem, Elder Burrow Protector

**Tier 2 Bosses** (Titans Awaken):
- **Zen**: The Titan Creator
- **Rumble**: The Rumble God
- **God of Titans Supreme**: Overlord of all titans

**Tier 3 Bosses** (Mirda's Eclipse):
- **Mirda**: The Cosmic Goddess (Base, Enraged, Ascended)
- **Mindy Starchild**: Herald of the Stars (Friend-mie)

**Tier 4 Bosses** (Dimensional Fracture):
- **AI Torque**: The AI-Man Fusion (code glitch mechanics)
- **Shadow Queen Sella**: Sovereign of Shadow Court (darkness + clones)
- **Demonis**: The Demon Lord (hellfire + summons)

**Endgame Bosses**:
- **Golden Mirda (Mirda OMEGA)**: Absolute supreme challenge
- **THE END**: Harbinger of Finality
- **END OF UNIVERSE**, **END OF REALITY**: Existential threats

### Factions
Gain reputation with 8 major factions:
- **Titanforge** (Zen, titans)
- **Shadow Court** (Sella, stealth)
- **Demon Covenant** (Demonis, chaos)
- **Cosmic Wardens** (Mindy, Zara)
- **Lexicon Archives** (ancient knowledge)
- **AI Ascendancy** (AI Torque, tech)
- **Trade Syndicate** (El Qwera, economy)
- **Beastborn** (Polio, Homosaurzilla)

### PvP Modes
- **Duel Warren** (1v1 ranked)
- **Burrow Clash** (3v3 arena)
- **Relic Rush** (5v5 CTF with parkour)
- **Voidstorm** (10v10 battle royale)
- **Clan Warren Wars** (20v20 guild wars)

Climb the ranks: **Burrow Bronze** → **Carrot Silver** → **Warren Gold** → **Titan Platinum** → **Void Diamond** → **Shadow Crown** → **OMEGA Crest**

### Seasonal Content
3-month seasons with themed events:
- **Season of Titans**: Boosted titan raids, Zen focus
- **Season of Shadows**: Shadow Court takeover
- **Season of Code**: AI Torque reality glitches
- **Season of Venom**: Vaspra plagues
- **Season of Stars**: Mindy cosmic showers
- **Season of Ends**: THE END approaches
- **Season of Rebirth**: Mirda stabilizes reality

---

## 🛠️ Technology Philosophy: First Principles Approach

> **⚠️ CRITICAL**: This project uses a **first principles approach**, NOT a fixed tech stack. Each service's technology is chosen based on specific requirements, not preferences.

### Read This First
**[📖 First Principles Approach](docs/FIRST-PRINCIPLES-APPROACH.md)** - Required reading for all contributors

### Current Service Implementations (Examples, Not Prescriptions)

These are the **current** implementations. They can change if requirements change:

- **Entity Service**: Rust (600K+ ops/sec, zero GC, memory safety)
- **Combat Service**: Rust (deterministic <5μs calculations, no GC pauses)
- **Player Service**: Go (thousands of concurrent auth requests, single binary)
- **API Gateway**: Go (40K+ req/sec, 100K+ WebSocket connections)
- **Boss Service**: Elixir/OTP (10K+ concurrent boss instances, fault isolation)
- **Evolution Service**: Elixir/OTP (complex state machines, hot code swapping)
- **Event Bus**: NATS (11M+ msgs/sec, sub-millisecond latency)

**Why these choices?** See [FIRST-PRINCIPLES-APPROACH.md](docs/FIRST-PRINCIPLES-APPROACH.md) for detailed rationale.

### Infrastructure (More Stable)
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack or Loki
- **Tracing**: Jaeger or Zipkin
- **Secrets**: AWS Secrets Manager
- **Container Orchestration**: Kubernetes or Docker Swarm

### Client (Completely Flexible)
- **Any rendering engine** can connect via WebSocket + REST
- Unity, Unreal, Godot, Three.js, Babylon.js, custom engine
- Client receives state updates, sends input commands
- Server owns all game logic (prevents cheating)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (if using TypeScript backend)
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 7+

### Quick Start (Development)

1. **Clone the repository**
```bash
git clone <repo-url>
cd rabbit-game
```

2. **Set up infrastructure**
```bash
# Start PostgreSQL and Redis
docker-compose up -d postgres redis

# Initialize database
npm run db:migrate
```

3. **Start services**
```bash
# Start all microservices
npm run services:start

# Or start individually
cd services/player-service && npm run dev
cd services/entity-service && npm run dev
cd services/combat-service && npm run dev
# etc.
```

4. **Start a test client**
```bash
cd client-prototype
npm install
npm run dev
# Open http://localhost:3000
```

5. **Create a player and start playing!**

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Architecture Overview](docs/00-ARCHITECTURE-OVERVIEW.md) | System design philosophy, ECS, microservices, scaling |
| [Microservices Architecture](docs/02-MICROSERVICES-ARCHITECTURE.md) | Service definitions, APIs, event flows |
| [Game Design Document](docs/RABBIT-GAME-DESIGN.md) | Complete gameplay overview, progression, bosses |
| [Implementation Roadmap](docs/IMPLEMENTATION-ROADMAP.md) | Development phases, timeline, team requirements |
| [Core Entities](data-models/01-core-entities.ts) | Data model definitions (TypeScript) |
| [Boss Database](data-models/boss-database.ts) | All boss definitions and mechanics |
| [Evolution System](services/evolution-service/evolution-system.ts) | Evolution trees and progression logic |
| [Combat System](services/combat-service/combat-system.ts) | Combat formulas and ability execution |

---

## 🗺️ Development Roadmap

### Phase 0: Foundation (Months 1-2)
- Set up infrastructure
- Implement core data models
- Build basic microservices
- Create proof-of-concept client

### Phase 1: Core Gameplay (Months 3-5)
- Combat system
- Ability framework
- First boss encounter
- Evolution system foundation

### Phase 2: Content Expansion (Months 6-8)
- Multiple evolution paths
- 10+ bosses
- Warren Origins series complete
- Basic PvP

### Phase 3: MMO Infrastructure (Months 9-11)
- Clan/warren system
- Trading and economy
- Social hubs
- Optimize for 1000+ concurrent players

### Phase 4: Boss Expansion (Months 12-14)
- Titans Awaken series
- Boss evolution states
- Faction system
- Seasonal events

### Phase 5: PvP & Endgame (Months 15-16)
- Full PvP mode suite
- Ranked ladder
- Endgame raids (Mirda, Golden Mirda)
- Achievement system

### Phase 6: Polish & Launch (Months 17-18)
- QA and optimization
- Balance tuning
- Marketing
- Beta testing

### Post-Launch
- Continuous seasonal content
- New evolution paths
- New world series
- Player-created content tools

**See [IMPLEMENTATION-ROADMAP.md](docs/IMPLEMENTATION-ROADMAP.md) for detailed breakdown.**

---

## 💰 Monetization (No Pay-to-Win)

### You CAN Buy
✅ Cosmetics (skins, ear accessories, trails, auras)
✅ Battle Warren Premium (cosmetic rewards)
✅ Convenience (bank slots, fast travel)

### You CANNOT Buy
❌ Power (stats, evolutions, abilities)
❌ Progression (XP boosts, level skips)
❌ Loot (boss drops, items)
❌ Competitive advantage

**100% Fair Play - Skill > Wallet**

---

## 🤝 Contributing

This is currently a **design document** and **architecture specification**. Implementation contributions welcome once core services are built!

### Areas for Contribution
- Backend service implementation
- Client renderer development
- Boss mechanic design
- Balance testing
- Documentation improvements
- Art and animation (once engine selected)

---

## 📜 License

[To be determined - suggest MIT or Apache 2.0 for open-source, or proprietary for commercial]

---

## 🎯 Vision

RABBIT is designed to be **infinitely expandable** with:
- New evolution paths
- New world series
- New bosses and mechanics
- New game modes
- Player-created content

The foundation is built for **years of growth**, with a commitment to:
- **Fair play** (no pay-to-win)
- **Community-driven** (player feedback shapes development)
- **Quality over quantity** (polished experiences)
- **Long-term sustainability** (not a cash grab)

---

## 📞 Contact

[Add your contact information, Discord server, social media, etc.]

---

## 🙏 Acknowledgments

Inspired by:
- Roblox obbies (movement and parkour)
- MMOs like WoW and FFXIV (progression and raids)
- Action games like Elden Ring (boss design)
- Social games like Animal Crossing (community)
- The prompt's incredible vision for "much, much more"

---

**The warren awaits. Will you answer the call?** 🐰✨

---

*"From humble Burrowling to cosmic legend, every hop is an adventure."*
