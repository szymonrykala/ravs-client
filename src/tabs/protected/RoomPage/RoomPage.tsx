import { RoomContextProvider } from "./RoomContext";
import GenericPage from "../GenericPage";
import { ChartsTab, ReservationsTab, ViewTab, LogsTab } from "./Tabs";


export default function RoomPage() {

    return (
        <RoomContextProvider>
            <GenericPage
                label="Strona Pokoju, statystyki, rezerwacje, logi, edycja pokoju"
                view={<ViewTab />}
                logs={<LogsTab />}
                reservations={<ReservationsTab />}
                stats={<ChartsTab />}
            />
        </RoomContextProvider>
    );
}
