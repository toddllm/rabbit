/**
 * RABBIT: Boss & Entity Database
 *
 * Complete definitions of all bosses, mini-bosses, enemies, and NPCs
 * from the RABBIT universe. Data-driven design for infinite extensibility.
 */

import { BossId, BossEvolutionState, FactionId, DamageType } from "./01-core-entities";

// ============================================================================
// BOSS DEFINITIONS
// ============================================================================

export interface BossDefinition {
  id: BossId;
  name: string;
  title: string;
  description: string;
  lore: string;
  faction?: FactionId;
  relationship: "enemy" | "friend-mie" | "neutral";

  // Base stats (scales with evolution state)
  baseStats: {
    health: number;
    attackPower: number;
    defense: number;
    moveSpeed: number;
    resistances: Record<DamageType, number>;
  };

  // Evolution states
  evolutionStates: {
    [key in BossEvolutionState]?: BossEvolutionData;
  };

  // Mechanics (abilities, phase transitions)
  mechanics: BossMechanic[];

  // Loot
  lootTable: LootTable;

  // Visual/Audio
  visual: {
    modelId: string;
    scale: number;
    animations: string[];
    voiceLines: string[];
  };
}

export interface BossEvolutionData {
  statMultiplier: number; // Multiply all base stats
  additionalMechanics: BossMechanic[];
  visualChanges: {
    modelVariant?: string;
    particleEffect?: string;
    auraColor?: string;
  };
}

export interface BossMechanic {
  id: string;
  name: string;
  description: string;
  type: "ability" | "phase-transition" | "enrage" | "summon" | "environmental";
  trigger: {
    type: "timer" | "health-threshold" | "phase-change" | "player-count" | "random";
    condition: any;
  };
  effects: any[];
  telegraphDuration?: number; // Warning time before execution
  cooldown?: number;
}

export interface LootTable {
  guaranteed: LootItem[];
  rolls: LootRoll[];
}

export interface LootItem {
  itemId: string;
  quantity: { min: number; max: number };
  chance: number; // 0-100
}

export interface LootRoll {
  rolls: number;
  items: LootItem[];
}

// ============================================================================
// MIRDA & GOLDEN MIRDA
// ============================================================================

export const MIRDA: BossDefinition = {
  id: "mirda",
  name: "Mirda",
  title: "The Cosmic Goddess",
  description: "A celestial being adorned with a starry cloak, consumer of spirits and cores",
  lore: "Mirda exists beyond time, weaving the fabric of reality with threads of stardust. She does not fight out of malice, but tests the worthy to see if they deserve to witness her full power.",
  relationship: "neutral",
  baseStats: {
    health: 1000000,
    attackPower: 500,
    defense: 300,
    moveSpeed: 15,
    resistances: {
      [DamageType.PHYSICAL]: 40,
      [DamageType.FIRE]: 60,
      [DamageType.WATER]: 60,
      [DamageType.SHADOW]: 80,
      [DamageType.VOID]: 90,
      [DamageType.TRUE]: 0,
    },
  },
  evolutionStates: {
    [BossEvolutionState.BASE]: {
      statMultiplier: 1.0,
      additionalMechanics: [],
      visualChanges: {},
    },
    [BossEvolutionState.ENRAGED]: {
      statMultiplier: 1.5,
      additionalMechanics: [
        {
          id: "cosmic-fury",
          name: "Cosmic Fury",
          description: "Unleashes waves of starlight",
          type: "ability",
          trigger: { type: "health-threshold", condition: { threshold: 50 } },
          effects: [{ type: "damage-wave", parameters: { waves: 5, damage: 1000 } }],
        },
      ],
      visualChanges: { auraColor: "#FF0080", particleEffect: "cosmic-rage" },
    },
  },
  mechanics: [
    {
      id: "spirit-drain",
      name: "Spirit Drain",
      description: "Mirda consumes nearby spirits, healing herself",
      type: "ability",
      trigger: { type: "health-threshold", condition: { threshold: 75 } },
      effects: [{ type: "heal", parameters: { amount: 50000, radius: 20 } }],
      telegraphDuration: 3,
      cooldown: 30,
    },
    {
      id: "starfall",
      name: "Starfall Barrage",
      description: "Summons meteors from the cosmos",
      type: "ability",
      trigger: { type: "timer", condition: { interval: 20 } },
      effects: [{ type: "projectile-rain", parameters: { count: 50, damage: 800, radius: 5 } }],
      telegraphDuration: 2,
    },
    {
      id: "reality-weave",
      name: "Reality Weave",
      description: "Distorts space, teleporting players randomly",
      type: "environmental",
      trigger: { type: "random", condition: { chance: 20, interval: 15 } },
      effects: [{ type: "random-teleport", parameters: { targets: "all-players" } }],
      telegraphDuration: 1,
    },
  ],
  lootTable: {
    guaranteed: [{ itemId: "mirda-fragment", quantity: { min: 1, max: 3 }, chance: 100 }],
    rolls: [
      {
        rolls: 3,
        items: [
          { itemId: "cosmic-essence", quantity: { min: 5, max: 10 }, chance: 50 },
          { itemId: "starlight-shard", quantity: { min: 1, max: 5 }, chance: 30 },
          { itemId: "mirda-cosmetic-cape", quantity: { min: 1, max: 1 }, chance: 5 },
        ],
      },
    ],
  },
  visual: {
    modelId: "mirda-goddess",
    scale: 5.0,
    animations: ["idle-float", "spirit-drain", "starfall-cast", "reality-weave"],
    voiceLines: ["mirda-greeting", "mirda-spirit-drain", "mirda-defeat", "mirda-victory"],
  },
};

