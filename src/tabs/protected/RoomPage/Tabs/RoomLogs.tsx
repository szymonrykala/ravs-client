import GenericLogsTab from "../../../../shared/components/GenericLogsTab";
import { useRoomContext } from "../RoomContext";


export default function RoomLogs() {
    const { getLogs } = useRoomContext();

    return (
        <GenericLogsTab logsGetter={getLogs} />
    );
}