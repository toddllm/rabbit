# RABBIT: Microservices Architecture

## Service Map

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           API GATEWAY                                    │
│  - Authentication & Authorization                                        │
│  - Rate Limiting                                                         │
│  - Request Routing                                                       │
│  - WebSocket Management                                                  │
│  - Load Balancing                                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
         ┌──────────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
         │  Player Service │ │Entity Svc  │ │Combat Svc  │
         └─────────────────┘ └────────────┘ └────────────┘
                    │               │               │
         ┌──────────┼───────────────┼───────────────┼──────────┐
         │          │               │               │          │
    ┌────▼────┐┌───▼────┐    ┌────▼────┐    ┌────▼────┐┌───▼────┐
    │Evolution││Faction │    │  Boss   │    │  World  ││ Event  │
    │ Service ││Service │    │ Service │    │ Service ││Service │
    └─────────┘└────────┘    └─────────┘    └─────────┘└────────┘
         │          │              │              │          │
         └──────────┼──────────────┼──────────────┼──────────┘
                    │              │              │
              ┌─────▼──────┐ ┌────▼─────┐  ┌────▼─────┐
              │  Trading   │ │   PvP    │  │  Match   │
              │  Service   │ │ Service  │  │ Service  │
              └────────────┘ └──────────┘  └──────────┘
                    │              │              │
                    └──────────────┼──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │      EVENT BUS (NATS)       │
                    │   - Pub/Sub messaging       │
                    │   - Event sourcing          │
                    │   - Service coordination    │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
             ┌──────▼──────┐            ┌────────▼─────────┐
             │  Redis      │            │  PostgreSQL      │
             │  - Hot data │            │  - Persistent    │
             │  - Sessions │            │  - Profiles      │
             │  - Cache    │            │  - History       │
             └─────────────┘            └──────────────────┘
```

## Service Definitions

### 1. API Gateway

**Responsibility**: Single entry point for all client requests

**Functions**:
- Authenticate JWT tokens
- Rate limit requests (per-player, per-IP)
- Route requests to appropriate services
- Manage WebSocket connections
- Aggregate responses from multiple services

**Endpoints**:
```
WebSocket: wss://gateway.rabbit.game/ws
REST:      https://gateway.rabbit.game/api/v1/*
```

**Technologies**: Node.js + Express/Fastify, Socket.io or ws

---

### 2. Player Service

**Responsibility**: Player profiles, authentication, progression tracking

**Owns**:
- Player accounts and profiles
- Authentication tokens
- Overall progression (level, total XP, play time)
- Rankings and titles
- Cosmetics and unlocks

**API Endpoints**:

```typescript
// REST API
POST   /players/register          - Create new player account
POST   /players/login              - Authenticate and get JWT
GET    /players/:id                - Get player profile
PATCH  /players/:id                - Update player profile
GET    /players/:id/stats          - Get aggregated stats
POST   /players/:id/cosmetics      - Equip cosmetics

// Events (publishes)
"player.created"                   - New player account
"player.logged-in"                 - Player authenticated
"player.level-up"                  - Player gained a level
"player.rank-changed"              - Player rank changed
"player.achievement-unlocked"      - Achievement earned
```

**Data Storage**:
- **PostgreSQL**: Player profiles, login history
- **Redis**: Active sessions, JWT blacklist, online status

---

### 3. Entity Service

**Responsibility**: Entity lifecycle and component management

**Owns**:
- Entity creation/destruction
- Component CRUD operations
- Entity queries (get all entities in zone, etc.)
- State synchronization

**API Endpoints**:

```typescript
// Internal service API (gRPC or REST)
POST   /entities                   - Create entity
GET    /entities/:id               - Get entity by ID
PATCH  /entities/:id/components    - Update components
DELETE /entities/:id               - Destroy entity
GET    /zones/:zoneId/entities     - Get all entities in zone

