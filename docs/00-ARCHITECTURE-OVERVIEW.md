# RABBIT: Game Architecture Overview

## Philosophy: First Principles Design

RABBIT is designed as a **modular, distributed, engine-agnostic** game system built on microservices and event-driven architecture. Every component is designed to be:

- **Replaceable**: Swap implementations without touching other systems
- **Scalable**: Add capacity horizontally by spinning up more instances
- **Observable**: Full telemetry and debugging capabilities
- **Testable**: Each service can be tested in isolation
- **Engine-Agnostic**: Game logic lives in services, not tied to any rendering engine

## Core Principles

### 1. Separation of Concerns
```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Rendering)                        │
│  Any Engine: Unity, Unreal, Web, Custom, Mobile            │
│  - Receives game state updates                              │
│  - Renders world and entities                               │
│  - Sends player inputs                                      │
│  - Handles audio/visuals only                               │
└─────────────────────────────────────────────────────────────┘
                             ▲│
                     Updates ││ Inputs
                             │▼
┌─────────────────────────────────────────────────────────────┐
│                    GAME SERVICES LAYER                       │
│  - Entity management                                         │
│  - Combat resolution                                         │
│  - Evolution progression                                     │
│  - World state                                               │
│  - Business logic                                            │
└─────────────────────────────────────────────────────────────┘
                             ▲│
                       Reads ││ Writes
                             │▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA PERSISTENCE LAYER                    │
│  - PostgreSQL (relational data)                              │
│  - Redis (real-time state, cache)                            │
│  - S3/Object Store (assets, replays)                         │
└─────────────────────────────────────────────────────────────┘
```

### 2. Entity-Component-System (ECS) Architecture

All game objects (players, bosses, items, projectiles) are **entities** composed of **components**:

```typescript
// Entity: Just an ID
type EntityId = string; // UUID

// Component: Pure data
interface Component {
  type: string;
  data: Record<string, any>;
}

// System: Pure logic operating on components
interface System {
  process(entities: Entity[], deltaTime: number): void;
}
```

**Example**: A player rabbit
```json
{
  "entityId": "player-12345",
  "components": {
    "transform": {
      "position": [100, 50, 200],
      "rotation": [0, 45, 0],
      "velocity": [5, 0, 2]
    },
    "evolution": {
      "currentForm": "super-bunny",
      "tier": 3,
      "experience": 15000,
      "unlockedForms": ["burrowling", "warren-runner", "super-rabbit", "super-bunny"]
    },
    "stats": {
      "health": 1200,
      "maxHealth": 1500,
      "energy": 80,
      "maxEnergy": 100,
      "moveSpeed": 12.5,
      "jumpPower": 8.0
    },
    "abilities": {
      "equipped": ["ear-grab", "burrow-dash", "triple-hop", "aura-burst"],
      "cooldowns": {
        "burrow-dash": 0,
        "aura-burst": 3.2
      }
    },
    "faction": {
      "memberships": {
        "titanforge": 750,
        "shadow-court": -200,
        "cosmic-wardens": 1200
      }
    }
  }
}
```

### 3. Event-Driven Communication

Services communicate via **events** on a message bus (Kafka, RabbitMQ, NATS, etc.):

```
Player attacks boss →
  CombatService emits "damage-dealt" event →
    BossService listens, updates boss health →
      If boss dies, emits "boss-defeated" event →
        ProgressionService listens, grants rewards →
          Emits "player-evolution-unlocked" event →
            NotificationService shows popup to player
```

**Benefits**:
- Services are loosely coupled
- Easy to add new reactions to events
- Natural audit log for debugging
- Can replay events for testing

### 4. Stateless Services with Shared State Store

Services are **stateless** - they don't hold game state in memory. All state lives in:
- **Redis** (hot data, active game sessions, real-time cache)
- **PostgreSQL** (persistent data, player profiles, permanent records)

This allows:
- Horizontal scaling (spin up 100 combat service instances)
- Zero-downtime updates (roll out new versions gradually)
- Geographic distribution (services in multiple regions)

## System Architecture Layers

### Layer 1: Data Models (Foundation)
- Entity schemas
- Component definitions
- Database schemas
- Validation rules

### Layer 2: Core Services (Game Logic)
- **Player Service**: Authentication, profiles, progression
- **Entity Service**: Entity lifecycle, component management
- **Combat Service**: Damage calculation, ability resolution
- **Evolution Service**: Progression trees, unlock logic
- **World Service**: Zone management, world state
- **Boss Service**: Boss AI, mechanics, phases
- **Faction Service**: Reputation, relationships, rewards
- **Event Service**: Seasonal events, world events, triggers
- **Trading Service**: Economy, item transfer, marketplace
- **PvP Service**: Matchmaking, rankings, arenas

### Layer 3: Infrastructure (Supporting)
- **Gateway**: API gateway, rate limiting, auth
- **State Manager**: Redis interface, state sync
- **Event Bus**: Message queue, pub/sub
- **Analytics**: Telemetry, metrics, logging
- **Asset Service**: Serve game assets, configurations
- **Match Service**: Instance management, server orchestration

### Layer 4: Client Interface
- **WebSocket Server**: Real-time bidirectional communication
- **REST API**: Request/response operations
- **GraphQL** (optional): Complex queries
- **gRPC** (optional): High-performance service-to-service

## Data Flow Example: Player Casts Ability

