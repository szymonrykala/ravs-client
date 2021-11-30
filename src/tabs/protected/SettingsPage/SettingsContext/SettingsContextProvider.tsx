import React from "react";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import Settings from "../../../../models/Settings";
import SettingsService, { SettingsUpdateParams } from "../../../../services/SettingsService";
import SettingsContextValue from "./SettingsContextValue";



export const settingsContext: any = React.createContext(null);


interface SettingsContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}


export default function SettingsContextProvider(props: SettingsContextProviderProps) {
    const notify = useNotification();

    const [settings, setSettings] = React.useState<Settings>();

    const load = React.useCallback(async () => {
        try {
            const resp = await SettingsService.getAll();
            setSettings(resp.data as Settings);
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify]);


    React.useEffect(() => {
        load();
    }, [load]);


    const updateSettings = React.useCallback(async (data: SettingsUpdateParams) => {
        try {
            await SettingsService.update(data);
            notify("Ustawienia zostały zaktualizowane", 'success');
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false
    }, [notify]);


    if (!settings) return null;

    return (
        <settingsContext.Provider value={{
            settings,
            updateSettings
        } as SettingsContextValue}>
            {props.children}
        </settingsContext.Provider>
    );
}