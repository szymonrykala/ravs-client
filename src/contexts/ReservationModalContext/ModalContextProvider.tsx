import React from "react";
import Reservation from "../../models/Reservation";
import ReservationViewModal from "../../shared/components/ReservationViewModal";
import ModalContextValue from "./ModalContextValue";


export const ReservationModalViewContext = React.createContext<ModalContextValue>({
    showReservation: (reserv: Reservation) => { },
    reservation: null
});


interface ModalContextProviderProps {
    children: React.ReactNode | React.ReactNodeArray
}

export default function ModalContextProvider(props: ModalContextProviderProps) {
    const [modalOpen, setModalOpen] = React.useState<boolean>(true);
    const [reservation, setReservation] = React.useState<Reservation | null>(null);

    const showReservation = (reserv: Reservation) => {
        setReservation(reserv);
        setModalOpen(true);
    }


    return (
        <ReservationModalViewContext.Provider value={{ reservation, showReservation }}>
            {props.children}

            {reservation &&
                <ReservationViewModal
                    reservation={reservation}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                />}
        </ReservationModalViewContext.Provider>
    );
}