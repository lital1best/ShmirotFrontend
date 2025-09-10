import {LoginPage} from './components/Dialogs/LoginPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {SignUpPage} from "./components/Dialogs/SignUpPage";
import {PasswordSetupPage} from "./components/Dialogs/PasswordSetupPage";
import HomePage from "./components/HomePageWithTabs";
import React from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {MuiTheme} from "./color_themes/mui_theme";
import {GlobalStyle} from "./color_themes/global_style";


function App() {
    return <BrowserRouter>
        <GlobalStyle/>
        <ThemeProvider theme={MuiTheme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/signup/password" element={<PasswordSetupPage/>}/>
            </Routes>
        </ThemeProvider>
    </BrowserRouter>
}

export default App;
