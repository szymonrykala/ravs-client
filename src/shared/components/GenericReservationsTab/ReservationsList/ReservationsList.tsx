import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import useReservationModalContext from "../../../../contexts/ReservationModalContext/useReservationModalContext";
import { useReservations } from "../../../../contexts/ReservationsContext";
import { ReservationListItem } from "./ReservationsListItem";
import TablePaginationFooter from "../../TablePaginationFooter";



export default function ReservationsList() {
    const { showReservation } = useReservationModalContext();
    const { reservations } = useReservations();

    return (
        <TableContainer component={Box}>
            <Table aria-label="Tabela rezerwacji">
                <TableHead>
                    <TableRow>
                        <TableCell>Rezerwacje</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        reservations.length === 0 && <TableRow>
                            <TableCell colSpan={12}>
                                <Typography textAlign='center'>
                                    Brak rezerwacji na ten moment
                                </Typography>
                            </TableCell>
                        </TableRow>
                    }
                    {
                        reservations.map(item => <ReservationListItem
                            key={item.id}
                            onClick={() => showReservation(item.id)}
                            reservation={item}
                        />)
                    }
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


