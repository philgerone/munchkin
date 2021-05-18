export const setMe = ({ state }, player) => {
  state.meName = player.name;
};

export const setPlayers = ({ state }, players) => {
  state.players = players;
};

export const setGameStep = ({ state }, value) => {
  state.gameStep = value;
};
