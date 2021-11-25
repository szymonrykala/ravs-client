import { List, ListItem, ListItemText } from "@mui/material";
import useReservationModalContext from "../../../../contexts/ReservationModalContext/useReservationModalContext";
import { useReservations } from "../../../../contexts/ReservationsContext";
import ListPagination from "../../ListPagination";
import ReservationListItem from "./ReservationsListItem";



export default function ReservationsList() {
    const { showReservation } = useReservationModalContext();
    const { reservations } = useReservations();

    return (
        <>
            <List aria-label='lista rezerwacji'>

                {reservations.length === 0 ? 
                <ListItem>
                    <ListItemText primary='Brak rezerwacji spełniających kryteria.' />
                </ListItem> :
                    reservations.map((item, index) => <ReservationListItem
                        key={index}
                        data={item}
                        onClick={() => showReservation(item.id)}
                    />)}
            </List>
            <ListPagination />
        </>
    );
}