// Events (publishes)
"entity.created"                   - New entity spawned
"entity.updated"                   - Components changed
"entity.destroyed"                 - Entity removed
"entity.moved"                     - Position changed
```

**Data Storage**:
- **Redis**: Active entities (in memory for speed)
- **PostgreSQL**: Entity templates, definitions

---

### 4. Combat Service

**Responsibility**: Damage calculation, ability execution, combat resolution

**Owns**:
- Ability activation
- Damage/healing calculations
- Buff/debuff application
- Combat validation (can player hit this target?)

**API Endpoints**:

```typescript
// Client → Gateway → Combat Service
POST   /combat/cast-ability        - Player casts ability
POST   /combat/attack              - Basic attack
POST   /combat/block               - Use ear shield

// Internal
POST   /combat/calculate-damage    - Calculate damage dealt
POST   /combat/apply-buff          - Apply buff/debuff
GET    /combat/abilities/:id       - Get ability definition

// Events (publishes)
"combat.ability-cast"              - Ability used
"combat.damage-dealt"              - Damage applied
"combat.heal-received"             - Healing applied
"combat.buff-applied"              - Buff/debuff added
"combat.buff-expired"              - Buff/debuff removed
"combat.death"                     - Entity died
```

**Data Storage**:
- **Redis**: Active cooldowns, ongoing combat state
- **PostgreSQL**: Ability definitions, combat logs (for analytics)

---

### 5. Evolution Service

**Responsibility**: Evolution trees, progression, form unlocks

**Owns**:
- Evolution tree definitions
- XP gain calculations
- Evolution unlock conditions
- Form transformations

**API Endpoints**:

```typescript
POST   /evolution/gain-xp          - Award XP to player
POST   /evolution/evolve           - Transform to new form
GET    /evolution/trees            - Get all evolution trees
GET    /evolution/player/:id       - Get player's evolution state
GET    /evolution/unlock-conditions/:form - Check unlock requirements

// Events (publishes)
"evolution.xp-gained"              - Player earned XP
"evolution.level-up"               - Tier increased
"evolution.form-unlocked"          - New form available
"evolution.evolved"                - Player transformed
```

**Data Storage**:
- **PostgreSQL**: Evolution trees, form definitions, unlock conditions
- **Redis**: Player current evolution state (cached)

---

### 6. Boss Service

**Responsibility**: Boss AI, mechanics, phases, loot

**Owns**:
- Boss behavior trees
- Mechanic execution (abilities, phase transitions)
- Boss evolution states (Base → Enraged → Ascended)
- Loot distribution

**API Endpoints**:

```typescript
POST   /bosses/spawn               - Spawn boss instance
GET    /bosses/:instanceId         - Get boss state
POST   /bosses/:instanceId/damage  - Boss takes damage
POST   /bosses/:instanceId/mechanic - Trigger mechanic
POST   /bosses/:instanceId/defeat  - Boss defeated

// Events (publishes)
"boss.spawned"                     - Boss appeared
"boss.phase-changed"               - New phase started
"boss.enraged"                     - Boss entered enrage
"boss.mechanic-triggered"          - Boss used ability
"boss.defeated"                    - Boss killed
"boss.loot-dropped"                - Loot available
```

**Data Storage**:
- **PostgreSQL**: Boss definitions, behavior trees, loot tables
- **Redis**: Active boss instances

---

### 7. Faction Service

**Responsibility**: Faction reputation, relationships, rewards

**Owns**:
- Faction definitions
- Reputation calculations
- Faction-based unlocks
- Friend-mies and neutrals system

**API Endpoints**:

```typescript
POST   /factions/:id/reputation    - Modify reputation
GET    /factions/:id/rewards       - Get available rewards
POST   /factions/:id/claim-reward  - Claim faction reward
GET    /players/:id/factions       - Get player's faction standing
GET    /factions/:id/relationships - Get faction relationships

// Events (publishes)
"faction.reputation-changed"       - Rep increased/decreased
"faction.rank-up"                  - Reached new faction rank
"faction.reward-claimed"           - Player claimed reward
"faction.war-started"              - Faction conflict began
```

**Data Storage**:
- **PostgreSQL**: Faction definitions, rewards, relationships
- **Redis**: Player reputation values (cached)

---

### 8. World Service

**Responsibility**: World state, zones, environmental events

**Owns**:
- World and zone definitions
- Zone instance management
- Environmental hazards
- World event triggers

**API Endpoints**:

```typescript
GET    /worlds                     - Get all worlds
GET    /worlds/:id/zones           - Get zones in world
POST   /zones/:id/instance         - Create zone instance
GET    /zones/:id/state            - Get zone state
POST   /zones/:id/event            - Trigger zone event

