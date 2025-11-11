# RABBIT: Complete Game Design Document

## Executive Summary

**RABBIT** is a massive multiplayer online game combining action RPG, parkour/obby platforming, dungeon crawling, survival building, trading simulation, puzzles, raids, and PvP warfare. Players embody highly mobile rabbits with advanced abilities, progressing through deep evolution trees while battling gods, titans, AI entities, demons, shadows, and cosmic anomalies across multiple interconnected series.

**Core Unique Selling Points:**
- **Ear-based manipulation**: Fully functional ears for grabbing, throwing, blocking, carrying
- **Extreme mobility**: Triple jumps, burrow dashes, wall runs, and parkour movement
- **Deep evolution trees**: 13+ unique paths with 70+ evolution forms
- **Massive pantheon**: 50+ unique bosses, each with evolution states
- **Multi-series structure**: Infinite expansion capability
- **No pay-to-win**: Cosmetics only, fair competitive play
- **Persistent online world**: Shared universe with thousands of players

---

## Core Gameplay Loop

### Moment-to-Moment (Second-by-Second)
1. **Movement**: Player navigates using advanced rabbit mobility
2. **Ear interaction**: Grab objects, throw items, block attacks, carry friends
3. **Combat**: Cast abilities, dodge telegraphs, position for damage
4. **Environmental puzzles**: Use movement + ears to solve challenges

### Session Loop (30-60 Minutes)
1. **Select content**: Dungeon, raid, PvP match, or open world exploration
2. **Complete objectives**: Defeat bosses, clear obbies, win PvP matches
3. **Earn rewards**: XP, currency, loot drops, reputation
4. **Upgrade character**: Equip new gear, level up, unlock abilities
5. **Socialize**: Trade with players, join clan activities, chat

### Long-Term Loop (Weeks/Months)
1. **Choose evolution path**: Commit to specialization (Fire, Metal, Shadow, etc.)
2. **Progress through tiers**: Unlock higher evolution forms
3. **Complete series**: Beat all bosses in Warren Origins → Titans Awaken → etc.
4. **Seasonal events**: Participate in time-limited content
5. **Endgame content**: Face Golden Mirda, End of Reality, OMEGA Trials
6. **Prestige/Legacy**: Earn legendary titles, cosmetics, and permanent account upgrades

---

## Player Experience Pillars

### 1. Movement Mastery
**Vision**: Make players feel like parkour masters
**Mechanics**:
- Triple jump + air control
- Burrow dash (underground invuln dash)
- Wall run + wall jump
- Ear hook (grapple to objects)
- Long jump + glide
- Momentum-based physics (speed builds with skillful play)

**Design Goals**:
- High skill ceiling: Pros can move twice as fast as newbies
- Obby courses reward precision
- Movement abilities unlock with evolution
- Feel smooth and responsive (60+ FPS target)

### 2. Ear Mechanics
**Vision**: Ears are extra limbs with full functionality
**Mechanics**:
- **Grab**: Pick up items, small enemies, loot
- **Throw**: Hurl objects, toss enemies off cliffs
- **Block**: Use ears as shields (directional, timed block)
- **Carry**: Hold friends who are down, escort NPCs
- **Hook**: Grapple to ledges, swing across gaps

**Design Goals**:
- Core to identity: You can't play without using ears
- Creative problem solving: Multiple solutions using ears
- Cooperative play: Carry injured teammates to safety
- PvP depth: Ear-blocking becomes advanced tech

