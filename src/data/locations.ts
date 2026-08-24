import type { LocalizedString } from "../engine/types";

export interface LocationItem {
  id: string;
  name: LocalizedString;
  x: number; // percentage from left (0 to 100)
  y: number; // percentage from top (0 to 100)
}

export const locations: LocationItem[] = [
  {
    id: "the_hub",
    name: { en: "The Hub", pt: "O Hub", es: "El Hub" },
    x: 35,
    y: 52,
  },
  {
    id: "squin",
    name: { en: "Squin", pt: "Squin", es: "Squin" },
    x: 28,
    y: 58,
  },
  {
    id: "stack",
    name: { en: "Stack", pt: "Stack", es: "Stack" },
    x: 30,
    y: 44,
  },
  {
    id: "bad_teeth",
    name: { en: "Bad Teeth", pt: "Dentes Ruins", es: "Dientes Malos" },
    x: 38,
    y: 42,
  },
  {
    id: "blister_hill",
    name: { en: "Blister Hill", pt: "Blister Hill", es: "Blister Hill" },
    x: 40,
    y: 32,
  },
  {
    id: "sho_battai",
    name: { en: "Sho-Battai", pt: "Sho-Battai", es: "Sho-Battai" },
    x: 75,
    y: 22,
  },
  {
    id: "heft",
    name: { en: "Heft", pt: "Heft", es: "Heft" },
    x: 82,
    y: 32,
  },
  {
    id: "heng",
    name: { en: "Heng", pt: "Heng", es: "Heng" },
    x: 80,
    y: 45,
  },
  {
    id: "stoat",
    name: { en: "Stoat", pt: "Stoat", es: "Stoat" },
    x: 70,
    y: 30,
  },
  {
    id: "worlds_end",
    name: { en: "World's End", pt: "World's End", es: "Fin del Mundo" },
    x: 48,
    y: 18,
  },
  {
    id: "mongrel",
    name: { en: "Mongrel", pt: "Mongrel", es: "Mongrel" },
    x: 18,
    y: 38,
  },
  {
    id: "shark",
    name: { en: "Shark", pt: "Shark", es: "Shark" },
    x: 35,
    y: 68,
  },
  {
    id: "black_desert_city",
    name: { en: "Black Desert City", pt: "Black Desert City", es: "Ciudad del Desierto Negro" },
    x: 52,
    y: 46,
  },
  {
    id: "admag",
    name: { en: "Admag", pt: "Admag", es: "Admag" },
    x: 15,
    y: 58,
  },
  {
    id: "catun",
    name: { en: "Catun", pt: "Catun", es: "Catun" },
    x: 55,
    y: 82,
  },
  {
    id: "arach",
    name: { en: "Arach (Bugmaster)", pt: "Arach (Bugmaster)", es: "Arach (Bugmaster)" },
    x: 12,
    y: 80,
  },
  {
    id: "ashlands",
    name: { en: "The Ashlands", pt: "As Ashlands", es: "Las Ashlands" },
    x: 85,
    y: 85,
  },
  {
    id: "rebirth",
    name: { en: "Rebirth", pt: "Rebirth", es: "Renacimiento" },
    x: 38,
    y: 24,
  },
  {
    id: "dust_king_tower",
    name: { en: "Dust King Tower", pt: "Torre do Rei do Pó", es: "Torre del Rey del Polvo" },
    x: 42,
    y: 52,
  },
];
