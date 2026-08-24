import type { Race } from "../engine/types";

export const races: Race[] = [
  {
    id: "greenlander",
    name: { en: "Greenlander", pt: "Greenlander", es: "Greenlander" },
    weight: 10,
    tags: ["human", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "scorchlander",
    name: { en: "Scorchlander", pt: "Scorchlander", es: "Scorchlander" },
    weight: 8,
    tags: ["human", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "shek",
    name: { en: "Shek", pt: "Shek", es: "Shek" },
    weight: 6,
    tags: ["shek", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "hive_worker",
    name: { en: "Hive Worker", pt: "Trabalhador Hive", es: "Trabajador Colmena" },
    weight: 4,
    tags: ["hive", "hived", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "hive_soldier",
    name: { en: "Hive Soldier", pt: "Soldado Hive", es: "Soldado Colmena" },
    weight: 3,
    tags: ["hive", "hived", "hive_soldier", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "hive_prince",
    name: { en: "Hive Prince", pt: "Príncipe Hive", es: "Príncipe Colmena" },
    weight: 3,
    tags: ["hive", "hived", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "skeleton",
    name: { en: "Skeleton", pt: "Skeleton", es: "Esqueleto" },
    weight: 2,
    tags: ["skeleton", "robotic"],
    contentPack: "vanilla",
  },
];
