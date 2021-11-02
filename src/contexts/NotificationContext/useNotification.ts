import React, { useContext } from "react";
import { notificationContext } from "./NotificationContextProvider";



export default function useNotification() {
    return useContext(notificationContext) as any;
}