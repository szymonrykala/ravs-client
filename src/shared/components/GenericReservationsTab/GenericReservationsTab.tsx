import { Stack } from "@mui/material";
import PaginationContextProvider from "../../../contexts/PaginationContext/PaginationContextProvider";
import { QueryParamsContext } from "../../../contexts/QueryParamsContext";
import ReservationsContext from "../../../contexts/ReservationsContext";
import { ReservationsQueryParams } from "../../../services/ReservationService";



interface GenericReservationsTabProps {
    children: React.ReactNode | React.ReactNode[]
}

export default function GenericReservationsTab(props: GenericReservationsTabProps) {
    return (
        <PaginationContextProvider>
            <QueryParamsContext name="home-reservations" default={{} as ReservationsQueryParams}>
                <ReservationsContext>
                    <Stack rowGap={5} >
                        {props.children}
                    </Stack>
                </ReservationsContext>
            </QueryParamsContext>
        </PaginationContextProvider>
    );
}