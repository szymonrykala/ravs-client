import Settings from "../../../../models/Settings";
import { APIResponse, DatesQueryParams } from "../../../../services/interfaces";
import { SettingsUpdateParams } from "../../../../services/SettingsService";


export default interface SettingsContextValue {
    settings: Settings,
    updateSettings: (data: SettingsUpdateParams) => Promise<boolean>,
    getEndpointsData: (query: DatesQueryParams) => Promise<APIResponse>,
}