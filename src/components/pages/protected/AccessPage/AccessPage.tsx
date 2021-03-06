import React from "react";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import { AccessContext } from "./AccessContext";
import AccessesList from "./components/AccessesList";
import AccessInfo from "./components/AccessInfo";
import EditUsersAccess from "./components/EditUsersAccess";


export default function AccessPage() {

    const pages = React.useMemo(() => {
        let arr: any = [];
        arr.push({ name: 'Informacje', component: <AccessInfo /> });
        arr.push({ name: 'Lista klas', component: <AccessesList /> });
        arr.push({ name: 'Administracja', component: < EditUsersAccess /> });

        return arr;
    }, []);


    return (
        <AccessContext>
            <SwipeableTabs tabs={pages} />
        </AccessContext >
    );
}