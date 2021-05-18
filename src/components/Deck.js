import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { piecesOr } from "../cards";

import { useState, useActions, useEffects, useReaction } from "../overmind";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    // height: 140,
    width: 200
  }
}));

// const cards = piecesOr;
// cards[0].ouverte = true;
function Deck({ player, isDealer, name }) {
  const classes = useStyles();
  const state = useState();

  const amIMe = player?.name === name;
  const cards = amIMe
    ? player.cards
    : player.cards.filter((c) => c.type === "ouverte");
  const total = cards.reduce((acc, value) => {
    acc = acc + value.value;
    return acc;
  }, 0);
  return (
    <Grid container className={classes.root} spacing={2}>
      <Paper
        item
        className={classes.paper}
        style={{ border: amIMe ? "3px solid red" : "" }}>
        <Grid>{`Player ${player.name} ${
          player.isPlaying ? "(JOUE)" : ""
        }`}</Grid>
        <ul>
          {player.cards.map((card) => {
            return (
              <li>{`${
                amIMe || card.type === "ouverte"
                  ? card.type + " : " + card.value
                  : "Fermée"
              }`}</li>
            );
          })}
          <div>{"Total : " + total}</div>
        </ul>
      </Paper>
    </Grid>
  );
}

export default Deck;
