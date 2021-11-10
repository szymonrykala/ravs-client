import { Stack } from "@mui/material";
import PaginationContextProvider from "../../../contexts/PaginationContext/PaginationContextProvider";
import ReservationsContext from "../../../contexts/ReservationsContext";



interface GenericReservationsTab {
    children: React.ReactNode | React.ReactNodeArray
}

export default function GenericReservationsTab(props: GenericReservationsTab) {
    return (
        <PaginationContextProvider>
            <ReservationsContext>
                <Stack rowGap={5} >
                    {props.children}
                </Stack>
            </ReservationsContext>
        </PaginationContextProvider>
    );
}