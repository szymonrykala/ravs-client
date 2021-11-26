import { DatesQueryParams } from "./interfaces";
import Service from "./Service";
import Image from "../models/Image";
import { AddressViewParams } from "./AddressService";
import { LogsQueryParams } from "./LogService";



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

    public getChartsData(query: DatesQueryParams) {
        return this.get(`${this.path}/stats`, query);
    }


    public getRoomsInBuilding() {
        return this.get(`${this.path}/rooms`);
    }

    public uploadImage(image: Blob) {
        const formData = new FormData();
        formData.append(
            'file',
            image
        );
        return this.sendImage(`${this.path}/images`, formData);
    }

    async removeImage(image: Image) {
        return this.delete(`${this.path}/images/${image.id}`);
    }

}

export default new BuildingService()