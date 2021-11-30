import Image from "../../../../models/Image";
import { DetailedRoom } from "../../../../models/Room";
import { RoomUpdateParams } from "../../../../services/RoomService";


export default interface RoomContextValue {
    room: DetailedRoom,
    updateRoom: (body: RoomUpdateParams) => Promise<boolean>,
    deleteRoom: () => Promise<void>,
    uploadImage: (image: Blob) => Promise<void>,
    deleteImage: (image: Image) => Promise<void>,
    updateRFIDTag: (key: string) => Promise<boolean>,
    deleteRFIDTag: () => Promise<void>,
    setOccupied: (state: boolean) => void,
}