import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import List from "@mui/material/List";
import React from "react";
import useSession from "../../../auth/useSession";
import { useReservationModal } from "../../../contexts/ReservationModalContext";
import { useReservations } from "../../../contexts/ReservationsContext";
import Reservation from "../../../models/Reservation";
import ImageService from "../../../services/ImageService";
import ReservationService, { ReservationsQueryParams } from "../../../services/ReservationService";
import AppLink from "../../../shared/components/AppLink";
import GenericReservationsTab from "../../../shared/components/GenericReservationsTab";
import ReservationsList from "../../../shared/components/GenericReservationsTab/ReservationsList";
import ReservationTabBar from "../../../shared/components/GenericReservationsTab/ReservationTabBar";
import SmallCard from "../../../shared/components/SmallCard";
import { dynamicPaths } from "../../../shared/path";
import { displayDate } from "../../../shared/utils";


export default function HomeReservations() {
    return (
        <SmallCard title='Rezerwacje'>
            <GenericReservationsTab>
                <ReservationTabBar />

                <LogicLoader />

                <ReservationsList />
            </GenericReservationsTab>
        </SmallCard>
    );
}

function MyList() {
    const { reservations } = useReservations();
    const { showReservation } = useReservationModal();

    return (
        <List aria-label='lista rezerwacji'>
            {reservations.map((item, index) => <ReservationListItem
                key={index}
                data={item}
                onClick={() => showReservation(item.id)}
            />)}
        </List>
    );
}



interface ReservationListItemProps {
    data: Reservation,
    onClick: () => void
}

function ReservationListItem({ data, onClick }: ReservationListItemProps) {
    return (
        <ListItem button
            onClick={onClick}
        >
            <ListItemAvatar>
                <AppLink to={dynamicPaths.toUser(data.user.id)}>
                    <Avatar src={ImageService.getLink(data.user.image)} />
                </AppLink>
            </ListItemAvatar>

            <ListItemText
                primary={data.title}
                secondary={displayDate(data.actualStart ?? data.plannedStart) +
                    ' - ' + ReservationService.resolveStatus(data)}
            />
        </ListItem>
    );
}

function LogicLoader() {
    // const params = useParams();
    const { user } = useSession();
    const { setLoader } = useReservations();

    const reservationsLoader = React.useCallback(async (queryParams: ReservationsQueryParams) => {
        return ReservationService.getReservations({ userId: `${user?.id}` }, queryParams);
    }, [user]);


    React.useEffect(() => {
        setLoader(reservationsLoader);
    }, [reservationsLoader, setLoader]);


    return null;
}