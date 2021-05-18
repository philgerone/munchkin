import { Grid } from "@material-ui/core";
import { useState } from "../overmind";
import Player from "./Player";

function Players() {
  const state = useState();
  console.log("🚀 ~ file: Players.js ~ line 7 ~ Players ~ state", state);

  return (
    <Grid container justify="space-evenly" alignItems="center">
      {state.players
        .filter((player) => player.name !== state.me?.name)
        .map((player) => {
          return (
            <Grid item>
              <Player key={player.name} player={player} />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default Players;
