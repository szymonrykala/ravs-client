import React from "react";
import GenericPage from "../GenericPage";
import { SettingsContext } from "./SettingsContext";
import { EndpointsStatsTab, LogsTab, MainTab } from "./Tabs";


export default function SettingsPage() {


    const pages = React.useMemo(() => {
        return [
            { name: 'Ustawienia', component: <MainTab /> },
            { name: 'Logi', component: <LogsTab /> },
            { name: 'Endpointy', component: <EndpointsStatsTab /> }
        ];
    }, []);


    return (
        <SettingsContext>
            <GenericPage
                pages={pages}
            />
        </SettingsContext>
    );
}