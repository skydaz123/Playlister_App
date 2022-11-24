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

function ListCard(props) {
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

  async function handleDeleteList(event, id) {
    event.stopPropagation();
    let _id = event.target.id;
    _id = ("" + _id).substring("delete-list-".length);
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

  function handleExpandList(event, id) {
    store.setCurrentList(id);
  }

  let songList = <div>poop</div>;
  
  if (store.currentList !== null && store.currentList._id === idNamePair._id){
    songList = (
        <WorkspaceScreen />
    )
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
        <div style={{ fontSize: 40 }}>{idNamePair.name}</div>
      </Grid>
      <Grid Item md={1}>
        <ThumbUpIcon fontSize="large" />
      </Grid>
      <Grid Item md={1}>
        <Grid Item>
          <div style={{ fontSize: 30 }}>0</div>
        </Grid>
      </Grid>
      <Grid Item>
        <ThumbDownIcon fontSize="large" />
      </Grid>
      <Grid Item>
        <div style={{ fontSize: 30, marginLeft: 5 }}>0</div>
      </Grid>
      <Grid Item md={12}>
        <div style={{ fontSize: 20 }}>Published By: </div>
      </Grid>
      
      <Grid Item md={12}>
        {songList}
      </Grid>

      <Grid Item md={5} sx={{ marginTop: 3 }}>
        <div style={{ fontSize: 20 }}> Published: {formattedDate} </div>
      </Grid>
      <Grid Item sx={{ marginTop: 3 }} md={5}>
        <div style={{ fontSize: 20 }}>Listens: 0</div>
      </Grid>
      <Grid Item>
        <IconButton
          onClick={(event) => {
            handleExpandList(event, idNamePair._id);
          }}
        >
          <KeyboardDoubleArrowDownIcon fontSize="large" />
        </IconButton>
      </Grid>
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
