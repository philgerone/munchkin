import { randomInt } from "./helpers";

export const ENDPOINT = "http://192.168.1.82:8081";

export const RUNAWAY_MIN_DICE = 5;

export const DECK_TYPE = {
  DONJON: "DONJON",
  TRESOR: "TRESOR"
};

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
  INIT: "INIT",
  OPEN_DOOR: "MONSTRE",
  TROUBLE: "TROUBLE",
  COMBAT: "COMBAT",
  RUN_AWAY: "RUN_AWAY",
  LOOT: "LOOT",
  CHARITY: "CHARITY",
  END: "END"
};

export function perteNiveau(player, valeur = 1) {
  if (player.level > 1) {
    player.level = player.level - perteNiveau;
  }
}

// donjon
export const CARTES_CLASSE = [
  {
    type: TYPE_CARTE.CLASSE,
    deck: DECK_TYPE.DONJON,
    name: "Classe " + CLASSES.GUERRIER
  },
  {
    type: TYPE_CARTE.CLASSE,
    deck: DECK_TYPE.DONJON,
    name: "Classe " + CLASSES.PRETRE
  },
  {
    type: TYPE_CARTE.CLASSE,
    deck: DECK_TYPE.DONJON,
    name: "Classe " + CLASSES.VOLEUR
  },
  {
    type: TYPE_CARTE.CLASSE,
    deck: DECK_TYPE.DONJON,
    name: "Classe " + CLASSES.MAGICIEN
  }
];

// donjon
export const CARTES_RACE = [
  {
    type: TYPE_CARTE.RACE,
    deck: DECK_TYPE.DONJON,
    name: "Race " + RACES.NAIN
  },
  {
    type: TYPE_CARTE.RACE,
    deck: DECK_TYPE.DONJON,
    name: "Race " + RACES.HALFELIN
  },
  {
    type: TYPE_CARTE.RACE,
    deck: DECK_TYPE.DONJON,
    name: "Race " + RACES.ELFE
  }
];

// donjon
export const MONSTERS = [
  {
    type: TYPE_CARTE.MONSTRE,
    deck: DECK_TYPE.DONJON,
    name: "Mucus baveux",
    tooltip: "+4 contre les Elfes",
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
        return `Le joueur ${player.name} a perdu ses chaussures`;
      } else {
        perteNiveau(player);
        return `Le joueur ${player.name} a perdu 1 niveau`;
      }
    }
  },
  {
    type: TYPE_CARTE.MONSTRE,
    deck: DECK_TYPE.DONJON,
    name: "Rat musclé",
    tooltip: "+3 contre les Prêtres",
    level: 1,
    levelGain: 1,
    treasureGain: 1,
    bonusContre: {
      race: RACES.PRETRE,
      bonus: 3
    },
    incidentFn(player) {
      perteNiveau(player);
      return `Le joueur ${player.name} a perdu 1 niveau`;
    }
  },
  {
    type: TYPE_CARTE.MONSTRE,
    deck: DECK_TYPE.DONJON,
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
    },
    incidentFn(player) {
      const dice = randomInt(1, 6);
      switch (dice) {
        case 1:
          player.dead = true;
          return `Le joueur ${player.name} est mort`;
        case 2:
          player.dead = true;
          return `Le joueur ${player.name} est mort`;
        case 3:
          perteNiveau(player, 3);
          break;
        case 4:
          perteNiveau(player, 4);
          break;
        case 5:
          perteNiveau(player, 5);
          break;
        case 6:
          perteNiveau(player, 6);
          break;
        default:
      }
      return `Le joueur ${player.name} a perdu ${dice} niveaux`;
    }
  },
  {
    type: TYPE_CARTE.MONSTRE,
    deck: DECK_TYPE.DONJON,
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
    },
    incidentFn(player) {
      // prend 2 objects
      player.cards.pop();
      player.cards.pop();

      return `Le joueur ${player.name} a perdu 2 objets`;
    }
  }
];

