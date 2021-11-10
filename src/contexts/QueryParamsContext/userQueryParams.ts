import React from "react";
import { queryParamsContext } from "./QueryParamsContextProvider";
import QueryParamsContextValue from "./QueryParamsContextValue";


export default function useQueryParams<T>() {
    return React.useContext(queryParamsContext) as QueryParamsContextValue<T>;
}