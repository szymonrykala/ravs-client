import { RoomContextProvider } from "./RoomContext";
import GenericPage from "../GenericPage";
import { ChartsTab, ReservationsTab, ViewTab, LogsTab } from "./Tabs";
import React from "react";


export default function RoomPage() {

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <ReservationsTab /> });
        arr.push({ name: 'Statystyki', component: <ChartsTab /> });
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
