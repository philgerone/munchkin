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
  GAIN_NIVEAU: "GAIN_NIVEAU"
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
  END: "END"
};

export const MONSTERS = [
  {
    name: "3872 orques",
    level: 10,
    levelGain: 1,
    treasureGain: 3,
    bonusContre: {
      race: RACES.NAIN,
      bonus: 6
    },
    incident: {
      type: "DE",
      value: {
        1: "DEAD",
        2: "DEAD",
        3: -3,
        4: -4,
        5: -5,
        6: -6
      }
    }
  },
  {
    name: "Lépreuxchaun",
    level: 4,
    levelGain: 1,
    treasureGain: 2,
    bonusContre: {
      race: RACES.ELFE,
      bonus: 5
    },
    incident: {
      type: TYPE_CARTE.ITEM,
      value: 2
    }
  }
];

export const CURSES = [
  {
    name: "Malédiction",
    perteItem: ITEM_TYPE.CHAUSSURES
  },
  {
    name: "Malédiction",
    perteItem: ITEM_TYPE.COUVRE_CHEF
  }
];

export const ITEMS = [
  {
    name: "Invocation de règles obscures",
    gainNiveau: 1
  },
  {
    name: "Potion de poison enflammé",
    bonus: 3,
    valeur: 100,
    usageUnique: true
  },
  {
    name: "Cape d'ombre",
    bonus: 4,
    valeur: 600,
    reserveA: CLASSES.VOLEUR
  },
  {
    name: "Sandales de protection",
    bonus: 0,
    valeur: 700,
    type: ITEM_TYPE.CHAUSSURES
  },
  {
    name: "Armure de mithril",
    bonus: 3,
    valeur: 600,
    type: ITEM_TYPE_BIG.ARMURE_GROS,
    sousType: "GROS",
    interditA: CLASSES.MAGICIEN
  },
  {
    name: "Brochette de rat de mithril",
    bonus: 1,
    valeur: 0,
    type: ITEM_TYPE_BIG.MAIN,
    vaincreMonstreSiDefausse: 8
  },
  {
    name: "Hallebarde Suisse multifonctions",
    bonus: 4,
    valeur: 600,
    type: ITEM_TYPE_BIG.DEUX_MAIN_GROS,
    sousType: "GROS",
    reserveA: RACES.HUMAIN
  }
];
