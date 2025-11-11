# ✅ RABBIT Monorepo Setup Complete

## 📍 Location

**Monorepo is at: `/Users/tdeshane/rabbit/`**

This is the ONLY location for the project going forward.

---

## 🎯 What Was Done

### 1. **Fixed Current Service (world-service)**
- ✅ Recovered from `~/rabbit-world-service/` (wrong location)
- ✅ Committed to git and pushed to GitHub
- ✅ Added as submodule to monorepo
- ✅ Old directory cleaned up

### 2. **Created Comprehensive Agent Instructions**

Three levels of instructions for AI agents:

1. **`~/START-HERE-AGENTS.md`** (Home directory)
   - Redirects agents from home directory to monorepo
   - Very visible if agent starts in wrong place

2. **`AGENT-READ-THIS-FIRST.md`** (Monorepo root)
   - Complete step-by-step workflow
   - Recovery process for mistakes
   - Explicit dos and don'ts
   - **This is the main instruction document**

3. **`MESSAGE-TO-OTHER-AGENTS.md`** (Monorepo root)
   - Explains what happened
   - Summarizes current state
   - Coordination between multiple agents

### 3. **Updated All Documentation**

- `README.md` - Added prominent warning for AI agents at the top
- `GETTING-STARTED.md` - Comprehensive setup guide
- `verify-setup.sh` - Updated to expect 8 submodules
- All docs reference the correct location

### 4. **Cleaned Up**

- ✅ Removed all `~/rabbit-*` directories from home
- ✅ Only the monorepo remains: `~/rabbit/`
- ✅ All services safely stored as GitHub repos
- ✅ All services properly linked as submodules

---

## 📦 Current State

### Monorepo Structure

```
/Users/tdeshane/rabbit/           ← MONOREPO ROOT
│
├── 📄 AGENT-READ-THIS-FIRST.md   ← AI agents read this first
├── 📄 MESSAGE-TO-OTHER-AGENTS.md ← Coordination message
├── 📄 GETTING-STARTED.md         ← Setup guide
├── 📄 README.md                  ← Project overview (with agent warning)
├── 🔧 verify-setup.sh            ← Health check script
│
├── services/                     ← 7 MICROSERVICES (git submodules)
│   ├── entity-service/           → toddllm/rabbit-entity-service (Rust)
│   ├── combat-service/           → toddllm/rabbit-combat-service (Rust)
│   ├── player-service/           → toddllm/rabbit-player-service (Go)
│   ├── api-gateway/              → toddllm/rabbit-api-gateway (Go)
│   ├── boss-service/             → toddllm/rabbit-boss-service (Elixir)
│   ├── evolution-service-impl/   → toddllm/rabbit-evolution-service (Elixir)
│   └── world-service/            → toddllm/rabbit-world-service (Go) ← NEW
│
├── infrastructure/               ← INFRASTRUCTURE (git submodules)
│   └── event-bus/                → toddllm/rabbit-event-bus (NATS)
│
├── docs/                         ← DOCUMENTATION
│   ├── FIRST-PRINCIPLES-APPROACH.md  ← Tech philosophy ⭐
│   ├── 00-ARCHITECTURE-OVERVIEW.md
│   ├── 02-MICROSERVICES-ARCHITECTURE.md
│   └── RABBIT-GAME-DESIGN.md
│
├── data-models/                  ← Shared schemas
├── api-contracts/                ← API definitions
└── shared/                       ← Shared utilities
```

### GitHub Repositories (9 total)

1. `toddllm/rabbit` - Monorepo
2. `toddllm/rabbit-entity-service` - ECS service (Rust)
3. `toddllm/rabbit-combat-service` - Combat calculations (Rust)
4. `toddllm/rabbit-player-service` - Authentication (Go)
5. `toddllm/rabbit-api-gateway` - HTTP/WebSocket gateway (Go)
6. `toddllm/rabbit-boss-service` - Boss AI (Elixir/OTP)
7. `toddllm/rabbit-evolution-service` - Progression (Elixir/OTP)
8. `toddllm/rabbit-world-service` - Zones/Instances (Go) ← NEW
9. `toddllm/rabbit-event-bus` - NATS infrastructure

### Verification

```bash
cd ~/rabbit
./verify-setup.sh
```

**Result:** ✅ All 8 submodules present and verified

---

## 🤖 For AI Agents

### Before Starting ANY Work:

```bash
cd ~/rabbit
cat AGENT-READ-THIS-FIRST.md
```

### Quick Rules:

```
✅ WORK IN:     /Users/tdeshane/rabbit/
✅ CREATE IN:   ~/rabbit/services/<service-name>/

❌ NOT IN:      ~/rabbit-<service-name>/
❌ NOT IN:      ~/ai-crew/rabbit-game/
❌ NOT IN:      /Users/tdeshane/ (home)
```

### Workflow Summary:

1. Create service in `~/rabbit/services/<name>/`
2. Initialize git and commit
3. Push to GitHub with `gh repo create`
4. Convert to submodule
5. Commit submodule reference to monorepo
6. Push monorepo

**Full details in: `AGENT-READ-THIS-FIRST.md`**

---

## 🎯 Key Principles

### First Principles Approach

This project does NOT have a fixed tech stack. Technologies are chosen based on:
- Specific requirements
- Performance characteristics
- Operational needs
- Team expertise

**Read:** `docs/FIRST-PRINCIPLES-APPROACH.md` for full philosophy

### Current Services (Examples)

- **Rust**: entity-service, combat-service (performance-critical, deterministic)
- **Go**: player-service, api-gateway, world-service (HTTP, concurrency, simple deployment)
- **Elixir/OTP**: boss-service, evolution-service (actor model, fault tolerance, state machines)
- **NATS**: event-bus (ultra-fast messaging)

These choices can change if requirements change.

---

## 📊 Project Status

✅ **Monorepo:** Properly located at `~/rabbit/`
✅ **Services:** 8 submodules configured and working
✅ **GitHub:** All repos created and synced
✅ **Documentation:** Comprehensive guides for agents and humans
✅ **Verification:** Script passes all checks
✅ **Cleanup:** Old directories removed
✅ **Instructions:** Three levels of agent guidance

---

## 🚀 Next Steps

### For AI Agents:

1. Read `AGENT-READ-THIS-FIRST.md`
2. Understand the workflow
3. Verify with `./verify-setup.sh`
4. Follow the documented process exactly

### For Developers:

1. Read `GETTING-STARTED.md`
2. Read `docs/FIRST-PRINCIPLES-APPROACH.md`
3. Clone with: `git clone --recurse-submodules git@github.com:toddllm/rabbit.git`
4. Start building!

### For New Services:

Follow the workflow in `AGENT-READ-THIS-FIRST.md` - it's step-by-step and impossible to misunderstand.

---

## ✨ Summary

The RABBIT monorepo is now properly structured, documented, and ready for collaborative development by both humans and AI agents. All services are in the correct location, properly submoduled, and comprehensively documented.

**The warren is ready. Happy coding! 🐰**
