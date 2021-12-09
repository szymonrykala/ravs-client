import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { EndpointStatItem } from '../../../../../models/Stats';





interface HeadCell {
    disablePadding: boolean;
    id: keyof EndpointStatItem;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'method',
        numeric: false,
        disablePadding: true,
        label: 'Metoda',
    },
    {
        id: 'generalEndpoint',
        numeric: false,
        disablePadding: false,
        label: 'Ścieżka',
    },
    {
        id: 'calls',
        numeric: true,
        disablePadding: false,
        label: 'Liczba zapytań',
    },
    {
        id: 'timeForEndpoint',
        numeric: true,
        disablePadding: false,
        label: 'Całkowity czas',
    },
    {
        id: 'avgTime',
        numeric: true,
        disablePadding: false,
        label: 'Śr. czas wykonania',
    },
];

export type Order = 'asc' | 'desc';


interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof EndpointStatItem) => void;
    order: Order;
    orderBy: string;
}


export default function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof EndpointStatItem) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
