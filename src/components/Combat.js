import Grid from "@material-ui/core/Grid";
import { useState } from "../overmind";
import Card from "./Card";
import Player from "./Player";

function Combat({ win, card }) {
  const state = useState();

  const handleItemDropped = (item) => {
    console.log(
      "🚀 ~ file: App.js ~ line 259 ~ handleItemDropped ~ item",
      item
    );
  };

  return (
    <Grid
      item
      container
      justify="space-evenly"
      alignItems="flex-start"
      style={{ border: "1px solid lightgray" }}>
      <Grid item>{<Player playerName={state.meName} />}</Grid>
      <Grid item>{win && `Monstre vaincu : ${win ? "OUI" : "NON"}`}</Grid>
      <Grid item>
        {card && (
          <Card
            card={card}
            onItemDropped={() => {
              handleItemDropped();
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Combat;
