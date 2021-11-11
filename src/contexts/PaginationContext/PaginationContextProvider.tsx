import React from "react";
import { APIPagination } from "../../services/interfaces";
import PaginationContextValue, { paginationContextDefaults } from "./PaginationContextValue";


const PAGINATION: string = 'pagination';


function getDefaults() {
    try {
        const value = localStorage.getItem(PAGINATION)
        if (value)
            paginationContextDefaults.pagination.itemsOnPage = JSON.parse(value);
    } catch { }
    return paginationContextDefaults;
}



export const paginationContext = React.createContext<PaginationContextValue>(paginationContextDefaults);

interface PaginationContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}

export default function PaginationContextProvider(props: PaginationContextProviderProps) {
    const [pagination, setPagination] = React.useState<APIPagination>(() => getDefaults().pagination);


    React.useEffect(() => {
        localStorage.setItem(PAGINATION, JSON.stringify(pagination.itemsOnPage))
    }, [pagination.itemsOnPage]);


    return (
        <paginationContext.Provider value={{
            pagination,
            setPagination
        }}>
            {props.children}
        </paginationContext.Provider>
    );
}