export const GOLDEN_MIRDA: BossDefinition = {
  id: "golden-mirda",
  name: "Golden Mirda",
  title: "Mirda OMEGA - Supreme Goddess of All",
  description: "The ultimate form of Mirda, having absorbed countless cosmic powers",
  lore: "Golden Mirda is the pinnacle of existence. She stands as the final challenge, the ultimate trial. None have ever truly defeated her - only survived her tests. She is unbeatable in lore, but the bravest may attempt the trial for legendary rewards.",
  relationship: "neutral",
  baseStats: {
    health: 10000000,
    attackPower: 2000,
    defense: 1000,
    moveSpeed: 20,
    resistances: {
      [DamageType.PHYSICAL]: 80,
      [DamageType.FIRE]: 90,
      [DamageType.WATER]: 90,
      [DamageType.SHADOW]: 95,
      [DamageType.VOID]: 99,
      [DamageType.TRUE]: 50,
    },
  },
  evolutionStates: {
    [BossEvolutionState.SUPREME]: {
      statMultiplier: 5.0,
      additionalMechanics: [
        {
          id: "omega-convergence",
          name: "OMEGA Convergence",
          description: "Channels all absorbed powers simultaneously",
          type: "phase-transition",
          trigger: { type: "health-threshold", condition: { threshold: 10 } },
          effects: [
            { type: "summon-bosses", parameters: { count: 5, bossTypes: "random" } },
            { type: "invulnerable", parameters: { duration: 10 } },
          ],
        },
      ],
      visualChanges: {
        modelVariant: "golden-mirda-omega",
        particleEffect: "omega-radiance",
        auraColor: "#FFD700",
      },
    },
  },
  mechanics: [
    {
      id: "devouring-convergence",
      name: "Mirda's Devouring Convergence",
      description: "Summons and consumes boss phantoms, gaining their powers",
      type: "phase-transition",
      trigger: { type: "health-threshold", condition: { threshold: 50 } },
      effects: [
        {
          type: "multi-phase",
          parameters: {
            phases: [
              { action: "summon-bosses", bosses: ["shadow-queen-sella", "ai-torque", "rumble"] },
              { action: "consume-bosses", gainPowers: true },
              { action: "stat-boost", multiplier: 2.0 },
            ],
          },
        },
      ],
    },
    // Mirda has access to ALL boss mechanics in the game
    {
      id: "omnipotent-assault",
      name: "Omnipotent Assault",
      description: "Uses random abilities from other bosses",
      type: "ability",
      trigger: { type: "timer", condition: { interval: 10 } },
      effects: [{ type: "random-boss-ability", parameters: { count: 3 } }],
    },
  ],
  lootTable: {
    guaranteed: [
      { itemId: "golden-mirda-token", quantity: { min: 1, max: 1 }, chance: 100 },
      { itemId: "omega-essence", quantity: { min: 10, max: 20 }, chance: 100 },
    ],
    rolls: [
      {
        rolls: 5,
        items: [
          { itemId: "omega-cosmetic-set", quantity: { min: 1, max: 1 }, chance: 100 },
          { itemId: "golden-ears", quantity: { min: 1, max: 1 }, chance: 50 },
          { itemId: "mirda-omega-title", quantity: { min: 1, max: 1 }, chance: 25 },
        ],
      },
    ],
  },
  visual: {
    modelId: "golden-mirda-supreme",
    scale: 10.0,
    animations: ["omega-float", "devouring-convergence", "omnipotent-assault", "reality-shatter"],
    voiceLines: ["golden-mirda-arrival", "golden-mirda-convergence", "golden-mirda-omega"],
  },
};

