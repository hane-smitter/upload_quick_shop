import { useContext, useState, useEffect } from "react";
import { Paper, Tooltip, Box } from "@material-ui/core";

import GlobalState from "../../contexts/GlobalState";
import useStyles from "./Styles";

const Thumb = ({ file }) => {
  const classes = useStyles();

  let loading = true;

  console.log("why are you re-rendering the file variable");
  console.log(file);

  if (!file) return null;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadstart = () => {
    document.getElementById('status').innerText = "Loading..."
  }
  reader.onloadend = () => {
    if (reader.readyState === 2) {
      document.getElementById('preview').src = reader.result;
      document.getElementById('status').innerText = "current selected image:"
    }
  };


  return (
    <Paper variant="outlined" className={classes.imageField}>
      <Tooltip title={file.name}>
        <Box>
          <p id="status">Loading...</p>
          <img alt={file.name} height={150} width={150} id="preview" />
        </Box>
      </Tooltip>
    </Paper>
  );
};

export default Thumb;
