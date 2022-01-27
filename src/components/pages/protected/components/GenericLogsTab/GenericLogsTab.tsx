import Stack from "@mui/material/Stack";
import React from "react";
import QueryParamsContextProvider from "../../../../../contexts/QueryParamsContext/QueryParamsContextProvider";
import ListPagination from "../../components/ListPagination";
import { LogsContext } from "./LogsContext";
import LogsTabBar from "./LogsTabBar";
import LogsTable from "./LogsTable";



function GenericLogsTab() {
    return (
        <QueryParamsContextProvider name="logs-query-params" default={{ method: 'PATCH', itemsOnPage: 5 }}>
            <LogsContext>
                <br />
                <Stack spacing={3}>
                    <LogsTabBar />
                    <LogsTable />
                    <ListPagination />
                </Stack>
            </LogsContext>
        </QueryParamsContextProvider>
    );
}

export default React.memo(GenericLogsTab);