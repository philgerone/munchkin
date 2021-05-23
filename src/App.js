import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

import MunchkinApp from "./components/Munchkin";
import ChatRoom from "./components/ChatRoom";

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
import { useState } from "./overmind";

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

function About() {
  return <h2>About</h2>;
}

function App() {
  const classes = useStyles();
  const state = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const me = state.me;

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
    // setModalOpen(true);
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
            <ChatRoom />
          </Route>
          <Route path="/">
            <MunchkinApp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
