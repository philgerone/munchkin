import { createArray } from "./helpers";
import { TYPE_CARTE } from "./types";

class Card {
  constructor(name, type, bonus) {
    this.name = name;
    this.type = type;
    this.inHand = true;
  }
}

class Item extends Card {
  constructor(name, bonus, value, reserveA, interditA) {
    super(name, TYPE_CARTE.ITEM);
    this.bonus = bonus;
    this.value = value;
    this.reserveA = reserveA;
    this.interditA = interditA;
  }
}

class Curse extends Card {
  constructor(name, fn) {
    super(name, TYPE_CARTE.MALEDICTION);
    this.fn = fn;
  }

  appyCurse(player) {
    this.fn(player);
  }
}

class Race extends Card {
  constructor(name, bonus, value) {
    super(name, TYPE_CARTE.RACE);
    this.bonus = bonus;
    this.value = value;
  }
}

class Class extends Card {
  constructor(name, bonus, value) {
    super(name, TYPE_CARTE.CLASSE);
    this.bonus = bonus;
    this.value = value;
  }
}

class Monster extends Card {
  constructor(name, level, levelGain, treasureGain) {
    super(name, TYPE_CARTE.MONSTRE);
    this.level = level;
    this.levelGain = levelGain;
    this.treasureGain = treasureGain;
  }
}

const createMonsters = (nb) => {
  return createArray(nb).map((i) => {
    const index = i + 1;
    const m = new Monster("Monster " + index, index, 1, 1);
    m.index = i;
    return m;
  });
};

const createItems = (nb) => {
  return createArray(nb).map((i) => {
    const index = i + 1;
    const m = new Item("Item " + index, index, 100);
    m.index = i;
    return m;
  });
};

export { Item, Monster, Curse, Race, Class, createMonsters, createItems };
