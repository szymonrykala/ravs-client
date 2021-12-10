import React from "react";
import { settingsContext } from "./SettingsContextProvider";
import SettingsContextValue from "./SettingsContextValue";

export default function useSettings() {
    return React.useContext(settingsContext) as SettingsContextValue;
}