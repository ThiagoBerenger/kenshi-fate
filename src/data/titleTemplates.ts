export interface TitleDescriptor {
  adjectives: string[];
  nouns: string[];
}

export const titleDescriptors: Record<string, TitleDescriptor> = {
  default: {
    adjectives: ["Exiled", "Wandering", "Silent", "Iron", "Rusty", "Broken", "Fearless", "Forgotten", "Stalking", "Desert", "Cursed", "Revengeful", "Lone", "Naked", "Cybernetic"],
    nouns: ["Ghost", "Shadow", "Blade", "Scrapper", "Rebel", "Drifter", "Emancipator", "Sovereign", "Vagabond", "Avenger", "Outcast", "Pilgrim", "Survivalist", "Veteran"],
  },
  holy_nation: {
    adjectives: ["Holy", "Zealous", "Devout", "Sacred", "Purified", "Righteous", "Sun-Blessed", "Okranite"],
    nouns: ["Crusader", "Templar", "Priest", "Paladin", "Apostle", "Inquisitor", "Servant", "Zealot"],
  },
  united_cities: {
    adjectives: ["Imperial", "Noble", "Gilded", "Mercenary", "Corrupt", "Tax-Evading", "Desert-Born"],
    nouns: ["Merchant", "Taxman", "Officer", "Smuggler", "Outlaw", "Bounty Hunter", "Scoundrel"],
  },
  shek: {
    adjectives: ["Horned", "Battle-Scarred", "Fierce", "Honor-Bound", "Unbroken", "Unflinching"],
    nouns: ["Warrior", "Gladiator", "Berserker", "Slayer", "Defender", "Chieftain"],
  },
  skeleton: {
    adjectives: ["Ancient", "Rusty", "Mechanical", "Timeless", "Forgotten", "Iron-Clad", "Calculated"],
    nouns: ["Android", "Centurion", "Archivist", "Overseer", "Colossus", "Preservationist"],
  },
  hive: {
    adjectives: ["Exiled", "Hive-less", "Wingless", "Stray", "Queen's-Own", "Yellow-Eyed"],
    nouns: ["Outcast", "Soldier", "Drone", "Prince", "Worker", "Ronin"],
  },
};

export const titleTemplates = [
  "The [Adjective] [Noun]",
  "The [Adjective] [Profession]",
  "[Adjective] [Noun] of the Wasteland",
  "[Profession] of the [Faction]",
  "The [Faction] [Noun]",
  "The [Faction] [Profession]",
  "[Adjective] [Archetype]",
];
