import { List, ListItem, ListItemText } from "@mui/material";
import useReservationModalContext from "../ReservationsContext/ModalContext/useReservationModalContext";
import { useReservations } from "../ReservationsContext";
import ReservationListItem from "./ReservationsListItem";
import React from "react";



export default function ReservationsList() {
    const { showReservation } = useReservationModalContext();
    const { reservations } = useReservations();


    const renderedList = React.useMemo(() =>
        reservations.map((item) => <ReservationListItem
            key={item.id}
            data={item}
            onClick={() => showReservation(item.id)}
        />)
        , [
            reservations,
            showReservation
        ]);


    return (
        <List aria-label='lista rezerwacji'>
            {reservations.length === 0 ?
                <ListItem>
                    <ListItemText primary='Brak rezerwacji spełniających kryteria.' />
                </ListItem> :
                renderedList
            }
        </List>
    );
}


