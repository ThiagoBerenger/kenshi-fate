import type {
  DifficultyLevel,
  CustomOptions,
  PlaythroughRun,
  Start,
  Race,
  Archetype,
  Profession,
  Faction,
  RuleItem,
  TaggedItem,
} from "./types";
import { getSeededRandom } from "./seededRandom";
import { isCompatible, registerItem } from "./compatibility";
import {
  races,
  starts,
  factions,
  weapons,
  armor,
  professions,
  archetypes,
  recruitmentRules,
  baseBuildingRules,
  economyRules,
  prostheticsRules,
  saveRules,
  restrictions,
  objectives,
  titleDescriptors,
  titleTemplates,
} from "../data";

const DIFFICULTY_DETAILS: Record<DifficultyLevel, { name: string; description: string }> = {
  0: {
    name: "Wanderer",
    description: "A standard experience. Few restrictions, normal economy, and room to grow.",
  },
  1: {
    name: "Survivor",
    description: "A challenging run. Standard rules, minor economic limits, and moderate restrictions.",
  },
  2: {
    name: "Brutal",
    description: "A harsh test of survival. Severe restrictions, hard economy, and low recruitment.",
  },
  3: {
    name: "Beep",
    description: "Chaotic mode. Hardcore rules, extreme limitations, and ridiculous requirements.",
  },
};

/**
 * Selects a random item from a pool based on its weight and compatibility.
 */
function selectWeighted<T extends TaggedItem>(
  pool: T[],
  rand: () => number,
  activeTags: Set<string>,
  accumulatedIncompatibilities: Set<string>,
  filterFn?: (item: T) => boolean
): T {
  const compatiblePool = pool.filter((item) => {
    if (!isCompatible(item, activeTags, accumulatedIncompatibilities)) {
      return false;
    }
    if (filterFn && !filterFn(item)) {
      return false;
    }
    return true;
  });

  if (compatiblePool.length === 0) {
    // Graceful degradation: find anything matching the filter, ignoring tags
    const fallbackPool = pool.filter((item) => !filterFn || filterFn(item));
    if (fallbackPool.length > 0) {
      return fallbackPool[Math.floor(rand() * fallbackPool.length)];
    }
    return pool[Math.floor(rand() * pool.length)];
  }

  const totalWeight = compatiblePool.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  let r = rand() * totalWeight;

  for (const item of compatiblePool) {
    r -= item.weight ?? 1;
    if (r <= 0) {
      return item;
    }
  }

  return compatiblePool[compatiblePool.length - 1];
}

/**
 * Helper to select multiple unique compatible items.
 */
function selectUniqueWeighted<T extends TaggedItem>(
  pool: T[],
  count: number,
  rand: () => number,
  activeTags: Set<string>,
  accumulatedIncompatibilities: Set<string>,
  filterFn?: (item: T) => boolean
): T[] {
  const selected: T[] = [];
  let tempPool = [...pool];

  for (let i = 0; i < count; i++) {
    if (tempPool.length === 0) break;
    const item = selectWeighted(tempPool, rand, activeTags, accumulatedIncompatibilities, filterFn);
    selected.push(item);
    // Register item to affect subsequent selections
    registerItem(item, activeTags, accumulatedIncompatibilities);
    // Remove to avoid duplicates
    tempPool = tempPool.filter((x) => x.id !== item.id);
  }

  return selected;
}

/**
 * Compiles a title template into a string.
 */
function compileTitle(
  rand: () => number,
  template: string,
  race: Race,
  faction: Faction,
  profession: Profession,
  archetype: Archetype
): string {
  // Determine descriptor set based on race and faction tags
  let descSet = titleDescriptors.default;
  if (race.tags?.includes("skeleton")) {
    descSet = titleDescriptors.skeleton;
  } else if (race.tags?.includes("hive")) {
    descSet = titleDescriptors.hive;
  } else if (race.tags?.includes("shek")) {
    descSet = titleDescriptors.shek;
  } else if (faction.tags?.includes("holy_nation_faction")) {
    descSet = titleDescriptors.holy_nation;
  } else if (faction.tags?.includes("united_cities_faction")) {
    descSet = titleDescriptors.united_cities;
  }

  const selectRandom = (arr: string[]) => arr[Math.floor(rand() * arr.length)];

  let title = template;
  title = title.replace("[Adjective]", selectRandom(descSet.adjectives));
  title = title.replace("[Noun]", selectRandom(descSet.nouns));
  title = title.replace("[Profession]", profession.name);
  title = title.replace("[Faction]", faction.name.replace("The ", ""));
  title = title.replace("[Archetype]", archetype.name);

  return title;
}

