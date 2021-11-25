import GenericReservationsTab from "../../../../shared/components/GenericReservationsTab/index";
import ReservationsList from "../../../../shared/components/GenericReservationsTab/ReservationsList";
import ReservationTabBar from "../../../../shared/components/GenericReservationsTab/ReservationTabBar";



export default function RoomReservations() {


    return (
        <GenericReservationsTab>
            <ReservationTabBar />

            <ReservationsList />
        </GenericReservationsTab>
    );
}