// donjon
export const CURSES = [
  {
    type: TYPE_CARTE.MALEDICTION,
    deck: DECK_TYPE.DONJON,
    name: "Malédiction 1",
    tooltip: "Perte de chaussures",
    perteItem: ITEM_TYPE.CHAUSSURES,
    perteItemFn(player) {
      player.equipement.chaussures = null;
      return `Le joueur ${player.name} a perdu ses chaussures`;
    }
  },
  {
    type: TYPE_CARTE.MALEDICTION,
    deck: DECK_TYPE.DONJON,
    name: "Malédiction 2",
    tooltip: "Perte de couvre chef",
    perteItem: ITEM_TYPE.COUVRE_CHEF,
    perteItemFn(player) {
      player.equipement.couvreChef = null;
      return `Le joueur ${player.name} a perdu son couvre chef`;
    }
  },
  {
    type: TYPE_CARTE.MALEDICTION,
    deck: DECK_TYPE.DONJON,
    name: "Commun des mortels",
    tooltip: "Perte de race",
    perteItem: "RACE",
    perteItemFn(player) {
      player.race = RACES.HUMAIN;
      return `Le joueur ${player.name} a perdu sa race`;
    }
  }
];

function randomizeArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const _cartesDonjons = [
  ...CARTES_CLASSE,
  ...CARTES_RACE,
  ...MONSTERS,
  ...CURSES
];
randomizeArray(_cartesDonjons);
export const DONJONS = _cartesDonjons;

// tresor
export const GAIN_NIVEAUX = [
  {
    type: TYPE_CARTE.GAIN_NIVEAU,
    deck: DECK_TYPE.TRESOR,
    name: "Invocation de règles obscures",
    gainNiveau: 1
  }
];

// tresor
export const USAGE_UNIQUES = [
  {
    type: TYPE_CARTE.USAGE_UNIQUE,
    deck: DECK_TYPE.TRESOR,
    name: "Anneau de souhait",
    annuleMalediction: true,
    peuxEtreJoueNimporteQuand: true
  }
];

export const ITEM_SOUS_TYPE = {
  NORMAL: "NORMAL",
  GROS: "GROS"
};

// tresor
export const ITEMS = [
  {
    type: TYPE_CARTE.ITEM,
    deck: DECK_TYPE.TRESOR,
    name: "Anneau de souhait",
    tooltip: "Annule n'importe quelle malédiction",
    annuleMalediction: true,
    bonus: 0,
    valeur: 500,
    usageUnique: true
  },
  {
    type: TYPE_CARTE.ITEM,
    deck: DECK_TYPE.TRESOR,
    name: "Potion de poison enflammé",
    bonus: 3,
    valeur: 100,
    usageUnique: true
  },
  {
    type: TYPE_CARTE.ITEM,
    deck: DECK_TYPE.TRESOR,
    name: "Cape d'ombre",
    tooltip: "Réservée aux voleurs",
    bonus: 4,
    valeur: 600,
    reserveA: CLASSES.VOLEUR
  },
  {
    type: TYPE_CARTE.ITEM,
    deck: DECK_TYPE.TRESOR,
    name: "Cape d'ombre",
    tooltip: "Réservée aux voleurs",
    bonus: 4,
    valeur: 600,
    reserveA: CLASSES.VOLEUR
  },
  {
    type: TYPE_CARTE.ITEM,
    deck: DECK_TYPE.TRESOR,
    name: "Sandales de protection",
    bonus: 0,
    valeur: 700,
    typeItem: ITEM_TYPE.CHAUSSURES
  },
  {
    type: TYPE_CARTE.ITEM,
    deck: DECK_TYPE.TRESOR,
    name: "Armure de mithril",
    bonus: 3,
    valeur: 600,
    typeItem: ITEM_TYPE_BIG.ARMURE_GROS,
    sousType: ITEM_SOUS_TYPE.GROS,
    interditA: CLASSES.MAGICIEN
  },
  {
    type: TYPE_CARTE.ITEM,
    deck: DECK_TYPE.TRESOR,
    name: "Brochette de rat de mithril",
    bonus: 1,
    valeur: 0,
    typeItem: ITEM_TYPE_BIG.MAIN,
    vaincreMonstreSiDefausse: 8
  },
  {
    type: TYPE_CARTE.ITEM,
    deck: DECK_TYPE.TRESOR,
    name: "Hallebarde Suisse multifonctions",
    bonus: 4,
    valeur: 600,
    typeItem: ITEM_TYPE_BIG.DEUX_MAIN_GROS,
    sousType: ITEM_SOUS_TYPE.GROS,
    reserveA: RACES.HUMAIN
  }
];

export const createCartesTresor = () => {
  return [...GAIN_NIVEAUX, ...ITEMS];
};

const _cartesTresors = [...GAIN_NIVEAUX, ...ITEMS];
randomizeArray(_cartesTresors);
export const TRESORS = _cartesTresors;
