import { useContext } from "react";
import { notificationContext } from "./NotificationContextProvider";
import NotificationContextValue from "./NotificationContextValue";



export default function useNotification() {
    return useContext(notificationContext) as NotificationContextValue;
}