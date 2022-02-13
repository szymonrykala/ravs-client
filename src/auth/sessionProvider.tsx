import React, { createContext, useState } from "react";
import { Redirect } from "react-router-dom";
import useNotification from "../contexts/NotificationContext/useNotification";

import { SessionUser } from "../models/User";

import AuthService, { LoginFormData } from "../services/AuthService";
import ImageService from "../services/ImageService";
import LogService from "../services/LogService";
import MetadataService from "../services/MetadataService";
import ReservationService from "../services/ReservationService";
import StorageService from "../services/StorageService";
import UserService from "../services/UserService";
import LoadingView from "../shared/components/LoadingView";
import paths from "../shared/path";
import SessionValue from "./SessionValue";


interface SessionProviderProps {
    children?: React.ReactNode
}


export const sessionContext: any = createContext(null);


export default function SessionProvider({ children }: SessionProviderProps) {
    const notify = useNotification();
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = useState<SessionUser | null>(null);


    const setUpUser = React.useCallback((user: SessionUser) => {
        setUser(user);

        // config services which require identity data
        StorageService.setIdentity(user.id);
        MetadataService.userId = user.id;
        MetadataService.metadata = user.metadata;
        ReservationService.userId = user.id;
        LogService.userId = user.id;
        ImageService.userId = user.id;
        UserService.userId = user.id;
    }, []);


    const checkIfUserHasSession = React.useCallback(async () => {
        setLoading(true);
        if (AuthService.hasToken()) {
            try {
                if (await AuthService.hasSession()) {
                    const sessionUser = await UserService.getMe();
                    setUpUser(sessionUser);
                    notify("Witaj ponownie!", 'info');
                } else {
                    notify('Twoja sesja wygasła', 'info', () => <Redirect to={paths.LOGIN} />);
                }
            } catch (err: any) {
                notify(err.description, 'error', () => <Redirect to={paths.WELCOME} />);
            }
        }
        setLoading(false)
    }, [
        notify,
        setUpUser
    ]);


    React.useEffect(() => {
        checkIfUserHasSession();
        return () => { }
    }, [checkIfUserHasSession]);


    const login = React.useCallback(async (data: LoginFormData): Promise<void> => {
        try {
            await AuthService.login(data);
            const sessionUser = await UserService.getMe();
            setUpUser(sessionUser);

            notify("Pomyślnie zalogowano!", "success", () => <Redirect to={paths.HOME} />);

        } catch (err: any) {
            let message = err.description;

            if (err.code === 404) message = "Użytkownik nie istnieje";

            notify(message, "error");
        }
    }, [
        notify,
        setUpUser
    ]);


    const logout = React.useCallback(() => {
        notify("Pomyślnie wylogowano!", "success", () => <Redirect to={paths.PUBLIC} />);
        setUser(null);
        AuthService.logout();
    }, [notify]);


    return (
        <>
            <LoadingView
                open={loading}
                text="Ładowanie Sesji..."
            />
            <sessionContext.Provider value={{ user, login, logout } as SessionValue}>
                {!loading && children}
            </sessionContext.Provider>
        </>
    );
}
