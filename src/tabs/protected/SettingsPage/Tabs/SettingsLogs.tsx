import GenericLogsTab from "../../../../shared/components/GenericLogsTab";
import { useSettings } from "../SettingsContext";


export default function SettingsLogs() {
    const { getLogs } = useSettings();


    return (
        <GenericLogsTab logsGetter={getLogs} />
    );
}