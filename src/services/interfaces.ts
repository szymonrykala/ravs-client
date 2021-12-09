import { AddressViewParams } from "./AddressService";
import { BuildingViewParams } from "./BuildingService";
import { RoomViewParams } from "./RoomService";
import { UserViewParams } from "./UserService";


export interface RoomQueryParams {
    roomId: string,
    buildingId: string,
    addressId: string
}


export interface APIPagination {
    pagesCount: number,
    currentPage: number,
    itemsOnPage: number
}

export interface DatesQueryParams {
    from: string,
    to: string
}

export interface PaginationQueryParams {
    [index: string]: string | number | undefined,
    itemsOnPage?: number,
    currentPage?: number
}

export type AppURLParams = {} | RoomViewParams | BuildingViewParams | AddressViewParams | UserViewParams;


export interface APIResponse {
    statusCode: number,
    data?: object | string | number | object[] | null,
    pagination?: APIPagination
}
