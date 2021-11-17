import React from "react";
import GenericPage from "../GenericPage";
import { SettingsContext } from "./SettingsContext";
import { LogsTab, MainTab } from "./Tabs";


export default function SettingsPage() {


    const pages = React.useMemo(() => {
        return [
            { name: 'Ustawienia', component: <MainTab /> },
            { name: 'Logi', component: <LogsTab /> }
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