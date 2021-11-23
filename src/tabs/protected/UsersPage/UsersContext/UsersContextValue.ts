import User from "../../../../models/User";
import { APIResponse } from "../../../../services/interfaces";


export default interface UsersContextValue {
    users: User[],
    getChartsData: (query: any) => Promise<APIResponse>,
}