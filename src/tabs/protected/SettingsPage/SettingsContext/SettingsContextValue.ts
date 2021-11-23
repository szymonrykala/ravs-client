import Settings from "../../../../models/Settings";
import { APIResponse, DatesQueryParams, LogsQueryParams } from "../../../../services/interfaces";
import { SettingsUpdateParams } from "../../../../services/SettingsService";


export default interface SettingsContextValue {
    settings: Settings,
    updateSettings: (data: SettingsUpdateParams) => Promise<boolean>,
    getLogs: (params: LogsQueryParams) => Promise<APIResponse | undefined>,
    getEndpointsData: (query: DatesQueryParams) => Promise<APIResponse>,
}