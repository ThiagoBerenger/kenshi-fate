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
  LocalizedString,
  Language,
} from "./types";
import { getSeededRandom, serializeOptions, deserializeOptions } from "./seededRandom";
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

const DIFFICULTY_DETAILS: Record<DifficultyLevel, { name: LocalizedString; description: LocalizedString }> = {
  0: {
    name: { en: "Wanderer", pt: "Andarilho", es: "Vagabundo" },
    description: {
      en: "A standard experience. Few restrictions, normal economy, and room to grow.",
      pt: "Uma experiência padrão. Poucas restrições, economia normal e espaço para crescer.",
      es: "Una experiencia estándar. Pocas restricciones, economía normal y espacio para crecer.",
    },
  },
  1: {
    name: { en: "Survivor", pt: "Sobrevivente", es: "Superviviente" },
    description: {
      en: "A challenging run. Standard rules, minor economic limits, and moderate restrictions.",
      pt: "Uma campanha desafiadora. Regras padrão, pequenos limites econômicos e restrições moderadas.",
      es: "Una partida desafiante. Reglas estándar, límites económicos menores y restricciones moderadas.",
    },
  },
  2: {
    name: { en: "Brutal", pt: "Brutal", es: "Brutal" },
    description: {
      en: "A harsh test of survival. Severe restrictions, hard economy, and low recruitment.",
      pt: "Um teste severo de sobrevivência. Restrições severas, economia difícil e baixo recrutamento.",
      es: "Una dura prueba de supervivencia. Fuertes restricciones, economía difícil y bajo reclutamiento.",
    },
  },
  3: {
    name: { en: "Beep", pt: "Beep", es: "Beep" },
    description: {
      en: "Chaotic mode. Hardcore rules, extreme limitations, and ridiculous requirements.",
      pt: "Modo caótico. Regras hardcore, limitações extremas e exigências absurdas.",
      es: "Modo caótico. Reglas extremas, limitaciones severas y requisitos ridículos.",
    },
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
    registerItem(item, activeTags, accumulatedIncompatibilities);
    tempPool = tempPool.filter((x) => x.id !== item.id);
  }

  return selected;
}

/**
 * Compiles a title template into a LocalizedString.
 */
function compileTitle(
  rand: () => number,
  race: Race,
  faction: Faction,
  profession: Profession,
  archetype: Archetype
): LocalizedString {
  let descKey = "default";
  if (race.tags?.includes("skeleton")) descKey = "skeleton";
  else if (race.tags?.includes("hive")) descKey = "hive";
  else if (race.tags?.includes("shek")) descKey = "shek";
  else if (faction.tags?.includes("holy_nation_faction")) descKey = "holy_nation";
  else if (faction.tags?.includes("united_cities_faction")) descKey = "united_cities";

  const descSet = titleDescriptors[descKey] || titleDescriptors.default;

  // Draw symmetric indexes so translations correspond
  const templateIdx = Math.floor(rand() * titleTemplates.en.length);
  const adjIdx = Math.floor(rand() * descSet.adjectives.en.length);
  const nounIdx = Math.floor(rand() * descSet.nouns.en.length);

  const cleanFaction = (name: string) => {
    return name
      .replace(/^The\s+/i, "")
      .replace(/^A\s+/i, "")
      .replace(/^As\s+/i, "")
      .replace(/^El\s+/i, "")
      .replace(/^La\s+/i, "");
  };

  const compileForLang = (lang: Language): string => {
    let title = titleTemplates[lang][templateIdx];
    title = title.replace("[Adjective]", descSet.adjectives[lang][adjIdx]);
    title = title.replace("[Noun]", descSet.nouns[lang][nounIdx]);
    title = title.replace("[Profession]", profession.name[lang]);
    title = title.replace("[Faction]", cleanFaction(faction.name[lang]));
    title = title.replace("[Archetype]", archetype.name[lang]);
    return title;
  };

  return {
    en: compileForLang("en"),
    pt: compileForLang("pt"),
    es: compileForLang("es"),
  };
}

/**
 * Main playthrough generation engine.
 */
