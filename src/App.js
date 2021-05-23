import React, { useEffect, useRef } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

import MunchkinApp from "./components/Munchkin";
import ChatRoom from "./components/ChatRoom";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import socketIOClient from "socket.io-client";

import { useActions, useState } from "./overmind";
import { ENDPOINT } from "./types";

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

function App() {
  const classes = useStyles();
  const state = useState();
  const [name, setName] = React.useState("");
  const actions = useActions();
  const [modalOpen, setModalOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const me = state.me;

  const socketRef = useRef();
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socketRef.current = socket;

    const _name = localStorage.getItem("name");
    if (_name) {
      socketRef.current.emit("newPlayer", _name);

      const player = state.players.find((player) => player.name === _name);
      player && actions.setMe(player);
    }
    setName(_name ?? "");

    socket.on("message", (name, args) => {
      console.log(
        "🚀 ~ file: App.js ~ line 115 ~ socket.on ~ name, args",
        name,
        args
      );
    });
    socket.on("hello", (data) => {
      console.log("🚀 ~ file: App.js ~ line 74 ~ socket.on ~ HELLO", data);
    });
    // socket.on("emtyDeck", () => {
    //   console.log("emty deck");
    // });
    // socket.on("deck", (sdeck) => {
    //   console.log("🚀 ~ file: App.js ~ line 86 ~ socket.on ~ sdeck", sdeck);
    //   setDeck(sdeck);
    // });
    // socket.on("card", (scard) => {
    //   setCard(scard);
    // });
    socket.on("newGame", (players, sdeck) => {
      console.log("🚀 ~ file: App.js ~ line 83 ~ socket.on ~ newGame", players);
      // actions.setPlayers(players);
      // setCard(null);
      // setDeck(sdeck);
    });
    socket.on("players", (players) => {
      console.log("🚀 ~ file: App.js ~ line 83 ~ socket.on ~ players", players);
      actions.setPlayers(players);
    });
    socket.on("playerAlreadyExist", (name) => {
      alert(`Le joueur ${name} existe déjà`);
    });

    // CLEAN UP THE EFFECT
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
    //
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewGame = () => {
    setAnchorEl(null);
    // socketRef.current.emit("newGame");
  };

  const handlePlay = () => {
    setAnchorEl(null);
    setModalOpen(true);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEnterGame = () => {
    localStorage.setItem("name", name);
    socketRef.current.emit("newPlayer", name);
    setModalOpen(false);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Router>
      <div>
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
          <MenuItem onClick={handleNewGame}>
            <Link to="/chat">Chat room</Link>
          </MenuItem>
          <MenuItem onClick={handleNewGame}>Nouvelle partie</MenuItem>
          {/* <MenuItem onClick={handleChooseDealer}>Choisir dealer</MenuItem> */}
          <MenuItem onClick={handlePlay}>Jouer</MenuItem>
        </Menu>

        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route path="/chat">
            <ChatRoom socketRef={socketRef} />
          </Route>
          <Route path="/">
            <MunchkinApp socketRef={socketRef} />
          </Route>
        </Switch>

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
      </div>
    </Router>
  );
}

export default App;
