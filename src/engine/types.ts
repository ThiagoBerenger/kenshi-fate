export type DifficultyLevel = 0 | 1 | 2 | 3; // 0: Wanderer, 1: Survivor, 2: Brutal, 3: Beep

export interface TaggedItem {
  id: string;
  name: string;
  weight?: number;
  tags?: string[];
  incompatibleTags?: string[];
  requiresTags?: string[];
  contentPack: string; // "vanilla", "reactive_world", etc.
}

export interface Race extends TaggedItem {}

export interface Start extends TaggedItem {
  description: string;
  startingSquad: string;
  allowedRaces?: string[]; // If present, main character must be one of these
}

export interface Faction extends TaggedItem {
  description: string;
}

export interface Weapon extends TaggedItem {
  type: string; // Katana, Saber, Hacker, Heavy, Blunt, Polearm, Crossbow
}

export interface Armor extends TaggedItem {
  type: string; // Clothing, Light, Medium, Heavy
}

export interface Profession extends TaggedItem {
  description: string;
}

export interface Archetype extends TaggedItem {
  description: string;
  forcedAllies?: string[]; // Faction IDs or tags
  forcedEnemies?: string[]; // Faction IDs or tags
}

export interface RuleItem extends TaggedItem {
  description: string;
  difficultyLevels: DifficultyLevel[];
}

export interface Restriction extends TaggedItem {
  description: string;
  difficultyLevels: DifficultyLevel[];
}

export interface Objective extends TaggedItem {
  description: string;
  difficultyLevels: DifficultyLevel[];
  isFinal?: boolean;
}

export interface CustomOptions {
  difficulty?: DifficultyLevel | "random";
  race?: string | "random";
  start?: string | "random";
  baseBuilding?: string | "random"; // Allowed, Forbidden, Required, Random
  recruitment?: string | "random"; // Unlimited, Limited, Solo, Random
  ironman?: boolean | "random";
}

export interface PlaythroughRun {
  seed: string;
  dateStr?: string; // For daily challenges
  difficulty: {
    level: DifficultyLevel;
    name: string;
    description: string;
  };
  start: Start;
  race: Race;
  startingSquad: string;
  archetype: Archetype;
  profession: Profession;
  weapon: Weapon;
  armor: Armor;
  alliedFaction: Faction;
  enemyFaction: Faction;
  rules: {
    recruitment: RuleItem;
    baseBuilding: RuleItem;
    economy: RuleItem;
    prosthetics: RuleItem;
    saveRules: RuleItem;
  };
  restrictions: Restriction[];
  objectives: Objective[];
  finalObjective: Objective;
  title: string;
  description: string;
}
