import type { RuleItem } from "../engine/types";

export const recruitmentRules: RuleItem[] = [
  {
    id: "recruitment_unlimited",
    name: { en: "Unlimited Recruitment", pt: "Recrutamento Ilimitado", es: "Reclutamiento Ilimitado" },
    description: {
      en: "Recruit anyone you want, up to the vanilla squad limits.",
      pt: "Recrute quem você quiser, até os limites padrão do jogo.",
      es: "Recluta a quien quieras, hasta los límites estándar de la escuadra.",
    },
    weight: 10,
    difficultyLevels: [0, 1],
    incompatibleTags: ["solo"],
    contentPack: "vanilla",
  },
  {
    id: "recruitment_limited",
    name: { en: "Small Squad Limit (Max 5)", pt: "Esquadrão Pequeno (Máx 5)", es: "Escuadra Pequeña (Máx 5)" },
    description: {
      en: "You may have a maximum of 5 squad members in your faction.",
      pt: "Você pode ter no máximo 5 membros em sua facção.",
      es: "Puedes tener un máximo de 5 miembros en tu facción.",
    },
    weight: 8,
    difficultyLevels: [0, 1, 2],
    incompatibleTags: ["solo"],
    contentPack: "vanilla",
  },
  {
    id: "recruitment_solo",
    name: { en: "Solo Run", pt: "Campanha Solo", es: "Partida en Solitario" },
    description: {
      en: "No recruitment allowed. You must complete the entire playthrough alone.",
      pt: "Nenhum recrutamento permitido. Você deve completar a campanha inteira sozinho.",
      es: "No se permite el reclutamiento. Debes completar toda la partida solo.",
    },
    weight: 6,
    difficultyLevels: [0, 1, 2, 3],
    tags: ["solo"],
    incompatibleTags: ["multi_character"],
    contentPack: "vanilla",
  },
  {
    id: "recruitment_same_race",
    name: { en: "Same Race Only", pt: "Apenas Mesma Raça", es: "Solo Misma Raza" },
    description: {
      en: "You may only recruit characters of the same race as your main character.",
      pt: "Você só pode recrutar personagens da mesma raça do seu personagem principal.",
      es: "Solo puedes reclutar personajes de la misma raza que tu personaje principal.",
    },
    weight: 5,
    difficultyLevels: [1, 2, 3],
    incompatibleTags: ["solo"],
    contentPack: "vanilla",
  },
  {
    id: "recruitment_freed_only",
    name: { en: "Liberated Slaves Only", pt: "Apenas Escravos Libertados", es: "Solo Esclavos Liberados" },
    description: {
      en: "You may only recruit characters by freeing them from slavery or prisons.",
      pt: "Você só pode recrutar personagens libertando-os da escravidão ou de prisões.",
      es: "Solo puedes reclutar personajes liberándolos de la esclavitud o las prisiones.",
    },
    weight: 5,
    difficultyLevels: [1, 2, 3],
    incompatibleTags: ["solo"],
    contentPack: "vanilla",
  },
];

