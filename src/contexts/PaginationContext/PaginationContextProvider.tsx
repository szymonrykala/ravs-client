import React from "react";
import { APIPagination } from "../../services/interfaces";
import PaginationContextValue, { paginationContextDefaults } from "./PaginationContextValue";




export const paginationContext = React.createContext<PaginationContextValue>(paginationContextDefaults);


interface PaginationContextProviderProps {
    children: React.ReactNode | React.ReactNodeArray
}

export default function PaginationContextProvider(props: PaginationContextProviderProps) {
    const [pagination, setPagination] = React.useState<APIPagination>(paginationContextDefaults.pagination);

    return (
        <paginationContext.Provider value={{
            pagination,
            setPagination
        }}>
            {props.children}
        </paginationContext.Provider>
    );
}