import { randomInt } from "./helpers";

class Deck {
  constructor(cards) {
    this.cards = cards;
  }

  get length() {
    return this.cards?.length ?? 0;
  }

  get isEmpty() {
    return this.cards.length === 0;
  }

  nextCards(nb) {
    let cards = [];
    for (let index = 0; index < nb; index++) {
      if (!this.isEmpty) {
        const card = this.nextCard();

        cards.push(card);
      }
    }
    return cards;
  }

  nextCard() {
    const index = randomInt(0, this.cards.length - 1);
    const removed = this.cards.splice(index, 1);

    return removed[0];
  }
}

export default Deck;