export const baseBuildingRules: RuleItem[] = [
  {
    id: "base_allowed",
    name: { en: "Outpost Construction Allowed", pt: "Construção de Base Permitida", es: "Construcción de Base Permitida" },
    description: {
      en: "You are free to build outposts and bases anywhere on the map.",
      pt: "Você é livre para construir bases e postos avançados em qualquer lugar do mapa.",
      es: "Eres libre de construir puestos avanzados y bases en cualquier lugar del mapa.",
    },
    weight: 10,
    difficultyLevels: [0, 1, 2],
    contentPack: "vanilla",
  },
  {
    id: "base_forbidden",
    name: { en: "No Outposts (Nomad / City Dwellers)", pt: "Sem Bases (Nômade / Morador de Cidade)", es: "Sin Bases (Nómada / Habitante de Ciudad)" },
    description: {
      en: "You cannot build outposts. You must buy houses in existing cities or live as a nomad.",
      pt: "Você não pode construir bases. Deve comprar casas nas cidades existentes ou viver como nômade.",
      es: "No puedes construir puestos avanzados. Debes comprar casas en ciudades existentes o vivir como nómada.",
    },
    weight: 8,
    difficultyLevels: [0, 1, 2, 3],
    tags: ["base_forbidden"],
    contentPack: "vanilla",
  },
  {
    id: "base_required",
    name: { en: "Mandatory Outpost Establishment", pt: "Estabelecimento de Base Obrigatório", es: "Establecimiento de Base Obligatorio" },
    description: {
      en: "You must establish a self-sustaining base before day 30.",
      pt: "Você deve estabelecer uma base autossustentável antes do dia 30.",
      es: "Debes establecer una base autosuficiente antes del día 30.",
    },
    weight: 6,
    difficultyLevels: [0, 1, 2, 3],
    incompatibleTags: ["solo"],
    contentPack: "vanilla",
  },
  {
    id: "base_hostile",
    name: { en: "Outpost in Hostile Zone", pt: "Base em Zona Hostil", es: "Base en Zona Hostil" },
    description: {
      en: "You must build your primary base in a highly dangerous zone (e.g. Fog Islands, Cannibal Plains, Ashlands).",
      pt: "Você deve construir sua base principal em uma zona altamente perigosa (ex: Fog Islands, Cannibal Plains, Ashlands).",
      es: "Debes construir tu base principal en una zona muy peligrosa (ej. Islas de la Niebla, Llanuras Caníbales, Ashlands).",
    },
    weight: 4,
    difficultyLevels: [2, 3],
    contentPack: "vanilla",
  },
];

export const economyRules: RuleItem[] = [
  {
    id: "economy_standard",
    name: { en: "Standard Economy", pt: "Economia Padrão", es: "Economía Estándar" },
    description: {
      en: "No special restrictions on buying, selling, or trade.",
      pt: "Sem restrições especiais para compra, venda ou comércio.",
      es: "Sin restricciones especiales sobre compras, ventas o comercio.",
    },
    weight: 10,
    difficultyLevels: [0, 1],
    contentPack: "vanilla",
  },
  {
    id: "economy_no_copper",
    name: { en: "No Copper Mining For Profit", pt: "Sem Mineração de Cobre para Lucro", es: "Sin Minería de Cobre para Lucro" },
    description: {
      en: "You cannot mine or sell copper to make Cats. Iron mining is allowed.",
      pt: "Você não pode minerar ou vender cobre para ganhar Cats. Mineração de ferro é permitida.",
      es: "No puedes minar ni vender cobre para ganar Cats. Se permite la minería de hierro.",
    },
    weight: 8,
    difficultyLevels: [0, 1, 2, 3],
    contentPack: "vanilla",
  },
  {
    id: "economy_no_stealing",
    name: { en: "No Stealing For Profit", pt: "Sem Roubo para Lucro", es: "Sin Robo para Lucro" },
    description: {
      en: "You may steal items for personal use, but you can never sell stolen items to vendors.",
      pt: "Você pode roubar itens para uso pessoal, mas nunca pode vender itens roubados para comerciantes.",
      es: "Puedes robar artículos para uso personal, pero nunca puedes vender artículos robados a comerciantes.",
    },
    weight: 8,
    difficultyLevels: [1, 2, 3],
    contentPack: "vanilla",
  },
  {
    id: "economy_looting_only",
    name: { en: "Scavenger Economy (Looting Only)", pt: "Economia Sucateira (Apenas Saque)", es: "Economía de Carroñero (Solo Saqueo)" },
    description: {
      en: "You cannot purchase items from shops. You must loot or craft everything you use.",
      pt: "Você não pode comprar itens em lojas. Deve saquear ou fabricar tudo o que usar.",
      es: "No puedes comprar artículos en las tiendas. Debes saquear o fabricar todo lo que uses.",
    },
    weight: 3,
    difficultyLevels: [2, 3],
    contentPack: "vanilla",
  },
];

