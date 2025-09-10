import {createTheme} from "@mui/material";


export const MuiTheme = createTheme({
    palette: {
        primary: {
            main: '#c7d36f',
            dark: '#2f4a2e',
            light: '#6b8f5b',
            contrastText: '#e8f2a9',
        },
        secondary: {
            main: '#c7d36f',
            contrastText: '#2f4a2e',
        },
        background: {
            default: '#6b8f5b',
            paper: 'rgba(0, 0, 0, 0.6)',
        },
        text: {
            primary: '#c7d36f',
            secondary: '#e8f2a9',
        },
        error: {
            main: '#ff6b6b',
        },
        warning: {
            main: '#a89f7b',
        },
        success: {
            main: '#6b8f5b',
        },
        info: {
            main: '#c7d36f',
        },
    },
});