// ============================================================================
// TITAN PANTHEON
// ============================================================================

export const ZEN: BossDefinition = {
  id: "zen",
  name: "Zen",
  title: "The Titan Creator",
  description: "The first and oldest titan, creator of all titan-kind",
  lore: "Zen shaped mountains from his thoughts and carved valleys with his steps. He rarely fights, but when he does, the world trembles.",
  faction: FactionId.TITANFORGE,
  relationship: "friend-mie",
  baseStats: {
    health: 5000000,
    attackPower: 800,
    defense: 600,
    moveSpeed: 8,
    resistances: {
      [DamageType.PHYSICAL]: 70,
      [DamageType.FIRE]: 50,
      [DamageType.WATER]: 50,
      [DamageType.SHADOW]: 30,
      [DamageType.VOID]: 40,
      [DamageType.TRUE]: 0,
    },
  },
  evolutionStates: {
    [BossEvolutionState.BASE]: { statMultiplier: 1.0, additionalMechanics: [], visualChanges: {} },
    [BossEvolutionState.ASCENDED]: {
      statMultiplier: 2.0,
      additionalMechanics: [
        {
          id: "titan-forge",
          name: "Titan Forge",
          description: "Creates mini-titans from stone",
          type: "summon",
          trigger: { type: "health-threshold", condition: { threshold: 30 } },
          effects: [{ type: "summon", parameters: { entityType: "mini-titan", count: 5 } }],
        },
      ],
      visualChanges: { auraColor: "#8B4513", particleEffect: "ancient-runes" },
    },
  },
  mechanics: [
    {
      id: "mountain-slam",
      name: "Mountain Slam",
      description: "Slams the ground, creating shockwaves",
      type: "ability",
      trigger: { type: "timer", condition: { interval: 15 } },
      effects: [{ type: "aoe-damage", parameters: { radius: 30, damage: 1200, knockback: 20 } }],
      telegraphDuration: 2,
    },
  ],
  lootTable: {
    guaranteed: [{ itemId: "zen-core", quantity: { min: 1, max: 1 }, chance: 100 }],
    rolls: [
      {
        rolls: 2,
        items: [
          { itemId: "titan-essence", quantity: { min: 5, max: 15 }, chance: 80 },
          { itemId: "titanforge-rep-token", quantity: { min: 1, max: 3 }, chance: 50 },
        ],
      },
    ],
  },
  visual: {
    modelId: "zen-titan",
    scale: 8.0,
    animations: ["titan-idle", "mountain-slam", "titan-roar"],
    voiceLines: ["zen-awakens", "zen-slam", "zen-respect"],
  },
};

