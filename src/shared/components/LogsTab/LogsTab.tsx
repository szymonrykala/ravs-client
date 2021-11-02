import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Log from '../../../models/Log';
import { APIResponse, LogsQueryParams } from '../../../services/interfaces';
import { TableFooter, Typography } from '@mui/material';
import LogRow from './LogRow';
import { LogsTabBar } from './LogsTabBar';
import { useMyTablePagination } from '../MyTablePagination';



const LOGS_PARAMS: string = 'logs-query-params';


const queryParamsConfig: LogsQueryParams = (() => {
    const confString = localStorage.getItem(LOGS_PARAMS);
    if (confString) {
        try {
            const params = JSON.parse(confString);
            return params
        } catch { }
    }
    return { method: "PATCH" };
})();


interface LogsTabProps {
    logsGetter: (queryParams: LogsQueryParams) => Promise<APIResponse | undefined>
}


export default function LogsTab({
    logsGetter
}: LogsTabProps) {
    const { tablePaginationComponent, pagination, setPagination } = useMyTablePagination();
    const [queryParams, setQueryParams] = React.useState<LogsQueryParams>(queryParamsConfig);
    const [logs, setLogs] = React.useState<Log[]>([]);


    async function getLogs() {
        if (!queryParams) return;

        const resp = await logsGetter({ ...queryParams, ...pagination });
        resp?.pagination && setPagination(resp.pagination);

        setLogs(resp?.data as Log[]);
    }


    React.useEffect(() => {
        getLogs();

        localStorage.setItem(LOGS_PARAMS, JSON.stringify(queryParams));
    }, [queryParams, pagination.currentPage, pagination.itemsOnPage]);


    return (
        <Box>
            <LogsTabBar params={queryParams} setParams={setQueryParams} />
            <TableContainer>
                <Table aria-label="tabela logów" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="left">Id</TableCell>
                            <TableCell align="left">Cel/endpoint</TableCell>
                            <TableCell align="left">Metoda</TableCell>
                            <TableCell align="left">Czas wykonania&nbsp;[ms]</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.length === 0 &&
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Typography textAlign="center" p="15px 0px">
                                        Brak elementów do wyświetlenia
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        }

                        {logs.map((log) => <LogRow key={log.id} row={log} />)}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            {tablePaginationComponent}
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    );
}




