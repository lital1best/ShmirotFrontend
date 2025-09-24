import {BrowserRouter} from 'react-router-dom';
import React from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {MuiTheme} from "./color_themes/mui_theme";
import {GlobalStyle} from "./color_themes/global_style";
import {AppRoutes} from "./AppRoutes";
import {SWRConfig} from "swr";
import axiosClient from "./api/axiosClient";
import {UserProvider} from "./UserContext";

function App() {
    return <BrowserRouter>
        <GlobalStyle/>
        <ThemeProvider theme={MuiTheme}>
            <CssBaseline/>
            <SWRConfig value={{refreshInterval: 5000, fetcher: (url) => axiosClient.get(url).then(res => res.data)}}>
                <UserProvider>
                    <AppRoutes/>
                </UserProvider>
            </SWRConfig>
        </ThemeProvider>
    </BrowserRouter>
}

export default App;
