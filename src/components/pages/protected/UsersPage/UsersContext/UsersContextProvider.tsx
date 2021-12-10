import React from "react";
import useNotification from "../../../../../contexts/NotificationContext/useNotification";
import { useQueryParams } from "../../../../../contexts/QueryParamsContext";
import User from "../../../../../models/User";
import UserService, { UserQueryParams } from "../../../../../services/UserService";
import UsersContextValue from "./UsersContextValue";



export const usersContext: any = React.createContext(null);


interface UsersContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}

export default function UsersContextProvider(props: UsersContextProviderProps) {
    const notify = useNotification();
    const { queryParams, setQueryParams } = useQueryParams<UserQueryParams>();

    const [users, setUsers] = React.useState<User[]>();


    const load = React.useCallback(async () => {
        try {
            const resp = await UserService.getUsers(queryParams);
            setQueryParams(old => ({
                ...old,
                pagesCount: resp.pagination?.pagesCount
            }));
            setUsers(resp.data as User[]);
        } catch (err: any) {
            notify(err.description, 'error');
            setUsers([]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        notify,
        queryParams.itemsOnPage,
        queryParams.currentPage,
        queryParams.search,
        queryParams.deleted,
        queryParams.activated
    ]);


    React.useEffect(() => {
        load();
    }, [load]);


    if (!users) return null;

    return (
        <usersContext.Provider value={{
            users,
        } as UsersContextValue}>
            {props.children}
        </usersContext.Provider>
    )
}