export const prostheticsRules: RuleItem[] = [
  {
    id: "prosthetics_allowed",
    name: { en: "Cybernetics Allowed", pt: "Cibernética Permitida", es: "Cibernética Permitida" },
    description: {
      en: "Use robotic limbs freely when limbs are lost or to upgrade stats.",
      pt: "Use membros robóticos livremente quando perder membros ou para melhorar atributos.",
      es: "Usa extremidades robóticas libremente cuando se pierdan extremidades o para mejorar estadísticas.",
    },
    weight: 10,
    difficultyLevels: [0, 1, 2, 3],
    contentPack: "vanilla",
  },
  {
    id: "prosthetics_forbidden",
    name: { en: "No Cybernetics (Flesh Only)", pt: "Sem Cibernética (Apenas Carne)", es: "Sin Cibernética (Solo Carne)" },
    description: {
      en: "You cannot use robotic limbs. If a character loses a limb, they must crawl or be carried.",
      pt: "Você não pode usar membros robóticos. Se um personagem perder um membro, deve rastejar ou ser carregado.",
      es: "No puedes usar extremidades robóticas. Si un personaje pierde una extremidad, debe gatear o ser cargado.",
    },
    weight: 6,
    difficultyLevels: [1, 2, 3],
    tags: ["anti_prosthetic"],
    incompatibleTags: ["skeleton", "robotic", "requires_prosthetics", "torso_start"],
    contentPack: "vanilla",
  },
  {
    id: "prosthetics_required",
    name: { en: "Cybernetic Upgrade Required", pt: "Melhoria Cibernética Obrigatória", es: "Mejora Cibernética Obligatoria" },
    description: {
      en: "You must replace at least one limb with a robotic prosthetic as soon as possible.",
      pt: "Você deve substituir pelo menos um membro por uma prótese robótica o mais rápido possível.",
      es: "Debes reemplazar al menos una extremidad con una prótesis robótica lo antes posible.",
    },
    weight: 5,
    difficultyLevels: [1, 2, 3],
    tags: ["requires_prosthetics"],
    incompatibleTags: ["anti_prosthetic", "holy_nation_fanatic"],
    contentPack: "vanilla",
  },
];

export const saveRules: RuleItem[] = [
  {
    id: "save_reloading",
    name: { en: "Reloading Allowed (Standard)", pt: "Recarregar Permitido (Padrão)", es: "Permitido Recargar (Estándar)" },
    description: {
      en: "Feel free to load previous saves to recover from mistakes or squad wipes.",
      pt: "Sinta-se livre para carregar saves anteriores para se recuperar de erros ou mortes do esquadrão.",
      es: "Siéntete libre de cargar guardados anteriores para recuperarte de errores o muertes del grupo.",
    },
    weight: 10,
    difficultyLevels: [0, 1],
    contentPack: "vanilla",
  },
  {
    id: "save_semi_ironman",
    name: { en: "Semi-Ironman", pt: "Semi-Ironman", es: "Semi-Ironman" },
    description: {
      en: "Only reload saves to recover from game-breaking bugs or complete squad wipes (death). No save-scumming failed lockpicks/thefts.",
      pt: "Recarregue apenas em bugs críticos ou morte completa do esquadrão. Sem trapacear em furtos ou arrombamentos fracassados.",
      es: "Solo carga para recuperarte de bugs críticos o muerte completa del grupo. Sin hacer trampas en robos o cerraduras fallidas.",
    },
    weight: 8,
    difficultyLevels: [0, 1, 2],
    contentPack: "vanilla",
  },
  {
    id: "save_true_ironman",
    name: { en: "True Ironman", pt: "True Ironman", es: "True Ironman" },
    description: {
      en: "No reloading allowed. Live with the consequences of every action, death, and limb loss.",
      pt: "Não é permitido recarregar. Viva com as consequências de cada ação, morte e perda de membros.",
      es: "No se permite recargar. Vive con las consecuencias de cada acción, muerte y pérdida de extremidades.",
    },
    weight: 6,
    difficultyLevels: [1, 2, 3],
    contentPack: "vanilla",
  },
];
