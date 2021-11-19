import { LogsQueryParams } from "./interfaces";
import Service from "./Service";


export interface SettingsUpdateParams {
    maxImageSize?: number,
    defaultUserAccess?: number,
    maxReservationTime?: number,
    minReservationTime?: number,
    reservationHistory?: number,
    requestHistory?: number
}


class SettingsService extends Service {

    public getAll() {
        return this.get('/configurations');
    }

    public update(data: SettingsUpdateParams) {
        return this.patch('/configurations', data);
    }

    public getLogs(queryParams?: LogsQueryParams) {
        return this.get('/configurations/requests', queryParams);
    }

}

export default new SettingsService();