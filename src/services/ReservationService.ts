import Reservation from "../models/Reservation";
import { BuildingViewParams } from "./BuildingService";
import { PaginationQueryParams } from "./interfaces";
import { RoomViewParams } from "./RoomService";
import Service from "./Service";


export interface ReservationsQueryParams extends PaginationQueryParams {
    from?: string,
    search?: string
}

export interface CreateReservationData {
    title: string,
    description: string,
    plannedStart: Date,
    plannedEnd: Date,
    roomId?: number
}

export interface UpdateReservationData {
    [index: string]: any,
    title?: string,
    description?: string,
    plannedStart?: Date,
    plannedEnd?: Date,
    roomId?: number
}


class ReservationService extends Service {

    getForRoom(
        { addressId, buildingId, roomId }: RoomViewParams,
        queryParams?: ReservationsQueryParams
    ) {
        return this.get(
            `/addresses/${addressId}/buildings/${buildingId}/rooms/${roomId}/reservations`,
            queryParams
        );
    }

    getForBuilding(
        { addressId, buildingId }: BuildingViewParams,
        queryParams?: ReservationsQueryParams
    ) {
        return this.get(
            `/addresses/${addressId}/buildings/${buildingId}/reservations`,
            queryParams
        );
    }

    createOne(data: CreateReservationData) {
        return this.post('/reservations', data)
    }

    update(id: number, data: UpdateReservationData) {
        return this.patch(`/reservations/${id}`, data);
    }

    pingKey(id: number, key: string) {
        return this.patch(`/reservations/${id}/keys`, {
            RFIDTag: key
        });
    }

    remove(id: number) {
        return this.delete(`/reservations/${id}`);
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