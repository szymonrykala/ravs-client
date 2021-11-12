import React from "react";
import { useParams } from "react-router-dom";
import { useReservations } from "../../../../contexts/ReservationsContext";
import { AddressViewParams } from "../../../../services/AddressService";
import ReservationService, { ReservationsQueryParams } from "../../../../services/ReservationService";
import GenericReservationsTab from "../../../../shared/components/GenericReservationsTab";
import ReservationsList from "../../../../shared/components/GenericReservationsTab/ReservationsList";
import ReservationTabBar from "../../../../shared/components/GenericReservationsTab/ReservationTabBar";



export default function AddressReservations() {


    return (
        <GenericReservationsTab>
            <ReservationTabBar />

            <LogicLoader />

            <ReservationsList />
        </GenericReservationsTab>
    );
}

function LogicLoader() {
    const params = useParams() as AddressViewParams;
    const { setLoader } = useReservations();

    const reservationsLoader = React.useCallback(async (queryParams: ReservationsQueryParams) => {
        return ReservationService.getReservations(params, queryParams);
    }, [params]);


    React.useEffect(() => {
        setLoader(reservationsLoader);
    }, [reservationsLoader, setLoader]);


    return null;
}