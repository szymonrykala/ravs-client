import GenericLogsTab from "../../../../shared/components/GenericLogsTab";
import { useAccess } from "../AccessContext";

export default function AccessesLogs() {
    const { getLogs } = useAccess();

    return (
        <GenericLogsTab logsGetter={getLogs} />
    );
}