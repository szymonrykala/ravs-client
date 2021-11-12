import React from "react";
import { useParams } from "react-router-dom";
import { useReservations } from "../../../../contexts/ReservationsContext";
import ReservationService, { ReservationsQueryParams } from "../../../../services/ReservationService";
import { RoomViewParams } from "../../../../services/RoomService";
import GenericReservationsTab from "../../../../shared/components/GenericReservationsTab/index";
import ReservationsList from "../../../../shared/components/GenericReservationsTab/ReservationsList";
import ReservationTabBar from "../../../../shared/components/GenericReservationsTab/ReservationTabBar";



export default function RoomReservations() {


    return (
        <GenericReservationsTab>
            <ReservationTabBar />

            <LogicLoader />

            <ReservationsList />
        </GenericReservationsTab>
    );
}

function LogicLoader() {
    const params = useParams() as RoomViewParams;
    const { setLoader } = useReservations();

    const reservationsLoader = React.useCallback(async (queryParams: ReservationsQueryParams) => {
        return ReservationService.getReservations(params, queryParams);
    }, [params]);


    React.useEffect(() => {
        setLoader(reservationsLoader);
    }, [reservationsLoader, setLoader]);


    return null;
}