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

export const setGameStep = ({ state }, value) => {
  state.gameStep = value;
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

export const defausserCarte = ({ state }, { playerName, cardName }) => {
  const player = state.players.find((p) => p.name === playerName);
  const index = player.cards.findIndex((mycard) => mycard.name === cardName);
  if (index !== -1) {
    const removed = player.cards.splice(index, 1);
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
