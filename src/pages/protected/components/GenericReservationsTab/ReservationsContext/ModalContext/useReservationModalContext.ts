import React from "react";
import { ReservationModalViewContext } from "./ModalContextProvider";
import ModalContextValue from "./ModalContextValue";


export default function useReservationModalContext() {
    return React.useContext(ReservationModalViewContext) as ModalContextValue;
}