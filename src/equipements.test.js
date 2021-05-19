import Equipements from "./equipements";
import Player from "./player";
import { CLASSES, ITEM_TYPE, TYPE_CARTE } from "./types";

describe("Equipements", () => {
  it("sould create an equipement", () => {
    const player = new Player("Pge");
    const equip = new Equipements(player);

    const expected = player;
    expect(equip.player).toEqual(expected);

    const card = {
      type: TYPE_CARTE.ITEM,
      name: "Sandales de protection",
      bonus: 0,
      valeur: 700,
      typeItem: ITEM_TYPE.CHAUSSURES
    };
    expect(equip.estDejaEquipe(card)).toEqual(false);
    equip.equip(card);
    expect(equip.estDejaEquipe(card)).toEqual(true);
    expect(card.porte).toEqual(true);

    equip.unequip(card);
    expect(equip.estDejaEquipe(card)).toEqual(false);
  });
});
