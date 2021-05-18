import { TYPE_CARTE } from "./types";

class Player {
  constructor(name) {
    this.name = name;
    this.level = 1;
    this.cards = [];
    this.class = null;
    this.race = "human";
  }

  get bonuses() {
    return this.cards
      .filter((card) => card.type === TYPE_CARTE.ITEM)
      .reduce((acc, card) => {
        acc = acc + card.bonus;
        return acc;
      }, 0);
  }

  get fightLevel() {
    return this.level + this.bonuses;
  }

  get cardsCount() {
    return this.cards.length;
  }

  addCards(cards) {
    cards.forEach((card) => {
      this.cards.push(card);
    });
  }

  addCard(card) {
    this.cards.push(card);
  }

  // true if wins
  fight(monster) {
    if (this.fightLevel > monster.level) {
      return true;
    } else {
      return false;
    }
  }
}

export default Player;
