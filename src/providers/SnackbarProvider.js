import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SnackbarUtils } from "./SnackbarUtils";

const SnackbarContext = createContext(null);

export const useSnackbar = () => {
    const ctx = useContext(SnackbarContext);
    if (!ctx) throw new Error("useSnackbar must be used within SnackbarProvider");
    return ctx;
};

function SnackbarInitializer() {
    const { showMessage } = useSnackbar();
    SnackbarUtils.setSnackbar(showMessage);
    return null;
}

export const SnackbarProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    const showMessage = (msg, sev = "error") => {
        if (msg?.response?.data?.message) {
            msg = msg?.response?.data?.message;
        } else if (msg?.message) {
            msg = msg?.message;
        }

        const id = new Date().getTime() + Math.random(); // unique ID
        setMessages((prev) => [...prev, { id, msg, severity: sev }]);
    };

    const handleClose = (id) => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <SnackbarContext.Provider value={{ showMessage }}>
            {children}
            {messages.map(({ id, msg, severity }, index) => (
                <Snackbar
                    key={id}
                    open
                    autoHideDuration={4000}
                    onClose={() => handleClose(id)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    style={{ marginBottom: index * 60 }} // stagger them vertically
                >
                    <Alert onClose={() => handleClose(id)} severity={severity} sx={{ width: "100%" }}>
                        {msg}
                    </Alert>
                </Snackbar>
            ))}
            <SnackbarInitializer />
        </SnackbarContext.Provider>
    );
};
