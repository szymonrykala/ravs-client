import Settings from "../../../../../models/Settings";
import { SettingsUpdateParams } from "../../../../../services/SettingsService";


export default interface SettingsContextValue {
    settings: Settings,
    updateSettings: (data: SettingsUpdateParams) => Promise<boolean>,
}