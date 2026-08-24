import type { Weapon } from "../engine/types";

export const weapons: Weapon[] = [
  {
    id: "katana",
    name: "Katana / Wakizashi",
    type: "Katana",
    weight: 10,
    contentPack: "vanilla",
  },
  {
    id: "nodachi",
    name: "Nodachi",
    type: "Katana",
    weight: 8,
    contentPack: "vanilla",
  },
  {
    id: "foreign_sabre",
    name: "Foreign Sabre / Desert Sabre",
    type: "Saber",
    weight: 10,
    contentPack: "vanilla",
  },
  {
    id: "paladins_cross",
    name: "Paladin's Cross",
    type: "Hacker",
    weight: 6,
    tags: ["holy_weapon"],
    contentPack: "vanilla",
  },
  {
    id: "combat_cleaver",
    name: "Combat Cleaver / Flesh Cleaver",
    type: "Hacker",
    weight: 8,
    contentPack: "vanilla",
  },
  {
    id: "fragment_axe",
    name: "Fragment Axe / Plank",
    type: "Heavy",
    weight: 5,
    incompatibleTags: ["solo"], // extremely heavy, hard for solo early game
    contentPack: "vanilla",
  },
  {
    id: "falling_sun",
    name: "Falling Sun",
    type: "Heavy",
    weight: 6,
    contentPack: "vanilla",
  },
  {
    id: "jitte",
    name: "Jitte / Heavy Jitte",
    type: "Blunt",
    weight: 7,
    contentPack: "vanilla",
  },
  {
    id: "naginata",
    name: "Naginata / Polearm",
    type: "Polearm",
    weight: 9,
    contentPack: "vanilla",
  },
  {
    id: "ranger_crossbow",
    name: "Ranger / Oldworld Crossbow",
    type: "Crossbow",
    weight: 8,
    contentPack: "vanilla",
  },
  {
    id: "martial_arts",
    name: "Martial Arts (Unarmed)",
    type: "Martial Arts",
    weight: 7,
    tags: ["martial_artist"],
    contentPack: "vanilla",
  },
];
