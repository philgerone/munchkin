import { useActions } from "./overmind";
import { GAME_STEPS, TYPE_CARTE } from "./types";

class Munchkin {
  constructor(players, donjonDeck, treasureDeck) {
    this.players = players;
    this.donjonDeck = donjonDeck;
    this.treasureDeck = treasureDeck;
  }

  ouvrirPorte(player) {
    if (this.donjonDeck.isEmpty) {
      return {
        type: "empty"
      };
    }

    const card = this.donjonDeck.nextCard();

    if (card.type === TYPE_CARTE.MONSTRE) {
      const win = player.fight(card);

      if (win) {
        player.level += card.levelGain;

        const treasure = this.treasureDeck.nextCard();
        player.cards.push(treasure);

        let gameStep;
        if (player.cardsCount > 5) {
          gameStep = GAME_STEPS.CHARITY;
        } else {
          gameStep = GAME_STEPS.END;
        }

        return {
          type: "fight",
          win,
          card,
          gameStep
        };
      } else {
        player.level--;
        if (player.level === 0) {
          player.dead = true;

          return {
            type: "dead",
            card
          };
        }

        return {
          type: "fight",
          win,
          card
        };
      }
    } else if (card.type === TYPE_CARTE.MALEDICTION) {
      player.curse(card);

      return {
        gameStep: GAME_STEPS.TROUBLE
      };
    } else {
      if (player.cardsCount > 5) {
        return {
          gameStep: GAME_STEPS.CHARITY
        };
      } else {
        return {
          gameStep: GAME_STEPS.END
        };
      }
    }
  }

  chercherBagarre(player) {
    // choose monster in hand
    // fight
  }

  pillerPiece(player) {
    // nextCard
  }

  charite(player) {
    if (player.cardsCount > 5) {
      const lowestPlayers = [];
      lowestPlayers.forEach((player) => {
        // give card
      });
    }
  }
}

export default Munchkin;

// const c1 = new Item("armure", 3, 100);
// const player = new Player("pge");
// player.addCard(c1);

// const monsters = createMonsters(1);
// const treasures = createItems(1);
// const deck = new Deck(monsters);
// const deckT = new Deck(treasures);
// const m = new Munchkin([player], deck, deckT);
// m.ouvrirPorte(player); /* ? */
// player.level; /* ? */
