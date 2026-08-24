import type { Race } from "../engine/types";

export const races: Race[] = [
  {
    id: "greenlander",
    name: "Greenlander",
    weight: 10,
    tags: ["human", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "scorchlander",
    name: "Scorchlander",
    weight: 8,
    tags: ["human", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "shek",
    name: "Shek",
    weight: 6,
    tags: ["shek", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "hive_worker",
    name: "Hive Worker",
    weight: 4,
    tags: ["hive", "hived", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "hive_soldier",
    name: "Hive Soldier",
    weight: 3,
    tags: ["hive", "hived", "hive_soldier", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "hive_prince",
    name: "Hive Prince",
    weight: 3,
    tags: ["hive", "hived", "flesh"],
    contentPack: "vanilla",
  },
  {
    id: "skeleton",
    name: "Skeleton",
    weight: 2,
    tags: ["skeleton", "robotic"],
    contentPack: "vanilla",
  },
];
