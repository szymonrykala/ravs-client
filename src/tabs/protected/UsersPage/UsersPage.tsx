import { QueryParamsContext } from "../../../contexts/QueryParamsContext";
import { UserQueryParams } from "../../../services/UserService";
import { UsersContext } from "./UsersContext";
import GenericPage from "../GenericPage";
import React from "react";
import { ChartsTab, ViewTab } from "./Tabs";
import PaginationContextProvider from "../../../contexts/PaginationContext/PaginationContextProvider";




export default function UsersPage() {


    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Użytkownicy', component: <ViewTab /> });
        arr.push({ name: 'Statystyki', component: <ChartsTab /> });

        return arr;
    }, []);


    return (
        <PaginationContextProvider id='users-pagination'>
            <QueryParamsContext name="users-query-params" default={{ deleted: false, activated: true } as UserQueryParams}>
                <UsersContext>
                    <GenericPage
                        // view={}
                        pages={pages}
                    />
                </UsersContext>
            </QueryParamsContext>
        </PaginationContextProvider>
    );
}