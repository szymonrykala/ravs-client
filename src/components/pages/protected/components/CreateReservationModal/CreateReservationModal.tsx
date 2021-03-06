import React from "react";
import GenericModal from "../../components/GenericModal";
import CreateReservationForm from "./CreateReservationForm";


interface CreateReservationModalProps {
    open: boolean,
    onClose: () => void,
    roomId?: number
}

function CreateReservationModal(props: CreateReservationModalProps) {
    return (
        <GenericModal
            open={props.open}
            aria-label='Okno do tworzenia rezerwacji'
            onClose={props.onClose}
        >
            <CreateReservationForm
                roomId={props.roomId}
                onCancel={props.onClose}
            />

        </GenericModal>
    );
}

export default React.memo(CreateReservationModal);