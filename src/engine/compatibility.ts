import type { TaggedItem } from "./types";

/**
 * Checks if a tagged item is compatible with the currently accumulated active tags
 * and accumulated forbidden/incompatible tags.
 */
export function isCompatible(
  item: TaggedItem,
  activeTags: Set<string>,
  accumulatedIncompatibilities: Set<string>
): boolean {
  // 1. Check if the item's tags are in the forbidden/incompatible set
  if (item.tags) {
    for (const t of item.tags) {
      if (accumulatedIncompatibilities.has(t)) {
        return false;
      }
    }
  }

  // 2. Check if the item's incompatible tags are already in the active tags set
  if (item.incompatibleTags) {
    for (const t of item.incompatibleTags) {
      if (activeTags.has(t)) {
        return false;
      }
    }
  }

  // 3. Check if the item requires tags that are not currently active
  if (item.requiresTags) {
    for (const t of item.requiresTags) {
      if (!activeTags.has(t)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Updates the active tags and incompatibility sets with a newly selected item's properties.
 */
export function registerItem(
  item: TaggedItem,
  activeTags: Set<string>,
  accumulatedIncompatibilities: Set<string>
): void {
  if (item.tags) {
    for (const t of item.tags) {
      activeTags.add(t);
    }
  }

  if (item.incompatibleTags) {
    for (const t of item.incompatibleTags) {
      accumulatedIncompatibilities.add(t);
    }
  }
}
