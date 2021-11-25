import Reservation from "../../models/Reservation";
import { CreateReservationData, UpdateReservationData } from "../../services/ReservationService";


export default interface ReservationsContextValue {
    reservations: Reservation[],
    updateReservation: (id: number, data: UpdateReservationData) => Promise<boolean>,
    deleteReservation: (reservationId: number) => Promise<boolean>,
    createReservation: (data: CreateReservationData) => Promise<boolean>,
    pingKeyForReservation: (id: number, key: string) => Promise<boolean>
}