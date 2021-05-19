import { Grid } from "@material-ui/core";
import { useState } from "../overmind";
import Player from "./Player";

function Players() {
  const state = useState();
  // console.log("🚀 ~ file: Players.js ~ line 7 ~ Players ~ state", state);

  return (
    <Grid container justify="space-evenly" alignItems="center">
      {state.players
        .filter((player) => player.name !== state.me?.name)
        .map((player, idx) => {
          return (
            <Grid item key={player.name}>
              <Player playerName={player.name} />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default Players;