export function generateRun(seed: string, customOptions?: CustomOptions): PlaythroughRun {
  // Parse options from seed if present (e.g. KF-123456-c-d:1.ra:shek)
  const dashCIndex = seed.indexOf("-c-");
  let baseSeed = seed;
  let seedOptions: CustomOptions = {};
  if (dashCIndex !== -1) {
    baseSeed = seed.slice(0, dashCIndex);
    seedOptions = deserializeOptions(seed.slice(dashCIndex + 3));
  }

  // Merge customOptions (passed directly, e.g. from Customizer) with seedOptions (parsed from URL)
  // Options passed directly have priority
  const options: CustomOptions = {
    difficulty: customOptions?.difficulty !== undefined ? customOptions.difficulty : (seedOptions.difficulty !== undefined ? seedOptions.difficulty : "random"),
    race: customOptions?.race !== undefined ? customOptions.race : (seedOptions.race !== undefined ? seedOptions.race : "random"),
    start: customOptions?.start !== undefined ? customOptions.start : (seedOptions.start !== undefined ? seedOptions.start : "random"),
    baseBuilding: customOptions?.baseBuilding !== undefined ? customOptions.baseBuilding : (seedOptions.baseBuilding !== undefined ? seedOptions.baseBuilding : "random"),
    recruitment: customOptions?.recruitment !== undefined ? customOptions.recruitment : (seedOptions.recruitment !== undefined ? seedOptions.recruitment : "random"),
    ironman: customOptions?.ironman !== undefined ? customOptions.ironman : (seedOptions.ironman !== undefined ? seedOptions.ironman : "random"),
  };

  const rand = getSeededRandom(baseSeed);
  const activeTags = new Set<string>();
  const accumulatedIncompatibilities = new Set<string>();

  // 1. Difficulty Level
  let difficultyLevel: DifficultyLevel;
  if (options.difficulty !== undefined && options.difficulty !== "random") {
    difficultyLevel = options.difficulty;
  } else {
    const diffRand = rand();
    if (diffRand < 0.3) difficultyLevel = 0;
    else if (diffRand < 0.7) difficultyLevel = 1;
    else if (diffRand < 0.9) difficultyLevel = 2;
    else difficultyLevel = 3;
  }

  const difficultyDetails = DIFFICULTY_DETAILS[difficultyLevel];

  // 2. Start Selection
  let start: Start;
  if (options.start && options.start !== "random") {
    start = starts.find((s) => s.id === options.start) || starts[0];
  } else {
    start = selectWeighted(starts, rand, activeTags, accumulatedIncompatibilities);
  }
  registerItem(start, activeTags, accumulatedIncompatibilities);

  // 3. Race Selection (must obey start restrictions)
  let race: Race;
  if (options.race && options.race !== "random") {
    race = races.find((r) => r.id === options.race) || races[0];
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
  let alliedFaction: Faction;
  if (archetype.forcedAllies && archetype.forcedAllies.length > 0) {
    const forcedId = archetype.forcedAllies[Math.floor(rand() * archetype.forcedAllies.length)];
    alliedFaction = factions.find((f) => f.id === forcedId) || factions[0];
  } else {
    alliedFaction = selectWeighted(factions, rand, activeTags, accumulatedIncompatibilities);
  }
  registerItem(alliedFaction, activeTags, accumulatedIncompatibilities);

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
  if (options.recruitment && options.recruitment !== "random") {
    const mappedId = `recruitment_${options.recruitment.toLowerCase()}`;
    recruitment =
      recruitmentRules.find((r) => r.id === mappedId) ||
      recruitmentRules.find((r) => r.id.includes(options.recruitment as string)) ||
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
  if (options.baseBuilding && options.baseBuilding !== "random") {
    const mappedId = `base_${options.baseBuilding.toLowerCase()}`;
    baseBuilding =
      baseBuildingRules.find((r) => r.id === mappedId) ||
      baseBuildingRules.find((r) => r.id.includes(options.baseBuilding as string)) ||
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
  if (options.ironman !== undefined && options.ironman !== "random") {
    const mappedId = options.ironman ? "save_true_ironman" : "save_reloading";
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

  // 9. Restrictions
  const restrictionCount = difficultyLevel + 2;
  const runRestrictions = selectUniqueWeighted(
    restrictions,
    restrictionCount,
    rand,
    activeTags,
    accumulatedIncompatibilities,
    (r) => r.difficultyLevels.includes(difficultyLevel)
  );

  // 10. Intermediate Objectives
  const runObjectives = selectUniqueWeighted(
    objectives,
    3,
    rand,
    activeTags,
    accumulatedIncompatibilities,
    (o) => !o.isFinal && o.difficultyLevels.includes(difficultyLevel)
  );

  // 11. Final Objective
  const finalObjective = selectWeighted(
    objectives,
    rand,
    activeTags,
    accumulatedIncompatibilities,
    (o) => !!o.isFinal && o.difficultyLevels.includes(difficultyLevel)
  );
  registerItem(finalObjective, activeTags, accumulatedIncompatibilities);

  // 12. Compile Title and Narrative Description
  const title = compileTitle(rand, race, alliedFaction, profession, archetype);

  const description: LocalizedString = {
    en: `A ${difficultyDetails.name.en} playthrough starting as a ${race.name.en} with ${start.startingSquad.en}. Embracing the lifestyle of a ${profession.name.en} (${archetype.name.en}), they are equipped with a ${weapon.type.en} weapon and wearing ${armorSelected.name.en}. Allied with ${alliedFaction.name.en} to stand against ${enemyFaction.name.en}, the squad operates under ${recruitment.name.en} rules and ${baseBuilding.name.en}. The ultimate test of fate: ${finalObjective.description.en}`,
    pt: `Uma campanha no nível ${difficultyDetails.name.pt} começando como ${race.name.pt} com ${start.startingSquad.pt}. Abraçando o estilo de vida de ${profession.name.pt} (${archetype.name.pt}), você começa equipado com uma arma de categoria ${weapon.type.pt} e vestindo ${armorSelected.name.pt}. Aliado com ${alliedFaction.name.pt} para enfrentar ${enemyFaction.name.pt}, seu esquadrão segue as regras de ${recruitment.name.pt} e ${baseBuilding.name.pt}. O teste final do destino: ${finalObjective.description.pt}`,
    es: `Una campaña en nivel ${difficultyDetails.name.es} comenzando como ${race.name.es} con ${start.startingSquad.es}. Adoptando el estilo de vida de ${profession.name.es} (${archetype.name.es}), comienzas equipado con un arma de tipo ${weapon.type.es} y vistiendo ${armorSelected.name.es}. Aliado con ${alliedFaction.name.es} para enfrentarte a ${enemyFaction.name.es}, tu grupo sigue las reglas de ${recruitment.name.es} y ${baseBuilding.name.es}. La prueba final del destino: ${finalObjective.description.es}`,
  };

  // Generate the final seed representing the full config
  const serialized = serializeOptions(options);
  const finalSeed = serialized ? `${baseSeed}-c-${serialized}` : baseSeed;

  return {
    seed: finalSeed,
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
