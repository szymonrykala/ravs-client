import React from "react";
import { resourceMapContext } from "./ResourceMapContextProvider";
import { ResourceMapContextValue } from "./ResourceMapOCntextValue";


export default function useResourceMap() {
    return React.useContext(resourceMapContext) as ResourceMapContextValue;
}