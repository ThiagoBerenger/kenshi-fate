import type { Armor } from "../engine/types";

export const armor: Armor[] = [
  {
    id: "clothing_only",
    name: { en: "Ragged Clothing (No Armor)", pt: "Roupas Rasgadas (Sem Armadura)", es: "Ropa Andrajosa (Sin Armadura)" },
    type: { en: "Clothing", pt: "Vestimentas", es: "Ropa" },
    weight: 5,
    tags: ["clothing_only"],
    incompatibleTags: ["heavy_armor_only"],
    contentPack: "vanilla",
  },
  {
    id: "light_armor",
    name: { en: "Light Armor (Ninja Rags, Leather Turtleneck)", pt: "Armadura Leve (Trapos Ninja, Gola Alta de Couro)", es: "Armadura Ligera (Harapos Ninja, Cuello Alto de Cuero)" },
    type: { en: "Light", pt: "Leve", es: "Ligera" },
    weight: 10,
    tags: ["light_armor"],
    incompatibleTags: ["heavy_armor_only"],
    contentPack: "vanilla",
  },
  {
    id: "medium_armor",
    name: { en: "Medium Armor (Plated Leather, Mercenary Leather)", pt: "Armadura Média (Couro Plaqueado, Couro de Mercenário)", es: "Armadura Media (Cuero de Placas, Cuero de Mercenario)" },
    type: { en: "Medium", pt: "Média", es: "Media" },
    weight: 10,
    tags: ["medium_armor"],
    contentPack: "vanilla",
  },
  {
    id: "heavy_armor",
    name: { en: "Heavy Armor (Samurai Armor, Heavy Plate)", pt: "Armadura Pesada (Armadura Samurai, Placa Pesada)", es: "Armadura Pesada (Armadura Samurái, Placas Pesadas)" },
    type: { en: "Heavy", pt: "Pesada", es: "Pesada" },
    weight: 8,
    tags: ["heavy_armor"],
    incompatibleTags: ["martial_artist", "clothing_only"],
    contentPack: "vanilla",
  },
];
