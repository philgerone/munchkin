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
import Divider from "@material-ui/core/Divider";

import EuroIcon from "@material-ui/icons/Euro";

import React, { useRef } from "react";
import { useActions } from "../overmind";
import { Drag } from "./Drag";
import { DropTarget } from "./DropTarget";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  drop: {
    height: "100%"
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
  },
  tickSize: {
    // transform: "scale(0.7)"
  }
}));

function CardsList({ player, type }) {
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

  const itemDropped = (item) => {
    console.log("🚀 ~ file: Player.js ~ line 85 ~ itemDropped ~ item", item);
  };

  const items = type === "items" ? player.items : player.main;
  const label = type === "items" ? "Equipé" : "Main";
  return (
    <DropTarget onItemDropped={itemDropped} className={classes.drop}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{`${label} ${items.length}`} </FormLabel>
        <FormGroup>
          {items.map((card, index) => {
            const dataItem = { playerName: player.name, cardName: card.name };
            return (
              <Drag dataItem={dataItem}>
                <FormControlLabel
                  key={card.name}
                  value={card.name}
                  control={
                    <Checkbox
                      className={classes.tickSize}
                      checked={state[card.name]}
                      onChange={handleChange}
                      name={card.name}
                    />
                  }
                  label={
                    <Grid container className={classes.text}>
                      <Grid
                        item>{`${card.name} +${card.bonus} ${card.valeur}€ `}</Grid>
                    </Grid>
                  }
                />
              </Drag>
            );
          })}
        </FormGroup>
      </FormControl>
    </DropTarget>
  );
}

export default CardsList;
