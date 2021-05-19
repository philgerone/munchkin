import { ITEM_TYPE, TYPE_CARTE, RACES } from "./types";

class Player {
  constructor(name) {
    this.name = name;
    this.level = 1;
    this.cards = [];
    this.main = [];
    this.classe = null;
    this.race = RACES.HUMAIN;
    this.armure = null;
    this.couvreChef = null;
    this.deuxMains = null;
    this.mainGauche = null;
    this.mainDroite = null;
    this.chaussures = null;
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
    card.porte = false;
    switch (card.typeItem) {
      case ITEM_TYPE.CHAUSSURES:
        this.chaussures = null;
        break;
      default:
    }
  }

  equip(card) {
    if (card.reserveA) {
      if (this.race === card.reserveA) {
        card.porte = true;
        this.cards.push(card);
      } else {
        card.porte = false;
        this.main.push(card);
      }
    }
    switch (card.typeItem) {
      case ITEM_TYPE.CHAUSSURES:
        if (this.chaussures === null) {
          this.chaussures = card;
        }
        break;
      default:
    }
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
