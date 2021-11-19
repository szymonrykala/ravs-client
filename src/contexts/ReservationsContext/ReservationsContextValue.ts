import Reservation from "../../models/Reservation";
import { APIResponse } from "../../services/interfaces";
import { CreateReservationData, ReservationsQueryParams, UpdateReservationData } from "../../services/ReservationService";


export default interface ReservationsContextValue {
    setLoader: React.Dispatch<React.SetStateAction<((queryParams: ReservationsQueryParams) => Promise<APIResponse>) | undefined>>,
    setQueryParams: React.Dispatch<React.SetStateAction<ReservationsQueryParams>>,
    reservations: Reservation[],
    updateReservation: (id: number, data: UpdateReservationData) => Promise<boolean>,
    deleteReservation: (reservationId: number) => Promise<boolean>,
    createReservation: (data: CreateReservationData) => Promise<boolean>,
    pingKeyForReservation: (id: number, key: string) => Promise<boolean>
}