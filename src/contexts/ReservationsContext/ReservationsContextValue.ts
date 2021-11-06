import Reservation from "../../models/Reservation";
import { APIResponse } from "../../services/interfaces";
import { ReservationsQueryParams } from "../../services/ReservationService";

export default interface ReservationsContextValue {
    setLoader: React.Dispatch<React.SetStateAction<((queryParams: ReservationsQueryParams) => Promise<APIResponse>) | undefined>>,
    setQueryParams: React.Dispatch<React.SetStateAction<ReservationsQueryParams>>,
    reservations: Reservation[]
}

export const defaultContextValue: ReservationsContextValue = {
    setLoader: async (params) => { },
    setQueryParams: (params) => { },
    reservations: []
}