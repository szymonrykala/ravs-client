import Image from "../models/Image";
import { RoomType } from "../models/Room";
import { DatesQueryParams, LogsQueryParams } from "./interfaces";
import Service from "./Service";


export interface RoomViewParams {
    roomId: string,
    buildingId: string,
    addressId: string
}


export interface RoomUpdateParams {
    name: string,
    roomType: RoomType,
    seatsCount: number,
    floor: number,
    buildingId: number,
    blocked: boolean,
}


class RoomService extends Service {
    _path = '';

    get path(): string {
        return this._path;
    }

    public setPath({ addressId, buildingId, roomId }: RoomViewParams) {
        this._path = `/addresses/${addressId}/buildings/${buildingId}/rooms/${roomId}`;
    }

    public async getView() {
        return await this.get(this.path);
    }

    public async remove() {
        return await this.delete(this.path);
    }

    public async update(body: RoomUpdateParams) {
        return await this.patch(this.path, body);
    }

    public async getChartsData(query: DatesQueryParams) {
        return await this.get(`${this.path}/stats`, query);
    }

    public async getLogs(queryParams?: LogsQueryParams) {
        return await this.get(`${this.path}/requests`, queryParams);
    }

    public async updateRFID(key: string) {
        return this.patch(`${this.path}/keys`, {
            "RFIDTag": key
        });
    }

    public deleteRFIDTag(){
        return this.delete(`${this.path}/keys`);
    }

    public async uploadImage(image: Blob) {
        const formData = new FormData();
        formData.append(
            'file',
            image
        );
        return await this.sendImage(`${this.path}/images`, formData);
    }

    async removeImage(image: Image) {
        return this.delete(`${this.path}/images/${image.id}`);
    }
}

// const roomService = new RoomService();

// export function useRoomService() {
//     const notify = useNotification();
//     const urlParams = useParams<RoomViewParams>();


//     const URL = React.useMemo(() => {
//         let URL = '/rooms';

//         if ("addressId" in urlParams) URL = `/addresses/${urlParams?.addressId}`;
//         if ("buildingId" in urlParams) URL = URL + `/buildings/${urlParams?.buildingId}` + URL;
//     }, [urlParams])


//     const methods = {
//         getView: async () => roomService.getView(urlParams),
//         remove: async () => {
//             try {
//                 const resp = await roomService.remove(urlParams)
//                 notify("Sala usunięta", 'success');
//                 return resp;
//             } catch (err: any) {
//                 notify(err.description, 'error');
//             }
//         },
//         update: async (body: RoomUpdateParams) => {
//             try {
//                 const resp = await roomService.update(urlParams, body)
//                 notify("Sala zaktualizowana", 'success');
//                 return resp;
//             } catch (err: any) {
//                 notify(err.description, 'error');
//             }
//         },

//         async getChartsData(
//             { addressId, buildingId, roomId }: RoomViewParams,
//             query: DatesQueryParams
//         ) {
//             return await this.get(
//                 `/addresses/${addressId}/buildings/${buildingId}/rooms/${roomId}/stats`,
//                 query
//             );
//         }
//     }


//     return {
//         ...methods
//     }
// }

export default new RoomService()