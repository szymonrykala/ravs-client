import Reservation from "../../models/Reservation";


export default interface ModalContextValue {
    showReservation: (reserv: Reservation) => void,
    reservation: Reservation | null
}