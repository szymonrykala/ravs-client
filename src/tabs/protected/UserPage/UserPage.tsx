import React from "react";
import GenericPage from "../GenericPage";
import { ChartsTab, LogsTab, ReservationsTab, ViewTab } from "./Tabs";
import { UserContext } from "./UserContext";



export default function UserPage() {


    const pages = React.useMemo(() => {
        let arr: any = [];
        arr.push({ name: 'Rezerwacje', component: <ReservationsTab /> });
        arr.push({ name: 'Statystyki', component: <ChartsTab /> });
        arr.push({ name: 'Logi', component: <LogsTab /> });

        return arr;
    }, []);


    return (
        <UserContext>
            <GenericPage
                view={<ViewTab />}
                pages={pages}
            />
        </UserContext>
    );
}