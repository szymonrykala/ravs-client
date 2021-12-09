import React from "react";
import { paginationContext } from "./PaginationContextProvider";
import PaginationContextValue from "./PaginationContextValue";


export default function usePagination() {
    return React.useContext(paginationContext) as PaginationContextValue;
}