/**
 * RABBIT: Core Entity Data Models
 *
 * These TypeScript interfaces define the fundamental data structures
 * for all game entities. They are engine-agnostic and can be serialized
 * to JSON for transmission or storage.
 */

// ============================================================================
// BASE TYPES
// ============================================================================

export type EntityId = string; // UUID v4
export type PlayerId = string; // UUID v4
export type Timestamp = number; // Unix timestamp in milliseconds

export type Vector3 = [number, number, number]; // [x, y, z]
export type Quaternion = [number, number, number, number]; // [x, y, z, w]

// ============================================================================
// ENTITY FOUNDATION
// ============================================================================

/**
 * Every object in the game (player, boss, projectile, item, etc.)
 * is an Entity composed of Components
 */
export interface Entity {
  id: EntityId;
  type: EntityType;
  components: ComponentMap;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, any>; // Extensible for future use
}

export enum EntityType {
  PLAYER = "player",
  BOSS = "boss",
  MINI_BOSS = "mini-boss",
  MINI_ENEMY = "mini-enemy",
  NPC = "npc",
  PROJECTILE = "projectile",
  ITEM = "item",
  STRUCTURE = "structure",
  EFFECT = "effect",
  TRIGGER = "trigger",
}

/**
 * ComponentMap: Key-value store of components
 * Key is component type, value is the component data
 */
export type ComponentMap = {
  [componentType: string]: Component;
};

/**
 * Component: Pure data, no logic
 * Systems operate on components to produce behavior
 */
export interface Component {
  type: string;
  data: Record<string, any>;
}

// ============================================================================
// CORE COMPONENTS
// ============================================================================

/**
 * TransformComponent: Position, rotation, and movement in 3D space
 */
export interface TransformComponent extends Component {
  type: "transform";
  data: {
    position: Vector3;
    rotation: Quaternion;
    velocity: Vector3;
    scale: Vector3;
  };
}

/**
 * StatsComponent: Health, energy, and core attributes
 */
export interface StatsComponent extends Component {
  type: "stats";
  data: {
    health: number;
    maxHealth: number;
    energy: number;
    maxEnergy: number;
    moveSpeed: number;
    jumpPower: number;
    defense: number;
    attackPower: number;
    // Modifiers from buffs/debuffs
    modifiers: StatModifier[];
  };
}

export interface StatModifier {
  id: string;
  stat: string; // "moveSpeed", "attackPower", etc.
  type: "add" | "multiply" | "override";
  value: number;
  source: string; // What applied this modifier
  expiresAt?: Timestamp;
}

/**
 * EvolutionComponent: Player progression and form
 */
export interface EvolutionComponent extends Component {
  type: "evolution";
  data: {
    currentForm: EvolutionForm;
    tier: number; // 1-10+
    experience: number;
    experienceToNext: number;
    unlockedForms: EvolutionForm[];
    evolutionPath: EvolutionPath;
  };
}

export enum EvolutionPath {
  BASE = "base",
  ELEMENTAL_FIRE = "elemental-fire",
  ELEMENTAL_WATER = "elemental-water",
  METAL_EMERALD = "metal-emerald",
  METAL_SILVER = "metal-silver",
  METAL_GOLD = "metal-gold",
  METAL_DIAMOND = "metal-diamond",
  METAL_PLATINUM = "metal-platinum",
  COSMIC_STAR = "cosmic-star",
  TITANBORNE = "titanborne",
  DEMON_SLAYER = "demon-slayer",
  LEXICON = "lexicon",
  SHADOW = "shadow",
  VOIDSTRIDE = "voidstride",
}

