import GenericReservationsTab from "../../../shared/components/GenericReservationsTab";
import ReservationsList from "../../../shared/components/GenericReservationsTab/ReservationsList";
import ReservationTabBar from "../../../shared/components/GenericReservationsTab/ReservationTabBar";
import SmallCard from "../../../shared/components/SmallCard";



export default function HomeReservations() {
    return (
        <SmallCard title='Rezerwacje'>
            <GenericReservationsTab>
                <ReservationTabBar />

                <ReservationsList />
            </GenericReservationsTab>
        </SmallCard>
    );
}
