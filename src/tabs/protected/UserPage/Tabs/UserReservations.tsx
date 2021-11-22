import React from "react";
import { useParams } from "react-router-dom";
import { useReservations } from "../../../../contexts/ReservationsContext";
import ReservationService, { ReservationsQueryParams } from "../../../../services/ReservationService";
import { UserViewParams } from "../../../../services/UserService";
import GenericReservationsTab from "../../../../shared/components/GenericReservationsTab";
import ReservationsList from "../../../../shared/components/GenericReservationsTab/ReservationsList";
import ReservationTabBar from "../../../../shared/components/GenericReservationsTab/ReservationTabBar";
import { useUser } from "../UserContext";




export default function UserReservations() {
    return (
        <GenericReservationsTab>
            <ReservationTabBar />

            <LogicLoader />

            <ReservationsList />
        </GenericReservationsTab>
    );
}


function LogicLoader() {
    const { user } = useUser();
    const params = useParams() as UserViewParams;
    const { setLoader } = useReservations();

    const reservationsLoader = React.useCallback(async (queryParams: ReservationsQueryParams) => {
        let par = params.userId === 'me' ? { userId: user.id.toString() } : params;
        return ReservationService.getReservations(par, queryParams);
    }, [params]);


    React.useEffect(() => {
        setLoader(reservationsLoader);
    }, [reservationsLoader, setLoader]);


    return null;
}