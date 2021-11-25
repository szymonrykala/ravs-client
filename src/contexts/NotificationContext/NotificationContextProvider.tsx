import { Alert, AlertProps, Snackbar } from "@mui/material";
import React, { createContext } from "react";
import NotificationContextValue, { NotificationContextDefault } from "./NotificationContextValue";



interface NotificationContextProviderProps {
    children?: React.ReactChild
}


export const notificationContext: any = createContext<NotificationContextValue>(NotificationContextDefault);


export default function NotificationContextProvider({
    children
}: NotificationContextProviderProps) {
    const [message, setMessage] = React.useState<string | null>();
    const [open, setOpen] = React.useState<boolean>(false);
    const [severity, setSeverity] = React.useState<AlertProps["severity"]>("error");
    const [component, setComponent] = React.useState<React.ReactNode>();


    const closeSnack = React.useCallback((event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setMessage('');
        setComponent(null);
    }, []);


    const setSnack = React.useCallback((
        message: string,
        _severity: AlertProps["severity"] = "error",
        componentCallback: () => null | React.ReactNode = () => null
    ) => {
        setSeverity(_severity);
        setMessage(message);
        setOpen(true);
        setComponent(componentCallback());
    }, []);


    return (
        <notificationContext.Provider value={setSnack}>
            {children}

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open} autoHideDuration={6000} onClose={closeSnack}>
                <Alert onClose={closeSnack} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

            {component}
        </notificationContext.Provider>
    );
}