import { BuildingOrRoomChartsData, BuildingsOrRoomsChartsData, LogsChartsData, UserChartsData } from "../models/Stats";
import { AppURLParams } from "./interfaces";
import Service from "./Service";


export interface ChartsQueryData {
    from: string,
    to: string
}



export type ChartsData = (
    BuildingOrRoomChartsData |
    BuildingsOrRoomsChartsData |
    LogsChartsData |
    UserChartsData
);


class ChartService extends Service {

    /**
     * prepares path for charts service because different placement of resources charts
     * @param urlParams 
     * @returns 
     */
    protected preparePath(urlParams: AppURLParams): string {
        let endp = '';
        let url = window.location.toString();

        const map = {
            '/settings': '/requests',
            '/users': '/users'
        }

        if (Object.keys(urlParams).length === 0) {
            for (const [path, newPath] of Object.entries(map)) {
                if (url.includes(path)) {
                    endp = newPath;
                }
            }
        } else if ('addressId' in urlParams) {
            endp += `/addresses/${urlParams.addressId}/buildings`;

            if ('buildingId' in urlParams) {
                endp += `/${urlParams.buildingId}`;

                if ('roomId' in urlParams) endp += `/rooms/${urlParams.roomId}`;
            }
        } else if ('userId' in urlParams) {
            endp += `/users/${urlParams.userId}`
        }
        return endp;
    }

    public fetchData(urlParams: AppURLParams, queryParams: ChartsQueryData) {
        return this.get(this.preparePath(urlParams) + '/stats', queryParams);
    }



}

export default new ChartService();