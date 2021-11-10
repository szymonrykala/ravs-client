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
import { useLocation } from "react-router-dom";
import { usePagination } from '../../../contexts/PaginationContext';
import TablePaginationFooter from '../TablePaginationFooter';
import { useQueryParams } from '../../../contexts/QueryParamsContext';



interface LogsTabProps {
    logsGetter: (queryParams: LogsQueryParams) => Promise<APIResponse | undefined>
}


export default function LogsTable({
    logsGetter
}: LogsTabProps) {
    const location = useLocation();
    const { queryParams } = useQueryParams<LogsQueryParams>();
    const { pagination, setPagination } = usePagination();
    const [logs, setLogs] = React.useState<Log[]>([]);


    async function getLogs() {
        if (!queryParams) return;

        const resp = await logsGetter({ ...queryParams, ...pagination });
        resp?.pagination && setPagination(resp.pagination);

        setLogs(resp?.data as Log[]);
    }


    React.useEffect(() => {
        getLogs();

    }, [queryParams, pagination.currentPage, pagination.itemsOnPage, location.key]);


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




