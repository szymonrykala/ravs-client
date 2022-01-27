import React from "react";
import { logsContext } from "./LogsContextProvider";
import LogsContextValue from "./LogsContextValue";

export default function useLogs() {
    return React.useContext(logsContext) as LogsContextValue;
}