import { DetailedBuilding } from "../../../../models/Building";
import { APIResponse, LogsQueryParams } from "../../../../services/interfaces";
import Image from '../../../../models/Image';
import Room from "../../../../models/Room";
import { BuildingUpdateParams } from "../../../../services/BuildingService";



export default interface BuildingContextValue {
    building: DetailedBuilding,
    getLogs: (queryParms: LogsQueryParams) => Promise<APIResponse | undefined>,
    uploadImage: (image: Blob) => Promise<void>,
    deleteImage: (image: Image) => Promise<void>,
    getChartsData: (query: any) => Promise<APIResponse>,
    deleteBuilding: () => Promise<void>,
    getRoomsInBuilding: () => Promise<Room[]>,
    updateBuilding: (data: BuildingUpdateParams) => Promise<boolean>
}