import { useActions } from "./overmind";
import { GAME_STEPS, TYPE_CARTE } from "./types";

class Munchkin {
  constructor(players, donjonDeck, treasureDeck) {
    this.players = players;
    this.donjonDeck = donjonDeck;
    this.treasureDeck = treasureDeck;
  }

  set eventReceiver(receiverFn) {
    this.receiverFn = receiverFn;
  }

  raiseEvent(name, args) {
    this.receiverFn && this.receiverFn(name, args);
  }

  ouvrirPorte(player) {
    if (this.donjonDeck.isEmpty) {
      this.raiseEvent("La pile de cartes est vide");
      return {
        type: "empty"
      };
    }

    const card = this.donjonDeck.nextCard();
    this.raiseEvent("Ouvrir la porte", card);
    console.log(
      "🚀 ~ file: Munchkin.js ~ line 19 ~ Munchkin ~ ouvrirPorte ~ card",
      card
    );

    if (card.type === TYPE_CARTE.MONSTRE) {
      const win = player.fight(card);
      console.log(
        "🚀 ~ file: Munchkin.js ~ line 26 ~ Munchkin ~ ouvrirPorte ~ win",
        win
      );

      if (win) {
        player.level += card.levelGain;

        const treasure = this.treasureDeck.nextCard();
        treasure && player.cards.push(treasure);

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
        if (card.incident) {
        } else if (card.incidentFn) {
          card.incidentFn(player);
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
    } else if (card.type === TYPE_CARTE.ITEM) {
      if (card.gainNiveau) {
        player.level++;
      } else if (card.usageUnique) {
      } else {
        player.equip(card);
      }
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

  sellItems(player, cards) {
    const total = cards.reduce((acc, val) => {
      return acc + val.valeur;
    }, 0);
    if (total >= 1000) {
      this.raiseEvent(
        `Le joueur ${player.name} a gagné un niveau en vendant pour ${total} pièves d'or`
      );
      player.level++;
    }
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
