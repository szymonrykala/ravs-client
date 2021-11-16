import React from "react";
import { resourceMapContext } from "./ResourceMapContextProvider";
import ResourceMapContextValue from "./ResourceMapContextValue";


export default function useResourceMap() {
    return React.useContext(resourceMapContext) as ResourceMapContextValue;
}