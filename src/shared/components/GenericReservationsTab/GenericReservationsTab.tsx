import { Stack } from "@mui/material";
import PaginationContextProvider from "../../../contexts/PaginationContext/PaginationContextProvider";
import ReservationsContext from "../../../contexts/ReservationsContext";



interface GenericReservationsTabProps {
    children: React.ReactNode | React.ReactNode[]
}

export default function GenericReservationsTab(props: GenericReservationsTabProps) {
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