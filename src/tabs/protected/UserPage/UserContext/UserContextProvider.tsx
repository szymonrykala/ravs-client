import React from "react";
import { Redirect, useParams } from "react-router-dom";
import useSession from "../../../../auth/useSession";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import Image from "../../../../models/Image";
import { DetailedUser } from "../../../../models/User";
import { LogsQueryParams } from "../../../../services/interfaces";
import UserService, { UpdateUserParams, UserViewParams } from "../../../../services/UserService";
import paths from "../../../../shared/path";



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
    }, [urlParams.userId, session]);


    const load = React.useCallback(async () => {
        try {
            const resp = await UserService.getCurrentOne();
            setUser(resp.data as DetailedUser);
        } catch (err: any) {
        }
    }, [urlParams.userId]);


    React.useEffect(() => {
        load()
    }, [load]);


    const getLogs = React.useCallback(async (queryParams: LogsQueryParams) => {
        try {
            return await UserService.getLogs(queryParams);
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify, urlParams]); // urlParams, because we need to pass logs getter for a new room


    const getChartsData = React.useCallback((query: any) => {
        return UserService.getChartsData(query)
    }, [urlParams, notify]);


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
    }, [notify]);


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


    const uploadImage = React.useCallback(async (image: Blob) => {
        try {
            const resp = await UserService.uploadImage(image);
            setUser(old => {
                if (old && resp.data)
                    return {
                        ...old,
                        image: {
                            ...old.image,
                            id: Number(resp.data)
                        }
                    };
            });
            notify("Obraz został zmieniony", 'success');
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify]);


    const deleteImage = React.useCallback(async (image: Image) => {
        await UserService.removeImage(image);
    }, []);


    if (!user) return null;

    return (
        <userContext.Provider value={{
            user,
            getLogs,
            getChartsData,
            deleteUser,
            updateUser,
            uploadImage,
            deleteImage,
        }}>
            {props.children}
        </userContext.Provider>
    );
}