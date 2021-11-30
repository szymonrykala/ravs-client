import { RoomContextProvider } from "./RoomContext";
import GenericPage from "../GenericPage";
import { ReservationsTab, ViewTab, LogsTab } from "./Tabs";
import React from "react";
import RoomOrBuildingChartTab from "../shared/RoomOrBuildingChartTab";


export default function RoomPage() {

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <ReservationsTab /> });
        arr.push({ name: 'Statystyki', component: <RoomOrBuildingChartTab /> });
        arr.push({ name: 'Logi', component: <LogsTab /> });

        return arr;
    }, []);


    return (
        <RoomContextProvider>
            <GenericPage
                view={<ViewTab />}
                pages={pages}
            />
        </RoomContextProvider>
    );
}
