import { Button } from '@mui/material';
import { useContext } from 'react'
import '../App.css'
import { GlobalStoreContext } from '../store'
import { Link } from 'react-router-dom'
import AuthContext from '../auth'


export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const handleGuestLogin = () => {
        store.switchPlaylistsTab();
        auth.guestLogin();
    }

    return (
        <div id="splash-screen" style={{ borderRadius: 5, height: "76%", marginTop:-4 }}>
            <div style={{ fontSize:45 }}>Welcome to Playlister</div>
            <div style={{ fontSize: 20, marginBottom: 20 }}>Are you bored and want to mess around in some knockoff YouTube app? Then Playlister is for you!</div>
            <div style={{ fontSize: 20, marginBottom: 40 }}>On Playlister, you can create and share custom playlists!</div>
            <div style={{ fontSize: 20 }}>First time here?</div>
            <div style={{ marginBottom: 15 }}>
                <Button variant="contained" size="medium" color="secondary"><Link to='/register/' style={{color:"white"}}>Create an Account</Link></Button>
            </div>
            <div style={{ fontSize: 20 }}>Already have an account?</div>
            <div style={{ marginBottom: 15 }}>
                <Button variant="contained" size="medium" color="secondary"><Link to='/login/' style={{color:"white"}}>Login</Link></Button>
            </div>
            <div style={{ fontSize: 20 }}>Too lazy to make an account?</div>
            <div style={{ marginBottom: 20 }}>
                <Button variant="contained" size="medium" color="secondary" onClick={handleGuestLogin}>Continue as Guest</Button>
            </div>
            <div style={{ fontSize: 15 }}>Created by: Hao Duong</div>
        </div>
    )
}