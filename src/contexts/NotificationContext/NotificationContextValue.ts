import { AlertProps } from "@mui/material/Alert";

type NotificationContextValue = (message: string,
    _severity: AlertProps["severity"],
    componentCallback?: () => null | React.ReactNode
) => void;

export default NotificationContextValue;


export const NotificationContextDefault = (
    message: string,
    _severity: AlertProps["severity"] = "error",
    componentCallback: () => null | React.ReactNode = () => null
) => { }