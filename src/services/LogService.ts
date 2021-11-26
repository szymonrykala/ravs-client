import { AppURLParams, PaginationQueryParams } from "./interfaces";
import Service from "./Service";


export interface LogsQueryParams extends PaginationQueryParams {
    method?: "GET" | "POST" | "PATCH" | "DELETE",
    userId?: string | number
}


class LogService extends Service {

    fetch(urlParams: AppURLParams, queryParams: LogsQueryParams) {
        return this.get(
            this.preparePath(urlParams) + '/requests',
            queryParams
        );
    }

    async getStats() {
        return await this.get(`/requests/stats`);
    }
}


export default new LogService();