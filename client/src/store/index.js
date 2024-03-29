import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jsTPS from "../common/jsTPS";
import api from "./store-request-api";
import CreateSong_Transaction from "../transactions/CreateSong_Transaction";
import MoveSong_Transaction from "../transactions/MoveSong_Transaction";
import RemoveSong_Transaction from "../transactions/RemoveSong_Transaction";
import UpdateSong_Transaction from "../transactions/UpdateSong_Transaction";
import AuthContext from "../auth";
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/
// test for commit

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
  CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
  CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
  CREATE_NEW_LIST: "CREATE_NEW_LIST",
  LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
  MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
  SET_CURRENT_LIST: "SET_CURRENT_LIST",
  SET_SELECTED_LIST: "SET_SELECTED_LIST",
  SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
  EDIT_SONG: "EDIT_SONG",
  REMOVE_SONG: "REMOVE_SONG",
  HIDE_MODALS: "HIDE_MODALS",
  SET_FILTER: "SET_FILTER",
  SET_SORT: "SET_SORT",
  SWITCH_PLAYLISTS_TAB: "SET_PLAYLISTS_TAB",
  SWITCH_USERS_TAB: "SWITCH_USERS_TAB",
  SWITCH_HOME_TAB: "SWITCH_HOME_TAB",
  LIKE_DISLIKE_LIST: "LIKE_DISLIKE_LIST",
  SWITCH_PLAYER: "SWITCH_PLAYER",
  SWITCH_COMMENTS: "SWITCH_COMMENTS",
  LOGOUT: "LOGOUT",
};

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
  NONE: "NONE",
  DELETE_LIST: "DELETE_LIST",
  EDIT_SONG: "EDIT_SONG",
  REMOVE_SONG: "REMOVE_SONG",
  ERROR_MODAL: "ERROR_MODAL",
};

const CurrentSort = {
  NONE: "NONE",
  NAMES: "NAMES",
  DATES: "DATES",
  LISTENS: "LISTENS",
  LIKES: "LIKES",
  DISLIKES: "DISLIKES",
  CREATED_DATE: "CREATED_DATE",
  LAST_EDITED: "LAST_EDITED"
};