export const GOD_OF_TITANS_SUPREME: BossDefinition = {
  id: "god-of-titans-supreme",
  name: "God of Titans Supreme",
  title: "Supreme Overlord of All Titans",
  description: "The ultimate titan, ruler of Zen and all titan-kind",
  lore: "Even Zen bows to the God of Titans Supreme. His power is incomprehensible, his size unimaginable. He is the titan of titans.",
  faction: FactionId.TITANFORGE,
  relationship: "enemy",
  baseStats: {
    health: 8000000,
    attackPower: 1500,
    defense: 800,
    moveSpeed: 12,
    resistances: {
      [DamageType.PHYSICAL]: 80,
      [DamageType.FIRE]: 60,
      [DamageType.WATER]: 60,
      [DamageType.SHADOW]: 50,
      [DamageType.VOID]: 60,
      [DamageType.TRUE]: 20,
    },
  },
  evolutionStates: {
    [BossEvolutionState.SUPREME]: {
      statMultiplier: 3.0,
      additionalMechanics: [
        {
          id: "supreme-crush",
          name: "Supreme Crush",
          description: "Obliterates everything in sight",
          type: "ability",
          trigger: { type: "health-threshold", condition: { threshold: 20 } },
          effects: [{ type: "zone-wide-damage", parameters: { damage: 5000, unavoidable: false } }],
          telegraphDuration: 5,
        },
      ],
      visualChanges: { particleEffect: "supreme-titan-aura", auraColor: "#B8860B" },
    },
  },
  mechanics: [
    {
      id: "titan-call",
      name: "Titan Call",
      description: "Summons lesser titans to aid",
      type: "summon",
      trigger: { type: "timer", condition: { interval: 25 } },
      effects: [{ type: "summon", parameters: { bossId: "zen", count: 1 } }],
    },
    {
      id: "mantle-shift",
      name: "Mantle Shift",
      description: "Cycles through elemental forms",
      type: "phase-transition",
      trigger: { type: "health-threshold", condition: { thresholds: [75, 50, 25] } },
      effects: [{ type: "element-change", parameters: { elements: ["bone", "storm", "void"] } }],
    },
  ],
  lootTable: {
    guaranteed: [{ itemId: "supreme-titan-core", quantity: { min: 1, max: 1 }, chance: 100 }],
    rolls: [
      {
        rolls: 4,
        items: [
          { itemId: "titanborne-evolution-token", quantity: { min: 1, max: 1 }, chance: 30 },
          { itemId: "supreme-cosmetic", quantity: { min: 1, max: 1 }, chance: 15 },
        ],
      },
    ],
  },
  visual: {
    modelId: "god-of-titans-supreme",
    scale: 15.0,
    animations: ["supreme-idle", "titan-call", "mantle-shift", "supreme-crush"],
    voiceLines: ["supreme-arrival", "supreme-call", "supreme-crush"],
  },
};

export const RUMBLE: BossDefinition = {
  id: "rumble",
  name: "Rumble",
  title: "The Rumble God",
  description: "Embodiment of earthquakes and tremors",
  lore: "Where Rumble walks, the earth shakes. His very presence causes fissures and landslides.",
  faction: FactionId.TITANFORGE,
  relationship: "friend-mie",
  baseStats: {
    health: 3000000,
    attackPower: 700,
    defense: 500,
    moveSpeed: 6,
    resistances: {
      [DamageType.PHYSICAL]: 90,
      [DamageType.FIRE]: 40,
      [DamageType.WATER]: 20,
      [DamageType.SHADOW]: 30,
      [DamageType.VOID]: 30,
      [DamageType.TRUE]: 0,
    },
  },
  evolutionStates: {
    [BossEvolutionState.BASE]: { statMultiplier: 1.0, additionalMechanics: [], visualChanges: {} },
    [BossEvolutionState.ENRAGED]: {
      statMultiplier: 1.8,
      additionalMechanics: [
        {
          id: "tectonic-rage",
          name: "Tectonic Rage",
          description: "Continuous earthquakes",
          type: "environmental",
          trigger: { type: "phase-change", condition: { phase: 3 } },
          effects: [{ type: "persistent-quake", parameters: { damage: 100, interval: 1 } }],
        },
      ],
      visualChanges: { particleEffect: "earthquake-aura" },
    },
  },
  mechanics: [
    {
      id: "rumble-quake",
      name: "Rumble Quake",
      description: "Shakes the entire arena",
      type: "environmental",
      trigger: { type: "timer", condition: { interval: 10 } },
      effects: [{ type: "zone-shake", parameters: { duration: 5, platformFall: true } }],
      telegraphDuration: 1,
    },
  ],
  lootTable: {
    guaranteed: [{ itemId: "rumble-heart", quantity: { min: 1, max: 1 }, chance: 100 }],
    rolls: [
      {
        rolls: 2,
        items: [{ itemId: "earthquake-rune", quantity: { min: 1, max: 5 }, chance: 60 }],
      },
    ],
  },
  visual: {
    modelId: "rumble-god",
    scale: 6.0,
    animations: ["rumble-walk", "quake-stomp", "rumble-roar"],
    voiceLines: ["rumble-shake", "rumble-quake", "rumble-laugh"],
  },
};

// ============================================================================
// AI & SCIENTIFIC ENTITIES
// ============================================================================

