import GenericPage from "../GenericPage";
import AddressContext from "./AddressContext";
import { ChartsTab, LogsTab, ReservationsTab, ViewTab } from "./Tabs";


export default function AddressPage() {
    return (
        <AddressContext>
            <GenericPage
                label="Strona Adresu, statystyki, logi, edycja, budynki"
                view={<ViewTab />}
                reservations={<ReservationsTab />}
                logs={<LogsTab />}
                stats={<ChartsTab />}
            />
        </AddressContext>
    );
}