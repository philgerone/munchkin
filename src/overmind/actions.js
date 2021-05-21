export const setMe = ({ state }, player) => {
  state.meName = player.name;
};

export const setPlayers = ({ state }, players) => {
  state.players = players;
};

export const setPlayerRace = ({ state }, { playerName, race }) => {
  const player = state.players.find((p) => p.name === playerName);
  if (player) {
    player.race = race;
  }
};

export const setPlayerClasse = ({ state }, { playerName, classe }) => {
  const player = state.players.find((p) => p.name === playerName);
  if (player) {
    player.classe = classe;
  }
};

export const addPlayerCardInHand = ({ state }, { playerName, card }) => {
  const player = state.players.find((p) => p.name === playerName);
  if (player) {
    player.main.push(card);
  }
};

export const setGameStep = ({ state }, value) => {
  state.gameStep = value;
};

export const setDonjonDeck = ({ state }, value) => {
  state.donjonDeck = value;
};

export const setTreasureDeck = ({ state }, value) => {
  state.treasureDeck = value;
};

export const addDonjonDeck = ({ state }, value) => {
  state.donjonDeck.push(value);
};

export const addTreasureDeck = ({ state }, value) => {
  state.treasureDeck.push(value);
};

export const addSellAmount = ({ state }, value) => {
  state.sellAmount = state.sellAmount + value;
};

export const setSellAmount = ({ state }, value) => {
  state.sellAmount = value;
};

export const setSelectedCards = ({ state }, { playerName, cardNames }) => {
  const player = state.players.find((p) => p.name === playerName);
  if (player) {
    player.selectedCards = cardNames;
  }
};

export const defausserCarte = ({ state }, { playerName, cardName, from }) => {
  const player = state.players.find((p) => p.name === playerName);
  const index = player[from].findIndex((mycard) => mycard.name === cardName);
  if (index !== -1) {
    const removed = player[from].splice(index, 1);
    state.cards.push(removed);
  }
};

export const moveCard = (
  { state },
  { fromPlayerName, toPlayerName, cardName, cardFrom, toCard }
) => {
  const fromPlayer = state.players.find((p) => p.name === fromPlayerName);
  const toPlayer = state.players.find((p) => p.name === toPlayerName);
  if (fromPlayer && toPlayer) {
    const index = fromPlayer[cardFrom].findIndex(
      (mycard) => mycard.name === cardName
    );
    if (index !== -1) {
      const removed = fromPlayer[cardFrom].splice(index, 1);
      toPlayer[toCard].push({ ...removed[0] });
    }
  }
};
