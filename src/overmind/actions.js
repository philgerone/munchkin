export const setMe = ({ state }, player) => {
  state.meName = player.name;
};

export const setPlayers = ({ state }, players) => {
  state.players = players;
};

export const setGameStep = ({ state }, value) => {
  state.gameStep = value;
};

export const setSelectedCards = ({ state }, { playerName, cardNames }) => {
  const player = state.players.find((p) => p.name === playerName);
  if (player) {
    player.selectedCards = cardNames;
  }
};
