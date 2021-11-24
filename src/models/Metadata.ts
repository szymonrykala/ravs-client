


export enum FavType {
    Building = 'building-item',
    Room = 'room-item'
}


interface FavouriteItem {
    id: number,
    name: string,
    type: FavType,
}

export interface FavouriteBuilding extends FavouriteItem {
    addressId: number,
}

export interface FavouriteRoom extends FavouriteBuilding {
    buildingId: number,
}


export default interface Metadata {
    notes?: string,
    favourites?: (FavouriteBuilding | FavouriteRoom)[]
}
