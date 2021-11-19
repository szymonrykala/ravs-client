import React from "react";
import { accessContext } from "./AccessContextProvider";
import AccessContextValue from "./AccessContextValue";


export default function useAccess() {
    return React.useContext(accessContext) as AccessContextValue;
}