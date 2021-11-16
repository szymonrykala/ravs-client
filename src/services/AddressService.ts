import { DatesQueryParams, LogsQueryParams } from "./interfaces";
import Service from "./Service";


export interface AddressViewParams {
    addressId: string,
}


export interface UpdateAddressParams {
    [index: string]: string | undefined,
    country?: string,
    town?: string,
    postalCode?: string,
    street?: string,
    number?: string
}


export interface CreateAddressParams {
    country: string,
    town: string,
    postalCode: string,
    street?: string,
    number?: string,
}


class AddressService extends Service {
    _path = '';

    get path(): string {
        return this._path;
    }

    public setPath({ addressId }: AddressViewParams) {
        this._path = `/addresses/${addressId}`;
    }

    public getCurrentOne() {
        return this.get(this.path);
    }

    public remove() {
        return this.delete(this.path);
    }

    public update(data: UpdateAddressParams) {
        return this.patch(this.path, data);
    }

    public create(data: CreateAddressParams) {
        return this.post('/addresses', data);
    }

    public getBuildings() {
        return this.get(`${this.path}/buildings`);
    }

    public getChartsData(query: DatesQueryParams) {
        return this.get(`${this.path}/buildings/stats`, query);
    }

    public getLogs(queryParams?: LogsQueryParams) {
        return this.get(`${this.path}/requests`, queryParams);
    }

    public getResourcesMap() {
        return this.get('/addresses/resources');
    }
}


export default new AddressService();