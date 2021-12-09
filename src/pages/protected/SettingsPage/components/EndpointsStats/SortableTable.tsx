import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { useCharts } from '../../../components/Charts';
import { EndpointChartsData, EndpointStatItem } from '../../../../../models/Stats';
import EnhancedTableHead, { Order } from './EnhancedTableHead';




function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}



function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}



export default function SortableTable() {
    const { chartsData } = useCharts<EndpointChartsData>();

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof EndpointStatItem>('generalEndpoint');


    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof EndpointStatItem,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <>
            <TableContainer>
                <Table
                    sx={{ minWidth: 550 }}
                    aria-labelledby="Endpointy aplikacji"
                    size='medium'
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}

                    />
                    <TableBody>
                        {chartsData.endpoints.slice().sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) =>
                                <TableRow
                                    hover
                                    key={index}
                                >
                                    <TableCell >{row.method}</TableCell>
                                    <TableCell>{row.generalEndpoint}</TableCell>
                                    <TableCell >{row.calls}</TableCell>
                                    <TableCell >{Math.round(row.timeForEndpoint * 1000) / 1000}</TableCell>
                                    <TableCell >{Math.round(row.avgTime * 1000) / 1000}</TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={chartsData.endpoints.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
