import React from "react";
import { APIPagination } from "../../services/interfaces";
import StorageService from "../../services/StorageService";
import PaginationContextValue, { paginationContextDefaults } from "./PaginationContextValue";


const PAGINATION: string = 'pagination';


function getDefaults(storageName: string) {
    try {
        const value = StorageService.read(storageName)
        if (value)
            paginationContextDefaults.pagination.itemsOnPage = value;
    } catch { }
    return paginationContextDefaults;
}



export const paginationContext = React.createContext<PaginationContextValue>(paginationContextDefaults);

interface PaginationContextProviderProps {
    children: React.ReactNode | React.ReactNode[],
    id: string,
}

export default function PaginationContextProvider(props: PaginationContextProviderProps) {
    const [pagination, setPagination] = React.useState<APIPagination>(getDefaults(PAGINATION + props.id).pagination);


    React.useEffect(() => {
        StorageService.save(PAGINATION + props?.id, pagination.itemsOnPage)
    }, [pagination.itemsOnPage]);


    return (
        <paginationContext.Provider value={{
            pagination,
            setPagination
        } as PaginationContextValue}>
            {props.children}
        </paginationContext.Provider>
    );
}