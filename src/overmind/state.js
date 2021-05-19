import { derived } from "overmind";

import { createItems, createMonsters } from "../card";
import cards from "../cards";
import Deck from "../deck";
import Player from "../player";
import { createCartesTresor, GAME_STEPS } from "../types";

export const monsters = createMonsters(10);
export const treasures = createItems(30);

export const createPlayer = (name, isDealer) => {
  return {
    name,
    isPlaying: false,
    cards: []
  };
};

const cartesTresor = createCartesTresor();
const deckT = new Deck(cartesTresor);

const player = new Player("Pge");
player.addCards(deckT.nextCards(1));
const player2 = new Player("Noam");
player2.addCards(deckT.nextCards(4));
const player3 = new Player("Daoud");
player3.addCards(deckT.nextCards(4));

export const players = [
  player,
  player2,
  player3
  // createPlayer("Noam"),
  // createPlayer("Khalled"),
  // createPlayer("Daoud"),
  // createPlayer("Amine"),
  // createPlayer("Pge")
];

export const state = {
  title: "Munchkin",
  currentPlayer: null,
  gameStep: GAME_STEPS.OPEN_DOOR,
  players,
  cards,
  meName: "",
  me: derived((state) => {
    const me = players.find((player) => player.name === state.meName);
    return me;
  })
};
