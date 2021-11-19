import { LogsQueryParams } from "./interfaces";
import Service from "./Service";



export interface AccessViewParams {
    addressId: string,
}


export interface AccessUpdateParams {
    [index: string]: string | boolean | undefined,
    name?: string,
    owner?: boolean,
    accessAdmin?: boolean,
    premisesAdmin?: boolean,
    keysAdmin?: boolean,
    reservationsAdmin?: boolean,
    reservationsAbility?: boolean,
    logsAdmin?: boolean,
    statsViewer?: boolean,
}

export interface AccessCreateParams {
    name: string,
}


class AccessService extends Service {
    _path = '/accesses';

    get path(): string {
        return this._path;
    }

    public getAll() {
        return this.get('/accesses');
    }

    public remove(id?: number) {
        return this.delete(
            id ? `${this.path}/${id}` : this.path
        );
    }

    public update(id: number, data: AccessUpdateParams) {
        return this.patch(`${this.path}/${id}`, data);
    }

    public create(data: AccessCreateParams) {
        return this.post(this.path, data)
    }

    public getLogs(queryParams?: LogsQueryParams) {
        return this.get(`${this.path}/requests`, queryParams);
    }

}

export default new AccessService()