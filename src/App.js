import {LoginPage} from './components/Dialogs/LoginPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {SignUpPage} from "./components/Dialogs/SignUpPage";
import {PasswordSetupPage} from "./components/Dialogs/PasswordSetupPage";
import HomePage from "./components/HomePageWithTabs";
import React from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {MuiTheme} from "./color_themes/mui_theme";
import {GlobalStyle} from "./color_themes/global_style";
import {usePersistedUser, UserContext, UserProvider, useUser} from "./userContext";
import {AppRoutes} from "./AppRoutes";


function App() {
    return <BrowserRouter>
        <GlobalStyle/>
        <ThemeProvider theme={MuiTheme}>
            <CssBaseline />
            <UserProvider>
                <AppRoutes/>
            </UserProvider>
        </ThemeProvider>
    </BrowserRouter>
}

export default App;
