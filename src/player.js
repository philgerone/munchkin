import Equipements from "./equipements";
import { ITEM_TYPE, TYPE_CARTE, RACES } from "./types";

class Player {
  constructor(name) {
    this.name = name;
    this.level = 1;
    this.cards = [];
    this.main = [];
    this.classe = null;
    this.race = RACES.HUMAIN;

    this.equipements = new Equipements(this);
  }

  get hasMonsters() {
    return (
      this.cards.filter((card) => card.type === TYPE_CARTE.MONSTRE).length !== 0
    );
  }

  get monsters() {
    return this.cards.filter((card) => card.type === TYPE_CARTE.MONSTRE);
  }

  get wins() {
    return this.level >= 10;
  }

  get bonuses() {
    return this.cards
      .filter((card) => card.type === TYPE_CARTE.ITEM)
      .reduce((acc, card) => {
        acc = acc + card.bonus;
        return acc;
      }, 0);
  }

  get items() {
    return this.cards.filter((card) => card.type === TYPE_CARTE.ITEM);
  }

  get fightLevel() {
    return this.level + this.bonuses;
  }

  get cardsCount() {
    return this.main.length;
  }

  defausse(card, deck) {
    const index = this.cards.findIndex((mycard) => mycard.name === card.name);
    if (index !== -1) {
      const removed = this.cards.splice(index, 1);
      deck.cards.push(removed);
    }
  }

  unequip(card) {
    this.equipements.unequip(card);
  }

  equip(card) {
    this.equipements.equip(card);
  }

  addCards(cards) {
    cards.forEach((card) => {
      this.cards.push(card);
    });
  }

  addCard(card) {
    this.cards.push(card);
  }

  curse(card) {}

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
