import GenericReservationsTab from "../../../../shared/components/GenericReservationsTab";
import ReservationsList from "../../../../shared/components/GenericReservationsTab/ReservationsList";
import ReservationTabBar from "../../../../shared/components/GenericReservationsTab/ReservationTabBar";



export default function AddressReservations() {


    return (
        <GenericReservationsTab>
            <ReservationTabBar />

            <ReservationsList />
        </GenericReservationsTab>
    );
}