// Events (publishes)
"world.zone-opened"                - New zone available
"world.event-started"              - World event began
"world.event-ended"                - World event completed
"world.hazard-activated"           - Environmental hazard
```

**Data Storage**:
- **PostgreSQL**: World/zone definitions
- **Redis**: Active zone instances, zone state

---

### 9. Event Service

**Responsibility**: Seasonal events, world events, limited-time content

**Owns**:
- Event scheduling
- Event state (active, completed, upcoming)
- Event-specific mechanics
- Seasonal rewards

**API Endpoints**:

```typescript
GET    /events                     - Get active events
GET    /events/:id                 - Get event details
POST   /events/:id/participate     - Join event
GET    /events/:id/leaderboard     - Get event rankings
POST   /events/:id/claim-rewards   - Claim event rewards

// Events (publishes)
"event.started"                    - Event began
"event.progress"                   - Player made progress
"event.completed"                  - Event finished
"event.seasonal-start"             - New season started
```

**Data Storage**:
- **PostgreSQL**: Event definitions, schedules, history
- **Redis**: Active events, leaderboards

---

### 10. Trading Service

**Responsibility**: Player-to-player trading, marketplace, economy

**Owns**:
- Trade offers and transactions
- Marketplace listings
- Currency exchanges
- Trade security (prevent duplication)

**API Endpoints**:

```typescript
POST   /trade/offers               - Create trade offer
GET    /trade/offers/:id           - Get trade details
POST   /trade/offers/:id/accept    - Accept trade
POST   /trade/offers/:id/cancel    - Cancel trade

POST   /marketplace/listings       - List item for sale
GET    /marketplace/search         - Search marketplace
POST   /marketplace/buy/:id        - Purchase item

// Events (publishes)
"trade.offer-created"              - Trade initiated
"trade.completed"                  - Trade successful
"trade.cancelled"                  - Trade cancelled
"marketplace.item-sold"            - Item purchased
```

**Data Storage**:
- **PostgreSQL**: Trade history, marketplace logs
- **Redis**: Active trades, live marketplace

---

### 11. PvP Service

**Responsibility**: Matchmaking, ranked ladders, arena management

**Owns**:
- Matchmaking queues
- PvP rankings and MMR
- Arena/battleground rules
- Match results

**API Endpoints**:

```typescript
POST   /pvp/queue                  - Join matchmaking queue
DELETE /pvp/queue                  - Leave queue
GET    /pvp/leaderboard/:type      - Get PvP rankings
GET    /pvp/matches/:id            - Get match details
POST   /pvp/matches/:id/results    - Submit match results

// Events (publishes)
"pvp.match-found"                  - Match created
"pvp.match-started"                - Match began
"pvp.match-ended"                  - Match completed
"pvp.rank-changed"                 - Player rank updated
```

**Data Storage**:
- **PostgreSQL**: Match history, rankings, MMR
- **Redis**: Active queues, ongoing matches

---

### 12. Match Service

**Responsibility**: Game instance orchestration, server management

**Owns**:
- Spin up isolated game instances (dungeons, raids, PvP matches)
- Instance lifecycle (create, monitor, destroy)
- Player assignment to instances
- Instance state reporting

**API Endpoints**:

```typescript
POST   /matches/create             - Create new instance
GET    /matches/:id                - Get instance info
POST   /matches/:id/join           - Player joins instance
POST   /matches/:id/leave          - Player leaves instance
DELETE /matches/:id                - Destroy instance

// Events (publishes)
"match.instance-created"           - Instance ready
"match.player-joined"              - Player entered
"match.player-left"                - Player exited
"match.instance-destroyed"         - Instance cleaned up
```

**Data Storage**:
- **Redis**: Active instances, player assignments
- **PostgreSQL**: Instance logs, match results

---

## Event-Driven Coordination Example

**Scenario**: Player defeats a boss

```
1. Combat Service detects boss health = 0
   ↓
