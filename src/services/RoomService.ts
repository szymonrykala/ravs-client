import { RoomType } from "../models/Room";
import { BuildingViewParams } from "./BuildingService";
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

    public updateRFID(key: string) {
        return this.patch(`${this.path}/keys`, {
            "RFIDTag": key
        });
    }

    public deleteRFIDTag() {
        return this.delete(`${this.path}/keys`);
    }
}

export default new RoomService()