import Image from "../../../../models/Image";
import Room, { DetailedRoom } from "../../../../models/Room";
import { APIResponse, LogsQueryParams } from "../../../../services/interfaces";
import { RoomUpdateParams } from "../../../../services/RoomService";


export default interface RoomContextValue {
    room: Room | DetailedRoom,
    updateRoom: (body: RoomUpdateParams) => void,
    deleteRoom: () => Promise<void>,
    getLogs: (queryParms: LogsQueryParams) => Promise<APIResponse | undefined>,
    uploadImage: (image: Blob) => Promise<void>,
    deleteImage: (image: Image) => Promise<void>,
    getChartsData: (query: any) => Promise<APIResponse>
}