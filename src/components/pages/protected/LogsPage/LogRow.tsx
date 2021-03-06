import { TableRow, TableCell, IconButton, Collapse, Box } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { displayDate } from "../../../../shared/utils";
import Log from "../../../../models/Log";


interface LogRowProps {
    row: Log
}

export default function LogRow(props: LogRowProps) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="szczegóły zapytania"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th">{row.id}</TableCell>
                {/* <TableCell align="left">{row.method}</TableCell> */}
                <TableCell align="left">{row.endpoint}</TableCell>
                <TableCell
                    align="left"
                    sx={{ display: { xs: 'none', sm: 'none', md: 'table-cell' } }}
                >
                    {Math.fround(row.time * 1000).toPrecision(6)}
                </TableCell>
                <TableCell align='left'>{displayDate(row._created)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box component="pre" sx={{ margin: 1 }}>
                            <Link component={RouterLink} to={`/app/users/${row.user}`}>Pokaż użytkownika (id: {row.user})</Link> <br />
                            {displayDate(row._created)}&nbsp;|&nbsp;{row.method}&nbsp;{row.endpoint}<br />
                            czas przetwarzania: {row.time} [s]<br />
                            Ciało zapytania <br />
                            {JSON.stringify(
                                JSON.parse(row.payload),
                                undefined,
                                3
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}