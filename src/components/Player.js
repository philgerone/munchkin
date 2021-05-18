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

import React from "react";

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

  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  if (!player) {
    return null;
  }

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
          {`Cartes ${player.cards.length}`}{" "}
        </FormLabel>
        <FormGroup>
          {player.cards.map((card) => {
            return (
              <FormControlLabel
                key={card.index}
                value={card.name}
                control={
                  <Checkbox
                    checked={state[card.name]}
                    onChange={handleChange}
                    name={card.name}
                  />
                }
                label={
                  <Typography className={classes.text}>
                    {`${card.name} Bonus: ${card.bonus} Valeur: ${card.value}`}
                  </Typography>
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
