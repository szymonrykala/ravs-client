import Access from "../../../../models/Access";
import { AccessCreateParams, AccessUpdateParams } from "../../../../services/AccessService";
import { APIResponse, LogsQueryParams } from "../../../../services/interfaces";


export default interface AccessContextValue {
    accessesList: Access[],
    getLogs: (queryParams: LogsQueryParams) => Promise<APIResponse | undefined>,
    updateAccess: (accessId: number, data: AccessUpdateParams) => Promise<boolean>,
    createAccess: (data: AccessCreateParams) => Promise<boolean>,
    deleteAccess: (id?: number) => Promise<boolean>,
    openAccess: (id: number) => void,
}