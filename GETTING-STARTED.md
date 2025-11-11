# Getting Started with RABBIT Monorepo

## 🚀 Quick Start

You're in the right place! This directory (`~/rabbit`) contains the complete RABBIT game monorepo.

### Initial Setup (First Time Only)

```bash
# Initialize and clone all submodules
git submodule init
git submodule update --recursive

# Or in one command:
git submodule update --init --recursive
```

### Understanding the Structure

```
~/rabbit/                              ← YOU ARE HERE
├── docs/                              ← Architecture & design documents
│   ├── FIRST-PRINCIPLES-APPROACH.md   ← **READ THIS FIRST**
│   ├── 00-ARCHITECTURE-OVERVIEW.md    ← System architecture
│   ├── 02-MICROSERVICES-ARCHITECTURE.md
│   └── RABBIT-GAME-DESIGN.md          ← Complete game design
│
├── services/                          ← Microservices (git submodules)
│   ├── entity-service/                → Rust (ECS, 600K+ ops/sec)
│   ├── combat-service/                → Rust (deterministic combat)
│   ├── player-service/                → Go (authentication)
│   ├── api-gateway/                   → Go (HTTP + WebSocket)
│   ├── boss-service/                  → Elixir (AI behavior trees)
│   └── evolution-service-impl/        → Elixir (progression system)
│
├── infrastructure/                    ← Infrastructure (git submodules)
│   └── event-bus/                     → NATS (message bus)
│
├── data-models/                       ← Shared data schemas
├── api-contracts/                     ← API definitions
└── shared/                            ← Shared utilities

```

## 🎯 First Principles Approach

**CRITICAL**: This is NOT a fixed tech stack project.

- ✅ Each service's technology is chosen based on **specific requirements**
- ✅ Technologies can change if requirements change
- ❌ NOT "we use Language X for everything"

**Read this before making any technology decisions:**
👉 [docs/FIRST-PRINCIPLES-APPROACH.md](docs/FIRST-PRINCIPLES-APPROACH.md)

## 📦 Git Submodules Overview

All services are **independent git repositories** linked as submodules:

| Service | Repository | Language | Purpose |
|---------|-----------|----------|---------|
| entity-service | [toddllm/rabbit-entity-service](https://github.com/toddllm/rabbit-entity-service) | Rust | High-performance ECS |
| combat-service | [toddllm/rabbit-combat-service](https://github.com/toddllm/rabbit-combat-service) | Rust | Combat calculations |
| player-service | [toddllm/rabbit-player-service](https://github.com/toddllm/rabbit-player-service) | Go | Auth & user management |
| api-gateway | [toddllm/rabbit-api-gateway](https://github.com/toddllm/rabbit-api-gateway) | Go | API gateway |
| boss-service | [toddllm/rabbit-boss-service](https://github.com/toddllm/rabbit-boss-service) | Elixir/OTP | Boss AI |
| evolution-service-impl | [toddllm/rabbit-evolution-service](https://github.com/toddllm/rabbit-evolution-service) | Elixir/OTP | Evolution system |
| event-bus | [toddllm/rabbit-event-bus](https://github.com/toddllm/rabbit-event-bus) | NATS | Message infrastructure |

## 🔨 Working with Submodules

### Updating All Submodules to Latest
```bash
git submodule update --remote --merge
```

### Working on a Specific Service

```bash
# Navigate to the service
cd services/player-service

# The submodule is a full git repo - work normally
git checkout -b my-feature
# ... make changes ...
git add .
git commit -m "Add feature"
git push origin my-feature

# Go back to monorepo root
cd ~/rabbit

# Update monorepo to reference the new commit
git add services/player-service
git commit -m "Update player-service to include new feature"
git push
```

### Adding a New Service as Submodule

```bash
cd ~/rabbit

# Add the new service
git submodule add git@github.com:toddllm/rabbit-new-service.git services/new-service

# Commit the change
git add .gitmodules services/new-service
git commit -m "Add new-service as submodule"
git push
```

### Cloning This Repo (Fresh Start)

```bash
# Clone with submodules
git clone --recurse-submodules git@github.com:toddllm/rabbit.git

# Or if you already cloned without submodules:
git clone git@github.com:toddllm/rabbit.git
cd rabbit
git submodule update --init --recursive
```

## 🏗️ Development Workflow

### For AI Agents

When working on this project:

1. **Start here** (`~/rabbit`) - this is the monorepo root
2. **Read first**: `docs/FIRST-PRINCIPLES-APPROACH.md`
3. **Understand the architecture**: `docs/00-ARCHITECTURE-OVERVIEW.md`
4. **Work on services**: Navigate to `services/<service-name>/` and work as normal git repo
5. **Update references**: After committing to a service, update the monorepo

### For Developers

1. Clone the monorepo with `--recurse-submodules`
2. Read the first principles document
3. Choose a service to work on
4. Follow the standard git workflow within that service
5. Update the monorepo reference when ready

## 🎮 Running the Game

### Local Development

```bash
# Start infrastructure
cd infrastructure/event-bus
docker-compose up -d

# Start services (in separate terminals)
cd ~/rabbit/services/entity-service && cargo run
cd ~/rabbit/services/combat-service && cargo run
cd ~/rabbit/services/player-service && go run cmd/server/main.go
cd ~/rabbit/services/api-gateway && go run cmd/gateway/main.go
cd ~/rabbit/services/boss-service && mix run --no-halt
cd ~/rabbit/services/evolution-service-impl && mix run --no-halt
```

### Docker Compose (Recommended)

```bash
# TODO: Add docker-compose.yml at root to orchestrate all services
docker-compose up
```

## 📚 Documentation

- **[README.md](README.md)** - Project overview and vision
- **[FIRST-PRINCIPLES-APPROACH.md](docs/FIRST-PRINCIPLES-APPROACH.md)** - Technology philosophy ⭐
- **[ARCHITECTURE-OVERVIEW.md](docs/00-ARCHITECTURE-OVERVIEW.md)** - System design
- **[MICROSERVICES-ARCHITECTURE.md](docs/02-MICROSERVICES-ARCHITECTURE.md)** - Service details
- **[RABBIT-GAME-DESIGN.md](docs/RABBIT-GAME-DESIGN.md)** - Complete game design

## 🐰 The RABBIT Philosophy

This project is designed for:

- **Infinite Expansion** - New evolution paths, bosses, zones, modes
- **First Principles Thinking** - Requirements drive technology choices
- **Microservices Architecture** - Independent, scalable services
- **Engine Agnostic** - Any game engine can connect
- **Fair Play** - No pay-to-win, skill-based gameplay

---

**Start your journey here. The warren awaits! 🐰✨**
