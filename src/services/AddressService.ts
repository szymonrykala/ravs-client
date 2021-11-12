import { DatesQueryParams, LogsQueryParams } from "./interfaces";
import Service from "./Service";


export interface AddressViewParams {
    addressId: string,
}


class AddressService extends Service {
    _path = '';

    get path(): string {
        return this._path;
    }

    public setPath({ addressId }: AddressViewParams) {
        this._path = `/addresses/${addressId}`;
    }

    public async getCurrentOne() {
        return await this.get(this.path);
    }

    public async remove() {
        return await this.delete(this.path);
    }

    public async getChartsData(query: DatesQueryParams) {
        return await this.get(`${this.path}/buildings/stats`, query);
    }

    public async getLogs(queryParams?: LogsQueryParams) {
        return await this.get(`${this.path}/requests`, queryParams);
    }

    async getResourcesMap() {
        return this.get('/addresses/resources');
    }
}


export default new AddressService();