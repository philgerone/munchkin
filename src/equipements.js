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
      case ITEM_TYPE.ARMURE:
        return Boolean(this.armure);
      case ITEM_TYPE.COUVRE_CHEF:
        return Boolean(this.couvreChef);
      case ITEM_TYPE.DEUX_MAIN:
        return Boolean(this.deuxMains);
      case ITEM_TYPE.MAIN:
        return Boolean(this.mainGauche) && Boolean(this.mainDroite);
      case ITEM_TYPE.CHAUSSURES:
        return Boolean(this.chaussures);

      default:
        return false;
    }
  }

  equip(card) {
    const estDejaEquipe = this.estDejaEquipe(card);
    const estOk = card.reserveA ? this.player.race === card.reserveA : true;
    if (estOk && !estDejaEquipe) {
      card.porte = true;
      this.player.cards.push(card);
    } else {
      card.porte = false;
      this.player.main.push(card);
    }

    switch (card.typeItem) {
      case ITEM_TYPE.ARMURE:
        this.armure = card;
        break;
      case ITEM_TYPE.COUVRE_CHEF:
        this.couvreChef = card;
        break;
      case ITEM_TYPE.DEUX_MAIN:
        this.deuxMains = card;
        break;
      case ITEM_TYPE.MAIN:
        if (this.mainGauche === null) {
          this.mainGauche = card;
        } else {
          this.mainDroite = card;
        }
        break;
      case ITEM_TYPE.CHAUSSURES:
        this.chaussures = card;
        break;
      default:
    }
  }

  unequip(card) {
    card.porte = false;
    switch (card.typeItem) {
      case ITEM_TYPE.ARMURE:
        this.armure = null;
        break;
      case ITEM_TYPE.COUVRE_CHEF:
        this.couvreChef = null;
        break;
      case ITEM_TYPE.DEUX_MAIN:
        this.deuxMains = null;
        break;
      case ITEM_TYPE.MAIN:
        if (this.mainGauche !== null) {
          this.mainGauche = null;
        } else {
          this.mainDroite = null;
        }
        break;
      case ITEM_TYPE.CHAUSSURES:
        this.chaussures = null;
        break;
      default:
    }
  }
}

export default Equipements;
