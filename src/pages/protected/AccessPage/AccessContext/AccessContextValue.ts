import Access from "../../../../models/Access";
import { AccessCreateParams, AccessUpdateParams } from "../../../../services/AccessService";


export default interface AccessContextValue {
    accessesList: Access[],
    updateAccess: (accessId: number, data: AccessUpdateParams) => Promise<boolean>,
    createAccess: (data: AccessCreateParams) => Promise<boolean>,
    deleteAccess: (id?: number) => Promise<boolean>,
    openAccess: (id: number) => void,
}