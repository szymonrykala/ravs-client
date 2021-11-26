import { DatesQueryParams } from "./interfaces";
import { LogsQueryParams } from "./LogService";
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

    public getEndpointsChartsData(query: DatesQueryParams) {
        return this.get('/requests/stats', query);
    }
}

export default new SettingsService();