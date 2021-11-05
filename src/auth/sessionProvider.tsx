import React, { createContext, useState } from "react";
import { Redirect } from "react-router-dom";
import useNotification from "../contexts/NotificationContext/useNotification";

import { SessionUser } from "../models/User";

import AuthService, { LoginFormData } from "../services/AuthService";
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



    async function checkIfUserHasSession(): Promise<void> {
        if (AuthService.hasToken()) {
            try {
                const hasSession = await AuthService.hasSession();
                if (hasSession) {
                    const sessionUser = await UserService.getMe();
                    setUser(sessionUser);
                    notify("Witaj ponownie!", 'info');
                } else {
                    notify('Twoja sesja wygasła', 'info', () => <Redirect to={paths.LOGIN} />);
                }
            } catch (err: any) {
                notify(err.description, 'error', () => <Redirect to={paths.WELCOME} />);
            }
        } else {
            notify('Witaj!', 'info', () => <Redirect to={paths.WELCOME} />);
        }
        setLoading(false)
    }

    React.useEffect(() => {
        checkIfUserHasSession();
        return () => { }
    }, []);

    const login = async (data: LoginFormData): Promise<void> => {
        try {
            await AuthService.login(data);
            const sessionUser = await UserService.getMe();
            setUser(sessionUser);
            notify("Pomyślnie zalogowano!", "success", () => <Redirect to={paths.HOME} />);

        } catch (err: any) {
            let message = err.description;

            if (err.code === 404) message = "Użytkownik nie istnieje";

            notify(message, "error");
        }
    }

    const logout = () => {
        AuthService.logout();
        setUser(null);
        notify("Pomyślnie wylogowano!", "success", () => <Redirect to={paths.WELCOME} />);
    };

    return (
        <>
            <LoadingView
                open={loading}
                text="Ładowanie Sesji..."
            />
            <sessionContext.Provider value={{ user, login, logout } as SessionValue}>
                {children}
            </sessionContext.Provider>
        </>
    );
}
