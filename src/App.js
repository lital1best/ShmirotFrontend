import {BrowserRouter} from 'react-router-dom';
import React from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {MuiTheme} from "./theme/muiTheme";
import {GlobalStyle} from "./theme/globalStyle";
import {UserProvider} from "./providers/Auth/UserProvider";
import {SnackbarProvider} from "./providers/Snackbar/SnackbarProvider";
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
