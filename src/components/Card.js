import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useState } from "../overmind";
import { TYPE_CARTE } from "../types";

import { DropTarget } from "./DropTarget";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  paper: {
    margin: 5,
    padding: 15,
    width: 400
  },
  drop: {
    height: "100%"
  }
}));

function Card({ card }) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const state = useState();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const itemDropped = (item) => {
    console.log("🚀 ~ file: Player.js ~ line 85 ~ itemDropped ~ item", item);
  };

  return (
    <DropTarget onItemDropped={itemDropped} className={classes.drop}>
      <Paper className={classes.paper}>
        <Grid container justify="space-between">
          <Typography variant="h4" gutterBottom>
            {card.name}
          </Typography>
          <Grid>{`Niveau : ${card.level}`}</Grid>
        </Grid>

        <Grid container justify="space-between">
          <Grid>{`Gain : ${card.levelGain}`}</Grid>
          <Grid>{`Trésors : ${card.treasureGain}`}</Grid>
        </Grid>

        {/* {card.type === TYPE_CARTE.MALEDICTION && (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Joueur
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={age}
              onChange={handleChange}>
              {state.players.map((player) => {
                return (
                  <MenuItem key={player.name} value={player.name}>
                    {player.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button>Envoyer</Button>
        </>
      )} */}
      </Paper>
    </DropTarget>
  );
}

export default Card;
