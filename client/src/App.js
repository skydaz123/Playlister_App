import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    HomeWrapper,
    LoginScreen,
    RegisterScreen,
    Statusbar,
    WorkspaceScreen
} from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={HomeWrapper} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <div style={{ width: "50%" }}>
                            <Route path="/playlist/:id" exact component={WorkspaceScreen} />
                        </div>
                    </Switch>
                    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, paddingBottom: 20 }}>
                        <Statusbar />
                    </div>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App