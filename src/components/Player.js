import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import CardsList from "./CardsList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(1)
  },
  paper: {
    margin: 5,
    padding: 15,
    width: 400
  },
  text: {
    fontSize: 13
  }
}));

function Player({ player }) {
  const classes = useStyles();

  if (!player) {
    return null;
  }

  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between">
        <Typography variant="h4" gutterBottom>
          {player.name}
        </Typography>
        <Grid>{`Niveau : ${player?.level}`}</Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid>{`Race : ${player?.race}`}</Grid>
        <Grid>{`Classe : ${player?.classe ?? "Aucune"}`}</Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid>{`Bonuses : ${player.bonuses}`}</Grid>
        <Grid>{`Combat : ${player.fightLevel}`}</Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item style={{ border: "1px solid lightgray", width: 200 }}>
          <CardsList player={player} type="items" />
        </Grid>
        <Grid item style={{ border: "1px solid lightgray", width: 200 }}>
          <CardsList player={player} type="main" />
        </Grid>
      </Grid>
      {/* <ul>
        {player.cards.map((card) => {
          return <li key={card.index}>{`${card.name} : ${card.bonus}`}</li>;
        })}
      </ul> */}
    </Paper>
  );
}

export default Player;
