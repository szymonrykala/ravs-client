

export interface ServiceFormData {
    [index: string]: string | number | boolean
}


interface FetchData {
    endpoint: string
    method: string,
    body?: object
}

interface ErrorData {
    type: string,
    description: string
}

interface ResponseData {
    statusCode: number,
    data?: any,
    error?: ErrorData
}

export interface APIResponse {
    statusCode: number,
    data?: object | string | number | null,
}

export interface StatusMessages {
    [index: number]: string
}



export default abstract class Service {

    _BASE_URL: string = 'http://localhost:8081/v1';
    _TOKEN_NAME: string = 'auth_token';

    constructor() {
        // this._AUTH_TOKEN = 'Bearer ' + window.localStorage.getItem(this._TOKEN_NAME);
    }

    get authToken() {
        return 'Bearer ' + window.localStorage.getItem(this._TOKEN_NAME);
    }

    async _fetch(fetchObject: FetchData): Promise<APIResponse> {
        const response = await fetch(
            this._BASE_URL + fetchObject.endpoint,
            {
                method: fetchObject.method,
                cache: 'no-cache',
                mode: 'cors',
                credentials: 'omit',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.authToken,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(fetchObject.body)
            }
        );
        const data = await response.json() as ResponseData;
        
        console.debug(data);

        if (!response.ok) {
            console.error(`${response.status}\t${data?.error?.type}\t${data?.error?.description}`);
            throw data;
        }

        return data as APIResponse;

    }

    async get(endpoint: string, query = {}) {
        return await this._fetch({
            method: 'GET',
            endpoint: endpoint + new URLSearchParams(query).toString()
        });
    }

    async post(endpoint: string, body: object) {
        return await this._fetch({
            method: 'POST',
            endpoint: endpoint,
            body: body
        });
    }

    async patch(endpoint: string, body: object) {
        return await this._fetch({
            method: 'PATCH',
            endpoint: endpoint,
            body: body
        });
    }

    async delete(endpoint: string) {
        return await this._fetch({
            method: 'DELETE',
            endpoint: endpoint
        });
    }
}