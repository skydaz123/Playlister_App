import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import WorkspaceScreen from "./WorkspaceScreen";
import EditToolbar from "./EditToolbar";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Button from "@mui/material/Button";
import AuthContext from "../auth";

function ListCard(props) {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");
  const { idNamePair, selected } = props;

  const date = idNamePair.date;
  const formattedDate = date.substring(0, 10);

  function handleLoadList(event, id) {
    console.log("handleLoadList for " + id);
    if (!event.target.disabled) {
      let _id = event.target.id;
      if (_id.indexOf("list-card-text-") >= 0)
        _id = ("" + _id).substring("list-card-text-".length);

      console.log("load " + event.target.id);

      // CHANGE THE CURRENT LIST
      store.setCurrentList(id);
    }
  }

  function handleToggleEdit(event) {
    event.stopPropagation();
    toggleEdit();
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive();
    }
    setEditActive(newActive);
  }

  async function handleDeleteList(id) {
    store.markListForDeletion(id);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let id = event.target.id.substring("list-".length);
      store.changeListName(id, text);
      toggleEdit();
    }
  }
  function handleUpdateText(event) {
    setText(event.target.value);
  }

  function handleExpandList(id) {
    store.setCurrentList(id);
  }

  let expandArrow = (
    <IconButton
      onClick={() => {
        handleExpandList(idNamePair._id);
      }}
    >
      <KeyboardDoubleArrowDownIcon fontSize="large" />
    </IconButton>
  );

  /*<IconButton
          onClick={(event) => {
            handleExpandList(event, idNamePair._id);
          }}
        ></IconButton>*/

  let songList = <div></div>;

  if (store.currentList !== null && store.currentList._id === idNamePair._id) {
    expandArrow = (
      <IconButton
        onClick={() => {
          store.closeCurrentList();
        }}
      >
        <KeyboardDoubleArrowUpIcon fontSize="large" />
      </IconButton>
    );

    if (!idNamePair.published) {
      songList = (
        <Box sx={{ backgroundColor: "darkgray", height: 285 }}>
          <Box sx={{ height: 250, maxHeight: 250, overflowY: "scroll" }}>
            <WorkspaceScreen />
          </Box>
          <Box>
            <EditToolbar />
            <Button variant="contained" sx={{ fontSize: 13 }} onClick={() => { store.publishList(idNamePair._id) }}>
              Publish
            </Button>
            <Button
              variant="contained"
              sx={{ fontSize: 13 }}
              onClick={() => {
                handleDeleteList(idNamePair._id);
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{ fontSize: 13 }}
              onClick={() => {
                store.duplicateList();
              }}
            >
              Duplicate
            </Button>
          </Box>
        </Box>
      );
    }
    else {
      songList = (
        <Box sx={{ backgroundColor: "darkgray", height: 285 }}>
          <Box sx={{ height: 250, maxHeight: 250, overflowY: "scroll" }}>
            <WorkspaceScreen />
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ fontSize: 13 }}
              onClick={() => {
                handleDeleteList(idNamePair._id);
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{ fontSize: 13 }}
              onClick={() => {
                store.duplicateList();
              }}
            >
              Duplicate
            </Button>
          </Box>
        </Box>
      );
    }
  }


  let selectClass = "unselected-list-card";
  if (selected) {
    selectClass = "selected-list-card";
  }
  let cardStatus = false;
  if (store.isListNameEditActive) {
    cardStatus = true;
  }



  let cardElement = (
    <Grid container style={{ marginTop: 10 }}>
      <Grid Item md={8}>
        <div style={{ fontSize: 40 }} onDoubleClick={handleToggleEdit}>{idNamePair.name}</div>
      </Grid>
      <Grid Item md={1}>
        <IconButton onClick={() => { store.likeList(idNamePair._id) }}>
          <ThumbUpIcon fontSize="large" />
        </IconButton>
      </Grid>
      <Grid Item md={1}>
        <Grid Item>
          <div style={{ fontSize: 30, marginTop: 4 }}>{idNamePair.likes}</div>
        </Grid>
      </Grid>
      <Grid Item>
        <IconButton onClick={() => { store.dislikeList(idNamePair._id) }}>
          <ThumbDownIcon fontSize="large" />
        </IconButton>
      </Grid>
      <Grid Item>
        <div style={{ fontSize: 30, marginLeft: 5, marginTop: 3 }}>{idNamePair.dislikes}</div>
      </Grid>
      <Grid Item md={12}>
        <div style={{ fontSize: 20 }}>Published By: {idNamePair.userName}</div>
      </Grid>
      <Grid Item md={12}>
        {songList}
      </Grid>
      <Grid Item md={5} sx={{ marginTop: 3 }}>
        <div style={{ fontSize: 20 }}> Published: {idNamePair.publishDate} </div>
      </Grid>
      <Grid Item sx={{ marginTop: 3 }} md={5}>
        <div style={{ fontSize: 20 }}>Listens: {idNamePair.listens}</div>
      </Grid>
      <Grid Item>{expandArrow}</Grid>
    </Grid>
  );

  if (editActive) {
    cardElement = (
      <TextField
        margin="normal"
        required
        fullWidth
        id={"list-" + idNamePair._id}
        label="Playlist Name"
        name="name"
        autoComplete="Playlist Name"
        className="list-card"
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        defaultValue={idNamePair.name}
        inputProps={{ style: { fontSize: 48 } }}
        InputLabelProps={{ style: { fontSize: 24 } }}
        autoFocus
      />
    );
  }
  return cardElement;
}

export default ListCard;

/*
<ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '40pt' }}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
        >

<Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{ fontSize: '30pt' }} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{ fontSize: '30pt' }} />
                    </IconButton>
                </Box>
                
                
                
                */
