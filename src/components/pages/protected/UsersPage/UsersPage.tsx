import { QueryParamsContext } from "../../../../contexts/QueryParamsContext";
import { UserQueryParams } from "../../../../services/UserService";
import { UsersContext } from "./UsersContext";
import React from "react";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import UsersView from "./components/UsersView";
import UsersCharts from "./components/UsersCharts";
import useResolvedAccess from "../hooks/useResolvedAccess";



export default function UsersPage() {
    const { statsViewer } = useResolvedAccess();

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Użytkownicy', component: <UsersView /> });
        statsViewer && arr.push({ name: 'Statystyki', component: <UsersCharts /> });

        return arr;
    }, [
        statsViewer
    ]);


    return (
        <QueryParamsContext
            name="users-query-params"
            default={{
                deleted: false,
                activated: true,
                search: '',
                itemsOnPage: 10,
                currentPage: 1
            } as UserQueryParams}
        >
            <UsersContext>
                <SwipeableTabs tabs={pages} />
            </UsersContext>
        </QueryParamsContext>
    );
}