const CurrentTab = {
  HOME: "HOME",
  PLAYLISTS: "PLAYLISTS",
  USERS: "USERS",
};

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    currentModal: CurrentModal.NONE,
    currentSort: CurrentSort.NONE,
    currentTab: CurrentTab.HOME,
    idNamePairs: [],
    currentList: null,
    currentSelectedList: null,
    currentSongIndex: -1,
    currentSong: null,
    newListCounter: 0,
    listNameActive: false,
    listIdMarkedForDeletion: null,
    listMarkedForDeletion: null,
    filterName: "",
    openPlayer: true,
  });
  const history = useHistory();

  console.log("inside useGlobalStore");

  // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
  const { auth } = useContext(AuthContext);
  console.log("auth: " + auth);

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.CHANGE_LIST_NAME: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      // STOP EDITING THE CURRENT LIST
      case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: null,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      // CREATE A NEW LIST
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: payload,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter + 1,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      // GET ALL THE LISTS SO WE CAN PRESENT THEM
      case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: payload,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      // PREPARE TO DELETE A LIST
      case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
        return setStore({
          currentModal: CurrentModal.DELETE_LIST,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: null,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: payload.id,
          listMarkedForDeletion: payload.playlist,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      // UPDATE A LIST
      case GlobalStoreActionType.SET_CURRENT_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: payload,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      // START EDITING A LIST NAME
      case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: payload,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: true,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      //
      case GlobalStoreActionType.EDIT_SONG: {
        return setStore({
          currentModal: CurrentModal.EDIT_SONG,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      case GlobalStoreActionType.REMOVE_SONG: {
        return setStore({
          currentModal: CurrentModal.REMOVE_SONG,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      case GlobalStoreActionType.ERROR_MODAL: {
        return setStore({
          currentModal: CurrentModal.ERROR_MODAL,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: null,
          currentSong: null,
          newListCounter: null,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      case GlobalStoreActionType.HIDE_MODALS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      case GlobalStoreActionType.SET_FILTER: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: payload,
          openPlayer: store.openPlayer,
        });
      }
      case GlobalStoreActionType.SET_SORT: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: payload,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      case GlobalStoreActionType.SET_SELECTED_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: payload,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      case GlobalStoreActionType.SWITCH_HOME_TAB: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: CurrentSort.NONE,
          currentTab: CurrentTab.HOME,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      case GlobalStoreActionType.SWITCH_PLAYLISTS_TAB: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.NONE,
          currentTab: CurrentTab.PLAYLISTS,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      case GlobalStoreActionType.SWITCH_USERS_TAB: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.NONE,
          currentTab: CurrentTab.USERS,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      case GlobalStoreActionType.LIKE_DISLIKE_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: CurrentTab.USERS,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: store.openPlayer,
        });
      }
      case GlobalStoreActionType.SWITCH_COMMENTS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: false,
        });
      }
      case GlobalStoreActionType.SWITCH_PLAYER: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: store.currentSort,
          currentTab: store.currentTab,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSelectedList: store.currentSelectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: store.filterName,
          openPlayer: true,
        });
      }
      case GlobalStoreActionType.LOGOUT: {
        return setStore({
          currentModal: CurrentModal.NONE,
          currentSort: CurrentSort.NONE,
          currentTab: CurrentTab.HOME,
          idNamePairs: [],
          currentList: null,
          currentSelectedList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: null,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          filterName: "",
          openPlayer: true,
        });
      }
      default:
        return store;
    }
  };

  useEffect(() => {
    store.loadIdNamePairs();
  }, [store.currentTab, store.currentSelectedList]);

  store.logout = function () {
    storeReducer({
      type: GlobalStoreActionType.LOGOUT,
      payload: {},
    });
  };

  store.switchComments = function () {
    storeReducer({
      type: GlobalStoreActionType.SWITCH_COMMENTS,
      payload: {},
    });
  };

  store.switchPlayer = function () {
    storeReducer({
      type: GlobalStoreActionType.SWITCH_PLAYER,
      payload: {},
    });
  };

  store.switchHomeTab = function () {
    storeReducer({
      type: GlobalStoreActionType.SWITCH_HOME_TAB,
      payload: {},
    });
  };

  store.switchPlaylistsTab = function () {
    storeReducer({
      type: GlobalStoreActionType.SWITCH_PLAYLISTS_TAB,
      payload: {},
    });
  };

  store.switchUsersTab = function () {
    storeReducer({
      type: GlobalStoreActionType.SWITCH_USERS_TAB,
      payload: {},
    });
  };

  store.setFilter = function (value) {
    storeReducer({
      type: GlobalStoreActionType.SET_FILTER,
      payload: value,
    });
  };

  store.setSort = function (sort) {
    console.log("SORT VALUE IS: " + sort);
    storeReducer({
      type: GlobalStoreActionType.SET_SORT,
      payload: sort,
    });
  };

  store.sort = function () {
    let list = store.idNamePairs;
    if (store.currentSort === CurrentSort.NAMES) {
      list = list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (store.currentSort === CurrentSort.DATES) {
      list = list.sort((a, b) => new Date(a.publishDate) > new Date(b.publishDate) ? -1 : 1);
    } else if (store.currentSort === CurrentSort.LISTENS) {
      list = list.sort((a, b) => (a.listens > b.listens ? -1 : 1));
    } else if (store.currentSort === CurrentSort.LIKES) {
      console.log("HIT SORT LIKES");
      list = list.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    } else if (store.currentSort === CurrentSort.DISLIKES) {
      list = list.sort((a, b) => (a.dislikes > b.dislikes ? -1 : 1));
    }
    else if (store.currentSort === CurrentSort.CREATED_DATE){
      list = list.sort((a, b) => new Date(a.date) < new Date(b.date) ? -1 : 1);
    }
    else if (store.currentSort === CurrentSort.LAST_EDITED){
      list = list.sort((a, b) => new Date(a.update) > new Date(b.update) ? -1 : 1);
    }
    return list;
  };
  // THIS FUNCTION PROCESSES CHANGING A LIST NAME

  store.changeListName = function (id, newName) {
    async function asyncChangeListName(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        playlist.name = newName;
        async function updateList(playlist) {
          response = await api.updatePlaylistById(playlist._id, playlist);
          if (response.data.success) {
            async function getListPairs() {
              store.loadIdNamePairs();
            }
            getListPairs();
          }
        }
        updateList(playlist);
      }
    }
    if (store.containsListName(newName)) {
      store.showListErrorModal();
    } else {
      asyncChangeListName(id);
    }
  };

  store.publishList = function (id) {
    // GET THE LIST
    async function asyncLikeList(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        playlist.published = true;
        playlist.publishDate = new Date().toLocaleDateString();
        playlist.userName = auth.user.userName;
        console.log("PUBLISHING USER NAME IS: " + auth.user.userName);
        async function updateList(playlist) {
          response = await api.updatePlaylistById(playlist._id, playlist);
          if (response.data.success) {
            async function getListPairs() {
              store.loadIdNamePairs();
            }
            getListPairs();
          }
        }
        updateList(playlist);
      }
    }
    asyncLikeList(id);
  };

  store.dislikeList = function (id) {
    // GET THE LIST
    async function asyncDislikeList(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        let userNameDislikes = playlist.userDislikes;
        console.log("USERNAME DISLIKES SIZE IS: " + userNameDislikes.length);
        for (let index = 0; index < userNameDislikes.length; index++) {
          if (userNameDislikes[index].userName === auth.user.userName) {
            console.log("USERNAME IS: " + userNameDislikes[index].userName);
            return;
          }
        }
        playlist.dislikes += 1;
        let newUserName = {
          userName: auth.user.userName,
        };
        playlist.userDislikes.push(newUserName);
        async function updateList(playlist) {
          response = await api.updatePlaylistById(playlist._id, playlist);
          if (response.data.success) {
            async function getListPairs() {
              store.loadIdNamePairs();
            }
            getListPairs();
          }
        }
        updateList(playlist);
      }
    }
    asyncDislikeList(id);
  };

  store.likeList = function (id) {
    // GET THE LIST
    async function asyncLikeList(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        let userNameLikes = playlist.userLikes;
        console.log("USERNAMELIKES SIZE IS: " + userNameLikes.length);
        for (let index = 0; index < userNameLikes.length; index++) {
          if (userNameLikes[index].userName === auth.user.userName) {
            console.log("USERNAME IS: " + userNameLikes[index].userName);
            return;
          }
        }
        playlist.likes += 1;
        let newUserName = {
          userName: auth.user.userName,
        };
        playlist.userLikes.push(newUserName);
        async function updateList(playlist) {
          response = await api.updatePlaylistById(playlist._id, playlist);
          if (response.data.success) {
            async function getListPairs() {
              store.loadIdNamePairs();
            }
            getListPairs();
          }
        }
        updateList(playlist);
      }
    }
    asyncLikeList(id);
  };

  // CHECK IF THE LIST NAME TO PUT ALREADY EXISTS IN IDNAMEPAIRS

  store.containsListName = function (name) {
    for (let index = 0; index < store.idNamePairs.length; index++) {
      let list = store.idNamePairs[index];
      if (list.name === name) {
        return true;
      }
    }
    return false;
  };

  store.clearAllTransactions = function () {
    tps.clearAllTransactions();
  };
  // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
  store.closeCurrentList = function () {
    storeReducer({
      type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
      payload: {},
    });
    tps.clearAllTransactions();
    history.push("/");
  };

  store.addComment = function (userName, comment) {
    console.log("COMMENT IS: " + comment);
    const newComment = {
      userName: userName,
      comment: comment,
    };
    store.currentSelectedList.comments.push(newComment);
    async function updateList(playlist) {
      let response = await api.updatePlaylistById(playlist._id, playlist);
      if (response.data.success) {
        async function getListPairs() {
          store.loadIdNamePairs();
        }
        getListPairs();
      }
    }
    updateList(store.currentSelectedList);
  };
  // THIS FUNCTION CREATES A NEW LIST
  store.createNewList = function () {
    async function asyncCreateNewList() {
      let templateName = "Untitled";
      let count = 0;
      let newListName = templateName + count;
      while (store.containsListName(newListName)) {
        count++;
        newListName = templateName + count;
      }
      const response = await api.createPlaylist(
        newListName,
        [],
        auth.user.email
      );
      //(newListName, userName, newSongs, userEmail)
      console.log("createNewList response: " + response);
      tps.clearAllTransactions();
      let newList = response.data.playlist;
      storeReducer({
        type: GlobalStoreActionType.CREATE_NEW_LIST,
        payload: newList,
      });
      store.loadIdNamePairs();
      history.push("/");
    }
    asyncCreateNewList();
  };

  store.duplicateList = function () {
    async function asyncDuplicateList() {
      let templateName = store.currentList.name;
      let count = templateName.slice(-1);
      let newListName = templateName;
      if (count >= "0" && count <= "9") {
        while (store.containsListName(newListName)) {
          count++;
          newListName = templateName.slice(0, -1) + count;
        }
      } else {
        let count2 = 1;
        newListName += count2;
        while (store.containsListName(newListName)) {
          count2++;
          newListName = templateName + count2;
        }
      }
      const response = await api.createPlaylist(
        newListName,
        store.currentList.songs,
        auth.user.email
      );
      tps.clearAllTransactions();
      let newList = response.data.playlist;
      storeReducer({
        type: GlobalStoreActionType.CREATE_NEW_LIST,
        payload: newList,
      });
      store.loadIdNamePairs();
      history.push("/");
    }
    asyncDuplicateList();
  };

  // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
  store.loadIdNamePairs = function () {
    async function asyncLoadIdNamePairs() {
      let response;
      if (
        store.currentTab === CurrentTab.PLAYLISTS ||
        store.currentTab === CurrentTab.USERS
      ) {
        response = await api.getAllPlaylists();
      } else {
        response = await api.getPlaylistPairs();
      }
      if (response.data.success) {
        let pairsArray = response.data.idNamePairs;
        storeReducer({
          type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
          payload: pairsArray,
        });
      } else {
        console.log("API FAILED TO GET THE LIST PAIRS");
      }
    }
    asyncLoadIdNamePairs();
  };

  // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
  // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
  // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
  // showDeleteListModal, and hideDeleteListModal
  store.markListForDeletion = function (id) {
    async function getListToDelete(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        storeReducer({
          type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
          payload: { id: id, playlist: playlist },
        });
      }
    }
    getListToDelete(id);
  };
  store.deleteList = function (id) {
    async function processDelete(id) {
      await api.deletePlaylistById(id);
      store.loadIdNamePairs();
      history.push("/");
    }
    processDelete(id);
  };
  store.deleteMarkedList = function () {
    store.deleteList(store.listIdMarkedForDeletion);
    store.hideModals();
  };
  store.unmarkListForDeletion = function () {
    store.hideModals();
  };
  // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
  // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

  store.showEditSongModal = (songIndex, songToEdit) => {
    storeReducer({
      type: GlobalStoreActionType.EDIT_SONG,
      payload: { currentSongIndex: songIndex, currentSong: songToEdit },
    });
  };
  store.showRemoveSongModal = (songIndex, songToRemove) => {
    storeReducer({
      type: GlobalStoreActionType.REMOVE_SONG,
      payload: { currentSongIndex: songIndex, currentSong: songToRemove },
    });
  };

  store.showListErrorModal = () => {
    storeReducer({
      type: GlobalStoreActionType.ERROR_MODAL,
      payload: {},
    });
  };

  store.hideModals = () => {
    storeReducer({
      type: GlobalStoreActionType.HIDE_MODALS,
      payload: {},
    });
  };
  store.isDeleteListModalOpen = () => {
    return store.currentModal === CurrentModal.DELETE_LIST;
  };
  store.isEditSongModalOpen = () => {
    return store.currentModal === CurrentModal.EDIT_SONG;
  };
  store.isRemoveSongModalOpen = () => {
    return store.currentModal === CurrentModal.REMOVE_SONG;
  };
  store.isListErrorModalOpen = () => {
    return store.currentModal === CurrentModal.ERROR_MODAL;
  };

  // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
  // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
  // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
  // moveItem, updateItem, updateCurrentList, undo, and redo
  store.setCurrentList = function (id) {
    async function asyncSetCurrentList(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LIST,
          payload: playlist,
        });
      }
    }
    asyncSetCurrentList(id);
    store.clearAllTransactions();
  };

  store.setSelectedList = function (id) {
    console.log("INITATING CURRENT SELECTED LIST");
    async function asyncSetSelectedList(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        if (
          store.currentSelectedList !== null &&
          store.currentSelectedList._id !== playlist._id
        ) {
          playlist.listens += 1;
        }
        response = await api.updatePlaylistById(playlist._id, playlist);
        if (response.data.success) {
          storeReducer({
            type: GlobalStoreActionType.SET_SELECTED_LIST,
            payload: playlist,
          });
        }
      }
    }
    asyncSetSelectedList(id);
    store.clearAllTransactions();
  };

  store.getPlaylistSize = function () {
    return store.currentList.songs.length;
  };

  store.addNewSong = function () {
    let index = this.getPlaylistSize();
    this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
  };
  // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
  // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
  store.createSong = function (index, song) {
    let list = store.currentList;
    list.songs.splice(index, 0, song);
    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
  // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
  store.moveSong = function (start, end) {
    let list = store.currentList;

    // WE NEED TO UPDATE THE STATE FOR THE APP
    if (start < end) {
      let temp = list.songs[start];
      for (let i = start; i < end; i++) {
        list.songs[i] = list.songs[i + 1];
      }
      list.songs[end] = temp;
    } else if (start > end) {
      let temp = list.songs[start];
      for (let i = start; i > end; i--) {
        list.songs[i] = list.songs[i - 1];
      }
      list.songs[end] = temp;
    }

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
  // FROM THE CURRENT LIST
  store.removeSong = function (index) {
    let list = store.currentList;
    list.songs.splice(index, 1);

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
  store.updateSong = function (index, songData) {
    let list = store.currentList;
    let song = list.songs[index];
    song.title = songData.title;
    song.artist = songData.artist;
    song.youTubeId = songData.youTubeId;

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  store.addNewSong = () => {
    let playlistSize = store.getPlaylistSize();
    store.addCreateSongTransaction(
      playlistSize,
      "Untitled",
      "?",
      "dQw4w9WgXcQ"
    );
  };
  // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
  store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
    // ADD A SONG ITEM AND ITS NUMBER
    let song = {
      title: title,
      artist: artist,
      youTubeId: youTubeId,
    };
    let transaction = new CreateSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };
  store.addMoveSongTransaction = function (start, end) {
    let transaction = new MoveSong_Transaction(store, start, end);
    tps.addTransaction(transaction);
  };
  // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
  store.addRemoveSongTransaction = () => {
    let index = store.currentSongIndex;
    let song = store.currentList.songs[index];
    let transaction = new RemoveSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };
  store.addUpdateSongTransaction = function (index, newSongData) {
    let song = store.currentList.songs[index];
    let oldSongData = {
      title: song.title,
      artist: song.artist,
      youTubeId: song.youTubeId,
    };
    let transaction = new UpdateSong_Transaction(
      this,
      index,
      oldSongData,
      newSongData
    );
    tps.addTransaction(transaction);
  };

  store.updateCurrentList = function () {
    async function asyncUpdateCurrentList() {
      const response = await api.updatePlaylistById(
        store.currentList._id,
        store.currentList
      );
      if (response.data.success) {
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LIST,
          payload: store.currentList,
        });
        console.log("SUCCESSFULLY UPDATED LIST");
      } else {
        console.log("FAILED TO UPDATE LIST");
      }
    }
    asyncUpdateCurrentList();
  };

  store.undo = function () {
    tps.undoTransaction();
  };
  store.redo = function () {
    tps.doTransaction();
  };
  store.canAddNewSong = function () {
    return store.currentList !== null;
  };
  store.canUndo = function () {
    return store.currentList !== null && tps.hasTransactionToUndo();
  };
  store.canRedo = function () {
    return store.currentList !== null && tps.hasTransactionToRedo();
  };
  store.canClose = function () {
    return store.currentList !== null;
  };

  // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
  store.setIsListNameEditActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
      payload: null,
    });
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
