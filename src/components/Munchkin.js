import React, { useRef, useEffect } from "react";

import donjonCard from "../images/donjon.png";
import tresorCard from "../images/tresor.png";

import { useState, useActions, useEffects, useReaction } from "../overmind";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

import Player from "./Player";

import Card from "./Card";
import Munchkin from "../Munchkin";

import DeckClass from "../deck";

import { monsters, treasures, players } from "../overmind/state";
import Players from "./Players";
import {
  DONJONS,
  TRESORS,
  createCartesTresor,
  MONSTERS,
  ITEMS,
  CURSES,
  GAME_STEPS,
  ENDPOINT
} from "../types";

import Vente from "./Vente";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  zoom: {
    padding: "50px",
    transition: "transform .2s" /* Animation */,
    // width: '200px',
    // height: '200px',
    margin: "0 auto",
    "&:hover": {
      transform: "scale(2)"
    }
  }
}));

const cartesTresor = createCartesTresor();
const deckDonjon = new DeckClass(DONJONS);
const deckTresor = new DeckClass(cartesTresor);
let munchkin;

function MunchkinApp({ socketRef }) {
  const [card, setCard] = React.useState();
  const [win, setWin] = React.useState();

  const [messages, setMessages] = React.useState([]);

  const classes = useStyles();
  const state = useState();
  const actions = useActions();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const me = state.me;
  const amIPlaying = true; // me?.isPlaying;

  useEffect(() => {
    actions.setPlayers(players);
    munchkin = new Munchkin(players, deckDonjon, deckTresor);
    actions.setDonjonDeck(deckDonjon.cards);
    actions.setTreasureDeck(deckTresor.cards);

    munchkin.eventReceiver = (name, args) => {
      setMessages((m) => {
        m.unshift(name);
        return m;
      });
    };

    munchkin.stateChangedReceiver = (name, args) => {
      console.log("🚀 ~ stateChangedReceiver ~ name", name, args);
      switch (name) {
        case "addDonjon":
          actions.addDonjonDeck(args);
          break;
        case "addTresor":
          actions.addTreasureDeck(args);
          break;
        default:
      }
    };
  }, []);

  const handleNewGame = () => {
    setAnchorEl(null);
    socketRef.current.emit("newGame");
  };

  const handleChooseDealer = () => {
    setAnchorEl(null);
    socketRef.current.emit("chooseDealer");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewDuel = () => {
    // socketRef.current.emit("newCard", me.name, "ouverte");
  };
  const handleOpenDoor = () => {
    const result = munchkin.ouvrirPorte(players[0]);
    console.log("OPEN DOOR ~ result", result.type, result.win);
    if (result.type === "empty") {
      return;
    }
    setWin(result.win);
    setCard(result.card);

    actions.setGameStep(result.gameStep);
    // socketRef.current.emit("newCard", me.name, "ouverte");
  };

  const handleTrouble = () => {
    munchkin.chercherBagarre(players[0]);
  };

  const handleLoot = () => {
    const result = munchkin.pillerPiece(players[0]);
    console.log("LOOT  ~ result", result.type, result.win);
    if (result.type === "empty") {
      return;
    }
    setCard(result.card);

    actions.setGameStep(result.gameStep);
  };

  const handleCharity = () => {
    const result = munchkin.charite(players[0]);

    actions.setGameStep(result.gameStep);
  };

  const handleFinTour = () => {
    actions.setGameStep(GAME_STEPS.OPEN_DOOR);
  };

  const handleSellItems = () => {
    const cards = [];
    munchkin.sellItems(players[0], cards);
  };

  const handleCardItemDropped = (item) => {
    console.log(
      "🚀 ~ file: App.js ~ line 259 ~ handleCardItemDropped ~ item",
      item
    );
  };

  const handleDefausseItemDropped = (item) => {
    console.log(
      "🚀 ~ file: App.js ~ line 259 ~ handleDefausseItemDropped ~ item",
      item
    );
    munchkin.defausserCarte(item.playerName, item.cardName, item.from);
    // actions.defausserCarte({
    //   playerName: item.playerName,
    //   cardName: item.cardName,
    //   from: item.from
    // });
  };

  return (
    <>
      {/* <SecurityIcon /> */}
      {/* <button
        onClick={() => {
          munchkin.startTimer();
        }}>
        Timer
      </button> */}
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}>
        <Grid item style={{ width: "100%" }}>
          <Typography variant="h6">Joueurs </Typography>
          <Players />
        </Grid>
        <Grid
          item
          container
          justify="space-evenly"
          alignItems="center"
          style={{ border: "1px solid lightgray" }}>
          {/* <Grid item>
            <DropTarget onItemDropped={handleDefausseItemDropped}>
              <DeleteIcon style={{ transform: "scale(10)" }} />
            </DropTarget>
          </Grid> */}

          <Grid item>{/* <Card card={DONJONS[0]} /> */}</Grid>
          <Grid item>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <img
                className={classes.card}
                src={donjonCard}
                alt={"nez"}
                width="102"
                height="174"
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 15
                }}>{`Donjon : ${state.donjonDeck.length}`}</div>
            </div>
          </Grid>
          <Grid item>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <img
                className={classes.card}
                src={tresorCard}
                alt={"nez"}
                width="102"
                height="174"
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 20,
                  color: "white"
                }}>{`Trésors : ${state.treasureDeck.length}`}</div>
            </div>
          </Grid>

          <Grid item>
            <Vente />
          </Grid>
        </Grid>
        <Divider />
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
                  handleCardItemDropped();
                }}
              />
            )}
          </Grid>
        </Grid>

        <Grid item>
          {`Etape : ${state.gameStep}`}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDoor}
            disabled={!(amIPlaying && state.gameStep === GAME_STEPS.OPEN_DOOR)}>
            Ouvrir porte
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTrouble}
            disabled={!(amIPlaying && state.gameStep === GAME_STEPS.TROUBLE)}>
            Cherchez la bagarre
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoot}
            disabled={!(amIPlaying && state.gameStep === GAME_STEPS.LOOT)}>
            Fouillez la pièce
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCharity}
            disabled={!(amIPlaying && state.gameStep === GAME_STEPS.CHARITY)}>
            Charité
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSellItems}
            disabled={!amIPlaying}>
            Vendre
          </Button>

          <Button variant="contained" color="primary" onClick={handleNewDuel}>
            Malédiction
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleFinTour}>
            Fin du tour
          </Button>
        </Grid>
        <Grid item>
          {messages.map((message, idx) => {
            return (
              <div
                key={
                  idx
                }>{`${new Date().toLocaleDateString()}: ${message}`}</div>
            );
          })}
        </Grid>

        {/* <Grid item>
          <img
            className={classes.zoom}
            src={nez}
            alt={"nez"}
            width="132"
            height="204"
          />
          <img
            className={classes.zoom}
            src={dragon}
            alt={"nez"}
            width="132"
            height="204"
          />
        </Grid> */}
      </Grid>
    </>
  );
}

export default MunchkinApp;