/**
 * Main playthrough generation engine.
 */
export function generateRun(seed: string, customOptions?: CustomOptions): PlaythroughRun {
  const rand = getSeededRandom(seed);
  const activeTags = new Set<string>();
  const accumulatedIncompatibilities = new Set<string>();

  // 1. Difficulty Level
  let difficultyLevel: DifficultyLevel;
  if (customOptions?.difficulty !== undefined && customOptions.difficulty !== "random") {
    difficultyLevel = customOptions.difficulty;
  } else {
    // Weighted selection of difficulties: Survivor (4) > Wanderer (3) > Brutal (2) > Beep (1)
    const diffRand = rand();
    if (diffRand < 0.3) difficultyLevel = 0;
    else if (diffRand < 0.7) difficultyLevel = 1;
    else if (diffRand < 0.9) difficultyLevel = 2;
    else difficultyLevel = 3;
  }

  const difficultyDetails = DIFFICULTY_DETAILS[difficultyLevel];

  // 2. Start Selection
  let start: Start;
  if (customOptions?.start && customOptions.start !== "random") {
    start = starts.find((s) => s.id === customOptions.start) || starts[0];
  } else {
    start = selectWeighted(starts, rand, activeTags, accumulatedIncompatibilities);
  }
  registerItem(start, activeTags, accumulatedIncompatibilities);

  // 3. Race Selection (must obey start restrictions)
  let race: Race;
  if (customOptions?.race && customOptions.race !== "random") {
    race = races.find((r) => r.id === customOptions.race) || races[0];
  } else {
    race = selectWeighted(
      races,
      rand,
      activeTags,
      accumulatedIncompatibilities,
      (r) => !start.allowedRaces || start.allowedRaces.includes(r.id)
    );
  }
  registerItem(race, activeTags, accumulatedIncompatibilities);

  // 4. Archetype Selection
  const archetype = selectWeighted(archetypes, rand, activeTags, accumulatedIncompatibilities);
  registerItem(archetype, activeTags, accumulatedIncompatibilities);

  // 5. Profession Selection
  const profession = selectWeighted(professions, rand, activeTags, accumulatedIncompatibilities);
  registerItem(profession, activeTags, accumulatedIncompatibilities);

  // 6. Combat Gear
  const weapon = selectWeighted(weapons, rand, activeTags, accumulatedIncompatibilities);
  registerItem(weapon, activeTags, accumulatedIncompatibilities);

  const armorSelected = selectWeighted(armor, rand, activeTags, accumulatedIncompatibilities);
  registerItem(armorSelected, activeTags, accumulatedIncompatibilities);

  // 7. World Factions (Allied & Enemy)
  // Force allies if specified by archetype
  let alliedFaction: Faction;
  if (archetype.forcedAllies && archetype.forcedAllies.length > 0) {
    const forcedId = archetype.forcedAllies[Math.floor(rand() * archetype.forcedAllies.length)];
    alliedFaction = factions.find((f) => f.id === forcedId) || factions[0];
  } else {
    alliedFaction = selectWeighted(factions, rand, activeTags, accumulatedIncompatibilities);
  }
  registerItem(alliedFaction, activeTags, accumulatedIncompatibilities);

  // Force enemies if specified, ensuring it's not the allied faction
  let enemyFaction: Faction;
  if (
    archetype.forcedEnemies &&
    archetype.forcedEnemies.length > 0 &&
    !archetype.forcedEnemies.includes(alliedFaction.id)
  ) {
    const forcedId = archetype.forcedEnemies.find((id) => id !== alliedFaction.id);
    enemyFaction = factions.find((f) => f.id === forcedId) || factions[1];
  } else {
    enemyFaction = selectWeighted(
      factions,
      rand,
      activeTags,
      accumulatedIncompatibilities,
      (f) => f.id !== alliedFaction.id
    );
  }
  registerItem(enemyFaction, activeTags, accumulatedIncompatibilities);

  // 8. Rules (filtered by difficulty and custom options)
  // Recruitment
  let recruitment: RuleItem;
  if (customOptions?.recruitment && customOptions.recruitment !== "random") {
    const mappedId = `recruitment_${customOptions.recruitment.toLowerCase()}`;
    recruitment =
      recruitmentRules.find((r) => r.id === mappedId) ||
      recruitmentRules.find((r) => r.id.includes(customOptions.recruitment as string)) ||
      recruitmentRules[0];
  } else {
    recruitment = selectWeighted(
      recruitmentRules,
      rand,
      activeTags,
      accumulatedIncompatibilities,
      (r) => r.difficultyLevels.includes(difficultyLevel)
    );
  }
  registerItem(recruitment, activeTags, accumulatedIncompatibilities);

  // Base Building
  let baseBuilding: RuleItem;
  if (customOptions?.baseBuilding && customOptions.baseBuilding !== "random") {
    const mappedId = `base_${customOptions.baseBuilding.toLowerCase()}`;
    baseBuilding =
      baseBuildingRules.find((r) => r.id === mappedId) ||
      baseBuildingRules.find((r) => r.id.includes(customOptions.baseBuilding as string)) ||
      baseBuildingRules[0];
  } else {
    baseBuilding = selectWeighted(
      baseBuildingRules,
      rand,
      activeTags,
      accumulatedIncompatibilities,
      (b) => b.difficultyLevels.includes(difficultyLevel)
    );
  }
  registerItem(baseBuilding, activeTags, accumulatedIncompatibilities);

  // Economy
  const economy = selectWeighted(
    economyRules,
    rand,
    activeTags,
    accumulatedIncompatibilities,
    (e) => e.difficultyLevels.includes(difficultyLevel)
  );
  registerItem(economy, activeTags, accumulatedIncompatibilities);

  // Prosthetics
  const prosthetics = selectWeighted(
    prostheticsRules,
    rand,
    activeTags,
    accumulatedIncompatibilities,
    (p) => p.difficultyLevels.includes(difficultyLevel)
  );
  registerItem(prosthetics, activeTags, accumulatedIncompatibilities);

  // Save Rules
  let save: RuleItem;
  if (customOptions?.ironman !== undefined && customOptions.ironman !== "random") {
    const mappedId = customOptions.ironman ? "save_true_ironman" : "save_reloading";
    save = saveRules.find((s) => s.id === mappedId) || saveRules[0];
  } else {
    save = selectWeighted(
      saveRules,
      rand,
      activeTags,
      accumulatedIncompatibilities,
      (s) => s.difficultyLevels.includes(difficultyLevel)
    );
  }
  registerItem(save, activeTags, accumulatedIncompatibilities);

  // 9. Restrictions (Count based on difficulty: Wanderer: 2, Survivor: 3, Brutal: 4, Beep: 5)
  const restrictionCount = difficultyLevel + 2;
  const runRestrictions = selectUniqueWeighted(
    restrictions,
    restrictionCount,
    rand,
    activeTags,
    accumulatedIncompatibilities,
    (r) => r.difficultyLevels.includes(difficultyLevel)
  );

  // 10. Intermediate Objectives (Select exactly 3)
  const runObjectives = selectUniqueWeighted(
    objectives,
    3,
    rand,
    activeTags,
    accumulatedIncompatibilities,
    (o) => !o.isFinal && o.difficultyLevels.includes(difficultyLevel)
  );

  // 11. Final Objective (Select exactly 1)
  const finalObjective = selectWeighted(
    objectives,
    rand,
    activeTags,
    accumulatedIncompatibilities,
    (o) => !!o.isFinal && o.difficultyLevels.includes(difficultyLevel)
  );
  registerItem(finalObjective, activeTags, accumulatedIncompatibilities);

  // 12. Compile Title and Narrative Description
  const titleTemplate = titleTemplates[Math.floor(rand() * titleTemplates.length)];
  const title = compileTitle(rand, titleTemplate, race, alliedFaction, profession, archetype);

  // Generate a short atmospheric narrative description based on the campaign elements
  const descPronoun = race.tags?.includes("hive") ? "It" : "They";
  const descVerb = descPronoun === "It" ? "is" : "are";
  const description = `A ${difficultyDetails.name} playthrough starting as a ${race.name} with ${
    start.startingSquad
  }. Embracing the lifestyle of a ${profession.name} (${archetype.name}), ${descPronoun.toLowerCase()} ${descVerb} equipped with a ${
    weapon.type
  } weapon and wearing ${
    armorSelected.name
  }. Allied with ${alliedFaction.name} to stand against ${enemyFaction.name}, the squad operates under ${
    recruitment.name
  } rules and ${baseBuilding.name}. The ultimate test of fate: ${finalObjective.description}`;

  return {
    seed,
    difficulty: {
      level: difficultyLevel,
      name: difficultyDetails.name,
      description: difficultyDetails.description,
    },
    start,
    race,
    startingSquad: start.startingSquad,
    archetype,
    profession,
    weapon,
    armor: armorSelected,
    alliedFaction,
    enemyFaction,
    rules: {
      recruitment,
      baseBuilding,
      economy,
      prosthetics,
      saveRules: save,
    },
    restrictions: runRestrictions,
    objectives: runObjectives,
    finalObjective,
    title,
    description,
  };
}