export type EvolutionForm =
  | "burrowling"
  | "warren-runner"
  | "super-rabbit"
  | "super-bunny"
  // Elemental Fire
  | "ember-bunny"
  | "flame-warren-knight"
  | "inferno-warren-lord"
  // Elemental Water
  | "tide-hopper"
  | "abyss-diver"
  | "patunluea-chosen"
  // Metal paths
  | "emerald-bunny"
  | "emerald-warden"
  | "silver-bunny"
  | "silver-sentinel"
  | "gold-bunny"
  | "goldheart-champion"
  | "diamond-bunny"
  | "diamond-aegis"
  | "platinum-bunny"
  | "platinum-vanguard"
  // Cosmic
  | "star-bunny"
  | "mindy-starchild-herald"
  // Titan
  | "titanborne-rabbit"
  | "titan-breaker"
  // Demon Slayer
  | "demon-slayer-warren-knight"
  | "demonis-bane"
  // Lexicon
  | "lexicon-adept"
  | "great-lexicon-scholar"
  | "mega-lexicon-keeper"
  // Shadow
  | "shadow-warrenling"
  | "shadow-court-blade"
  // Void
  | "voidstride-bunny"
  | "void-tamer";

/**
 * AbilitiesComponent: Equipped abilities and cooldowns
 */
export interface AbilitiesComponent extends Component {
  type: "abilities";
  data: {
    equipped: AbilityId[];
    maxEquipped: number; // Usually 4-6 slots
    cooldowns: Record<AbilityId, number>; // Time remaining in seconds
    charges: Record<AbilityId, number>; // For multi-charge abilities
  };
}

export type AbilityId = string;

/**
 * FactionComponent: Reputation with various factions
 */
export interface FactionComponent extends Component {
  type: "faction";
  data: {
    memberships: Record<FactionId, number>; // Faction ID → reputation points
    primaryFaction?: FactionId;
  };
}

export enum FactionId {
  TITANFORGE = "titanforge",
  SHADOW_COURT = "shadow-court",
  DEMON_COVENANT = "demon-covenant",
  COSMIC_WARDENS = "cosmic-wardens",
  LEXICON_ARCHIVES = "lexicon-archives",
  AI_ASCENDANCY = "ai-ascendancy",
  TRADE_SYNDICATE = "trade-syndicate",
  BEASTBORN = "beastborn",
}

/**
 * InventoryComponent: Items, equipment, and resources
 */
export interface InventoryComponent extends Component {
  type: "inventory";
  data: {
    items: InventoryItem[];
    maxSlots: number;
    currencies: Record<CurrencyType, number>;
  };
}

export interface InventoryItem {
  id: string;
  itemId: string; // References item definition
  quantity: number;
  equipped: boolean;
  slot?: EquipmentSlot;
  metadata?: Record<string, any>; // For unique properties
}

export enum EquipmentSlot {
  EAR_ACCESSORY_LEFT = "ear-accessory-left",
  EAR_ACCESSORY_RIGHT = "ear-accessory-right",
  BODY = "body",
  FEET = "feet",
  ACCESSORY_1 = "accessory-1",
  ACCESSORY_2 = "accessory-2",
}

export enum CurrencyType {
  CARROTS = "carrots", // Base currency
  STAR_SHARDS = "star-shards",
  TITAN_ESSENCE = "titan-essence",
  SHADOW_TOKENS = "shadow-tokens",
  VOID_FRAGMENTS = "void-fragments",
  MIRDA_FRAGMENTS = "mirda-fragments",
  PREMIUM_GEMS = "premium-gems", // Premium currency (cosmetic purchases)
}

/**
 * BuffsComponent: Active buffs and debuffs
 */
export interface BuffsComponent extends Component {
  type: "buffs";
  data: {
    active: Buff[];
  };
}

export interface Buff {
  id: string;
  name: string;
  type: "buff" | "debuff";
  effects: BuffEffect[];
  duration: number; // seconds, -1 for permanent
  appliedAt: Timestamp;
  expiresAt: Timestamp;
  stacks: number;
  maxStacks: number;
  source: EntityId; // Who/what applied this buff
}

export interface BuffEffect {
  type: "stat-modifier" | "periodic-damage" | "periodic-heal" | "cc" | "special";
  parameters: Record<string, any>;
}

/**
 * AIComponent: For NPCs, bosses, enemies
 */
export interface AIComponent extends Component {
  type: "ai";
  data: {
    behaviorTree: string; // ID of behavior tree to execute
    currentState: string;
    target?: EntityId;
    aggroRange: number;
    leashRange: number;
    patrolPoints?: Vector3[];
    customData?: Record<string, any>; // Boss-specific AI data
  };
}

