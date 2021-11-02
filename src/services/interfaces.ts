

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

export interface LogsQueryParams extends PaginationQueryParams {
    method?: "GET" | "POST" | "PATCH" | "DELETE",
    userId?: string | number
}

export interface APIResponse {
    statusCode: number,
    data?: object | string | number | object[] | null,
    pagination?: APIPagination
}

// export interface LogServiceResponse extends APIResponse {
//     pagination: APIPagination
// }