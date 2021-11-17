import React from "react";
import GenericPage from "../GenericPage";
import AddressContext from "./AddressContext";
import { ChartsTab, LogsTab, ReservationsTab, ViewTab } from "./Tabs";


export default function AddressPage() {

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <ReservationsTab /> });
        arr.push({ name: 'Statystyki', component: <ChartsTab /> });
        arr.push({ name: 'Logi', component: <LogsTab /> });

        return arr;
    }, []);


    return (
        <AddressContext>
            <GenericPage
                view={<ViewTab />}
                pages={pages}
            />
        </AddressContext>
    );
}