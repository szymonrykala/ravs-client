import React from "react";
import StorageService from "../../services/StorageService";
import QueryParamsContextValue, { queryParamsContextDefaults } from "./QueryParamsContextValue";


export const queryParamsContext = React.createContext<QueryParamsContextValue<any>>(queryParamsContextDefaults);


function initQueryParams<T>(keyName: string, defaultValue: T): T {
    const confString = StorageService.read(keyName);
    if (confString) {
        return confString;
    }
    return defaultValue;
};


interface QueryParamsContextProviderProps<T> {
    default: T,
    name: string,
    children: React.ReactNode[] | React.ReactNode
}


export default function QueryParamsContextProvider<T>(props: QueryParamsContextProviderProps<T>) {

    const [queryParams, setQueryParams] = React.useState<T>(
       ()=> initQueryParams<T>(props.name, props.default)
    );

    React.useEffect(() => {
        StorageService.save(props.name, queryParams);
    }, [queryParams, props.name]);

    if(!queryParams) return null;

    return (
        <queryParamsContext.Provider value={{ queryParams, setQueryParams }}>
            {props.children}
        </queryParamsContext.Provider>
    );
}