/**
 * BossComponent: Boss-specific data
 */
export interface BossComponent extends Component {
  type: "boss";
  data: {
    bossId: BossId;
    phase: number;
    totalPhases: number;
    enraged: boolean;
    evolutionState: BossEvolutionState;
    mechanics: BossMechanic[];
    lootTable: LootTableId;
  };
}

export enum BossEvolutionState {
  BASE = "base",
  ENRAGED = "enraged",
  ASCENDED = "ascended",
  VOID = "void",
  SUPREME = "supreme",
}

export type BossId =
  | "mirda"
  | "golden-mirda"
  | "zen"
  | "god-of-titans-supreme"
  | "rumble"
  | "ai-torque"
  | "devkorth"
  | "mindy-starchild"
  | "shadow-queen-sella"
  | "shadow-king"
  | "demonis"
  | "vemonominous"
  | "lexicon"
  | "great-lexicon"
  | "mega-lexicon"
  | "polio-mammoth"
  | "homosaurzilla"
  | "the-end"
  | "end-of-universe"
  | "end-of-reality"
  | string; // Extensible

export interface BossMechanic {
  id: string;
  name: string;
  type: "ability" | "phase-transition" | "enrage" | "summon";
  trigger: MechanicTrigger;
  data: Record<string, any>;
}

export interface MechanicTrigger {
  type: "health-threshold" | "timer" | "player-count" | "phase-change" | "event";
  condition: Record<string, any>;
}

export type LootTableId = string;

/**
 * OwnershipComponent: For player-owned entities (pets, structures, etc.)
 */
export interface OwnershipComponent extends Component {
  type: "ownership";
  data: {
    ownerId: PlayerId;
    permissions: Permission[];
  };
}

export enum Permission {
  MODIFY = "modify",
  DESTROY = "destroy",
  USE = "use",
  TRANSFER = "transfer",
}

// ============================================================================
// PLAYER-SPECIFIC ENTITY
// ============================================================================

/**
 * Player: A special Entity with additional profile data
 */
export interface Player extends Entity {
  type: EntityType.PLAYER;
  profile: PlayerProfile;
  components: PlayerComponents;
}

export interface PlayerProfile {
  playerId: PlayerId;
  username: string;
  displayName: string;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;

  // Progression
  totalPlayTime: number; // seconds
  level: number;
  totalExperience: number;

  // Rankings
  powerRank: PowerRank;
  pvpRank: PvPRank;
  seasonalRank?: SeasonalRank;

  // Social
  clanId?: string;
  friendIds: PlayerId[];

  // Cosmetics
  unlockedCosmetics: string[];
  equippedCosmetics: EquippedCosmetics;

  // Settings
  settings: PlayerSettings;
}

export enum PowerRank {
  WARREN_ROOKIE = "warren-rookie",
  BURROW_SCOUT = "burrow-scout",
  OBBY_RUNNER = "obby-runner",
  TITAN_TASTER = "titan-taster",
  DEMON_TRACKER = "demon-tracker",
  VOID_TOUCHED = "void-touched",
  SHADOW_CROWNED = "shadow-crowned",
  TITAN_BREAKER = "titan-breaker",
  MIRDA_WITNESS = "mirda-witness",
  REALITY_RUNNER = "reality-runner",
  OMEGA_CHALLENGER = "omega-challenger",
  LEGEND_OF_WARREN = "legend-of-warren",
}

export enum PvPRank {
  BURROW_BRONZE = "burrow-bronze",
  CARROT_SILVER = "carrot-silver",
  WARREN_GOLD = "warren-gold",
  TITAN_PLATINUM = "titan-platinum",
  VOID_DIAMOND = "void-diamond",
  SHADOW_CROWN = "shadow-crown",
  OMEGA_CREST = "omega-crest",
}

export interface SeasonalRank {
  season: string;
  rank: string;
  points: number;
}

export interface EquippedCosmetics {
  earSkin?: string;
  bodyColor?: string;
  trailEffect?: string;
  auraEffect?: string;
  nameplate?: string;
  emotes?: string[];
}