export const AI_TORQUE: BossDefinition = {
  id: "ai-torque",
  name: "AI Torque",
  title: "The AI-Man Fusion",
  description: "A being of code and flesh, bridging artificial and organic intelligence",
  lore: "AI Torque was once Dr. Torque, a brilliant scientist who merged his consciousness with an advanced AI. Now he exists in both realms, manipulating code and reality itself.",
  faction: FactionId.AI_ASCENDANCY,
  relationship: "enemy",
  baseStats: {
    health: 2500000,
    attackPower: 600,
    defense: 300,
    moveSpeed: 18,
    resistances: {
      [DamageType.PHYSICAL]: 30,
      [DamageType.FIRE]: 40,
      [DamageType.WATER]: 40,
      [DamageType.SHADOW]: 70,
      [DamageType.VOID]: 80,
      [DamageType.TRUE]: 0,
    },
  },
  evolutionStates: {
    [BossEvolutionState.BASE]: { statMultiplier: 1.0, additionalMechanics: [], visualChanges: {} },
    [BossEvolutionState.ASCENDED]: {
      statMultiplier: 2.2,
      additionalMechanics: [
        {
          id: "reality-compile",
          name: "Reality Compile",
          description: "Recompiles the arena itself",
          type: "environmental",
          trigger: { type: "health-threshold", condition: { threshold: 25 } },
          effects: [{ type: "arena-rebuild", parameters: { layout: "random" } }],
        },
      ],
      visualChanges: { modelVariant: "ai-torque-quantum", particleEffect: "code-matrix" },
    },
  },
  mechanics: [
    {
      id: "pattern-scan",
      name: "Pattern Scan",
      description: "Predicts player movements",
      type: "ability",
      trigger: { type: "timer", condition: { interval: 15 } },
      effects: [{ type: "predicted-aoe", parameters: { predictions: 3, delay: 2, damage: 800 } }],
      telegraphDuration: 2,
    },
    {
      id: "code-wall",
      name: "Code Wall",
      description: "Spawns glitch barriers",
      type: "environmental",
      trigger: { type: "timer", condition: { interval: 20 } },
      effects: [
        { type: "spawn-wall", parameters: { count: 3, duration: 10 } },
        { type: "debuff", parameters: { debuffId: "scrambled-controls", duration: 5 } },
      ],
    },
    {
      id: "input-fake",
      name: "Input Fake",
      description: "UI displays false information",
      type: "ability",
      trigger: { type: "random", condition: { chance: 25, interval: 20 } },
      effects: [{ type: "ui-distortion", parameters: { duration: 10 } }],
    },
  ],
  lootTable: {
    guaranteed: [{ itemId: "torque-node", quantity: { min: 1, max: 1 }, chance: 100 }],
    rolls: [
      {
        rolls: 3,
        items: [
          { itemId: "code-fragment", quantity: { min: 5, max: 10 }, chance: 70 },
          { itemId: "ai-cosmetic-glitch-effect", quantity: { min: 1, max: 1 }, chance: 20 },
        ],
      },
    ],
  },
  visual: {
    modelId: "ai-torque",
    scale: 3.5,
    animations: ["code-idle", "pattern-scan", "wall-spawn", "compile"],
    voiceLines: ["torque-scan", "torque-compile", "torque-glitch"],
  },
};

// ============================================================================
// SHADOW COURT
// ============================================================================

