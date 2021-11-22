import GenericLogsTab from "../../../../shared/components/GenericLogsTab";
import { useUser } from "../UserContext";


export default function UserLogs() {
    const { getLogs } = useUser();

    return (
        <GenericLogsTab logsGetter={getLogs} />
    );
}