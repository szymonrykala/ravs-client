import React from "react";
import GenericPage from "../GenericPage";
import BuildingContext from "./BuildingContext";
import { ChartsTab, LogsTab, ReservationsTab, ViewTab } from "./Tabs";


export default function BuildingPage() {

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <ReservationsTab /> });
        arr.push({ name: 'Statystyki', component: <ChartsTab /> });
        arr.push({ name: 'Logi', component: <LogsTab /> });

        return arr;
    }, []);


    return (
        <BuildingContext>
            <GenericPage
                view={<ViewTab />}
                pages={pages}
            />
        </BuildingContext>
    );
}