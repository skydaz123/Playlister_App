import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'
import TextField from '@mui/material/TextField';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';







export default function MenuBanner() {
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
            <AppBar position="static" sx={{ backgroundColor: 'gray' }}>
                <Toolbar>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ marginTop: 2 }}
                    >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>
                            <HomeIcon fontSize="large"></HomeIcon>
                        </Link>
                    </Typography>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ marginTop: 2, marginLeft: 1 }}
                    >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>
                            <PeopleIcon fontSize="large"></PeopleIcon>
                        </Link>
                    </Typography>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ marginTop: 2, marginLeft: 1 }}
                    >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>
                            <PersonIcon fontSize="large"></PersonIcon>
                        </Link>

                    </Typography>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ margin: "auto", backgroundColor: "white", width: 500 }}
                    >
                        <TextField label="Search" variant="outlined" sx={{ width: "100%" }}></TextField>
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ marginLeft: "auto", marginTop: 1 }}
                    >
                        <div style={{ fontSize: 20 }}>SORT BY</div>
                    </Typography>
                    <SortIcon sx={{ marginLeft: 1, marginTop: 1, fontSize:40 }}></SortIcon>
                </Toolbar>
            </AppBar>
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