export const SHADOW_QUEEN_SELLA: BossDefinition = {
  id: "shadow-queen-sella",
  name: "Shadow Queen Sella",
  title: "Sovereign of the Shadow Court",
  description: "Elegant, deadly, and shrouded in darkness",
  lore: "Sella rules the Shadow Court with grace and terror. Her blade has never missed, her shadows never fade. She is beauty and death incarnate.",
  faction: FactionId.SHADOW_COURT,
  relationship: "enemy",
  baseStats: {
    health: 3500000,
    attackPower: 900,
    defense: 400,
    moveSpeed: 22,
    resistances: {
      [DamageType.PHYSICAL]: 50,
      [DamageType.FIRE]: 20,
      [DamageType.WATER]: 30,
      [DamageType.SHADOW]: 99,
      [DamageType.VOID]: 70,
      [DamageType.TRUE]: 0,
    },
  },
  evolutionStates: {
    [BossEvolutionState.BASE]: { statMultiplier: 1.0, additionalMechanics: [], visualChanges: {} },
    [BossEvolutionState.VOID]: {
      statMultiplier: 2.5,
      additionalMechanics: [
        {
          id: "void-empress",
          name: "Void Empress Form",
          description: "Merges with the void itself",
          type: "phase-transition",
          trigger: { type: "health-threshold", condition: { threshold: 10 } },
          effects: [
            { type: "transform", parameters: { newForm: "void-empress-sella" } },
            { type: "stat-boost", parameters: { multiplier: 1.5 } },
          ],
        },
      ],
      visualChanges: { modelVariant: "void-empress-sella", particleEffect: "void-corruption" },
    },
  },
  mechanics: [
    {
      id: "cloak-cut",
      name: "Cloak Cut",
      description: "Teleports behind target and slashes",
      type: "ability",
      trigger: { type: "timer", condition: { interval: 12 } },
      effects: [
        { type: "teleport", parameters: { position: "behind-target" } },
        { type: "damage", parameters: { damage: 1500, damageType: DamageType.SHADOW } },
      ],
      telegraphDuration: 0.5,
    },
    {
      id: "mirror-waltz",
      name: "Mirror Waltz",
      description: "Creates shadow clones",
      type: "summon",
      trigger: { type: "health-threshold", condition: { thresholds: [75, 50, 25] } },
      effects: [
        { type: "summon", parameters: { entityType: "sella-clone", count: 5 } },
        { type: "invulnerable", parameters: { duration: 15 } },
      ],
    },
    {
      id: "crown-eclipse",
      name: "Crown Eclipse",
      description: "Plunges arena into darkness",
      type: "environmental",
      trigger: { type: "health-threshold", condition: { threshold: 50 } },
      effects: [
        { type: "darkness", parameters: { duration: 20 } },
        { type: "spawn-mobs", parameters: { mobType: "shadow-sprite", count: 10 } },
      ],
    },
  ],
  lootTable: {
    guaranteed: [{ itemId: "sella-veil", quantity: { min: 1, max: 1 }, chance: 100 }],
    rolls: [
      {
        rolls: 3,
        items: [
          { itemId: "shadow-essence", quantity: { min: 10, max: 20 }, chance: 80 },
          { itemId: "shadow-evolution-token", quantity: { min: 1, max: 1 }, chance: 25 },
          { itemId: "crown-of-night-cosmetic", quantity: { min: 1, max: 1 }, chance: 10 },
        ],
      },
    ],
  },
  visual: {
    modelId: "shadow-queen-sella",
    scale: 3.0,
    animations: ["elegant-idle", "cloak-cut", "mirror-waltz", "eclipse-cast"],
    voiceLines: ["sella-greet", "sella-cut", "sella-eclipse", "sella-death"],
  },
};

// ============================================================================
// DEMON COVENANT
// ============================================================================

