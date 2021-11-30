import { DetailedBuilding } from "../../../../models/Building";
import Image from '../../../../models/Image';
import Room from "../../../../models/Room";
import { BuildingUpdateParams } from "../../../../services/BuildingService";



export default interface BuildingContextValue {
    building: DetailedBuilding,
    uploadImage: (image: Blob) => Promise<void>,
    deleteImage: (image: Image) => Promise<void>,
    deleteBuilding: () => Promise<void>,
    getRoomsInBuilding: () => Promise<Room[]>,
    updateBuilding: (data: BuildingUpdateParams) => Promise<boolean>
}