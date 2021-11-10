import Box from "@mui/material/Box";
import PaginationContextProvider from "../../../contexts/PaginationContext/PaginationContextProvider";
import QueryParamsContextProvider from "../../../contexts/QueryParamsContext/QueryParamsContextProvider";
import { APIResponse, LogsQueryParams } from "../../../services/interfaces";
import { LogsTabBar } from "./LogsTabBar";
import LogsTable from "./LogsTable";



interface GenericLogsTabProps {
    logsGetter: (queryParams: LogsQueryParams) => Promise<APIResponse | undefined>,
}


export default function GenericLogsTab(props: GenericLogsTabProps) {
    return (
        <Box>
            <PaginationContextProvider>
                <QueryParamsContextProvider name="logs-query-params" default={{ method: 'PATCH' }}>
                    <LogsTabBar />
                    <LogsTable logsGetter={props.logsGetter} />
                </QueryParamsContextProvider>
            </PaginationContextProvider>
        </Box>
    );
}