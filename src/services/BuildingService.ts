import { DatesQueryParams, LogsQueryParams } from "./interfaces";
import Service from "./Service";
import Image from "../models/Image";



export interface BuildingViewParams {
    addressId: string,
    buildingId: string,
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

    public getChartsData(query: DatesQueryParams) {
        return this.get(`${this.path}/stats`, query);
    }

    public getLogs(queryParams?: LogsQueryParams) {
        return this.get(`${this.path}/requests`, queryParams);
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