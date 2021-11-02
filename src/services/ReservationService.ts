import Reservation from "../models/Reservation";
import { PaginationQueryParams } from "./interfaces";
import { RoomViewParams } from "./RoomService";
import Service from "./Service";


export interface ReservationsQueryParams extends PaginationQueryParams {
    from?: string,
    search?: string
}

class ReservationService extends Service {

    async getForRoom(
        { addressId, buildingId, roomId }: RoomViewParams,
        queryParams?: ReservationsQueryParams
    ) {
        return await this.get(
            `/addresses/${addressId}/buildings/${buildingId}/rooms/${roomId}/reservations`,
            queryParams
        );
    }

    resolveStatus(reservation: Reservation): string {
        const now = new Date();
        const { actualStart, plannedStart, actualEnd, plannedEnd } = reservation;

        const start = new Date(actualStart ? actualStart : plannedStart);
        const end = new Date(actualEnd ? actualEnd : plannedEnd);

        if (now >= start && now <= end && actualStart) return "Rezerwacja trwa";
        if (now < start) return "Jeszcze się nie rozpoczęła";
        if (now > start && !actualStart) return "Za chwilę się rozpocznie";
        if (now > end && actualEnd) return "Rezerwacja minęła";
        return "Błąd rozpoznania statusu";
    }
}

export default new ReservationService()