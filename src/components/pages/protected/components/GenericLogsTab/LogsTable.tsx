import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import LogRow from './LogRow';
import { useLogs } from './LogsContext';




export default function LogsTable() {
    const { logs } = useLogs();

    return (
        <TableContainer>
            <Table aria-label="tabela logów" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="left">Id</TableCell>
                        {/* <TableCell align="left">Metoda</TableCell> */}
                        <TableCell align="left">Cel/endpoint</TableCell>
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
            </Table>
        </TableContainer>

    );
}




