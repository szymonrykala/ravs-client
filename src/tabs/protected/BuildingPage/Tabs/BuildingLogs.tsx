import GenericLogsTab from "../../../../shared/components/GenericLogsTab";
import { useBuilding } from "../BuildingContext";



export default function BuildingLogs() {
    const { getLogs } = useBuilding();

    if (!getLogs) return null;

    return (
        <GenericLogsTab logsGetter={getLogs} />
    );
}