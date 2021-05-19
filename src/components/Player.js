import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";

import EuroIcon from "@material-ui/icons/Euro";

import React from "react";
import { useActions } from "../overmind";

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
    width: 300
  },
  text: {
    // fontSize: 13
  }
}));

function Player({ player }) {
  const classes = useStyles();
  const actions = useActions();

  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    const cards = { ...state, [event.target.name]: event.target.checked };
    setState(cards);
    const cardNames = Object.entries(cards)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => {
        return key;
      });
    console.log(
      "🚀 ~ file: Player.js ~ line 46 ~ handleChange ~ cards",
      cardNames
    );
    actions.setSelectedCards({ playerName: player.name, cardNames });
  };

  if (!player) {
    return null;
  }

  const items = player.items;
  const main = player.main;
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" gutterBottom>
        {player.name}
      </Typography>
      <Grid>{`Niveau : ${player?.level}`}</Grid>
      <Grid>{`Bonuses : ${player.bonuses}`}</Grid>
      <Grid>{`Combat : ${player.fightLevel}`}</Grid>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          {`Equipé ${player.items.length}`}{" "}
        </FormLabel>
        <FormGroup>
          {player.items.map((card) => {
            return (
              <FormControlLabel
                key={card.name}
                value={card.name}
                control={
                  <Checkbox
                    checked={state[card.name]}
                    onChange={handleChange}
                    name={card.name}
                  />
                }
                label={
                  <Grid container>
                    <Grid item>{card.name}</Grid>
                    <Grid item>
                      <EuroIcon item />
                    </Grid>
                    <Grid item>{card.valeur}</Grid>
                    {/* <EuroIcon item />
                    <Typography className={classes.text}>
                      {`${card.valeur}`}
                    </Typography> */}
                  </Grid>
                }
              />
            );
          })}
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          {`Main ${player.main.length}`}{" "}
        </FormLabel>
        <FormGroup>
          {player.main.map((card) => {
            return (
              <FormControlLabel
                key={card.name}
                value={card.name}
                control={
                  <Checkbox
                    checked={state[card.name]}
                    onChange={handleChange}
                    name={card.name}
                  />
                }
                label={
                  <Grid container>
                    <Grid item>{card.name}</Grid>
                    <Grid item>
                      <EuroIcon item />
                    </Grid>
                    <Grid item>{card.valeur}</Grid>
                    {/* <EuroIcon item />
                    <Typography className={classes.text}>
                      {`${card.valeur}`}
                    </Typography> */}
                  </Grid>
                }
              />
            );
          })}
        </FormGroup>
      </FormControl>

      {/* <ul>
        {player.cards.map((card) => {
          return <li key={card.index}>{`${card.name} : ${card.bonus}`}</li>;
        })}
      </ul> */}
    </Paper>
  );
}

export default Player;
