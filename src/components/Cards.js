import { Grid } from "@material-ui/core";
import { useState } from "../overmind";
import Card from "./Card";

function Cards({ player }) {
  const state = useState();

  return (
    <Grid container>
      {player.cards((card) => {
        return (
          <Grid item>
            <Card key={card.name} card={card} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Cards;
