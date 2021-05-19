import Player from "./player";
import { RACES } from "./types";

describe("Player", () => {
  it("sould create a player", () => {
    const player = new Player("Pge");

    expect(player.name).toEqual("Pge");
    expect(player.level).toEqual(1);
    expect(player.race).toEqual(RACES.HUMAIN);

    expect(player.items).toEqual([]);
    expect(player.cardsCount).toEqual(0);
    expect(player.bonuses).toEqual(0);
    expect(player.fightLevel).toEqual(1);
    expect(player.wins).toEqual(false);
  });
});
