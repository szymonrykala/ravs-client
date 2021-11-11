import React from "react";
import ReservationViewModal from "../../shared/components/ReservationViewModal";
import { useReservations } from "../ReservationsContext";
import ModalContextValue from "./ModalContextValue";


export const ReservationModalViewContext = React.createContext<ModalContextValue>({
    showReservation: (id: number) => { },
    reservation: null
});


interface ModalContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}

export default function ModalContextProvider(props: ModalContextProviderProps) {
    const { reservations } = useReservations();

    const [modalOpen, setModalOpen] = React.useState<boolean>(true);
    const [reservationId, setReservationId] = React.useState<number | null>(null);


    const reservation = React.useMemo(() => {
        if (reservationId) {
            return reservations.find(({ id }) => id === reservationId);
        }
    }, [reservations, reservationId]) ?? null;


    const showReservation = React.useCallback((id: number) => {
        setReservationId(id);
        setModalOpen(true);
    }, []);


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