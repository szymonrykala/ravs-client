import React from "react";
import { chartsContext } from "./ChartsContextProvider";
import ChartsContextValue from "./ChartsContextValue";


export default function useCharts<T>() {
    return React.useContext(chartsContext) as ChartsContextValue<T>;
}