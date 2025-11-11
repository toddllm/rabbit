#!/bin/bash
# RABBIT Monorepo Setup Verification Script

echo "🐰 RABBIT Monorepo Setup Verification"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d ".git" ]; then
    echo "❌ ERROR: Run this script from the monorepo root (~/rabbit)"
    exit 1
fi

echo "✅ In correct directory: $(pwd)"
echo ""

# Check git remote
echo "📡 Git Remote:"
git remote -v | grep origin | head -1
echo ""

# Check submodules
echo "📦 Git Submodules (should be 7):"
SUBMODULE_COUNT=$(git submodule | wc -l | tr -d ' ')
echo "   Found: $SUBMODULE_COUNT submodules"

if [ "$SUBMODULE_COUNT" -eq 7 ]; then
    echo "   ✅ Correct number of submodules"
else
    echo "   ❌ ERROR: Expected 7 submodules, found $SUBMODULE_COUNT"
fi
echo ""

# List submodules
echo "📋 Submodule Status:"
git submodule status | while read line; do
    echo "   $line"
done
echo ""

# Check for required documentation
echo "📚 Required Documentation:"
docs=("README.md" "GETTING-STARTED.md" "docs/FIRST-PRINCIPLES-APPROACH.md" "docs/00-ARCHITECTURE-OVERVIEW.md")
for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "   ✅ $doc"
    else
        echo "   ❌ Missing: $doc"
    fi
done
echo ""

# Check service directories
echo "🔧 Service Directories:"
services=("services/entity-service" "services/combat-service" "services/player-service"
          "services/api-gateway" "services/boss-service" "services/evolution-service-impl"
          "infrastructure/event-bus")

for service in "${services[@]}"; do
    if [ -d "$service" ] && [ -f "$service/.git" ]; then
        echo "   ✅ $service (submodule)"
    elif [ -d "$service" ]; then
        echo "   ⚠️  $service (exists but not a submodule)"
    else
        echo "   ❌ Missing: $service"
    fi
done
echo ""

# Check if submodules are initialized
echo "🔍 Checking if submodules are populated:"
EMPTY_COUNT=0
for service in "${services[@]}"; do
    if [ -d "$service" ]; then
        FILE_COUNT=$(find "$service" -maxdepth 1 -type f | wc -l | tr -d ' ')
        if [ "$FILE_COUNT" -lt 2 ]; then
            echo "   ⚠️  $service appears empty (run: git submodule update --init)"
            EMPTY_COUNT=$((EMPTY_COUNT + 1))
        fi
    fi
done

if [ "$EMPTY_COUNT" -eq 0 ]; then
    echo "   ✅ All submodules are populated"
else
    echo "   ⚠️  $EMPTY_COUNT submodule(s) need initialization"
    echo ""
    echo "   Run: git submodule update --init --recursive"
fi
echo ""

# Summary
echo "======================================"
echo "🎯 Summary:"
echo "======================================"
if [ "$SUBMODULE_COUNT" -eq 7 ] && [ "$EMPTY_COUNT" -eq 0 ]; then
    echo "✅ Setup is COMPLETE and ready to use!"
    echo ""
    echo "Next steps:"
    echo "  1. Read: docs/FIRST-PRINCIPLES-APPROACH.md"
    echo "  2. Read: GETTING-STARTED.md"
    echo "  3. Choose a service to work on"
else
    echo "⚠️  Setup needs attention. See issues above."
    if [ "$EMPTY_COUNT" -gt 0 ]; then
        echo ""
        echo "Run this to initialize submodules:"
        echo "  git submodule update --init --recursive"
    fi
fi
echo ""
