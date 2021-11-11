import * as React from 'react';
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
import { usePagination } from '../../../contexts/PaginationContext';
import TablePaginationFooter from '../TablePaginationFooter';
import { useQueryParams } from '../../../contexts/QueryParamsContext';



interface LogsTabProps {
    logsGetter: (queryParams: LogsQueryParams) => Promise<APIResponse | undefined>
}


export default function LogsTable({
    logsGetter
}: LogsTabProps) {
    const { queryParams } = useQueryParams<LogsQueryParams>();
    const { pagination, setPagination } = usePagination();
    const [logs, setLogs] = React.useState<Log[]>([]);


    const getLogs = React.useCallback(async () => {
        if (!queryParams) return;

        const resp = await logsGetter({
            ...queryParams,
            itemsOnPage: pagination.itemsOnPage,
            currentPage: pagination.currentPage
        });
        resp?.pagination && setPagination(resp.pagination);

        setLogs(resp?.data as Log[]);
    }, [queryParams, pagination.itemsOnPage, pagination.currentPage, logsGetter, setPagination]);


    React.useEffect(() => {
        getLogs();
    }, [getLogs]);


    return (
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
                        <TablePaginationFooter />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>

    );
}




