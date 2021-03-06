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

    _BASE_URL: string = process.env.REACT_APP_API_URL as string; // api url from env
    _TOKEN_NAME: string = 'auth_token'; // local storage token variable name
    _userId: number = -1;

    public set userId(value: number) {
        this._userId = value
    }

    public get userId(): number {
        if (this._userId === -1)
            throw Error('user id was not set');

        return this._userId;
    }

    /**
     * gets auth token
     */
    protected get authToken() {
        return 'Bearer ' + window.localStorage.getItem(this._TOKEN_NAME);
    }
 
    /**
     * fetch wrap function to implement unified respoonse and handle authorization header
     * @param fetchObject 
     * @returns 
     */
    private async _fetch(fetchObject: FetchData): Promise<APIResponse> {
        const response = await fetch(
            this._BASE_URL + fetchObject.endpoint,
            {
                method: fetchObject.method,
                cache: 'no-cache',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.authToken,
                },
                body: JSON.stringify(fetchObject.body)
            }
        );
        const data = await response.json() as ResponseData;

        if (process.env.NODE_ENV !== 'production') console.debug(data);

        // if user is not authenticated - 
        // redirect to let sessionContext to resolve redirections
        if (response.status === 401 && !fetchObject.endpoint.match('/auth|me|activate')) {
            window.location.reload();
        }

        if (!response.ok) {
            if (process.env.NODE_ENV !== 'production') console.error(`${response.status} ${data?.error?.type} ${data?.error?.description}`);
            throw new APIServiceError(data);
        }

        return data as APIResponse;
    }

    /**
     * parsing path with current url params
     * @param urlParams 
     * @returns 
     */
    protected preparePath(urlParams: AppURLParams): string {
        let endp = '';
        let url = window.location.toString();
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
            if (urlParams.userId === 'me') {
                endp += '/users/' + this.userId.toString();
            } else {
                endp += '/users/' + urlParams.userId;
            }
        }
        return endp;
    }

    /**
     * HTTP GET
     * @param endpoint 
     * @param query 
     * @returns 
     */
    protected get(endpoint: string, query = {}) {
        return this._fetch({
            method: 'GET',
            endpoint: endpoint + '?' + new URLSearchParams(query).toString()
        });
    }

    /**
     * HTTP POST
     * @param endpoint 
     * @param body 
     * @returns 
     */
    protected post(endpoint: string, body: object) {
        return this._fetch({
            method: 'POST',
            endpoint: endpoint,
            body: body
        });
    }

    /**
     * HTTP PATCH
     * @param endpoint 
     * @param body 
     * @returns 
     */
    protected patch(endpoint: string, body: object) {
        if (Object.keys(body).length === 0) return;

        return this._fetch({
            method: 'PATCH',
            endpoint: endpoint,
            body: body
        });
    }

    /**
     * HTTP DELETE
     * @param endpoint 
     * @returns 
     */
    protected delete(endpoint: string) {
        return this._fetch({
            method: 'DELETE',
            endpoint: endpoint
        });
    }
}