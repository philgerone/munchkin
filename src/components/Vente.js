import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import EuroIcon from "@material-ui/icons/Euro";

import { useActions, useState } from "../overmind";
import { DropTarget } from "./DropTarget";

function Vente() {
  const state = useState();
  const actions = useActions();

  const handleSellAmoutDropped = (item) => {
    console.log(
      "🚀 ~ file: App.js ~ line 280 ~ handleSellAmoutDropped ~ item",
      item
    );
    item.value && actions.addSellAmount(item.value);
  };

  return (
    <Grid>
      <Typography variant="h6">Vente</Typography>
      <Divider />
      <DropTarget onItemDropped={handleSellAmoutDropped}>
        <Grid container alignItems="center" justify="space-between">
          <Grid>
            <EuroIcon />
          </Grid>
          <Grid>
            <Typography variant="h6">{state.sellAmount}</Typography>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            actions.setSellAmount(0);
          }}>
          Annuler
        </Button>
      </DropTarget>
    </Grid>
  );
}

export default Vente;
