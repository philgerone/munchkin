import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useState } from "../overmind";

function ChatRoom({ socketRef }) {
  const state = useState();
  return (
    <Grid>
      <Link to="/">Home</Link>
      <Typography variant="h6">Joueurs en ligne</Typography>
      <Typography>{`${state.players.map((p) => p.name).join()}`}</Typography>
    </Grid>
  );
}

export default ChatRoom;
