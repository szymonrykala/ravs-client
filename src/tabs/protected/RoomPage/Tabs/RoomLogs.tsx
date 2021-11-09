import LogsTab from "../../../../shared/components/LogsTab";
import { useRoomContext } from "../RoomContext";


export default function RoomLogs() {
    const { getLogs } = useRoomContext();

    return (
        <LogsTab logsGetter={getLogs} />
    );
}