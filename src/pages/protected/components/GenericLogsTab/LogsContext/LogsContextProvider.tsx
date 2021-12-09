import React from "react";
import { useParams } from "react-router-dom";
import useNotification from "../../../../../contexts/NotificationContext/useNotification";
import { useQueryParams } from "../../../../../contexts/QueryParamsContext";
import Log from "../../../../../models/Log";
import LogService, { LogsQueryParams } from "../../../../../services/LogService";
import useTrigger from "../../../hooks/useTrigger";
import LogsContextValue from "./LogsContextValue";




export const logsContext: any = React.createContext(null);


interface LogsContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}


export default function LogsContextProvider(props: LogsContextProviderProps) {
    const urlParams = useParams();
    const { queryParams, setQueryParams } = useQueryParams<LogsQueryParams>();
    const notify = useNotification();
    const refresh = useTrigger(60_000);

    const [logs, setLogs] = React.useState<Log[]>();


    const load = React.useCallback(async () => {
        try {
            const resp = await LogService.fetch(urlParams, queryParams);
            setLogs(resp.data as Log[]);

            resp.pagination && setQueryParams(old => ({
                ...old,
                pagesCount: resp.pagination?.pagesCount,
            }));
        } catch (err: any) {
            notify(err.description, 'error');
            setLogs([]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        setQueryParams,
        queryParams.currentPage,
        queryParams.itemsOnPage,
        queryParams.method,
        queryParams.userId,
        notify,
        urlParams,
    ]);


    React.useEffect(() => {
        load()
    }, [
        load,
        refresh
    ])


    if (!logs) return null;

    return (
        <logsContext.Provider value={{
            logs
        } as LogsContextValue}>
            {props.children}
        </logsContext.Provider>
    )
}