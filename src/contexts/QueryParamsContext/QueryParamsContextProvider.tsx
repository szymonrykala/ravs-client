import React from "react";
import QueryParamsContextValue, { queryParamsContextDefaults } from "./QueryParamsContextValue";


export const queryParamsContext = React.createContext<QueryParamsContextValue<any>>(queryParamsContextDefaults);


function initQueryParams<T>(keyName: string, defaultValue: T): T {
    const confString = localStorage.getItem(keyName);
    if (confString) {
        try {
            const params = JSON.parse(confString);
            return params
        } catch { }
    }
    return defaultValue;
};


interface QueryParamsContextProviderProps<T> {
    default: T,
    name: string,
    children: React.ReactNodeArray | React.ReactNode
}


export default function QueryParamsContextProvider<T>(props: QueryParamsContextProviderProps<T>) {

    const [queryParams, setQueryParams] = React.useState<T>(
        initQueryParams<T>(props.name, props.default)
    );

    React.useEffect(() => {
        localStorage.setItem(props.name, JSON.stringify(queryParams));
    }, [queryParams, props.name]);

    return (
        <queryParamsContext.Provider value={{ queryParams, setQueryParams }}>
            {props.children}
        </queryParamsContext.Provider>
    );
}