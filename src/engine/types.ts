export type Language = "en" | "pt" | "es";

export type LocalizedString = Record<Language, string>;

export type DifficultyLevel = 0 | 1 | 2 | 3; // 0: Wanderer, 1: Survivor, 2: Brutal, 3: Beep

export interface TaggedItem {
  id: string;
  name: LocalizedString;
  weight?: number;
  tags?: string[];
  incompatibleTags?: string[];
  requiresTags?: string[];
  contentPack: string; // "vanilla", "reactive_world", etc.
}

export interface Race extends TaggedItem {}

export interface Start extends TaggedItem {
  description: LocalizedString;
  startingSquad: LocalizedString;
  allowedRaces?: string[]; // If present, main character must be one of these
  startingLocationId?: string;
}

export interface Faction extends TaggedItem {
  description: LocalizedString;
  icon?: string;
  shortName?: LocalizedString;
}

export interface Weapon extends TaggedItem {
  type: LocalizedString; // Katana, Saber, Hacker, Heavy, Blunt, Polearm, Crossbow
  icon?: string;
}

export interface Armor extends TaggedItem {
  type: LocalizedString; // Clothing, Light, Medium, Heavy
}

export interface Profession extends TaggedItem {
  description: LocalizedString;
}

export interface Archetype extends TaggedItem {
  description: LocalizedString;
  forcedAllies?: string[]; // Faction IDs or tags
  forcedEnemies?: string[]; // Faction IDs or tags
}

export interface RuleItem extends TaggedItem {
  description: LocalizedString;
  difficultyLevels: DifficultyLevel[];
}

export interface Restriction extends TaggedItem {
  description: LocalizedString;
  difficultyLevels: DifficultyLevel[];
}

export interface Objective extends TaggedItem {
  description: LocalizedString;
  difficultyLevels: DifficultyLevel[];
  isFinal?: boolean;
  targetLocationId?: string;
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
    name: LocalizedString;
    description: LocalizedString;
  };
  start: Start;
  race: Race;
  startingSquad: LocalizedString;
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
  title: LocalizedString;
  description: LocalizedString;
}
