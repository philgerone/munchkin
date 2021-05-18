import React, { useRef, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";

import nez from "./images/nez flottant.png";
import dragon from "./images/dragon de plutonium.png";

import { useState, useActions, useEffects, useReaction } from "./overmind";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Fade from "@material-ui/core/Fade";

import Decks from "./components/Decks";
import Player from "./components/Player";

import socketIOClient from "socket.io-client";
import Card from "./components/Card";
import Munchkin from "./Munchkin";
import { Item } from "./card";
import PlayerClass from "./player";
import DeckClass from "./deck";

import { monsters, treasures, players } from "./overmind/state";
import Players from "./components/Players";
import { GAME_STEPS } from "./types";

const ENDPOINT = "http://192.168.0.82:8080";

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

// const c1 = new Item("armure", 3, 100);
// const player = new PlayerClass("Pge");
// player.addCard(c1);
const deck = new DeckClass(monsters);
const deckT = new DeckClass(treasures);
const munchkin = new Munchkin(players, deck, deckT);

function App() {
  const [deck, setDeck] = React.useState([]);
  const [card, setCard] = React.useState();
  const [win, setWin] = React.useState();

  const socketRef = useRef();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const classes = useStyles();
  const state = useState();
  const actions = useActions();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const me = state.me;
  const amIPlaying = true; // me?.isPlaying;

  useEffect(() => {
    const _name = localStorage.getItem("name");
    setName(_name ?? "");

    const player = state.players.find((player) => player.name === _name);
    player && actions.setMe(player);
  }, []);

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socketRef.current = socket;
  //   socket.on("hello", (data) => {
  //     console.log("🚀 ~ file: App.js ~ line 74 ~ socket.on ~ HELLO", data);
  //   });
  //   socket.on("emtyDeck", () => {
  //     console.log("emty deck");
  //   });
  //   socket.on("deck", (sdeck) => {
  //     console.log("🚀 ~ file: App.js ~ line 86 ~ socket.on ~ sdeck", sdeck);
  //     setDeck(sdeck);
  //   });
  //   socket.on("card", (scard) => {
  //     setCard(scard);
  //   });
  //   socket.on("newGame", (players, sdeck) => {
  //     console.log("🚀 ~ file: App.js ~ line 83 ~ socket.on ~ newGame", players);
  //     actions.setPlayers(players);
  //     setCard(null);
  //     setDeck(sdeck);
  //   });
  //   socket.on("players", (players) => {
  //     console.log("🚀 ~ file: App.js ~ line 83 ~ socket.on ~ players", players);
  //     actions.setPlayers(players);
  //   });
  //   socket.on("playerAlreadyExist", (name) => {
  //     alert(`Le joueur ${name} existe déjà`);
  //   });

  //   // CLEAN UP THE EFFECT
  //   return () => {
  //     socket.disconnect();
  //     socketRef.current = null;
  //   };
  //   //
  // }, []);

  const handleNewGame = () => {
    setAnchorEl(null);
    socketRef.current.emit("newGame");
  };

  const handleChooseDealer = () => {
    setAnchorEl(null);
    socketRef.current.emit("chooseDealer");
  };

  const handlePlay = () => {
    setAnchorEl(null);
    setModalOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEnterGame = () => {
    localStorage.setItem("name", name);
    // socketRef.current.emit("newPlayer", name);
    setModalOpen(false);
  };

  const handleNewDuel = () => {
    // socketRef.current.emit("newCard", me.name, "ouverte");
  };
  const handleOpenDoor = () => {
    const result = munchkin.ouvrirPorte(players[0]);
    console.log(
      "🚀 ~ file: App.js ~ line 167 ~ handleOpenDoor ~ result",
      result.type,
      result.win
    );
    if (result.type === "empty") {
      return;
    }
    setWin(result.win);
    setCard(result.card);

    actions.setGameStep(result.gameStep);
    // socketRef.current.emit("newCard", me.name, "ouverte");
  };

  const handleTrouble = () => {
    munchkin.chercherBagarre();
    // socketRef.current.emit("newCard", me.name, "ferme");
  };

  const handleLoot = () => {
    munchkin.pillerPiece();
    // socketRef.current.emit("servi");
  };

  const handleCharity = () => {
    munchkin.charite();
    // socketRef.current.emit("servi");
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {`${state.title} ${me?.name ? "du joueur " + me?.name : ""}`}
          </Typography>
        </Toolbar>
      </AppBar>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem onClick={handleNewGame}>Nouvelle partie</MenuItem>
        {/* <MenuItem onClick={handleChooseDealer}>Choisir dealer</MenuItem> */}
        <MenuItem onClick={handlePlay}>Jouer</MenuItem>
      </Menu>

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}>
        <Grid item style={{ width: "100%" }}>
          <Typography variant="h6">Joueurs </Typography>
          <Players />
          {/* {players.map((player) => {
            return <Player key={player.name} player={player} />;
          })} */}
          {/* <Card card={{ name: "Malédiction", level: 1 }} /> */}
        </Grid>
        {/* <Grid item style={{ width: "100%" }}>
          <Decks players={state.players} name={name} />
        </Grid> */}
        <Grid
          item
          container
          justify="space-evenly"
          alignItems="center"
          style={{ border: "1px solid lightgray" }}>
          <Grid item>{`Donjon : ${state.dungeonDeck.length}`}</Grid>
          <Grid item>{`Trésors : ${state.treasureDeck.length}`}</Grid>
        </Grid>
        <Divider />
        <Grid
          item
          container
          justify="space-evenly"
          alignItems="flex-start"
          style={{ border: "1px solid lightgray" }}>
          <Grid item>{<Player player={state.me} />}</Grid>
          <Grid item>{win && `Monstre vaincu : ${win ? "OUI" : "NON"}`}</Grid>
          <Grid item>{card && <Card card={card} />}</Grid>
        </Grid>

        <Grid item>
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
            onClick={handleLoot}
            disabled={!amIPlaying}>
            Vendre
          </Button>

          <Button variant="contained" color="primary" onClick={handleNewDuel}>
            Malédiction
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleNewDuel}>
            Fin du tour
          </Button>
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

        <Dialog
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="form-dialog-title">
          {/* <DialogTitle id="form-dialog-title">Nom</DialogTitle> */}
          <DialogContent>
            <DialogContentText>Entrez votre nom.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nom du joueur"
              type="text"
              fullWidth
              value={name}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Annuler
            </Button>
            <Button
              onClick={handleEnterGame}
              color="primary"
              disabled={name.length === 0}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
}

export default App;