2. Combat Service publishes "combat.death" event
   {
     "entityId": "boss-123",
     "bossId": "shadow-queen-sella",
     "killedBy": ["player-456", "player-789"],
     "timestamp": 1736640000000
   }
   ↓
3. Boss Service listens → publishes "boss.defeated" event
   {
     "bossId": "shadow-queen-sella",
     "instanceId": "instance-999",
     "participants": [...],
     "evolutionState": "enraged"
   }
   ↓
4. Multiple services react simultaneously:

   Evolution Service:
   - Awards XP to participants
   - Checks if any players can evolve
   - Publishes "evolution.xp-gained" events

   Faction Service:
   - Increases reputation with opposing factions
   - Decreases reputation with Shadow Court
   - Publishes "faction.reputation-changed" events

   Boss Service:
   - Rolls loot table
   - Creates loot entities
   - Publishes "boss.loot-dropped" event

   Event Service:
   - Checks if boss was part of an event
   - Updates event progress
   - Publishes "event.progress" event

   Player Service:
   - Updates player achievements
   - Checks if players earned titles
   - Publishes "player.achievement-unlocked" events
   ↓
5. Gateway aggregates updates and pushes to clients
```

This event-driven approach means:
- Services don't need to know about each other
- Easy to add new reactions (e.g., new "boss defeated" logic)
- Natural audit trail
- Can replay events for debugging

---

## Service Communication Protocols

### Client ↔ Gateway
- **WebSocket**: Real-time bidirectional (movement, combat, state updates)
- **REST**: Request/response operations (profile updates, queries)

### Gateway ↔ Services
- **REST/HTTP**: Simple request/response
- **gRPC** (optional): High-performance RPC for critical paths

### Service ↔ Service
- **Event Bus (NATS/Kafka)**: Asynchronous pub/sub
- **gRPC** (optional): Synchronous service calls when needed

### Services ↔ Data Layer
- **Redis Client**: Direct connection to Redis
- **PostgreSQL Client**: Connection pooling via pg/Prisma/TypeORM

---

## Scaling Strategy

### Horizontal Scaling
Each service can scale independently:

```
                 ┌─────────────────┐
                 │  Load Balancer  │
                 └────────┬────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
     ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
     │Combat#1 │     │Combat#2 │     │Combat#3 │
     └─────────┘     └─────────┘     └─────────┘
```

All instances are stateless → any can handle any request

### Database Scaling
- **PostgreSQL**: Read replicas for queries, primary for writes
- **Redis**: Redis Cluster for distributed caching, 100k+ ops/sec

### Geographic Distribution
- Gateway clusters per region (US-West, US-East, EU, Asia)
- Services can be globally shared or regional
- Redis and PostgreSQL replication across regions

---

## Service Health & Monitoring

Each service exposes:

```
GET /health         - Health check (200 OK if healthy)
GET /metrics        - Prometheus metrics
GET /ready          - Ready check (can serve traffic?)
```

**Monitoring Stack**:
- Prometheus: Metric collection
- Grafana: Dashboards
- Jaeger: Distributed tracing
- ELK: Centralized logging

---

## Security

### Authentication Flow
```
1. Client → Gateway: Login credentials
2. Gateway → Player Service: Verify credentials
3. Player Service → Gateway: Return JWT
4. Gateway → Client: JWT token
5. Client stores JWT, includes in all future requests
6. Gateway validates JWT on every request
```

### Authorization
- Services trust requests from Gateway (internal network)
- Gateway validates all permissions before routing
- JWT contains player ID + roles
- Services can perform additional checks (e.g., "can player access this zone?")

### Anti-Cheat
- Server authority: All game logic server-side
- Input validation: Reject impossible inputs (teleport, infinite resources)
- Rate limiting: Prevent spam/flooding
- Replay detection: Detect and reject repeated requests

---

## Next Steps

With this architecture defined, we can now:

1. ✅ Implement individual services with clear boundaries
2. ✅ Define detailed API contracts (OpenAPI/gRPC schemas)
3. ✅ Build the evolution system logic
4. ✅ Create boss mechanics framework
5. ✅ Implement PvP matchmaking
6. ✅ Add event scheduling system

This architecture is **infinitely scalable** and **infinitely extensible** - perfect for RABBIT's "much, much more" vision!
