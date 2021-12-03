import React from "react";
import GenericLogsTab from "../../../shared/components/GenericLogsTab";
import SwipeableTabs from "../../../shared/components/SwipeableTabs/SwipeableTabs";
import { SettingsContext } from "./SettingsContext";
import EndpointsStats from "./components/EndpointsStats";
import SettingsMain from "./components/SettingsMain";



export default function SettingsPage() {


    const pages = React.useMemo(() => {
        return [
            { name: 'Ustawienia', component: < SettingsMain/> },
            { name: 'Logi', component: <GenericLogsTab /> },
            { name: 'Endpointy', component: <EndpointsStats /> }
        ];
    }, []);


    return (
        <SettingsContext>
            <SwipeableTabs tabs={pages} />
        </SettingsContext>
    );
}