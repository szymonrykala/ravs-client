import GenericLogsTab from "../../../../shared/components/GenericLogsTab";
import { useAddress } from "../AddressContext";


export default function AddressLogs() {
    const { getLogs } = useAddress();

    if (!getLogs) return null;

    return (
        <GenericLogsTab logsGetter={getLogs} />
    );
}