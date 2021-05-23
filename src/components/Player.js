import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import DeleteIcon from "@material-ui/icons/Delete";

import CardsList from "./CardsList";
import { ITEM_TYPE, RACES, TYPE_CARTE } from "../types";
import { useActions, useState } from "../overmind";
import { DropTarget } from "./DropTarget";

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

function Player({ playerName }) {
  const classes = useStyles();
  const state = useState();
  const actions = useActions();

  const player = state.players.find((player) => player.name === playerName);

  const handleItemDropped = (to, item) => {
    actions.moveCard({
      fromPlayerName: item.playerName,
      toPlayerName: player.name,
      cardName: item.cardName,
      cardFrom: item.from,
      toCard: to
    });
  };

  const hadleItemDroppedOnRace = (item) => {
    if (item.cardName !== TYPE_CARTE.RACE) {
      return;
    }

    actions.defausserCarte({
      playerName: player.name,
      cardName: item.cardName,
      from: item.from
    });
    actions.setPlayerRace({ playerName: player.name, race: item.cardName });
  };

  const hadleItemDroppedOnClasse = (item) => {
    if (item.cardName !== TYPE_CARTE.CLASSE) {
      return;
    }

    actions.defausserCarte({
      playerName: player.name,
      cardName: item.cardName,
      from: item.from
    });
    actions.setPlayerClasse({ playerName: player.name, race: item.cardName });
  };

  const handleDeleteRace = (type) => {
    actions.setPlayerRace({ playerName: player.name, race: RACES.HUMAIN });
  };
  const handleDeleteClasse = (type) => {
    actions.setPlayerClasse({ playerName: player.name, classe: null });
  };

  if (!player) {
    return null;
  }

  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between">
        <Typography variant="h5" gutterBottom>
          {player.name}
        </Typography>
        <Grid>{`Niveau : ${player?.level}`}</Grid>
      </Grid>
      <Grid container justify="space-between">
        <DropTarget onItemDropped={hadleItemDroppedOnRace}>
          <Grid container alignItems="center" justify="space-between">
            {`Race : ${player?.race}`}
            <DeleteIcon
              onClick={handleDeleteRace}
              style={{ cursor: "pointer" }}
            />
          </Grid>
        </DropTarget>

        <DropTarget onItemDropped={hadleItemDroppedOnClasse}>
          <Grid container alignItems="center" justify="space-between">
            {`Classe : ${player?.classe ?? "Aucune"}`}
            <DeleteIcon
              onClick={handleDeleteClasse}
              style={{ cursor: "pointer" }}
            />
          </Grid>
        </DropTarget>
      </Grid>
      <Grid container justify="space-between">
        <Grid>{`Bonuses : ${player.bonuses}`}</Grid>
        <Grid>{`Combat : ${player.fightLevel}`}</Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item style={{ border: "1px solid lightgray", width: 200 }}>
          <CardsList
            player={player}
            type="cards"
            onItemDropped={(item) => {
              handleItemDropped("cards", item);
            }}
          />
        </Grid>
        <Grid item style={{ border: "1px solid lightgray", width: 200 }}>
          <CardsList
            player={player}
            type="main"
            onItemDropped={(item) => {
              handleItemDropped("main", item);
            }}
          />
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
