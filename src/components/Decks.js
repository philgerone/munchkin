import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Deck from "./Deck";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // border: "1px solid red",
    margin: 5,
    padding: 5
  }
}));

function Decks({ players, name }) {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      justify="space-between"
      alignItems="center"
      spacing={3}>
      {players.map((player) => (
        <Grid key={player.name} item>
          <Deck player={player} name={name} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Decks;
