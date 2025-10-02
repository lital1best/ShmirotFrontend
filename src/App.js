import {BrowserRouter} from 'react-router-dom';
import React from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {MuiTheme} from "./color_themes/mui_theme";
import {GlobalStyle} from "./color_themes/global_style";
import {UserProvider} from "./providers/UserProvider";
import {SnackbarProvider} from "./providers/SnackbarProvider";
import axiosClient from "./api/axiosClient";
import {AppRoutes} from "./AppRoutes";
import {SWRConfig} from "swr";

function App() {
    return <BrowserRouter>
        <GlobalStyle/>
        <ThemeProvider theme={MuiTheme}>
            <CssBaseline/>
            <SnackbarProvider>
                <UserProvider>
                    <SWRConfig value={{
                        refreshInterval: 5000,
                        fetcher: (url) => axiosClient.get(url).then(res => res.data)
                    }}>
                        <AppRoutes/>
                    </SWRConfig>
            </UserProvider>
            </SnackbarProvider>
        </ThemeProvider>
    </BrowserRouter>
}

export default App;
