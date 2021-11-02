import { APIPagination, RoomQueryParams } from "./interfaces";
// import Service, { APIResponse, PaginationQueryParams } from "./Service";




// export interface LogServiceResponse extends APIResponse {
//     pagination: APIPagination
// }

// class LogService extends Service {

//     async getForRoom(
//         params: RoomQueryParams,
//         queryParams?: LogsQueryParams
//     ) {
//         const { addressId, buildingId, roomId } = params;
//         return await this.get(
//             `/addresses/${addressId}/buildings/${buildingId}/rooms/${roomId}/requests`,
//             queryParams
//         ) as LogServiceResponse;
//     }

//     async getStats(){
//         return await this.get(`/requests/stats`);
//     }
// }


// export default new LogService();