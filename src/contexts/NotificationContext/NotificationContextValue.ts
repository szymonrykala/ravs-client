import { AlertProps } from "@mui/material/Alert";

export type NotificationContextValue = (message: string,
    _severity: AlertProps["severity"],
    componentCallback?: () => null | React.ReactNode
) => void;


export const NotificationContextDefault = (
    message: string,
    _severity: AlertProps["severity"] = "error",
    componentCallback: () => null | React.ReactNode = () => null
) => { }