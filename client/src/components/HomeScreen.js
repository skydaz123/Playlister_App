//import YouTubePlayerExample from './../YouTubePlaylisterReact-main/src/PlaylisterYouTubePlayer.js'
import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import MUIDeleteModal from "./MUIDeleteModal";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import YouTubePlayerExample from "./Player";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBanner from "./AppBanner";
import MenuBanner from "./MenuBanner";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import PlayerWrapper from "./PlayerWrapper";
import AuthContext from "../auth";
import TextField from "@mui/material/TextField";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  const CurrentTab = {
    HOME: "HOME",
    PLAYLISTS: "PLAYLISTS",
    USERS: "USERS",
  };

  useEffect(() => {
    store.loadIdNamePairs();
  }, []);

  const [value, setValue] = useState("one");
  const [comment, setComment] = useState("");

  function handleSubmit(event) {
    if (event.code === "Enter") {
      console.log("submitting comment... comment is : " + comment);
      store.addComment(auth.user.userName, comment);
      console.log("comment added");
      setComment("");
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleCreateNewList() {
    store.createNewList(auth.user.userName);
  }

  let listCard = "";

  // FILTER THE LISTCARDS IF SEARCH BAR IS USED AND RETURN THE FILTERED CARDS
  if (store) {
    console.log("SORT IN HOME IS: " + store.currentSort);
    let sortedListCards = store.sort();
    let filteredListCards;
    if (
      store.currentTab === CurrentTab.PLAYLISTS ||
      store.currentTab === CurrentTab.USERS
    ) {
      sortedListCards = sortedListCards.filter((pair) => {
        if (pair.published) {
          return pair;
        }
      });
    }

    if (store.currentTab === CurrentTab.USERS) {
      filteredListCards = sortedListCards.filter((pair) => {
        if (store.filterName === "" || store.filterName === " ") {
          return pair;
        } else if (
          pair.userName.toLowerCase().includes(store.filterName.toLowerCase())
        ) {
          return pair;
        }
      });
    } else {
      filteredListCards = sortedListCards.filter((pair) => {
        if (store.filterName === "" || store.filterName === " ") {
          return pair;
        } else if (
          pair.name.toLowerCase().includes(store.filterName.toLowerCase())
        ) {
          return pair;
        }
      });
    }

    listCard = (
      <List sx={{ top: "5%", width: "90%", left: "5%" }}>
        {filteredListCards.map((pair) => (
          <div
            style={{
              backgroundColor: "lightgray",
              borderRadius: 10,
              border: "2px solid black",
              margin: 10,
            }}
            onDoubleClick={() => {
              store.setSelectedList(pair._id);
            }}
          >
            <ListCard key={pair._id} idNamePair={pair} selected={false} />
          </div>
        ))}
      </List>
    );
  }

  let comments = "";

  /*<Box
              sx={{
                bgcolor: "red",
                width: "100%",
                height: 350,
                borderRadius: 1,
              }}
            >
              {comments}
            </Box>
            <Box
              sx={{
                bgcolor: "white",
                width: "100%",
                height: 50,
                borderRadius: 2,
              }}
            >
              <TextField
                fullWidth
                label="Type comment..."
                autoFocus
                onChange={(event) => {
                  setComment(event.target.value);
                }}
                onKeyPress={(event) => {
                  handleSubmit(event);
                }}
                value={comment}
              />
            </Box> */
  /*
  if (store.currentSelectedList !== null) {
    comments = (
      <List
        sx={{
          top: "5%",
          width: "90%",
          left: "5%",
          height: "85%",
          overflowY: "scroll",
        }}
      >
        {store.currentSelectedList.comments.map((comment) => (
          <div
            style={{
              backgroundColor: "lightgray",
              borderRadius: 5,
              border: "2px solid black",
              wordWrap: "break-word",
              margin: 10,
              fontSize: 20,
            }}
          >
            {comment.userName}: {comment.comment}
          </div>
        ))}
      </List>
    );
  }
  */
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
              disabled={store.currentSelectedList === null}
            />
          </Tabs>
          <Box
            sx={{
              bgcolor: "lightgray",
              width: "97.4%",
              height: 400,
              borderRadius: 1,
            }}
          >
            <YouTubePlayerExample />
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
          disabled={
            store.currentTab === CurrentTab.USERS ||
            store.currentTab === CurrentTab.PLAYLISTS
          }
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
