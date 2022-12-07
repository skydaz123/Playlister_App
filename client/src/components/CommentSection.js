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
import { stepperClasses } from "@mui/material";

const CommentsSection = (props) => {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  function handleSubmit(event) {
    if (event.code === "Enter") {
      store.addComment(auth.user.userName, comment);
      setComment("");
    }
  }

  let comments = "";
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

  if (store.currentSelectedList === null) {
    return <div></div>;
  } else {
    return (
      <Box>
        <Box
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
            disabled={auth.user === "guest"}
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
        </Box>
      </Box>
    );
  }
};

export default CommentsSection;
