import React from "react";
import GenericPage from "../GenericPage";
import RoomOrBuildingChartTab from "../shared/RoomOrBuildingChartTab";
import BuildingContext from "./BuildingContext";
import { LogsTab, ReservationsTab, ViewTab } from "./Tabs";


export default function BuildingPage() {

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <ReservationsTab /> });
        arr.push({ name: 'Statystyki', component: <RoomOrBuildingChartTab /> });
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