import React from "react";
import { Redirect, useParams } from "react-router-dom";
import useSession from "../../../../../auth/useSession";
import useNotification from "../../../../../contexts/NotificationContext/useNotification";
import { DetailedUser } from "../../../../../models/User";
import UserService, { UpdateUserParams, UserViewParams } from "../../../../../services/UserService";
import Loading from "../../../../../shared/components/Loading";
import paths from "../../../../../shared/path";



export const userContext: any = React.createContext(null);


interface UserContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}


export default function UserContextProvider(props: UserContextProviderProps) {
    const urlParams = useParams<UserViewParams>();
    const notify = useNotification();
    const session = useSession();

    const [user, setUser] = React.useState<DetailedUser>();


    React.useLayoutEffect(() => {
        let params = (urlParams.userId === 'me' && session.user) ? { userId: session.user.id.toString() } : urlParams;
        UserService.setPath(params);
    }, [
        urlParams,
        session
    ]);


    const load = React.useCallback(async () => {
        try {
            const resp = await UserService.getCurrentOne();
            setUser(resp.data as DetailedUser);
        } catch (err: any) {
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlParams]);


    React.useEffect(() => {
        load()
    }, [
        load
    ]);


    const deleteUser = React.useCallback(async () => {
        try {
            await UserService.remove();

            let action = (): React.ReactNode => null

            if (session && session.user?.id === user?.id) {
                session.logout();
            } else {
                action = () => <Redirect to={paths.USERS} />
            }

            notify('Użytkownik został usunięty', 'success', action);
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false;
    }, [
        notify,
        session,
        user?.id,
    ]);


    const updateUser = React.useCallback(async (data: UpdateUserParams) => {
        try {
            if (await UserService.update(data)) {
                setUser(old => {
                    return { ...old, ...data as DetailedUser };
                });

                notify('Użytkownik został zaktualizowany', 'success');
            }
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false;
    }, [notify]);


    if (!user) return <Loading />;

    return (
        <userContext.Provider value={{
            user,
            deleteUser,
            updateUser,
        }}>
            {props.children}
        </userContext.Provider>
    );
}