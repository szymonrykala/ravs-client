import Reservation from "../models/Reservation";
import { AddressViewParams } from "./AddressService";
import { BuildingViewParams } from "./BuildingService";
import { PaginationQueryParams } from "./interfaces";
import { RoomViewParams } from "./RoomService";
import Service from "./Service";
import { UserViewParams } from "./UserService";


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


    public getReservations(
        urlParams: RoomViewParams | BuildingViewParams | AddressViewParams | UserViewParams,
        queryParams: ReservationsQueryParams
    ) {
        let endp = '';

        if ('addressId' in urlParams) {
            endp += `/addresses/${urlParams.addressId}`;

            if ('buildingId' in urlParams) {
                endp += `/buildings/${urlParams.buildingId}`;

                if ('roomId' in urlParams) endp += `/rooms/${urlParams.roomId}`;
            }
        } else if ('userId' in urlParams) {
            endp += `/users/${urlParams.userId}`
        }

        return this.get(`${endp}/reservations`, queryParams);
    }


    public createOne(data: CreateReservationData) {
        return this.post('/reservations', data)
    }

    public update(id: number, data: UpdateReservationData) {
        return this.patch(`/reservations/${id}`, data);
    }

    public pingKey(id: number, key: string) {
        return this.patch(`/reservations/${id}/keys`, {
            RFIDTag: key
        });
    }

    public remove(id: number) {
        return this.delete(`/reservations/${id}`);
    }

    public resolveStatus(reservation: Reservation): string {
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