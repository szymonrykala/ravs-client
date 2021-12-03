import Reservation from "../../../../../../models/Reservation";


export default interface ModalContextValue {
    showReservation: (id: number) => void,
    reservation: Reservation | null
}