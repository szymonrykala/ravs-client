import GenericPage from "../GenericPage";
import BuildingContext from "./BuildingContext";
import { ChartsTab, LogsTab, ReservationsTab, ViewTab } from "./Tabs";


export default function BuildingPage() {
    return (
        <BuildingContext>
            <GenericPage
                label="Strona Budynku, statystyki, redycja, logi"
                view={<ViewTab />}
                reservations={<ReservationsTab />}
                stats={<ChartsTab />}
                logs={<LogsTab />}
            />
        </BuildingContext>
    );
}