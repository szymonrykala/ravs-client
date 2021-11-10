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

export const defaultContextValue: ReservationsContextValue = {
    setLoader: async (params) => { },
    setQueryParams: (params) => { },
    reservations: [],
    updateReservation: async (id, data) => false,
    deleteReservation: async (reservationId: number) => false,
    createReservation: async (data) => false,
    pingKeyForReservation: async (id: number, key: string) => false,
}