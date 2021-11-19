import React from "react";
import GenericPage from "../GenericPage";
import { AccessContext } from "./AccessContext";
import { LogsTab, InfoTab, ListTab } from "./Tabs";


export default function AccessPage() {


    const pages = React.useMemo(() => {
        let arr: any = [];
        arr.push({ name: 'Informacje', component: <InfoTab /> });
        arr.push({ name: 'Lista klas', component: <ListTab /> });
        arr.push({ name: 'Logi', component: <LogsTab /> });

        return arr;
    }, []);


    return (
        <AccessContext>
            <GenericPage
                pages={pages}
            />
        </AccessContext>
    );
}