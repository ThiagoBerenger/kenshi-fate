import type { Language } from "../engine/types";

export interface TitleDescriptor {
  adjectives: Record<Language, string[]>;
  nouns: Record<Language, string[]>;
}

export const titleDescriptors: Record<string, TitleDescriptor> = {
  default: {
    adjectives: {
      en: ["Exiled", "Wandering", "Silent", "Iron", "Rusty", "Broken", "Fearless", "Forgotten", "Stalking", "Desert", "Cursed", "Revengeful", "Lone", "Naked", "Cybernetic"],
      pt: ["Exilado", "Andarilho", "Silencioso", "de Ferro", "Enferrujado", "Quebrado", "Destemido", "Esquecido", "Furtivo", "do Deserto", "Amaldiçoado", "Vingativo", "Solitário", "Nu", "Cibernético"],
      es: ["Exiliado", "Vagabundo", "Silencioso", "de Hierro", "Oxidado", "Roto", "Intrépido", "Olvidado", "Furtivo", "del Desierto", "Maldito", "Vengativo", "Solitario", "Desnudo", "Cibernético"],
    },
    nouns: {
      en: ["Ghost", "Shadow", "Blade", "Scrapper", "Rebel", "Drifter", "Emancipator", "Sovereign", "Vagabond", "Avenger", "Outcast", "Pilgrim", "Survivalist", "Veteran"],
      pt: ["Fantasma", "Sombra", "Lâmina", "Sucateiro", "Rebelde", "Caminhante", "Emancipador", "Soberano", "Vagabundo", "Vingador", "Excluído", "Peregrino", "Sobrevivente", "Veterano"],
      es: ["Fantasma", "Sombra", "Hoja", "Chatarrero", "Rebelde", "Caminante", "Emancipador", "Soberano", "Vagabundo", "Vengador", "Marginado", "Peregrino", "Superviviente", "Veterano"],
    },
  },
  holy_nation: {
    adjectives: {
      en: ["Holy", "Zealous", "Devout", "Sacred", "Purified", "Righteous", "Sun-Blessed", "Okranite"],
      pt: ["Sagrado", "Zeloso", "Devoto", "Consagrado", "Purificado", "Justo", "Abençoado", "Okranita"],
      es: ["Sagrado", "Celoso", "Devoto", "Consagrado", "Purificado", "Justo", "Bendito", "Okranita"],
    },
    nouns: {
      en: ["Crusader", "Templar", "Priest", "Paladin", "Apostle", "Inquisitor", "Servant", "Zealot"],
      pt: ["Cruzado", "Templário", "Sacerdote", "Paladino", "Apóstolo", "Inquisidor", "Servo", "Zelote"],
      es: ["Cruzado", "Templario", "Sacerdote", "Paladín", "Apóstol", "Inquisidor", "Siervo", "Celote"],
    },
  },
  united_cities: {
    adjectives: {
      en: ["Imperial", "Noble", "Gilded", "Mercenary", "Corrupt", "Tax-Evading", "Desert-Born"],
      pt: ["Imperial", "Nobre", "Dourado", "Mercenário", "Corrupto", "Sonegador", "Nascido no Deserto"],
      es: ["Imperial", "Noble", "Dorado", "Mercenario", "Corrupto", "Evasor de Impuestos", "Nacido en el Desierto"],
    },
    nouns: {
      en: ["Merchant", "Taxman", "Officer", "Smuggler", "Outlaw", "Bounty Hunter", "Scoundrel"],
      pt: ["Mercador", "Cobrador de Impostos", "Oficial", "Contrabandista", "Fora da Lei", "Caçador de Recompensas", "Malandro"],
      es: ["Comerciante", "Recaudador de Impuestos", "Oficial", "Contrabandista", "Fugitivo", "Cazador de Recompensas", "Granuja"],
    },
  },
  shek: {
    adjectives: {
      en: ["Horned", "Battle-Scarred", "Fierce", "Honor-Bound", "Unbroken", "Unflinching"],
      pt: ["Chifrudo", "Cicatrizado", "Feroz", "Honrado", "Inabalável", "Implacável"],
      es: ["Con Cuernos", "Cicatrizado", "Feroz", "Honrado", "Inquebrantable", "Implacable"],
    },
    nouns: {
      en: ["Warrior", "Gladiator", "Berserker", "Slayer", "Defender", "Chieftain"],
      pt: ["Guerreiro", "Gladiador", "Berserker", "Matador", "Defensor", "Chefe"],
      es: ["Guerrero", "Gladiador", "Berserker", "Asesino", "Defensor", "Jefe"],
    },
  },
  skeleton: {
    adjectives: {
      en: ["Ancient", "Rusty", "Mechanical", "Timeless", "Forgotten", "Iron-Clad", "Calculated"],
      pt: ["Ancião", "Enferrujado", "Mecânico", "Atemporal", "Esquecido", "Blindado", "Calculista"],
      es: ["Antiguo", "Oxidado", "Mecánico", "Atemporal", "Olvidado", "Blindado", "Calculador"],
    },
    nouns: {
      en: ["Android", "Centurion", "Archivist", "Overseer", "Colossus", "Preservationist"],
      pt: ["Androide", "Centurião", "Arquivista", "Supervisor", "Colosso", "Preservacionista"],
      es: ["Androide", "Centurión", "Archivero", "Supervisor", "Coloso", "Preservacionista"],
    },
  },
  hive: {
    adjectives: {
      en: ["Exiled", "Hive-less", "Wingless", "Stray", "Queen's-Own", "Yellow-Eyed"],
      pt: ["Exilado", "Sem Colmeia", "Sem Asas", "Perdido", "da Rainha", "de Olhos Amarelos"],
      es: ["Exiliado", "Sin Colmena", "Sin Alas", "Perdido", "de la Reina", "de Ojos Amarillos"],
    },
    nouns: {
      en: ["Outcast", "Soldier", "Drone", "Prince", "Worker", "Ronin"],
      pt: ["Excluído", "Soldado", "Drone", "Príncipe", "Trabalhador", "Ronin"],
      es: ["Marginado", "Soldado", "Zángano", "Príncipe", "Trabajador", "Ronin"],
    },
  },
};

export const titleTemplates: Record<Language, string[]> = {
  en: [
    "The [Adjective] [Noun]",
    "The [Adjective] [Profession]",
    "[Adjective] [Noun] of the Wasteland",
    "[Profession] of the [Faction]",
    "The [Faction] [Noun]",
    "The [Faction] [Profession]",
    "[Adjective] [Archetype]",
  ],
  pt: [
    "O [Noun] [Adjective]",
    "O [Profession] [Adjective]",
    "[Noun] [Adjective] da Terra Devastada",
    "[Profession] da [Faction]",
    "O [Noun] da [Faction]",
    "O [Profession] da [Faction]",
    "[Archetype] [Adjective]",
  ],
  es: [
    "El [Noun] [Adjective]",
    "El [Profession] [Adjective]",
    "[Noun] [Adjective] del Yermo",
    "[Profession] de la [Faction]",
    "El [Noun] de la [Faction]",
    "El [Profession] de la [Faction]",
    "[Archetype] [Adjective]",
  ],
};
