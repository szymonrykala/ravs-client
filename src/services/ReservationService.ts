import Reservation from "../models/Reservation";
import { AddressViewParams } from "./AddressService";
import { BuildingViewParams } from "./BuildingService";
import { AppURLParams, PaginationQueryParams } from "./interfaces";
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

enum Colors {
    success = '#edf7ed',
    error = '#fdeded',
    info = '#e5f6fd',
    warning = '#fff4e5',
    finished = '#f5f5f5'
}

interface ReservationStatus {
    message: string,
    color: Colors
}



class ReservationService extends Service {

    private emitStatus(mess: string, color: Colors): ReservationStatus {
        return { message: mess, color: color };
    }

    public getReservations(
        urlParams: AppURLParams,
        queryParams: ReservationsQueryParams
    ) {
        return this.get(`${this.preparePath(urlParams)}/reservations`, queryParams);
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

    public resolveStatus(reservation: Reservation): ReservationStatus {

        const nowTimestamp = Date.now();

        const now = new Date(nowTimestamp);
        const now_minus15 = new Date(nowTimestamp - 900);
        const now_plus15 = new Date(nowTimestamp + 900);

        const { actualStart, plannedStart, actualEnd, plannedEnd } = reservation;

        const start = new Date(actualStart ? actualStart : plannedStart);
        const end = new Date(actualEnd ? actualEnd : plannedEnd);


        // nie rozpoczęła się
        if (!actualStart) {
            // jest już po czasie, i czeka do +15 minut na odbiór
            if (start < now && start > now_minus15) return this.emitStatus('Za chwilę zostanie odebrana.', Colors.warning);

            // za 15 minut zaczyna się rezerwacja
            if (start > now && start < now_plus15) return this.emitStatus('Powinna zostać odebrana', Colors.info);

            // nie została odbrana w czasie <planowany start + 15 minut>
            if (start < now_plus15) return this.emitStatus('Nie odebrana.', Colors.error)

            // rozpoczęła się
        } else if (actualStart) {
            // zakończyła się
            if (actualEnd) return this.emitStatus('Rezerwacja zakończona.', Colors.finished);

            // nie zakończyła się
            if (!actualEnd) {
                // kończy się w ciągu 15 minut
                if (now < end && now_minus15 > end) return this.emitStatus('Za chwilę się kończy.', Colors.info);

                // powinna się już zakończyć, ale dajemy +15 minut na zkończenie 
                if (now > end && end > now_plus15) return this.emitStatus('Powinna się zakończyć.', Colors.warning);

                // powinna się już zakończyć, ale dajemy +15 minut na zkończenie 
                if (now > end && end < now_plus15) return this.emitStatus('Czas minął, klucz nie oddany.', Colors.error);

                return this.emitStatus('Rezerwacja trwa.', Colors.success);
            }
        }

        return this.emitStatus("Status nieznany", Colors.warning);
    }
}

export default new ReservationService()