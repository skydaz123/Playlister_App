import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalStoreContext } from "../store";

import EditToolbar from "./EditToolbar";
import TextField from "@mui/material/TextField";

import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import SortIcon from "@mui/icons-material/Sort";

export default function MenuBanner() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [filter, setFilter] = useState("");

  const CurrentSort = {
    NONE: "NONE",
    NAMES: "NAMES",
    DATES: "DATES",
    LISTENS: "LISTENS",
    LIKES: "LIKES",
    DISLIKES: "DISLIKES",
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortNames = () => {
    store.setSort(CurrentSort.NAMES);
    handleMenuClose();
  };
  const handleSortDate = () => {
    store.setSort(CurrentSort.DATES);
    handleMenuClose();
  };
  const handleSortListens = () => {
    store.setSort(CurrentSort.LISTENS);
    handleMenuClose();
  };
  const handleSortLikes = () => {
    store.setSort(CurrentSort.LIKES);
    handleMenuClose();
  };
  const handleSortDislikes = () => {
    store.setSort(CurrentSort.DISLIKES);
    handleMenuClose();
  };

  useEffect(() => {
    console.log("FILTER IN SEARCHBAR IS: " + filter);
    store.setFilter(filter);
  }, [filter]);

  const handleInput = (event) => {
    setFilter(event.target.value);
    store.setFilter(filter);
  };

  const menuId = "primary-search-account-menu";

  const sortMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSortNames} sx={{ border: "1px solid black" }}>
        Name (A - Z)
      </MenuItem>
      <MenuItem onClick={handleSortDate} sx={{ border: "1px solid black" }}>
        Publish Date (Newest){" "}
      </MenuItem>
      <MenuItem onClick={handleSortListens} sx={{ border: "1px solid black" }}>
        Listens (High - Low)
      </MenuItem>
      <MenuItem onClick={handleSortLikes} sx={{ border: "1px solid black" }}>
        Likes (High - Low)
      </MenuItem>
      <MenuItem onClick={handleSortDislikes} sx={{ border: "1px solid black" }}>
        Dislikes (High - Low)
      </MenuItem>
    </Menu>
  );

  let menu = sortMenu;
  /*let menu = loggedOutMenu;
  if (auth.loggedIn) {
    menu = loggedInMenu;
    if (store.currentList) {
      editToolbar = <EditToolbar />;
    }
  }*/

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "gray" }}>
        <Toolbar>
          <Typography variant="h4" noWrap component="div" sx={{ marginTop: 2 }}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <HomeIcon fontSize="large"></HomeIcon>
            </Link>
          </Typography>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ marginTop: 2, marginLeft: 1 }}
          >
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <PeopleIcon fontSize="large"></PeopleIcon>
            </Link>
          </Typography>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ marginTop: 2, marginLeft: 1 }}
          >
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <PersonIcon fontSize="large"></PersonIcon>
            </Link>
          </Typography>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ margin: "auto", backgroundColor: "white", width: 500 }}
          >
            <TextField
              label="Search"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={(event) => {
                handleInput(event);
              }}
            />
          </Typography>
          <Typography variant="h4" sx={{ marginLeft: "auto", marginTop: 1 }}>
            <div style={{ fontSize: 20 }}>SORT BY</div>
          </Typography>
          <IconButton
            edge="end"
            aria-label="sort for lists"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <SortIcon
              sx={{ marginLeft: 1, marginTop: 1, fontSize: 40 }}
            ></SortIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
      {menu}
    </Box>
  );
}

/*import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        store.clearAllTransactions();
        auth.logoutUser();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        if (store.currentList) {
            editToolbar = <EditToolbar />;
        }
    }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <AccountCircle />;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block'} }}                        
                    >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>⌂</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="medium"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            { getAccountMenu(auth.loggedIn) }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}*/
