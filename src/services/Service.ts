import APIServiceError from "./APIServiceError";
import { APIResponse, AppURLParams } from "./interfaces";


export interface ServiceFormData {
    [index: string]: string | number | boolean | undefined | object
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


    private get authToken() {
        return 'Bearer ' + window.localStorage.getItem(this._TOKEN_NAME);
    }

    private async _fetch(fetchObject: FetchData): Promise<APIResponse> {
        const response = await fetch(
            this._BASE_URL + fetchObject.endpoint,
            {
                method: fetchObject.method,
                cache: 'no-cache',
                mode: 'cors',
                // credentials: 'omit',
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

        // if user is not authenticated - 
        // redirect to let sessionContext to resolve redirections
        if (response.status === 401 && !fetchObject.endpoint.match('\/auth|me')) {
            window.location.reload();
        }

        if (!response.ok) {
            console.error(`${response.status} ${data?.error?.type} ${data?.error?.description}`);
            throw new APIServiceError(data);
        }

        return data as APIResponse;
    }

    protected preparePath(urlParams: AppURLParams): string {
        let endp = '';
        let url = window.location.pathname;

        const map = {
            '/accesses': '/accesses',
            '/settings': '/configurations',
            '/users': '/users'
        }

        if (Object.keys(urlParams).length === 0) {
            for (const [path, newPath] of Object.entries(map)) {
                if (url.includes(path)) {
                    endp = newPath;
                }
            }
        } else if ('addressId' in urlParams) {
            endp += `/addresses/${urlParams.addressId}`;

            if ('buildingId' in urlParams) {
                endp += `/buildings/${urlParams.buildingId}`;

                if ('roomId' in urlParams) endp += `/rooms/${urlParams.roomId}`;
            }
        } else if ('userId' in urlParams) {
            endp += `/users/${urlParams.userId}`
        }
        return endp;
    }

    protected async sendImage(endpoint: string, formBody: FormData) {
        const resp = await fetch(
            this._BASE_URL + endpoint,
            {
                method: "POST",
                cache: 'no-cache',
                mode: 'cors',
                body: formBody,
                headers: {
                    'Authorization': this.authToken,
                }
            }
        );

        const data = await resp.json() as ResponseData;
        console.debug(data);

        if (!resp.ok) {
            console.error(`${resp.status}\t${data?.error?.type}\t${data?.error?.description}`);
            throw new APIServiceError(data);
        }

        return data as APIResponse;
    }

    protected get(endpoint: string, query = {}) {
        return this._fetch({
            method: 'GET',
            endpoint: endpoint + '?' + new URLSearchParams(query).toString()
        });
    }

    protected post(endpoint: string, body: object) {
        return this._fetch({
            method: 'POST',
            endpoint: endpoint,
            body: body
        });
    }

    protected patch(endpoint: string, body: object) {
        if (Object.keys(body).length === 0) return;

        return this._fetch({
            method: 'PATCH',
            endpoint: endpoint,
            body: body
        });
    }

    protected delete(endpoint: string) {
        return this._fetch({
            method: 'DELETE',
            endpoint: endpoint
        });
    }
}