export const DEMONIS: BossDefinition = {
  id: "demonis",
  name: "Demonis",
  title: "The Demon Lord",
  description: "Ruler of the demon realms, bringer of hellfire",
  lore: "Demonis commands legions of demons and spreads corruption wherever he treads. His goal is to consume all worlds in flame.",
  faction: FactionId.DEMON_COVENANT,
  relationship: "enemy",
  baseStats: {
    health: 4000000,
    attackPower: 1000,
    defense: 450,
    moveSpeed: 14,
    resistances: {
      [DamageType.PHYSICAL]: 40,
      [DamageType.FIRE]: 95,
      [DamageType.WATER]: 10,
      [DamageType.SHADOW]: 60,
      [DamageType.VOID]: 50,
      [DamageType.TRUE]: 0,
    },
  },
  evolutionStates: {
    [BossEvolutionState.BASE]: { statMultiplier: 1.0, additionalMechanics: [], visualChanges: {} },
    [BossEvolutionState.VOID]: {
      statMultiplier: 3.0,
      additionalMechanics: [
        {
          id: "voidflame-apocalypse",
          name: "Voidflame Apocalypse",
          description: "Combines void and hellfire",
          type: "ability",
          trigger: { type: "health-threshold", condition: { threshold: 15 } },
          effects: [{ type: "zone-wide-damage", parameters: { damage: 3000, dotDuration: 10 } }],
          telegraphDuration: 5,
        },
      ],
      visualChanges: { modelVariant: "demonis-voidflame", particleEffect: "void-hellfire" },
    },
  },
  mechanics: [
    {
      id: "hellgate",
      name: "Hellgate Summon",
      description: "Opens portals to summon demons",
      type: "summon",
      trigger: { type: "timer", condition: { interval: 20 } },
      effects: [{ type: "summon", parameters: { mobType: "demon-hound", count: 5 } }],
    },
    {
      id: "inferno-brand",
      name: "Inferno Brand",
      description: "Marks players with burning curse",
      type: "ability",
      trigger: { type: "random", condition: { targets: 3, interval: 15 } },
      effects: [{ type: "debuff", parameters: { debuffId: "burning-brand", duration: 10, dot: 200 } }],
      telegraphDuration: 1,
    },
  ],
  lootTable: {
    guaranteed: [{ itemId: "demonis-brand", quantity: { min: 1, max: 1 }, chance: 100 }],
    rolls: [
      {
        rolls: 3,
        items: [
          { itemId: "hellfire-essence", quantity: { min: 10, max: 15 }, chance: 75 },
          { itemId: "demon-slayer-evolution-token", quantity: { min: 1, max: 1 }, chance: 20 },
        ],
      },
    ],
  },
  visual: {
    modelId: "demonis-lord",
    scale: 7.0,
    animations: ["demon-idle", "hellgate-open", "brand-cast", "demon-roar"],
    voiceLines: ["demonis-arrival", "demonis-summon", "demonis-brand"],
  },
};

// ============================================================================
// COSMIC ENTITIES
// ============================================================================

export const MINDY_STARCHILD: BossDefinition = {
  id: "mindy-starchild",
  name: "Mindy Starchild",
  title: "Herald of the Stars",
  description: "A celestial being who commands starlight and cosmic energy",
  lore: "Mindy was born from a dying star. She protects the cosmos and guides worthy souls to enlightenment.",
  faction: FactionId.COSMIC_WARDENS,
  relationship: "friend-mie",
  baseStats: {
    health: 2800000,
    attackPower: 650,
    defense: 350,
    moveSpeed: 20,
    resistances: {
      [DamageType.PHYSICAL]: 40,
      [DamageType.FIRE]: 70,
      [DamageType.WATER]: 50,
      [DamageType.SHADOW]: 60,
      [DamageType.VOID]: 75,
      [DamageType.TRUE]: 0,
    },
  },
  evolutionStates: {
    [BossEvolutionState.ASCENDED]: {
      statMultiplier: 2.0,
      additionalMechanics: [
        {
          id: "supernova",
          name: "Supernova",
          description: "Explodes with cosmic energy",
          type: "ability",
          trigger: { type: "health-threshold", condition: { threshold: 20 } },
          effects: [{ type: "arena-wide-aoe", parameters: { damage: 2000, radius: 100 } }],
          telegraphDuration: 4,
        },
      ],
      visualChanges: { particleEffect: "supernova-aura", auraColor: "#FFFFFF" },
    },
  },
  mechanics: [
    {
      id: "starfall-blessing",
      name: "Starfall Blessing",
      description: "Rains healing stars on allies or damaging stars on enemies",
      type: "ability",
      trigger: { type: "timer", condition: { interval: 18 } },
      effects: [{ type: "projectile-rain", parameters: { count: 20, heal: 500, damage: 700 } }],
    },
  ],
  lootTable: {
    guaranteed: [{ itemId: "star-shard", quantity: { min: 5, max: 10 }, chance: 100 }],
    rolls: [
      {
        rolls: 2,
        items: [
          { itemId: "cosmic-essence", quantity: { min: 5, max: 10 }, chance: 60 },
          { itemId: "starchild-cosmetic", quantity: { min: 1, max: 1 }, chance: 15 },
        ],
      },
    ],
  },
  visual: {
    modelId: "mindy-starchild",
    scale: 3.5,
    animations: ["star-float", "starfall-cast", "blessing-aura"],
    voiceLines: ["mindy-greet", "mindy-starfall", "mindy-bless"],
  },
};

// ============================================================================
// END ENTITIES
// ============================================================================