export interface PlayerSettings {
  audioVolume: number;
  graphicsQuality: "low" | "medium" | "high" | "ultra";
  inputBindings: Record<string, string>;
  // ... more settings
}

/**
 * PlayerComponents: All components a player can have
 */
export interface PlayerComponents extends ComponentMap {
  transform: TransformComponent;
  stats: StatsComponent;
  evolution: EvolutionComponent;
  abilities: AbilitiesComponent;
  faction: FactionComponent;
  inventory: InventoryComponent;
  buffs: BuffsComponent;
  // Players don't have AI component, but may have others
}

// ============================================================================
// ABILITY DEFINITIONS
// ============================================================================

export interface AbilityDefinition {
  id: AbilityId;
  name: string;
  description: string;
  type: AbilityType;

  // Costs
  energyCost: number;
  cooldown: number; // seconds
  charges?: number; // For multi-charge abilities
  chargeRegenTime?: number; // seconds per charge

  // Requirements
  requiredEvolution?: EvolutionForm[];
  requiredLevel?: number;

  // Effects
  effects: AbilityEffect[];

  // Visuals (client-side hints)
  animationId?: string;
  soundId?: string;
  particleEffectId?: string;
}

export enum AbilityType {
  MOVEMENT = "movement",
  ATTACK = "attack",
  DEFENSE = "defense",
  SUPPORT = "support",
  UTILITY = "utility",
  ULTIMATE = "ultimate",
}

export interface AbilityEffect {
  type: "damage" | "heal" | "dash" | "buff" | "debuff" | "summon" | "transform" | "special";
  target: "self" | "enemy" | "ally" | "ground" | "area";
  parameters: Record<string, any>;
}

// Example ability data
export const ABILITY_EAR_GRAB: AbilityDefinition = {
  id: "ear-grab",
  name: "Ear Grab",
  description: "Use your ears to grab and throw objects or small enemies",
  type: AbilityType.UTILITY,
  energyCost: 10,
  cooldown: 2,
  effects: [
    {
      type: "special",
      target: "enemy",
      parameters: {
        action: "grab",
        maxWeight: 100,
        throwForce: 50,
      },
    },
  ],
};

export const ABILITY_BURROW_DASH: AbilityDefinition = {
  id: "burrow-dash",
  name: "Burrow Dash",
  description: "Dash underground, becoming invulnerable briefly",
  type: AbilityType.MOVEMENT,
  energyCost: 25,
  cooldown: 5,
  effects: [
    {
      type: "dash",
      target: "self",
      parameters: {
        distance: 15,
        duration: 0.5,
      },
    },
    {
      type: "buff",
      target: "self",
      parameters: {
        buffId: "invulnerable",
        duration: 0.5,
      },
    },
  ],
};

// ============================================================================
// WORLD & ZONE STRUCTURE
// ============================================================================

export interface World {
  id: string;
  name: string;
  series: WorldSeries;
  zones: Zone[];
  unlockedBy?: UnlockCondition;
}

export enum WorldSeries {
  WARREN_ORIGINS = "warren-origins",
  TITANS_AWAKEN = "titans-awaken",
  MIRDAS_ECLIPSE = "mirdas-eclipse",
  DIMENSIONAL_FRACTURE = "dimensional-fracture",
  GOLDEN_OMEGA_TRIALS = "golden-omega-trials",
  END_ARCS = "end-arcs",
}

export interface Zone {
  id: string;
  name: string;
  type: ZoneType;
  recommendedLevel: number;
  maxPlayers: number;
  bosses: BossId[];
  events: WorldEventId[];
}

export enum ZoneType {
  HUB = "hub",
  OPEN_WORLD = "open-world",
  DUNGEON = "dungeon",
  RAID = "raid",
  PVP_ARENA = "pvp-arena",
  OBBY_COURSE = "obby-course",
  SOCIAL = "social",
}

export type WorldEventId = string;

export interface UnlockCondition {
  type: "level" | "quest" | "boss-defeat" | "faction-rep" | "item";
  parameters: Record<string, any>;
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export type {
  Entity,
  Component,
  Player,
  AbilityDefinition,
  World,
  Zone,
};
