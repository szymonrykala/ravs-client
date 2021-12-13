import { Stack } from "@mui/material";
import { QueryParamsContext } from "../../../../../contexts/QueryParamsContext";
import ReservationsContext from "./ReservationsContext";
import { ReservationsQueryParams } from "../../../../../services/ReservationService";
import ListPagination from "../../components/ListPagination";
import ReservationsList from "./ReservationsList";
import ReservationTabBar from "./ReservationTabBar";



export default function GenericReservationsTab() {
    return (
        <QueryParamsContext name='reservations-query-params' default={{
            itemsOnPage: 5,
            currentPage: 1,
            from: 'today'
        } as ReservationsQueryParams}>
            <ReservationsContext>
                <Stack rowGap={3}>
                    <ReservationTabBar />
                    <ReservationsList />
                    <ListPagination />
                </Stack>
            </ReservationsContext>
        </QueryParamsContext>
    );
}