import GenericModal from "../GenericModal";
import CreateReservationForm from "./CreateReservationForm";


interface CreateReservationModalProps {
    open: boolean,
    onClose: () => void,
    roomId?: number
}

export default function CreateReservationModal(props: CreateReservationModalProps) {
    return (
        <GenericModal
            open={props.open}
            ariaLabel='Tworzenie rezerwacji'
            ariaDescription='Okno do tworzenia rezerwacji'
            onClose={props.onClose}
            sx={{
                maxWidth: "500px",
                overflow:'hidden'
            }}
        >
            <CreateReservationForm
                roomId={props.roomId}
                onCancel={props.onClose}
            />

        </GenericModal>
    );
}