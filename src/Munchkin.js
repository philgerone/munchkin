import { useActions } from "./overmind";
import { GAME_STEPS, TYPE_CARTE } from "./types";

class Munchkin {
  constructor(players, donjonDeck, treasureDeck) {
    this.players = players;
    this.donjonDeck = donjonDeck;
    this.treasureDeck = treasureDeck;
    this.gameStep = GAME_STEPS.OPEN_DOOR;
  }

  set eventReceiver(receiverFn) {
    this.receiverFn = receiverFn;
  }

  raiseEvent(name, args) {
    this.receiverFn && this.receiverFn(name, args);
  }

  nextStep(player) {
    switch (this.gameStep) {
      case GAME_STEPS.OPEN_DOOR:
        if (player.win === true) {
          if (player.cardsCount > 5) {
            this.gameStep = GAME_STEPS.CHARITY;
          } else {
            this.gameStep = GAME_STEPS.END;
          }
        } else {
        }
        break;
      case GAME_STEPS.TROUBLE:
        break;
      case GAME_STEPS.COMBAT:
        break;
      case GAME_STEPS.RUN_AWAY:
        break;
      case GAME_STEPS.LOOT:
        break;
      case GAME_STEPS.CHARITY:
        break;
      default:
        console.log("GAME STEP ", this.gameStep);
    }
  }

  ouvrirPorte(player) {
    if (this.donjonDeck.isEmpty) {
      this.raiseEvent("La pile de cartes est vide");
      return {
        type: "empty"
      };
    }

    player.win = false;
    const card = this.donjonDeck.nextCard();
    this.raiseEvent("Ouvrir la porte : " + card.name);
    console.log(
      "🚀 ~ file: Munchkin.js ~ line 19 ~ Munchkin ~ ouvrirPorte ~ card",
      card
    );

    if (card.type === TYPE_CARTE.MONSTRE) {
      const win = player.fight(card);
      player.win = win;
      console.log(
        "🚀 ~ file: Munchkin.js ~ line 26 ~ Munchkin ~ ouvrirPorte ~ win",
        win
      );

      if (win) {
        player.level += card.levelGain;

        this.raiseEvent(`Le joueur ${player.name} a vaincu ${card.name}`);

        const treasure = this.treasureDeck.nextCard();
        if (treasure) {
          this.raiseEvent(
            `Le joueur ${player.name} a reçu ${card.name} comme trésor`
          );
          player.equip(treasure);
        }

        this.nextStep(player);

        return {
          type: "fight",
          win,
          card,
          gameStep: this.gameStep
        };
      } else {
        this.raiseEvent(`Le joueur ${player.name} a perdu contre ${card.name}`);

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
    } else if (card.type === TYPE_CARTE.RACE) {
      this.raiseEvent(`Le joueur ${player.name} est devenu ${card.name}`);
      player.race = card.name;

      return {
        gameStep: player.hasMonsters ? GAME_STEPS.TROUBLE : GAME_STEPS.LOOT
      };
    } else if (card.type === TYPE_CARTE.CLASSE) {
      this.raiseEvent(`Le joueur ${player.name} est devenu ${card.name}`);
      player.classe = card.name;

      return {
        gameStep: player.hasMonsters ? GAME_STEPS.TROUBLE : GAME_STEPS.LOOT
      };
    } else if (card.type === TYPE_CARTE.MALEDICTION) {
      this.raiseEvent(
        `Le joueur ${player.name} a reçu la malédiction ${card.name}`
      );

      player.curse(card);

      return {
        gameStep: player.hasMonsters ? GAME_STEPS.TROUBLE : GAME_STEPS.LOOT
      };
    } else if (card.type === TYPE_CARTE.ITEM) {
      this.raiseEvent(`Le joueur ${player.name} a reçu ${card.name}`);

      if (card.gainNiveau) {
        player.level++;
      } else if (card.usageUnique) {
      } else {
        player.equip(card);
      }
    } else {
      if (player.cardsCount > 5) {
        this.raiseEvent(`Le joueur ${player.name} doit la charité`);
        return {
          gameStep: GAME_STEPS.CHARITY
        };
      } else {
        this.raiseEvent(`Le joueur ${player.name} a terminé son tour`);
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
    if (this.donjonDeck.isEmpty) {
      this.raiseEvent("La pile de cartes est vide");
      return {
        type: "empty"
      };
    }

    const card = this.donjonDeck.nextCard();
    if (card) {
      this.raiseEvent("Piller la pièce : " + card.name);

      card && player.equip(card);
    }

    return {
      gameStep: GAME_STEPS.CHARITY
    };
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

    return {
      gameStep: GAME_STEPS.END
    };
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
