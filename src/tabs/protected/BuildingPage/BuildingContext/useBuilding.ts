import React from "react";
import { buildingContext } from "./BuildingContextProvider";
import BuildingContextValue from "./BuildingContextValue";


export default function useBuilding() {
    return React.useContext(buildingContext) as BuildingContextValue;
}