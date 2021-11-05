import React from "react";
import { ReservationModalViewContext } from "./ModalContextProvider";


export default function useReservationModalContext() {
    return React.useContext(ReservationModalViewContext);
}