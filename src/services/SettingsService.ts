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

    /**
     * @param data 
     * @returns 
     */
    public update(data: SettingsUpdateParams) {
        return this.patch('/configurations', data);
    }
}

export default new SettingsService();