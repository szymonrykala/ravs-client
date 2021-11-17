import Settings from "../../../../models/Settings";
import { APIResponse, LogsQueryParams } from "../../../../services/interfaces";
import { SettingsUpdateParams } from "../../../../services/SettingsService";


export default interface SettingsContextValue {
    settings: Settings,
    updateSettings: (data: SettingsUpdateParams) => Promise<boolean>,
    getLogs: (params: LogsQueryParams) => Promise<APIResponse | undefined>,
}