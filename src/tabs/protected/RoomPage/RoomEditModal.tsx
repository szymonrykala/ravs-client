import GenericModal from "../../../shared/components/GenericModal";
import RoomEditForm from "./RoomEditForm";


interface RoomEditModalProps {
    open: boolean,
    onClose: () => void,
}


export default function RoomEditModal({
    open, onClose,
}: RoomEditModalProps) {
    return (
        <GenericModal
            open={open}
            onClose={onClose}
            ariaLabel="usuwanie obiektu"
            ariaDescription="Okno modalne do usuwania obiektu po kliknięciu zatwierdź"
            sx={{
                maxWidth: "450px",
            }}
        >
            <RoomEditForm
                onCancel={onClose}
            />
        </GenericModal>
    );
}