import React from "react";
import GenericLogsTab from "../components/GenericLogsTab";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import useResolvedAccess from "../hooks/useResolvedAccess";
import { AccessContext } from "./AccessContext";
import AccessesList from "./components/AccessesList";
import AccessInfo from "./components/AccessInfo";
import EditUsersAccess from "./components/EditUsersAccess";


export default function AccessPage() {
    const { logsAdmin } = useResolvedAccess();

    const pages = React.useMemo(() => {
        let arr: any = [];
        arr.push({ name: 'Informacje', component: <AccessInfo /> });
        arr.push({ name: 'Lista klas', component: <AccessesList /> });
        arr.push({ name: 'Administracja', component: < EditUsersAccess /> });
        logsAdmin && arr.push({ name: 'Logi', component: <GenericLogsTab /> });

        return arr;
    }, [
        logsAdmin
    ]);


    return (
        <AccessContext>
            <SwipeableTabs tabs={pages} />
        </AccessContext >
    );
}