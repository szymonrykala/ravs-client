import React from "react";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import { SettingsContext } from "./SettingsContext";
import EndpointsStats from "./components/EndpointsStats";
import SettingsMain from "./components/SettingsMain";



function SettingsPage() {


    const pages = React.useMemo(() => {
        return [
            { name: 'Ustawienia', component: < SettingsMain /> },
            { name: 'Endpointy', component: <EndpointsStats /> }
        ];
    }, []);


    return (
        <SettingsContext>
            <SwipeableTabs tabs={pages} />
        </SettingsContext>
    );
}

export default React.memo(SettingsPage);