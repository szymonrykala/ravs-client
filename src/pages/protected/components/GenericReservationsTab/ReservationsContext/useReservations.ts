import React from "react";
import { reservationsContext } from "./ReservationsContextProvider";
import ReservationsContextValue from "./ReservationsContextValue";

export default function useReservations() {
    return React.useContext(reservationsContext) as ReservationsContextValue;
}