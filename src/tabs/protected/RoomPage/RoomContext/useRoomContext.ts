import React from "react";
import { RoomContext } from "./RoomContextProvider";
import RoomContextValue from "./RoomContextValue";


export default function useRoomContext() {
    return React.useContext(RoomContext) as RoomContextValue
}