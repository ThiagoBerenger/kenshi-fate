# Contributing to Kenshi Fate

Thank you for wanting to contribute to Kenshi Fate! We designed this project to be highly **data-driven** so that members of the community can add scenarios, rules, and restrictions by simply editing text files—no advanced React or frontend knowledge required.

---

## 📂 Project Architecture

All generation parameters are loaded from structured data files located in `src/data/`:

- `races.ts`: Playable races (Shek, Skeleton, Hives, etc.).
- `starts.ts`: Starting scenario conditions (starting squad, allowed races).
- `factions.ts`: Factions that can be rolled as Allies or Enemies.
- `weapons.ts` / `armor.ts`: Gear preferences.
- `professions.ts` / `archetypes.ts`: Lifestyles and roleplaying archetypes.
- `rules.ts`: Recruitment, base construction, and economy modes.
- `restrictions.ts`: Playthrough limits (e.g. no thievery, vegetarian).
- `objectives.ts`: Short-term and epic campaign objectives.
- `titleTemplates.ts`: Wording blueprints used to compile dynamic campaign titles.

---

## 📝 Rules of the Data Schema

Every item in these files implements the `TaggedItem` interface defined in `src/engine/types.ts`:

```ts
export interface TaggedItem {
  id: string;             // Unique identifier (lowercase snake_case)
  name: string;           // Display name shown on the card
  weight?: number;        // Optional weight (default: 1). Higher weight = more frequent
  tags?: string[];        // Tags this item provides to the active campaign tags pool
  incompatibleTags?: string[]; // Tags this item is incompatible with
  requiresTags?: string[];     // Tags that MUST be active in the campaign for this item to spawn
  contentPack: string;    // E.g. "vanilla" (designed for future mod packs like "UWE" or "Genesis")
}
```

---

## 💡 Contribution Examples

### 1. Adding a new Restriction (`src/data/restrictions.ts`)

Suppose you want to add a restriction: **"No Copper Mining for Profit"**.

```ts
{
  id: "rest_no_copper_mining",
  name: "No Copper Mining",
  description: "You may never mine or sell copper for Cats. Scraping iron is allowed.",
  weight: 8,
  difficultyLevels: [0, 1, 2, 3], // Wanderer, Survivor, Brutal, Beep
  contentPack: "vanilla"
}
```

### 2. Adding an Archetype (`src/data/archetypes.ts`)

Suppose you want to add **"Holy Nation Crusader"**:

```ts
{
  id: "holy_crusader",
  name: "Holy Crusader",
  description: "Dedicated to the cleansing light of Okran. No non-humans, no prosthetics.",
  weight: 5,
  tags: ["holy_nation_associated", "anti_skeleton", "anti_prosthetic"],
  incompatibleTags: ["skeleton", "robotic", "requires_prosthetics", "torso_start"],
  forcedAllies: ["holy_nation"],
  forcedEnemies: ["skin_bandits", "anti_slavers"],
  contentPack: "vanilla"
}
```

---

## 🏷️ The Tag & Compatibility System

As the generator selects components in order, it collects active tags and registers forbidden tags. Our compatibility checking algorithm:
1. Rejects any item that provides a tag currently in the forbidden list.
2. Rejects any item that forbids a tag currently in the active list.
3. Rejects any item that requires tags not currently present.

Common compatibility tags in use:
- `solo`: Run has no other members (blocks base-building, etc.).
- `skeleton` / `robotic`: Skeletons or robotics.
- `hive`: Hive characters.
- `anti_prosthetic`: Set by characters/factions that detest cybernetics (e.g. Holy Nation).
- `requires_prosthetics`: Needs robotic limbs.
- `stealth_focused`: Focus on thievery and assassination.

---

## 🧪 Testing Your Data Changes

Before opening a Pull Request with new data, make sure to test that it compiles and doesn't crash the generator:

1. Run the local development server:
   ```bash
   npm run dev
   ```
2. Generate several campaigns using the **Random Run** and **Custom Run** buttons. Check the browser console (F12) for any warnings or errors.
3. Ensure all TypeScript types align correctly with no errors.
