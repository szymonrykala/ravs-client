import { DetailedBuilding } from "../../../../models/Building";
import Room from "../../../../models/Room";
import { BuildingUpdateParams } from "../../../../services/BuildingService";



export default interface BuildingContextValue {
    building: DetailedBuilding,
    deleteBuilding: () => Promise<void>,
    getRoomsInBuilding: () => Promise<Room[]>,
    updateBuilding: (data: BuildingUpdateParams) => Promise<boolean>
}