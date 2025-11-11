# 🤖 Message to Other Claude Code Agents

## ✅ Situation Has Been Fixed

The monorepo structure is now properly set up at:

```
/Users/tdeshane/rabbit/
```

## 🎯 What You Need to Know

### 1. **Your Previous Work Was Salvaged**

If you created `rabbit-world-service` in the home directory (`~/rabbit-world-service/`):
- ✅ It has been committed to git
- ✅ It has been pushed to GitHub: https://github.com/toddllm/rabbit-world-service
- ✅ It has been added as a submodule to the monorepo at `~/rabbit/services/world-service/`
- ✅ The home directory copy has been cleaned up

**Your work is safe and properly integrated!**

### 2. **Current State**

The monorepo now has **8 microservices** as git submodules:

```
~/rabbit/
├── services/
│   ├── entity-service/          ← Rust (ECS)
│   ├── combat-service/          ← Rust (calculations)
│   ├── player-service/          ← Go (auth)
│   ├── api-gateway/             ← Go (HTTP/WebSocket)
│   ├── boss-service/            ← Elixir (AI)
│   ├── evolution-service-impl/  ← Elixir (progression)
│   └── world-service/           ← Go (zones/instances) ← YOUR SERVICE
│
└── infrastructure/
    └── event-bus/               ← NATS
```

All services are properly configured as git submodules.

### 3. **Going Forward - READ THIS**

**For ANY future work, read these files IN ORDER:**

1. **[AGENT-READ-THIS-FIRST.md](AGENT-READ-THIS-FIRST.md)** ← MOST IMPORTANT
   - Explains where to work
   - Provides step-by-step workflow
   - Includes recovery process if you work in wrong location

2. **[GETTING-STARTED.md](GETTING-STARTED.md)**
   - General workflow for developers
   - Git submodules explanation
   - How to work with services

3. **[docs/FIRST-PRINCIPLES-APPROACH.md](docs/FIRST-PRINCIPLES-APPROACH.md)**
   - Technology selection philosophy
   - Why different services use different languages

### 4. **Key Rules (Summary)**

```
✅ DO:
- Work in /Users/tdeshane/rabbit/
- Create services in ~/rabbit/services/<service-name>/
- Read AGENT-READ-THIS-FIRST.md before starting new work
- Run ./verify-setup.sh to check your work

❌ DON'T:
- Create services in home directory (~/)
- Create ~/rabbit-<service-name>/ directories
- Work in ~/ai-crew/rabbit-game/ (old location)
- Skip reading the documentation
```

### 5. **If You Need to Create Another Service**

Follow the workflow in `AGENT-READ-THIS-FIRST.md` **EXACTLY**:

```bash
# Step 1: Create in monorepo
cd ~/rabbit
mkdir -p services/<new-service-name>
cd services/<new-service-name>
# ... create service files ...

# Step 2: Initialize git
git init
git config user.name "ToddLLM"
git config user.email "todd.deshane@gmail.com"
git add .
git commit -m "Initial commit: <service-name>"

# Step 3: Create GitHub repo
gh repo create toddllm/rabbit-<new-service-name> \
  --public \
  --description "RABBIT <Service> - <Description>" \
  --source=. \
  --remote=origin \
  --push

# Step 4: Convert to submodule
cd ~/rabbit
rm -rf services/<new-service-name>
git submodule add git@github.com:toddllm/rabbit-<new-service-name>.git services/<new-service-name>
git add .gitmodules services/<new-service-name>
git commit -m "Add <service-name> as git submodule"
git push origin main
```

### 6. **Verify Your Work**

After any changes:

```bash
cd ~/rabbit
./verify-setup.sh
```

Should show: **"✅ Setup is COMPLETE and ready to use!"**

### 7. **Questions?**

If you're unsure about anything:
1. **Stop** and read `AGENT-READ-THIS-FIRST.md`
2. Check the verification script output
3. Look at the existing structure as an example
4. When in doubt, ask the user before proceeding

---

## 📊 Current Status

✅ Monorepo location: `/Users/tdeshane/rabbit/`
✅ 8 services as git submodules
✅ All services pushed to GitHub
✅ Documentation complete
✅ Verification script passes

## 🎉 You're Ready!

The structure is solid. Future work should follow the documented workflows.

**Start by reading: [AGENT-READ-THIS-FIRST.md](AGENT-READ-THIS-FIRST.md)**

---

_This message was created to help coordinate multiple AI agents working on this project._
