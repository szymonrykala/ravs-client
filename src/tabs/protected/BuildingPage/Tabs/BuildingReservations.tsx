import React from "react";
import { useParams } from "react-router-dom";
import { useReservations } from "../../../../contexts/ReservationsContext";
import { BuildingViewParams } from "../../../../services/BuildingService";
import ReservationService, { ReservationsQueryParams } from "../../../../services/ReservationService";
import GenericReservationsTab from "../../../../shared/components/GenericReservationsTab";
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
    const params = useParams() as BuildingViewParams;
    const { setLoader } = useReservations();

    const reservationsLoader = React.useCallback(async (queryParams: ReservationsQueryParams) => {
        return ReservationService.getReservations(params, queryParams);
    }, [params.buildingId]);


    React.useEffect(() => {
        setLoader(reservationsLoader);
    }, [reservationsLoader, setLoader]);

    return null;
}