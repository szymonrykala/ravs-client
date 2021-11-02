import { ResponseData } from "./Service";




export default class APIServiceError extends Error {

    private data: ResponseData;

    get code() {
        return this.data.statusCode;
    }

    get description() {
        return this.data.error?.description;
    }

    constructor(data: ResponseData) {
        super(data.error?.description);
        this.data = data;
    }
}