### 3. Evolution Progression
**Vision**: Every player's rabbit is unique
**Mechanics**:
- Start as Burrowling → Warren Runner → Super Rabbit → Super Bunny
- At Super Bunny, choose specialization:
  - **Elemental**: Fire, Water (Patunluea)
  - **Precious Metals**: Emerald, Silver, Gold, Diamond, Platinum
  - **Cosmic**: Star Bunny (Mindy's path)
  - **Titanborne**: Become part-titan, break titans
  - **Demon Slayer**: Hunt demons, resist corruption
  - **Lexicon**: Master ancient knowledge, solve puzzles
  - **Shadow**: Join Shadow Court, stealth assassin
  - **Voidstride**: Tame the void, high-risk/high-reward

**Design Goals**:
- Meaningful choice: Each path plays differently
- Visible progression: Your appearance changes dramatically
- Build diversity: Same path, different ability loadouts
- Respecting commitment: Can't easily swap paths (but not locked forever)

### 4. Boss Encounters
**Vision**: Epic, memorable, challenging multi-phase battles
**Boss Design Template**:
- **Phase 1 (100-75% HP)**: Introduce core mechanics
- **Phase 2 (75-50% HP)**: Increase complexity, add mechanics
- **Phase 3 (50-25% HP)**: Enrage, faster pace, arena changes
- **Phase 4 (25-0% HP)**: Ultimate test, survive or die

**Boss Evolution System**:
- **Base**: Standard difficulty
- **Enraged**: +50% stats, faster abilities
- **Ascended**: +100% stats, new mechanics, better loot
- **Void**: +200% stats, void-corrupted, chaotic
- **Supreme**: +300% stats, ultimate challenge (rare variants)

**Example - Shadow Queen Sella**:
- Phase 1: Basic sword slashes, teleport attacks
- Phase 2: Summons shadow clones (must find real one)
- Phase 3: Arena goes dark, players rely on sound cues
- Phase 4: Clones + darkness + enrage (all mechanics at once)

**Legendary Bosses**:
- **Golden Mirda**: Final ultimate challenge, "unkillable" in lore
- **God of Titans Supreme**: Master of all titans
- **End of Reality**: Existence-ending threat
- **Mirda's Devouring Convergence**: Mirda absorbs other bosses' powers mid-fight

### 5. Social & Economy
**Vision**: Thriving player-driven economy and community
**Systems**:
- **Trading**: Player-to-player, secure marketplace
- **Clans/Warrens**: Shared bases, clan wars, group raids
- **Cosmetics**: Earn or trade (never pay-to-win)
- **Emotes & Social Spaces**: Hubs for hanging out
- **Guilds**: Faction-aligned groups (Titanforge Guild, Shadow Court Clan, etc.)

**Economy**:
- **Carrots**: Base currency (everything earned in-game)
- **Special Currencies**: Star Shards, Titan Essence, Shadow Tokens, Void Fragments
- **Premium Gems**: Cosmetics ONLY (never power)
- **Trading**: Free market, player-set prices
- **No account selling**: Accounts tied to player, trading banned

---

## World Structure: Multi-Series Design

### Series 1: Warren Origins
**Themes**: Humble beginnings, discovering powers
**Zones**:
- Starting Warren (Hub)
- Grassland Fields (Open World)
- Crystal Caves (Dungeon)
- Warren Guardian's Lair (Raid)

**Bosses**:
- Warren Guardian (Tier 1)
- Crystal Golem (Tier 1)
- Elder Burrow Protector (Tier 2)

**Progression**: Level 1-15, unlock Super Bunny

---

### Series 2: Titans Awaken
**Themes**: Ancient titans rise, massive scale battles
**Zones**:
- Titanforge Citadel (Hub)
- Titan's Plateau (Open World)
- Rumble's Quarry (Obby + Combat)
- Zen's Temple (Raid)

**Bosses**:
- Rumble the Rumble God (Enraged)
- Zen the Titan Creator (Ascended)
- Devkorth (Titan Lieutenant)
- God of Titans Supreme (Supreme)

**Progression**: Level 15-30, Titanborne evolution unlocks

---

### Series 3: Mirda's Eclipse
**Themes**: Cosmic goddess tests mortals, reality bends
**Zones**:
- Starlight Haven (Hub)
- Cosmic Observatory (Social Space)
- Mirda's Trials (Obby Gauntlet)
- Eclipse Realm (Raid)

**Bosses**:
- Mindy Starchild (Friend-mie Challenge)
- Mirda (Base, Enraged, Ascended)
- Mirda's Convergence (Special Event)

**Progression**: Level 30-50, Cosmic evolutions unlock

---

### Series 4: Dimensional Fracture
**Themes**: Reality glitches, AI vs Shadow vs Demon conflict
**Zones**:
- Code Spire (AI Ascendancy Hub)
- Shadow Court Castle (Shadow Hub)
- Hell's Gate (Demon Territory)
- Fractured Reality (PvP Arena)

**Bosses**:
- AI Torque (Quantum Form)
- Shadow King + Shadow Queen Sella (Duo Boss)
- Demonis (Voidflame Evolution)
- Dr. Nikic & Dr. Vicor (Tag Team)

**Progression**: Level 50-70, Void/Shadow/Demon-Slayer evolutions

---

### Series 5: Golden OMEGA Trials
**Themes**: Ultimate challenges, facing the supreme goddess
**Zones**:
- OMEGA Sanctum (Endgame Hub)
- Trial of Fire, Water, Titans, Shadows, AI, Demons (Challenge Gauntlets)
- Golden Mirda's Domain (Ultimate Raid)

**Bosses**:
- All bosses reappear in Supreme forms
- Golden Mirda (OMEGA Trial)
- Mirda's Devouring Convergence (All-bosses fusion)

**Progression**: Level 70-100, OMEGA-tier evolutions

---

### Series 6: The End Arcs
**Themes**: Existential threats, endings and new beginnings
**Zones**:
- The End's Approach (Collapsing World)
- End of Universe (Space-time fracture)
- End of Reality (Non-existence realm)

**Bosses**:
- THE END (Harbinger of Finality)
- END OF THE UNIVERSE (Cosmic Entropy)
- END OF REALITY (Existence-ending entity)

**Progression**: Level 100+, Endgame mastery

---

### Series 7+: Infinite Future
**Expansion Potential**:
- New elemental paths (Lightning, Ice, Nature, etc.)
- New factions (Beastborn, Lexicon, Trade Syndicate expansions)
- Crossover events (all series collide)
- Player-created content (custom obbies, arenas)
- Seasonal series (limited-time alternate timelines)

---

## Faction System

### Factions Overview
Players gain/lose reputation with factions based on actions.

| Faction | Leader(s) | Alignment | Rewards |
|---------|-----------|-----------|---------|
| **Titanforge** | Zen, God of Titans Supreme | Neutral-Good | Titanborne evolutions, titan-themed cosmetics |
| **Shadow Court** | Shadow King, Shadow Queen Sella | Neutral-Evil | Shadow evolutions, stealth abilities |
| **Demon Covenant** | Demonis, Vemonominous | Evil | Demon-Slayer evolutions (for opposing), cursed weapons |
| **Cosmic Wardens** | Mindy Starchild, Zara Goldheart | Good | Cosmic evolutions, star-themed gear |
| **Lexicon Archives** | Lexicon, Great Lexicon, Mega Lexicon | Neutral | Lexicon evolutions, puzzle shortcuts, lore |
| **AI Ascendancy** | AI Torque, Dr Nikic, Dr Vicor | Neutral-Evil | Code abilities, UI customization, tech cosmetics |
| **Trade Syndicate** | El Qwera, Peke, Polo | Neutral | Trading perks, rare items, marketplace access |
| **Beastborn** | Polio, Homosaurzilla | Neutral | Beast companions, mount cosmetics |

### Friend-mies (Friendly Rivals)
- **Zara Goldheart**: Tests your honor in duels, grants Gold path blessings
- **Peke & Polo**: Pranksters who host trap-filled races, reward trickery
- **Mervin & Heris**: Rival heroes, compete for glory
- **Mindy Starchild**: Cosmic trials, trains Star Bunnies

### Reputation Levels
1. **Hated** (-1000 to -500): Attacked on sight
2. **Hostile** (-500 to -100): Enemies, limited access
3. **Neutral** (-100 to +100): Standard access
4. **Friendly** (+100 to +500): Discounts, special quests
5. **Honored** (+500 to +1000): Unique rewards unlocked
6. **Exalted** (+1000+): Faction evolution forms, legendary rewards

---

## PvP Systems

### Modes
1. **Duel Warren** (1v1): Ranked duels, ELO-based
2. **Burrow Clash** (3v3): Small team arena
3. **Relic Rush** (5v5): Capture-the-flag with obby parkour
4. **Voidstorm** (10v10): Large-scale battle royale
5. **Clan Warren Wars** (20v20): Guild vs Guild territory wars

### Ranking System
- **Burrow Bronze** → **Carrot Silver** → **Warren Gold** → **Titan Platinum** → **Void Diamond** → **Shadow Crown** → **OMEGA Crest**
- Seasonal resets every 3 months
- Rewards: Titles, cosmetics, exclusive PvP abilities (balanced for PvE too)

### Balance Philosophy
- **Server-authoritative**: All combat server-side (no cheating)
- **Skill-based**: Movement and timing > raw stats
- **Evolution parity**: All paths viable in PvP (no "OP" builds)
- **Ranked scaling**: Stats normalized in ranked modes

---

## Seasonal Content

### Season Structure (3 months each)
**Example Seasons**:
- **Season of Titans**: Boosted titan spawns, Zen event
- **Season of Shadows**: Shadow Court takeover, Sella challenges
- **Season of Code**: AI Torque glitches reality, code puzzles
- **Season of Venom**: Vaspra & Vemonominous plague events
- **Season of Stars**: Mindy Starchild cosmic showers
- **Season of Ends**: THE END approaches, collapsing zones
- **Season of Rebirth**: Mirda stabilizes reality, new beginnings

### Seasonal Rewards
- **Battle Warren** (Battle Pass equivalent):
  - Free track: Earn basic rewards
  - Premium track: Cosmetic-only rewards (no power)
- **Seasonal titles**: "Titanforged", "Shadow Eclipse", "Codebound"
- **Limited-time cosmetics**: Never return, collector's items
- **Seasonal abilities**: Earn during season, keep forever

---

## Monetization (No Pay-to-Win)

### What You CAN Buy
- **Cosmetics**: Skins, ear accessories, trails, auras, emotes
- **Battle Warren Premium**: Bonus cosmetic rewards (no power)
- **Account Services**: Name change, appearance reset
- **Convenience**: Extra bank slots, fast travel unlocks

### What You CANNOT Buy
- **Power**: No stats, no evolutions, no abilities
- **Progression**: No XP boosts, no level skips
- **Loot**: No boss drops, no exclusive items
- **Competitive Advantage**: PvP is 100% skill-based

### Premium Gems (Optional Currency)
- Earn small amounts in-game (daily login, achievements)
- Purchase with real money (for cosmetics only)
- Tradeable between players (player-driven cosmetic economy)

---

## Technical Features

### Performance Targets
- **60 FPS** minimum on medium settings
- **120 FPS** on high-end systems
- **Sub-50ms** input latency
- **100+ players** in shared hubs
- **10-20 players** in raid instances

### Accessibility
- **Colorblind modes**: Multiple presets
- **Customizable UI**: Move/scale/hide elements
- **Keybind customization**: Remap everything
- **Audio cues**: Visual indicators for deaf/HoH players
- **Difficulty options**: Story mode for casual players, Extreme for hardcore

### Cross-Progression
- One account, all platforms (if multi-platform)
- Cosmetics, progression, everything carries over

---

## Content Roadmap (Post-Launch)

### Year 1
- **Quarter 1**: Warren Origins + Titans Awaken
- **Quarter 2**: Mirda's Eclipse series
- **Quarter 3**: Dimensional Fracture series
- **Quarter 4**: Golden OMEGA Trials

### Year 2
- **Quarter 1**: The End Arcs (Part 1)
- **Quarter 2**: New evolution paths (Ice, Lightning, Nature)
- **Quarter 3**: The End Arcs (Part 2)
- **Quarter 4**: Crossover mega-event (all series collide)

### Year 3+
- Player-created content tools
- Housing system expansions
- New world series (underwater, space, dimensions)
- Infinite expansion based on player demand

---

## Why RABBIT Will Succeed

### 1. Deep, Rewarding Progression
- 70+ evolution forms = hundreds of hours of content
- Always something new to unlock
- Player agency in choosing path

### 2. Skill-Based, Fair Gameplay
- Movement mastery = skill ceiling
- No pay-to-win = competitive integrity
- Server-side validation = no cheating

### 3. Massive Content Volume
- 50+ unique bosses at launch
- Multiple evolution states per boss = 200+ boss variations
- 6+ full series = 50+ hours of story content
- PvP, obbies, puzzles, trading = infinite replayability

### 4. Community-Driven
- Clan systems foster social bonds
- Player economy creates engagement
- Friend-mies and neutrals = dynamic relationships
- Events bring community together

### 5. Infinite Expansion Potential
- Multi-series structure allows endless growth
- New evolution paths = new playstyles
- Seasonal content keeps game fresh
- "Much, much more" is baked into the design

---

## Conclusion

**RABBIT** is not just a game—it's a universe. A living, breathing world where players evolve from humble Burrowlings into cosmic legends. Where ears are weapons, movement is art, and every boss battle is an epic story.

From the first triple-jump across a gap to the final stand against Golden Mirda, every moment is designed to be memorable. With deep progression, fair monetization, skill-based gameplay, and infinite expansion potential, RABBIT is built to last for years.

**The warren awaits. Will you answer the call?**

---

**Next Steps: Implementation Roadmap → See `/docs/IMPLEMENTATION-ROADMAP.md`**
