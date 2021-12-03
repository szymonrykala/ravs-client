import Service from "./Service";
import { AddressViewParams } from "./AddressService";



export interface BuildingViewParams {
    addressId: string,
    buildingId: string,
}


export interface BuildingUpdateParams {
    [index: string]: string | number | undefined,
    name?: string,
    closeTime?: string,
    openTime?: string,
    addressId?: number
}

export interface BuildingCreateParams {
    name: string,
    closeTime: string,
    openTime: string,
}


class BuildingService extends Service {
    _path = '';

    get path(): string {
        return this._path;
    }

    public setPath({ addressId, buildingId }: BuildingViewParams) {
        this._path = `/addresses/${addressId}/buildings/${buildingId}`;
    }

    public getCurrentOne() {
        return this.get(this.path);
    }

    public remove() {
        return this.delete(this.path);
    }

    public update(data: BuildingUpdateParams) {
        return this.patch(this.path, data);
    }

    public create({ addressId }: AddressViewParams, data: BuildingCreateParams) {
        return this.post(`/addresses/${addressId}/buildings`, data)
    }

    public getRoomsInBuilding() {
        return this.get(`${this.path}/rooms`);
    }
}

export default new BuildingService()