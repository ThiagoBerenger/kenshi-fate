import type { RuleItem } from "../engine/types";

export const recruitmentRules: RuleItem[] = [
  {
    id: "recruitment_unlimited",
    name: "Unlimited Recruitment",
    description: "Recruit anyone you want, up to the vanilla squad limits.",
    weight: 10,
    difficultyLevels: [0, 1],
    incompatibleTags: ["solo"],
    contentPack: "vanilla",
  },
  {
    id: "recruitment_limited",
    name: "Small Squad Limit (Max 5)",
    description: "You may have a maximum of 5 squad members in your faction.",
    weight: 8,
    difficultyLevels: [0, 1, 2],
    incompatibleTags: ["solo"],
    contentPack: "vanilla",
  },
  {
    id: "recruitment_solo",
    name: "Solo Run",
    description: "No recruitment allowed. You must complete the entire playthrough alone.",
    weight: 6,
    difficultyLevels: [0, 1, 2, 3],
    tags: ["solo"],
    incompatibleTags: ["multi_character"],
    contentPack: "vanilla",
  },
  {
    id: "recruitment_same_race",
    name: "Same Race Only",
    description: "You may only recruit characters of the same race as your main character.",
    weight: 5,
    difficultyLevels: [1, 2, 3],
    incompatibleTags: ["solo"],
    contentPack: "vanilla",
  },
  {
    id: "recruitment_freed_only",
    name: "Liberated Slaves Only",
    description: "You may only recruit characters by freeing them from slavery or prisons.",
    weight: 5,
    difficultyLevels: [1, 2, 3],
    incompatibleTags: ["solo"],
    contentPack: "vanilla",
  },
];

export const baseBuildingRules: RuleItem[] = [
  {
    id: "base_allowed",
    name: "Outpost Construction Allowed",
    description: "You are free to build outposts and bases anywhere on the map.",
    weight: 10,
    difficultyLevels: [0, 1, 2],
    contentPack: "vanilla",
  },
  {
    id: "base_forbidden",
    name: "No Outposts (Nomad / City Dwellers)",
    description: "You cannot build outposts. You must buy houses in existing cities or live as a nomad.",
    weight: 8,
    difficultyLevels: [0, 1, 2, 3],
    tags: ["base_forbidden"],
    contentPack: "vanilla",
  },
  {
    id: "base_required",
    name: "Mandatory Outpost Establishment",
    description: "You must establish a self-sustaining base before day 30.",
    weight: 6,
    difficultyLevels: [0, 1, 2, 3],
    incompatibleTags: ["solo"], // hard to run a base alone
    contentPack: "vanilla",
  },
  {
    id: "base_hostile",
    name: "Outpost in Hostile Zone",
    description: "You must build your primary base in a highly dangerous zone (e.g. Fog Islands, Cannibal Plains, Ashlands).",
    weight: 4,
    difficultyLevels: [2, 3],
    contentPack: "vanilla",
  },
];

export const economyRules: RuleItem[] = [
  {
    id: "economy_standard",
    name: "Standard Economy",
    description: "No special restrictions on buying, selling, or trade.",
    weight: 10,
    difficultyLevels: [0, 1],
    contentPack: "vanilla",
  },
  {
    id: "economy_no_copper",
    name: "No Copper Mining For Profit",
    description: "You cannot mine or sell copper to make Cats. Iron mining is allowed.",
    weight: 8,
    difficultyLevels: [0, 1, 2, 3],
    contentPack: "vanilla",
  },
  {
    id: "economy_no_stealing",
    name: "No Stealing For Profit",
    description: "You may steal items for personal use, but you can never sell stolen items to vendors.",
    weight: 8,
    difficultyLevels: [1, 2, 3],
    contentPack: "vanilla",
  },
  {
    id: "economy_looting_only",
    name: "Scavenger Economy (Looting Only)",
    description: "You cannot purchase items from shops. You must loot or craft everything you use.",
    weight: 3,
    difficultyLevels: [2, 3],
    contentPack: "vanilla",
  },
];

export const prostheticsRules: RuleItem[] = [
  {
    id: "prosthetics_allowed",
    name: "Cybernetics Allowed",
    description: "Use robotic limbs freely when limbs are lost or to upgrade stats.",
    weight: 10,
    difficultyLevels: [0, 1, 2, 3],
    contentPack: "vanilla",
  },
  {
    id: "prosthetics_forbidden",
    name: "No Cybernetics (Flesh Only)",
    description: "You cannot use robotic limbs. If a character loses a limb, they must crawl or be carried.",
    weight: 6,
    difficultyLevels: [1, 2, 3],
    tags: ["anti_prosthetic"],
    incompatibleTags: ["skeleton", "robotic", "requires_prosthetics", "torso_start"],
    contentPack: "vanilla",
  },
  {
    id: "prosthetics_required",
    name: "Cybernetic Upgrade Required",
    description: "You must replace at least one limb with a robotic prosthetic as soon as possible.",
    weight: 5,
    difficultyLevels: [1, 2, 3],
    tags: ["requires_prosthetics"],
    incompatibleTags: ["anti_prosthetic", "holy_nation_fanatic"],
    contentPack: "vanilla",
  },
];

export const saveRules: RuleItem[] = [
  {
    id: "save_reloading",
    name: "Reloading Allowed (Standard)",
    description: "Feel free to load previous saves to recover from mistakes or squad wipes.",
    weight: 10,
    difficultyLevels: [0, 1],
    contentPack: "vanilla",
  },
  {
    id: "save_semi_ironman",
    name: "Semi-Ironman",
    description: "Only reload saves to recover from game-breaking bugs or complete squad wipes (death). No save-scumming failed lockpicks/thefts.",
    weight: 8,
    difficultyLevels: [0, 1, 2],
    contentPack: "vanilla",
  },
  {
    id: "save_true_ironman",
    name: "True Ironman",
    description: "No reloading allowed. Live with the consequences of every action, death, and limb loss.",
    weight: 6,
    difficultyLevels: [1, 2, 3],
    contentPack: "vanilla",
  },
];
