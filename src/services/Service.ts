

const BASE_URL: string = 'http://localhost:8081/v1';


interface FetchData {
    endpoint: string
    method: string,
    body?: object
}

interface ErrorData {
    type: string,
    description: string
}

export interface ResponseData {
    statusCode: number,
    data?: any,
    error?: ErrorData
}



export interface StatusMessages {
    [index: number]: string
}



export default abstract class Service {

    _BASE_URL: string = 'http://localhost:8081/v1';
    _TOKEN_NAME: string = 'auth_token';
    _AUTH_TOKEN: string;

    constructor() {
        this._AUTH_TOKEN = 'Bearer ' + window.localStorage.getItem(this._TOKEN_NAME);
    }

    async _fetch(fetchObject: FetchData) {
        const response = await fetch(
            this._BASE_URL + fetchObject.endpoint,
            {
                method: fetchObject.method,
                cache: 'no-cache',
                mode: 'cors',
                credentials: 'omit',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this._AUTH_TOKEN,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(fetchObject.body)
            }
        );
        const data = <ResponseData>await response.json();

        if (!response.ok) {
            console.error(`${response.status}\t${data?.error?.type}\t${data?.error?.description}`);
            throw data;
        }

        return data;

    }

    async get(endpoint: string, query = {}) {

        return await this._fetch({
            method: 'GET',
            endpoint: endpoint + new URLSearchParams(query).toString()
        });

        // return response;
    }

    async post(endpoint: string, body: object) {
        return await this._fetch({
            method: 'POST',
            endpoint: endpoint,
            body: body
        });
        // return response;
    }

    async patch(endpoint: string, body: object) {
        return await this._fetch({
            method: 'PATCH',
            endpoint: endpoint,
            body: body
        });
        // return response;
    }

    async delete(endpoint: string) {
        return await this._fetch({
            method: 'DELETE',
            endpoint: endpoint
        });
        // return response;
    }
}