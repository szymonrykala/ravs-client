import Image from "../models/Image";
import { RoomType } from "../models/Room";
import { BuildingViewParams } from "./BuildingService";
import { DatesQueryParams } from "./interfaces";
import { LogsQueryParams } from "./LogService";
import Service from "./Service";


export interface RoomViewParams {
    roomId: string,
    buildingId: string,
    addressId: string
}


export interface RoomUpdateParams {
    name?: string,
    roomType?: RoomType,
    seatsCount?: number,
    floor?: number,
    buildingId?: number,
    blocked?: boolean,
}


export interface CreateRoomParams {
    name: string,
    roomType: RoomType,
    seatsCount: number,
    floor:number
}



class RoomService extends Service {
    _path = '';

    get path(): string {
        return this._path;
    }

    public setPath({ addressId, buildingId, roomId }: RoomViewParams) {
        this._path = `/addresses/${addressId}/buildings/${buildingId}/rooms/${roomId}`;
    }

    public getView() {
        return this.get(this.path);
    }

    public create({ addressId, buildingId }: BuildingViewParams, data: CreateRoomParams) {
        return this.post(`/addresses/${addressId}/buildings/${buildingId}/rooms`, data);
    }

    public remove() {
        return this.delete(this.path);
    }

    public update(body: RoomUpdateParams) {
        return this.patch(this.path, body);
    }

    public getChartsData(query: DatesQueryParams) {
        return this.get(`${this.path}/stats`, query);
    }

    public updateRFID(key: string) {
        return this.patch(`${this.path}/keys`, {
            "RFIDTag": key
        });
    }

    public deleteRFIDTag() {
        return this.delete(`${this.path}/keys`);
    }

    public uploadImage(image: Blob) {
        const formData = new FormData();
        formData.append(
            'file',
            image
        );
        return this.sendImage(`${this.path}/images`, formData);
    }

    public removeImage(image: Image) {
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
//         getView: () => roomService.getView(urlParams),
//         remove: () => {
//             try {
//                 const resp = roomService.remove(urlParams)
//                 notify("Sala usunięta", 'success');
//                 return resp;
//             } catch (err: any) {
//                 notify(err.description, 'error');
//             }
//         },
//         update: (body: RoomUpdateParams) => {
//             try {
//                 const resp = roomService.update(urlParams, body)
//                 notify("Sala zaktualizowana", 'success');
//                 return resp;
//             } catch (err: any) {
//                 notify(err.description, 'error');
//             }
//         },

//         getChartsData(
//             { addressId, buildingId, roomId }: RoomViewParams,
//             query: DatesQueryParams
//         ) {
//             return this.get(
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