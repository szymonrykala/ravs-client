import React from "react";
import { resourceMapContext, ResourceMapContext } from "./ResourceMapContextProvider";


export default function useResourceMap() {
    return React.useContext(resourceMapContext) as ResourceMapContext;
}