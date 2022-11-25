//import YouTubePlayerExample from './../YouTubePlaylisterReact-main/src/PlaylisterYouTubePlayer.js'
import React, { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import MUIDeleteModal from "./MUIDeleteModal";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBanner from "./AppBanner";
import MenuBanner from "./MenuBanner";
import { sizing } from "@mui/system";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import PlayerWrapper from "./PlayerWrapper";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
  const { store } = useContext(GlobalStoreContext);

  useEffect(() => {
    store.loadIdNamePairs();
  }, []);

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleCreateNewList() {
    store.createNewList();
  }

  let listCard = "";
  if (store) {
    listCard = (
      <List sx={{ top: "5%", width: "90%", left: "5%" }}>
        {store.idNamePairs.map((pair) => (
          <div
            style={{
              backgroundColor: "lightgray",
              borderRadius: 10,
              border: "2px solid black",
              margin: 10,
            }}
          >
            <ListCard key={pair._id} idNamePair={pair} selected={false} />
          </div>
        ))}
      </List>
    );
  }
  return (
    <Box sx={{ maxHeight: "90%" }}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box>
            <MenuBanner />
          </Box>
        </Grid>
        <Grid item md={6}>
          <div id="list-selector-list">
            {listCard}
            <MUIDeleteModal />
          </div>
        </Grid>
        <Grid item md={6}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              backgroundColor: "lightgray",
              width: "33.8%",
              borderRadius: 1,
            }}
          >
            <Tab
              value="one"
              label="Player"
              sx={{ border: "1px solid black" }}
            />
            <Tab
              value="two"
              label="Comments"
              sx={{ border: "1px solid black" }}
            />
          </Tabs>
          <Box
            sx={{
              bgcolor: "lightgray",
              width: "95%",
              height: 400,
              borderRadius: 1,
            }}
          >
            Hello
          </Box>
        </Grid>
        <Grid item></Grid>
      </Grid>
      <div id="list-selector-heading">
        <Fab
          aria-label="add"
          id="add-list-button"
          onClick={handleCreateNewList}
          sx={{ backgroundColor: "lightgray", color: "black" }}
        >
          <AddIcon />
        </Fab>
        <Typography variant="h2">Your Lists</Typography>
      </div>
    </Box>
  );
};

export default HomeScreen;

/* <div id="playlist-selector">
            <div id="list-selector-heading">
                <Fab
                    color="primary"
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
            <div id="youtube-player">
                
            </div>
        </div>)*/
