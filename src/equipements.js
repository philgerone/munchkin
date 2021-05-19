import { ITEM_TYPE } from "./types";

class Equipements {
  constructor(player) {
    this.player = player;

    this.armure = null;
    this.couvreChef = null;
    this.deuxMains = null;
    this.mainGauche = null;
    this.mainDroite = null;
    this.chaussures = null;
  }

  estDejaEquipe(card) {
    switch (card.typeItem) {
      case ITEM_TYPE.CHAUSSURES:
        return Boolean(this.chaussures);

      default:
        return false;
    }
  }

  equip(card) {
    if (card.reserveA) {
      if (this.player.race === card.reserveA) {
        card.porte = true;
        this.player.cards.push(card);
      } else {
        card.porte = false;
        this.player.main.push(card);
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

  unequip(card) {
    card.porte = false;
    switch (card.typeItem) {
      case ITEM_TYPE.CHAUSSURES:
        this.chaussures = null;
        break;
      default:
    }
  }
}

export default Equipements;