```
1. CLIENT: Player presses "Q" (Burrow Dash ability)
   ↓
2. CLIENT → GATEWAY: WebSocket message
   { "action": "cast-ability", "abilityId": "burrow-dash" }
   ↓
3. GATEWAY: Validates auth token, checks rate limit
   ↓
4. GATEWAY → COMBAT SERVICE: Route ability request
   ↓
5. COMBAT SERVICE:
   - Fetches player entity from Redis
   - Validates ability is equipped
   - Checks cooldown (OK)
   - Checks energy cost (80 energy, player has 80) ✓
   - Calculates ability effects (dash forward 15 units, 0.5s invuln)
   ↓
6. COMBAT SERVICE → EVENT BUS: Emit "ability-cast" event
   {
     "playerId": "player-12345",
     "abilityId": "burrow-dash",
     "timestamp": 1736639900000,
     "effects": [
       { "type": "dash", "distance": 15, "direction": [0.7, 0, 0.7] },
       { "type": "invulnerable", "duration": 0.5 }
     ]
   }
   ↓
7. ENTITY SERVICE: Listens to "ability-cast"
   - Updates player position and buffs in Redis
   - Applies cooldown to burrow-dash (5 seconds)
   - Deducts energy cost
   ↓
8. STATE MANAGER → CLIENT: Push state update via WebSocket
   {
     "type": "state-update",
     "entities": {
       "player-12345": {
         "transform": { "position": [110.5, 50, 210.5] },
         "stats": { "energy": 0 },
         "abilities": { "cooldowns": { "burrow-dash": 5.0 } },
         "buffs": [{ "type": "invulnerable", "remaining": 0.5 }]
       }
     }
   }
   ↓
9. CLIENT: Receives update, renders dash animation and invuln effect
```

**Total latency target**: <50ms for player actions

## Scalability Approach

### Horizontal Scaling
- Each service can have N instances behind a load balancer
- Stateless design means any instance can handle any request
- Redis Cluster for distributed caching
- PostgreSQL read replicas for query scaling

### Geographic Distribution
```
North America          Europe               Asia
    ↓                    ↓                    ↓
[Gateway Cluster]   [Gateway Cluster]   [Gateway Cluster]
    ↓                    ↓                    ↓
        [Shared Global Game Services]
                ↓
        [PostgreSQL Primary + Replicas]
                ↓
        [Redis Cluster (Multi-Region)]
```

Players connect to nearest gateway → services are globally shared → data layer replicates

### Instance Management
For PvE/PvP matches:
- **Match Service** spins up isolated game instances
- Each instance is a temporary "world shard"
- 10-100 players per instance (depends on content type)
- Instance reports state to central services
- On completion, results persisted, instance destroyed

## Tech Stack Recommendations (Engine-Agnostic)

### Backend Services
- **Language**: TypeScript/Node.js, Go, or Rust (pick one for consistency)
- **API**: Express.js, Fastify, or custom HTTP server
- **WebSocket**: Socket.io, ws, or uWebSockets
- **Message Queue**: NATS, Kafka, or RabbitMQ
- **Cache**: Redis (single-threaded, fast, simple)
- **Database**: PostgreSQL (JSONB for flexible schemas)

### Infrastructure
- **Container Orchestration**: Kubernetes or Docker Swarm
- **Service Mesh**: Istio (optional, for advanced routing)
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Tracing**: Jaeger or Zipkin

### Client (Flexible)
- Any rendering engine can connect via WebSocket + REST
- Client receives entity state updates
- Client sends input commands
- Game logic stays server-side (prevents cheating)

## Security Principles

### 1. Server Authority
- **All game logic runs on server**
- Client is "dumb terminal" - only renders and sends inputs
- Server validates every action (cooldowns, costs, positions)

### 2. No Secrets in Client
- API keys, DB credentials, etc. only in server-side services
- Use AWS Secrets Manager as per CLAUDE.md

### 3. Anti-Cheat
- Server validates physics (speed hacks impossible)
- Server owns combat resolution (damage hacks impossible)
- Rate limiting prevents spam/flooding

### 4. Authentication
- JWT tokens for session management
- Refresh tokens for long-term access
- Optional OAuth for social login

## Development Workflow

### Phase 1: Core Engine (MVP)
1. Data models and schemas
2. Entity service + component system
3. Player service + basic progression
4. Combat service + ability framework
5. Simple boss AI
6. WebSocket communication
7. Test client (minimal 3D or 2D)

### Phase 2: Content Systems
1. Evolution tree system
2. Faction service
3. Event system
4. Trading/economy
5. World/zone management

### Phase 3: Multiplayer
1. PvP matchmaking
2. Clan/warren system
3. World events (shared boss battles)
4. Instance management

### Phase 4: Scale & Polish
1. Performance optimization
2. Load testing (1000s of concurrent players)
3. Geographic distribution
4. Admin tools
5. Analytics dashboard

## Next Steps

Now we'll design:
1. **Core data models** (entity schemas, component definitions)
2. **Microservice APIs** (endpoints, events, contracts)
3. **Evolution system** (progression trees, unlock logic)
4. **Combat system** (abilities, damage, boss mechanics)
5. **Content architecture** (bosses, events, worlds)

This foundation is **engine-agnostic**, **infinitely scalable**, and **infinitely extensible** - exactly what RABBIT needs for "much, much more" growth.
