import Reservation from "../models/Reservation";
import paths from "../shared/path";
import { AppURLParams, PaginationQueryParams } from "./interfaces";
import Service from "./Service";


export interface ReservationsQueryParams extends PaginationQueryParams {
    from?: string,
    search?: string
}

export interface CreateReservationData {
    title: string,
    description: string,
    plannedStart: string,
    plannedEnd: string,
    roomId?: number
}

export interface UpdateReservationData {
    [index: string]: any,
    title?: string,
    description?: string,
    plannedStart?: string,
    plannedEnd?: string,
    roomId?: number
}

enum Colors {
    success = '#edf7ed',
    error = '#fdeded',
    info = '#e5f6fd',
    warning = '#fff4e5',
    inert = '#f5f5f5'
}

interface ReservationStatus {
    message: string,
    color: Colors
}



class ReservationService extends Service {

    private emitStatus(mess: string, color: Colors): ReservationStatus {
        return { message: mess, color: color };
    }

    private localPreparPath(urlParams: AppURLParams): string {
        if (
            window.location.toString().includes(paths.HOME)
            && Object.keys(urlParams).length === 0
        ) {
            return '/users/' + this.userId.toString();
        }
        return this.preparePath(urlParams);
    }


    public getReservations(
        urlParams: AppURLParams,
        queryParams: ReservationsQueryParams
    ) {
        return this.get(`${this.localPreparPath(urlParams)}/reservations`, queryParams);
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

    /**
     * resolves status 
     * @param reservation
     * @returns 
     */
    public resolveStatus(reservation: Reservation): ReservationStatus {

        const nowTimestamp = Date.now();

        const now = new Date(nowTimestamp);
        const now_minus15 = new Date(nowTimestamp - 900_000);
        const now_plus15 = new Date(nowTimestamp + 900_000);
        const { actualStart, plannedStart, actualEnd, plannedEnd } = reservation;


        const start = new Date(actualStart ? actualStart : plannedStart);
        const end = new Date(actualEnd ? actualEnd : plannedEnd);


        // nie rozpocz????a si??
        if (!actualStart) {
            // jest ju?? po czasie, i czeka do +15 minut na odbi??r
            if (start < now && start > now_minus15) return this.emitStatus('Powinna zosta?? ju?? odebrana', Colors.warning);

            // za 15 minut zaczyna si?? rezerwacja
            if (start > now && start < now_plus15) return this.emitStatus('Za chwil?? zostanie odebrana', Colors.info);

            // nie zosta??a odbrana w czasie <planowany start + 15 minut>
            if (start < now_plus15) return this.emitStatus('Nieodebrana.', Colors.error)

            return this.emitStatus('Oczekuje', Colors.inert)

            // rozpocz????a si??
        } else if (actualStart) {
            // zako??czy??a si??
            if (actualEnd) return this.emitStatus('Rezerwacja zako??czona.', Colors.inert);

            // nie zako??czy??a si??
            if (!actualEnd) {
                // ko??czy si?? w ci??gu 15 minut
                if (now < end && now_plus15 > end) return this.emitStatus('Za chwil?? si?? ko??czy.', Colors.info);

                // czas zako??czenia ju?? min????
                if (now > end) {
                    const end_plus15 = new Date(Date.parse(end.toString()) + 900_000)

                    // dodajemy 15 minut
                    if (now < end_plus15) return this.emitStatus('Powinna si?? zako??czy??.', Colors.warning);

                    // dodane 15 minut ju?? min????o
                    if (now > end_plus15) return this.emitStatus('Czas min????, klucz nie oddany.', Colors.error);
                }

                return this.emitStatus('Rezerwacja trwa.', Colors.success);
            }
        }

        return this.emitStatus("Status nieznany", Colors.warning);
    }
}

export default new ReservationService()