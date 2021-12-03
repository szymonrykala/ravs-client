import GenericModal from "../../../../../shared/components/GenericModal";
import RfidForm from "../../../../../shared/components/RfidForm";
import { useReservations } from "../../../../../contexts/ReservationsContext";
import React from "react";


interface PingKeyModalFormProps {
    reservationId: number,
    open: boolean,
    onClose: () => void,
}


export default function PingKeyModalForm(props: PingKeyModalFormProps) {
    const { pingKeyForReservation } = useReservations();

    const handleKeyScan = React.useCallback(
        async (key: string) => pingKeyForReservation(props.reservationId, key)
        , [props, pingKeyForReservation]);


    return (
        <GenericModal
            open={props.open}
            onClose={props.onClose}
            aria-label="Okno do edycji rezerwacji"
            sx={{ maxWidth: '400px' }}
        >
            <RfidForm
                headline="Wczytaj klucz z tagiem NFC"
                bodyText='Przy pomocy czytnika, wczytaj wydawany klucz. Aby opuścić to okno, naciśnij "Zamknij"'
                onScan={handleKeyScan}
                onClose={props.onClose}
            />
        </GenericModal>
    );
}