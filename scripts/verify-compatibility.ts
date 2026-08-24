import { generateRun } from "../src/engine/generator";
import { generateRandomSeed } from "../src/engine/seededRandom";

console.log("⏳ Running 5,000 simulation runs to verify compatibility engine...");

let failures = 0;

for (let i = 0; i < 5000; i++) {
  const seed = generateRandomSeed();
  try {
    const run = generateRun(seed);

    // 1. Holy Nation vs Skeleton Check
    const isHNZealot = run.archetype.id === "holy_nation_fanator" || run.archetype.tags?.includes("holy_nation_fanatic");
    const isSkeleton = run.race.id === "skeleton" || run.race.tags?.includes("skeleton");

    if (isHNZealot && isSkeleton) {
      console.error(`❌ Failure: HN Zealot was generated as a Skeleton! Seed: ${seed}`);
      failures++;
    }

    if (isSkeleton && run.alliedFaction.id === "holy_nation") {
      console.error(`❌ Failure: Skeleton was allied with Holy Nation! Seed: ${seed}`);
      failures++;
    }

    if (isSkeleton && run.rules.prosthetics.id === "prosthetics_forbidden") {
      console.error(`❌ Failure: Skeleton was given prosthetics forbidden rule! Seed: ${seed}`);
      failures++;
    }

    if (isSkeleton && run.restrictions.some(r => r.id === "rest_vegan")) {
      console.error(`❌ Failure: Skeleton was given vegan restriction (they don't eat)! Seed: ${seed}`);
      failures++;
    }

    // 2. Solo vs Squad checks
    const isSolo = run.rules.recruitment.id === "recruitment_solo" || run.rules.recruitment.tags?.includes("solo");
    if (isSolo && run.start.incompatibleTags?.includes("solo")) {
      console.error(`❌ Failure: Solo run generated with squad-only start (${run.start.name.en})! Seed: ${seed}`);
      failures++;
    }

    if (isSolo && run.rules.baseBuilding.id === "base_required") {
      console.error(`❌ Failure: Solo run required base building! Seed: ${seed}`);
      failures++;
    }

    // 3. Faction Clashes
    if (run.alliedFaction.id === run.enemyFaction.id) {
      console.error(`❌ Failure: Allied faction is identical to Enemy faction (${run.alliedFaction.name.en})! Seed: ${seed}`);
      failures++;
    }

    // 4. Basic Integrity
    if (!run.title.en || run.title.en.trim() === "" || !run.title.pt || run.title.pt.trim() === "" || !run.title.es || run.title.es.trim() === "") {
      console.error(`❌ Failure: Run has an empty title in one of the languages! Seed: ${seed}`);
      failures++;
    }

    if (!run.description.en || run.description.en.trim() === "" || !run.description.pt || run.description.pt.trim() === "" || !run.description.es || run.description.es.trim() === "") {
      console.error(`❌ Failure: Run has an empty description in one of the languages! Seed: ${seed}`);
      failures++;
    }

    // 5. Duplicate Restrictions
    const restrictionIds = run.restrictions.map(r => r.id);
    const uniqueRestrictions = new Set(restrictionIds);
    if (restrictionIds.length !== uniqueRestrictions.size) {
      console.error(`❌ Failure: Duplicate restrictions generated! Seed: ${seed}, Details:`, restrictionIds);
      failures++;
    }

    // 6. Duplicate Objectives
    const objectiveIds = run.objectives.map(o => o.id);
    const uniqueObjectives = new Set(objectiveIds);
    if (objectiveIds.length !== uniqueObjectives.size) {
      console.error(`❌ Failure: Duplicate intermediate objectives! Seed: ${seed}, Details:`, objectiveIds);
      failures++;
    }

  } catch (err: any) {
    console.error(`💥 Crash on seed ${seed}:`, err.message);
    failures++;
  }
}

if (failures === 0) {
  console.log("✅ Simulation completed! 5,000 runs resolved successfully with 0 compatibility failures.");
  process.exit(0);
} else {
  console.error(`❌ Completed with ${failures} compatibility violations.`);
  process.exit(1);
}
