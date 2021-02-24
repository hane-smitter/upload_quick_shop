import React, { useState } from "react";
import { Typography, Container, AppBar } from "@material-ui/core";

import GlobalState from "./contexts/GlobalState";
import "./App.css";
import { Pages } from "./pages/";

const App = () => {
  const [globState, setGlobState] = useState({
    image: '',
    imageBin: '',
    condition: '',
    brand: '',
    description: ''
});
  return (
    <div>
      <GlobalState.Provider value={[globState, setGlobState]}>
        <Container maxwidth="lg">
          <AppBar position="static" color="inherit">
            <Typography variant="h4" align="center">
              Find An Item
            </Typography>
          </AppBar>

          <Pages />
        </Container>
      </GlobalState.Provider>
    </div>
  );
};

export default App;
