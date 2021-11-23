import React from "react";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import { usePagination } from "../../../../contexts/PaginationContext";
import { useQueryParams } from "../../../../contexts/QueryParamsContext";
import User from "../../../../models/User";
import { APIPagination } from "../../../../services/interfaces";
import UserService, { UserQueryParams } from "../../../../services/UserService";
import UsersContextValue from "./UsersContextValue";



export const usersContext: any = React.createContext(null);


interface UsersContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}

export default function UsersContextProvider(props: UsersContextProviderProps) {
    const notify = useNotification();
    const { queryParams, setQueryParams } = useQueryParams<UserQueryParams>();
    const { pagination, setPagination } = usePagination();

    const [users, setUsers] = React.useState<User[]>();


    React.useEffect(() => {
        setQueryParams(old => ({
            ...old,
            itemsOnPage: pagination.itemsOnPage,
            currentPage: pagination.currentPage
        }));
    }, [pagination.itemsOnPage, pagination.currentPage]);


    const load = React.useCallback(async () => {
        try {
            const resp = await UserService.getUsers(queryParams);
            setPagination(resp.pagination as APIPagination);
            setUsers(resp.data as User[]);
        } catch (err: any) {
            notify(err.description, 'error');
            setUsers([]);
        }
    }, [notify, queryParams, setPagination]);


    React.useEffect(() => {
        load();
    }, [load]);


    const getChartsData = React.useCallback(async (query: any) => {
        return UserService.getUsersChartsData(query)
    }, []);


    if (!users) return null;

    return (
        <usersContext.Provider value={{
            users,
            getChartsData,
        } as UsersContextValue}>
            {props.children}
        </usersContext.Provider>
    )
}