# ⚠️ CRITICAL INSTRUCTIONS FOR AI AGENTS ⚠️

## 🚨 READ THIS BEFORE DOING ANYTHING 🚨

**You are working in the RABBIT monorepo located at: `/Users/tdeshane/rabbit/`**

---

## ❌ DO NOT WORK IN THESE LOCATIONS:

- ❌ `~/rabbit-*` (home directory) - **WRONG**
- ❌ `~/ai-crew/rabbit-game/` - **OLD LOCATION, DO NOT USE**
- ❌ `/Users/tdeshane/rabbit-*` - **WRONG**
- ❌ Any directory outside of `/Users/tdeshane/rabbit/`

## ✅ CORRECT WORKING DIRECTORY:

```
/Users/tdeshane/rabbit/
```

**THIS IS THE MONOREPO ROOT. ALL WORK HAPPENS HERE OR IN SUBDIRECTORIES.**

---

## 📋 WORKFLOW FOR CREATING NEW SERVICES

### Step 1: Create Service Directory

**ALWAYS create new services in the monorepo:**

```bash
# CORRECT - Create service in monorepo services directory
mkdir -p ~/rabbit/services/<service-name>
cd ~/rabbit/services/<service-name>
# ... create service files ...
```

**DO NOT create services in home directory like `~/rabbit-<service-name>`**

### Step 2: Initialize Git for the Service

Once the service is complete:

```bash
cd ~/rabbit/services/<service-name>

# Initialize git
git init
git config user.name "ToddLLM"
git config user.email "todd.deshane@gmail.com"

# Commit
git add .
git commit -m "Initial commit: <service-name>"
```

### Step 3: Create GitHub Repo and Push

```bash
# Create repo and push
gh repo create toddllm/rabbit-<service-name> \
  --public \
  --description "RABBIT <Service Name> - <Description>" \
  --source=. \
  --remote=origin \
  --push
```

### Step 4: Convert to Submodule

```bash
# Go to monorepo root
cd ~/rabbit

# Remove the local directory (we have it in GitHub now)
rm -rf services/<service-name>

# Add as submodule
git submodule add git@github.com:toddllm/rabbit-<service-name>.git services/<service-name>

# Commit the submodule
git add .gitmodules services/<service-name>
git commit -m "Add <service-name> as git submodule"
git push origin main
```

---

## 🗂️ MONOREPO STRUCTURE

```
/Users/tdeshane/rabbit/           ← YOU ARE HERE - MONOREPO ROOT
│
├── services/                     ← ALL SERVICES GO HERE (as submodules)
│   ├── entity-service/           ← Git submodule
│   ├── combat-service/           ← Git submodule
│   ├── player-service/           ← Git submodule
│   ├── api-gateway/              ← Git submodule
│   ├── boss-service/             ← Git submodule
│   ├── evolution-service-impl/   ← Git submodule
│   └── <your-new-service>/       ← CREATE NEW SERVICES HERE
│
├── infrastructure/               ← INFRASTRUCTURE GOES HERE (as submodules)
│   └── event-bus/                ← Git submodule
│
├── docs/                         ← Documentation
│   ├── FIRST-PRINCIPLES-APPROACH.md  ← READ THIS
│   └── ...
│
├── data-models/                  ← Shared data schemas
├── api-contracts/                ← API definitions
└── shared/                       ← Shared utilities
```

---

## 🎯 CURRENT TASK CHECKLIST

When creating a new service, follow this checklist:

- [ ] **Step 1**: Create service in `~/rabbit/services/<service-name>/`
- [ ] **Step 2**: Write all service code (main.go, internal/, tests, README, Dockerfile)
- [ ] **Step 3**: Initialize git in the service directory
- [ ] **Step 4**: Commit all files
- [ ] **Step 5**: Create GitHub repo with `gh repo create`
- [ ] **Step 6**: Push to GitHub
- [ ] **Step 7**: Go to `~/rabbit/` (monorepo root)
- [ ] **Step 8**: Remove local service directory `rm -rf services/<service-name>`
- [ ] **Step 9**: Add as submodule `git submodule add git@github.com:toddllm/rabbit-<service-name>.git services/<service-name>`
- [ ] **Step 10**: Commit submodule to monorepo
- [ ] **Step 11**: Push monorepo to GitHub

---

## 🚨 IF YOU ALREADY CREATED A SERVICE IN THE WRONG PLACE

If you created a service in `~/rabbit-<service-name>/` (home directory):

### DON'T PANIC - Follow This Recovery Process:

```bash
# 1. Go to the wrongly-placed service
cd ~/rabbit-<service-name>

# 2. Initialize git if not done
git init
git config user.name "ToddLLM"
git config user.email "todd.deshane@gmail.com"

# 3. Commit everything
git add .
git commit -m "Initial commit: <service-name>"

# 4. Create GitHub repo and push
gh repo create toddllm/rabbit-<service-name> \
  --public \
  --description "RABBIT <Service Name> - <Description>" \
  --source=. \
  --remote=origin \
  --push

# 5. Go to monorepo
cd ~/rabbit

# 6. Add as submodule
git submodule add git@github.com:toddllm/rabbit-<service-name>.git services/<service-name>

# 7. Commit to monorepo
git add .gitmodules services/<service-name>
git commit -m "Add <service-name> as git submodule"
git push origin main

# 8. Clean up the wrong location
cd ~
rm -rf rabbit-<service-name>
```

---

## 📖 REQUIRED READING

Before doing ANY work:

1. **[FIRST-PRINCIPLES-APPROACH.md](docs/FIRST-PRINCIPLES-APPROACH.md)** ← Understand technology choices
2. **[GETTING-STARTED.md](GETTING-STARTED.md)** ← Understand the workflow
3. **[README.md](README.md)** ← Understand the project

---

## ✅ VERIFICATION

After completing work, run:

```bash
cd ~/rabbit
./verify-setup.sh
```

This will verify:
- All submodules are present
- All services are in the correct location
- Documentation is complete

---

## 🤖 AGENT-SPECIFIC INSTRUCTIONS

### For Claude Code Agents:

1. **ALWAYS** start at `/Users/tdeshane/rabbit/`
2. **NEVER** create services in home directory (`~`) directly
3. **ALWAYS** create services in `~/rabbit/services/`
4. **FOLLOW** the workflow above exactly
5. **VERIFY** your work with `./verify-setup.sh`

### Communication Protocol:

If you need clarification:
- **ASK** before creating services in unexpected locations
- **CONFIRM** the working directory before starting
- **VERIFY** the structure matches what's documented here

---

## 🆘 HELP

If confused, check these files:
- This file: `AGENT-READ-THIS-FIRST.md` (you are here)
- Setup guide: `GETTING-STARTED.md`
- Verification: Run `./verify-setup.sh`

---

## 📌 SUMMARY (TL;DR)

```
WORK HERE:  /Users/tdeshane/rabbit/
NOT HERE:   /Users/tdeshane/rabbit-*
NOT HERE:   /Users/tdeshane/ai-crew/rabbit-game/

CREATE SERVICES IN:  ~/rabbit/services/<service-name>/
NOT IN:              ~/rabbit-<service-name>/
```

**When in doubt, run: `pwd` - It should show `/Users/tdeshane/rabbit` or a subdirectory.**

---

## 🔥 THIS IS THE MOST IMPORTANT FILE FOR AI AGENTS 🔥

**READ IT. UNDERSTAND IT. FOLLOW IT.**
