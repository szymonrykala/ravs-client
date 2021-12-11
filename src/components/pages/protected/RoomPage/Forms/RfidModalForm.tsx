import GenericModal from "../../components/GenericModal";
import RfidForm from "../../components/RfidForm";
import { useRoomContext } from "../RoomContext";


interface RfidModalRormProps {
    open: boolean,
    onClose: () => void,
}

export default function RfidModalRorm(props: RfidModalRormProps) {
    const { updateRFIDTag } = useRoomContext();

    return (
        <GenericModal
            open={props.open}
            onClose={props.onClose}
            aria-label="Okno przypisania tagu RFID"
            sx={{
                maxWidth: "400px"
            }}
        >
            <RfidForm
                headline="Użyj czytnika, aby wprowadzić tag."
                bodyText='Jeśli nie chcesz wprowadzać zmian, naciśnij "Zamknij"'
                onScan={updateRFIDTag}
                onClose={props.onClose}
            />
        </GenericModal>
    );
}
