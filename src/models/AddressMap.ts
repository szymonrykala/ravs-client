
export interface MapItem {
    id: number,
    href: string,
    name: string,
}

export interface BuildingItem extends MapItem {
    rooms: MapItem[]
}

export default interface AddressMap extends MapItem {
    buildings: BuildingItem[]
}
