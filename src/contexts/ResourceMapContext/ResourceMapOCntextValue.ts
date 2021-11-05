import AddressMap, { MapItem } from "../../models/AddressMap";



export interface ResourceMapContextValue {
    resourceMap: AddressMap[],
    reloadMap: () => void,
    getRoomLink: (roomId: number) => string,
    getBuildingLink: (bildingId: number) => string,
    allRooms: MapItem[]
}