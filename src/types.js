export const RUNAWAY_MIN_DICE = 5;

export const ITEM_TYPE = {
  MAIN: "MAIN",
  DEUX_MAIN: "DEUX_MAIN",
  ARMURE: "ARMURE",
  CHAUSSURES: "CHAUSSURES",
  COUVRE_CHEF: "COUVRE_CHEF"
};
export const ITEM_TYPE_BIG = {
  GROS: "GROS",
  ARMURE_GROS: "ARMURE_GROS",
  DEUX_MAIN_GROS: "DEUX_MAIN_GROS"
};

export const CLASSES = {
  GUERRIER: "GUERRIER",
  PRETRE: "PRETRE",
  VOLEUR: "VOLEUR",
  MAGICIEN: "MAGICIEN"
};

export const RACES = {
  HUMAIN: "HUMAIN",
  NAIN: "NAIN",
  HALFELIN: "HALFELIN",
  ELFE: "ELFE"
};

export const TYPE_CARTE = {
  MONSTRE: "MONSTRE",
  ITEM: "ITEM",
  RACE: "RACE",
  CLASSE: "CLASSE",
  MALEDICTION: "MALEDICTION",
  POTION: "POTION",
  GAIN_NIVEAU: "GAIN_NIVEAU",
  USAGE_UNIQUE: "USAGE_UNIQUE"
};

export const FIGHT_RESULT = {
  WIN: "WIN",
  LOOSE: "LOOSE"
};

export const GAME_STEPS = {
  OPEN_DOOR: "MONSTRE",
  TROUBLE: "TROUBLE",
  LOOT: "LOOT",
  CHARITY: "CHARITY",
  END: "END",
  RUN_AWAY: "RUN_AWAY"
};

export function perteNiveau(player) {
  if (player.level > 1) {
    player.level--;
  }
}

// donjon
export const CARTES_CLASSE = [
  {
    type: TYPE_CARTE.CLASSE,
    name: CLASSES.GUERRIER
  },
  {
    type: TYPE_CARTE.CLASSE,
    name: CLASSES.PRETRE
  },
  {
    type: TYPE_CARTE.CLASSE,
    name: CLASSES.VOLEUR
  },
  {
    type: TYPE_CARTE.CLASSE,
    name: CLASSES.MAGICIEN
  }
];

// donjon
export const CARTES_RACE = [
  {
    type: TYPE_CARTE.RACE,
    name: RACES.NAIN
  },
  {
    type: TYPE_CARTE.RACE,
    name: RACES.HALFELIN
  },
  {
    type: TYPE_CARTE.RACE,
    name: RACES.ELFE
  }
];

// donjon
export const MONSTERS = [
  {
    type: TYPE_CARTE.MONSTRE,
    name: "Mucus baveux",
    level: 1,
    levelGain: 1,
    treasureGain: 1,
    bonusContre: {
      race: RACES.ELFE,
      bonus: 4
    },
    incidentFn(player) {
      const index = player.cards.findIndex(
        (card) => card.type === ITEM_TYPE.CHAUSSURES
      );
      if (index !== -1) {
        player.cards.splice(index, 1);
      } else {
        perteNiveau(player);
      }
    }
  },
  {
    type: TYPE_CARTE.MONSTRE,
    name: "Rat musclé",
    level: 1,
    levelGain: 1,
    treasureGain: 1,
    bonusContre: {
      race: RACES.PRETRE,
      bonus: 3
    },
    incidentFn(player) {
      perteNiveau(player);
    }
  }
  // {
  //   type: TYPE_CARTE.MONSTRE,
  //   name: "3872 orques",
  //   level: 10,
  //   levelGain: 1,
  //   treasureGain: 3,
  //   bonusContre: {
  //     race: RACES.NAIN,
  //     bonus: 6
  //   },
  //   incident: {
  //     type: "DE",
  //     value: {
  //       1: "DEAD",
  //       2: "DEAD",
  //       3: -3,
  //       4: -4,
  //       5: -5,
  //       6: -6
  //     }
  //   }
  // },
  // {
  //   type: TYPE_CARTE.MONSTRE,
  //   name: "Lépreuxchaun",
  //   level: 4,
  //   levelGain: 1,
  //   treasureGain: 2,
  //   bonusContre: {
  //     race: RACES.ELFE,
  //     bonus: 5
  //   },
  //   incident: {
  //     type: TYPE_CARTE.ITEM,
  //     value: 2
  //   }
  // }
];

// donjon
export const CURSES = [
  {
    type: TYPE_CARTE.MALEDICTION,
    name: "Malédiction",
    perteItem: ITEM_TYPE.CHAUSSURES
  },
  {
    type: TYPE_CARTE.MALEDICTION,
    name: "Malédiction",
    perteItem: ITEM_TYPE.COUVRE_CHEF
  },
  {
    type: TYPE_CARTE.MALEDICTION,
    name: "Commun des mortels",
    perteItem: "RACE"
  }
];

export const DONJONS = [
  ...CARTES_CLASSE,
  ...CARTES_RACE,
  ...MONSTERS,
  ...CURSES
];

// tresor
export const GAIN_NIVEAUX = [
  {
    type: TYPE_CARTE.GAIN_NIVEAU,
    name: "Invocation de règles obscures",
    gainNiveau: 1
  }
];

// tresor
export const USAGE_UNIQUES = [
  {
    type: TYPE_CARTE.USAGE_UNIQUE,
    name: "Anneau de souhait",
    annuleMalediction: true,
    peuxEtreJoueNimporteQuand: true
  }
];

// tresor
export const ITEMS = [
  {
    type: TYPE_CARTE.ITEM,
    name: "Potion de poison enflammé",
    bonus: 3,
    valeur: 100,
    usageUnique: true
  },
  {
    type: TYPE_CARTE.ITEM,
    name: "Cape d'ombre",
    bonus: 4,
    valeur: 600,
    reserveA: CLASSES.VOLEUR
  },
  {
    type: TYPE_CARTE.ITEM,
    name: "Cape d'ombre",
    bonus: 4,
    valeur: 600,
    reserveA: CLASSES.VOLEUR
  },
  {
    type: TYPE_CARTE.ITEM,
    name: "Sandales de protection",
    bonus: 0,
    valeur: 700,
    typeItem: ITEM_TYPE.CHAUSSURES
  },
  {
    type: TYPE_CARTE.ITEM,
    name: "Armure de mithril",
    bonus: 3,
    valeur: 600,
    typeItem: ITEM_TYPE_BIG.ARMURE_GROS,
    sousType: "GROS",
    interditA: CLASSES.MAGICIEN
  },
  {
    type: TYPE_CARTE.ITEM,
    name: "Brochette de rat de mithril",
    bonus: 1,
    valeur: 0,
    typeItem: ITEM_TYPE_BIG.MAIN,
    vaincreMonstreSiDefausse: 8
  },
  {
    type: TYPE_CARTE.ITEM,
    name: "Hallebarde Suisse multifonctions",
    bonus: 4,
    valeur: 600,
    typeItem: ITEM_TYPE_BIG.DEUX_MAIN_GROS,
    sousType: "GROS",
    reserveA: RACES.HUMAIN
  }
];

export const createCartesTresor = () => {
  return [...GAIN_NIVEAUX, ...ITEMS];
};

export const TRESORS = [...GAIN_NIVEAUX, ...ITEMS];
