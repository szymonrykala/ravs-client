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

    public async getCurrentOne() {
        return await this.get(this.path);
    }

    public async remove() {
        return await this.delete(this.path);
    }

    public async getChartsData(query: DatesQueryParams) {
        return await this.get(`${this.path}/stats`, query);
    }

    public async getLogs(queryParams?: LogsQueryParams) {
        return await this.get(`${this.path}/requests`, queryParams);
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

export default new BuildingService()