import type { Armor } from "../engine/types";

export const armor: Armor[] = [
  {
    id: "clothing_only",
    name: "Ragged Clothing (No Armor)",
    type: "Clothing",
    weight: 5,
    tags: ["clothing_only"],
    incompatibleTags: ["heavy_armor_only"],
    contentPack: "vanilla",
  },
  {
    id: "light_armor",
    name: "Light Armor (Ninja Rags, Leather Turtleneck)",
    type: "Light",
    weight: 10,
    tags: ["light_armor"],
    incompatibleTags: ["heavy_armor_only"],
    contentPack: "vanilla",
  },
  {
    id: "medium_armor",
    name: "Medium Armor (Plated Leather, Mercenary Leather)",
    type: "Medium",
    weight: 10,
    tags: ["medium_armor"],
    contentPack: "vanilla",
  },
  {
    id: "heavy_armor",
    name: "Heavy Armor (Samurai Armor, Heavy Plate)",
    type: "Heavy",
    weight: 8,
    tags: ["heavy_armor"],
    incompatibleTags: ["martial_artist", "clothing_only"], // heavy armor gives massive martial arts penalties
    contentPack: "vanilla",
  },
];
