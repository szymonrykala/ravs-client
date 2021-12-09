import Stack from "@mui/material/Stack";
import QueryParamsContextProvider from "../../../../contexts/QueryParamsContext/QueryParamsContextProvider";
import ListPagination from "../../../../shared/components/ListPagination";
import { LogsContext } from "./LogsContext";
import { LogsTabBar } from "./LogsTabBar";
import LogsTable from "./LogsTable";



export default function GenericLogsTab() {
    return (
        <QueryParamsContextProvider name="logs-query-params" default={{ method: 'PATCH', itemsOnPage: 5 }}>
            <LogsContext>
                <Stack spacing={3}>
                    <LogsTabBar />
                    <LogsTable />
                    <ListPagination />
                </Stack>
            </LogsContext>
        </QueryParamsContextProvider>
    );
}