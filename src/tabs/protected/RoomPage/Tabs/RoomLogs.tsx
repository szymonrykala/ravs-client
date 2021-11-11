import GenericLogsTab from "../../../../shared/components/GenericLogsTab";
import { useRoomContext } from "../RoomContext";


export default function RoomLogs() {
    const { getLogs } = useRoomContext();

    if (!getLogs) return null;

    return (
        <GenericLogsTab logsGetter={getLogs} />
    );
}