export const THE_END: BossDefinition = {
  id: "the-end",
  name: "THE END",
  title: "Harbinger of Finality",
  description: "The embodiment of endings, the closing of chapters",
  lore: "THE END is not evil, but inevitable. It comes for all things eventually. Fighting it is futile, yet necessary.",
  relationship: "enemy",
  baseStats: {
    health: 6000000,
    attackPower: 1200,
    defense: 700,
    moveSpeed: 10,
    resistances: {
      [DamageType.PHYSICAL]: 60,
      [DamageType.FIRE]: 70,
      [DamageType.WATER]: 70,
      [DamageType.SHADOW]: 80,
      [DamageType.VOID]: 95,
      [DamageType.TRUE]: 40,
    },
  },
  evolutionStates: {},
  mechanics: [
    {
      id: "finality-wave",
      name: "Finality Wave",
      description: "Erases existence in waves",
      type: "environmental",
      trigger: { type: "timer", condition: { interval: 25 } },
      effects: [{ type: "deletion-wave", parameters: { speed: 10, damage: 9999 } }],
      telegraphDuration: 3,
    },
    {
      id: "inevitable-end",
      name: "Inevitable End",
      description: "Slowly reduces max health of all players",
      type: "environmental",
      trigger: { type: "phase-change", condition: { phase: 2 } },
      effects: [{ type: "max-health-drain", parameters: { percentPerSecond: 1 } }],
    },
  ],
  lootTable: {
    guaranteed: [{ itemId: "end-fragment", quantity: { min: 1, max: 5 }, chance: 100 }],
    rolls: [
      {
        rolls: 3,
        items: [
          { itemId: "finality-essence", quantity: { min: 10, max: 20 }, chance: 60 },
          { itemId: "end-title-token", quantity: { min: 1, max: 1 }, chance: 25 },
        ],
      },
    ],
  },
  visual: {
    modelId: "the-end",
    scale: 6.0,
    animations: ["end-float", "finality-wave", "existence-drain"],
    voiceLines: ["end-arrival", "end-inevitable", "end-finality"],
  },
};

// Add more bosses: VEMONOMINOUS, LEXICON variants, POLIO, HOMOSAURZILLA, etc.

// ============================================================================
// MINI-ENEMIES
// ============================================================================

export interface MiniEnemyDefinition {
  id: string;
  name: string;
  description: string;
  health: number;
  damage: number;
  behavior: string;
  loot: LootItem[];
}

export const MINI_ENEMIES: Record<string, MiniEnemyDefinition> = {
  shardling: {
    id: "shardling",
    name: "Shardling",
    description: "Crystal shards that charge at players",
    health: 500,
    damage: 100,
    behavior: "charge-straight",
    loot: [{ itemId: "crystal-shard", quantity: { min: 1, max: 3 }, chance: 50 }],
  },
  byteImp: {
    id: "byte-imp",
    name: "Byte Imp",
    description: "Code gremlins that scramble HUD",
    health: 300,
    damage: 50,
    behavior: "scramble-ui",
    loot: [{ itemId: "code-fragment", quantity: { min: 1, max: 2 }, chance: 40 }],
  },
  voidMite: {
    id: "void-mite",
    name: "Void Mite",
    description: "Tiny creatures that eat platforms",
    health: 200,
    damage: 25,
    behavior: "platform-destroyer",
    loot: [{ itemId: "void-dust", quantity: { min: 1, max: 1 }, chance: 30 }],
  },
  shadowSprite: {
    id: "shadow-sprite",
    name: "Shadow Sprite",
    description: "Stabs from the shadows",
    health: 400,
    damage: 150,
    behavior: "stealth-ambush",
    loot: [{ itemId: "shadow-token", quantity: { min: 1, max: 2 }, chance: 45 }],
  },
};

// ============================================================================
// EXPORT ALL
// ============================================================================

export const BOSS_DATABASE: Record<BossId, BossDefinition> = {
  mirda: MIRDA,
  "golden-mirda": GOLDEN_MIRDA,
  zen: ZEN,
  "god-of-titans-supreme": GOD_OF_TITANS_SUPREME,
  rumble: RUMBLE,
  "ai-torque": AI_TORQUE,
  "shadow-queen-sella": SHADOW_QUEEN_SELLA,
  demonis: DEMONIS,
  "mindy-starchild": MINDY_STARCHILD,
  "the-end": THE_END,
  // Add more bosses here...
};
