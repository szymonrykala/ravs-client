import Reservation from "../../models/Reservation";
import { APIResponse } from "../../services/interfaces";
import { ReservationsQueryParams } from "../../services/ReservationService";

export default interface ReservationsContextValue {
    setLoader: (
        callback: (queryParams: ReservationsQueryParams) => Promise<APIResponse>
    ) => void,
    setQueryParams: (params: ReservationsQueryParams) => void,
    reservations: Reservation[]
}

export const defaultContextValue: ReservationsContextValue = {
    setLoader: async (params) => { },
    setQueryParams: (params) => { },
    reservations: []
}