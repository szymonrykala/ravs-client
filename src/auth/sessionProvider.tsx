import React, { createContext, useState } from "react";

import { SessionUser } from "../models/User";

import AuthService from "../services/AuthService";
import UserService from "../services/UserService";


interface SessionProviderProps {
    children?: React.ReactNode
}


export interface SessionContextInterface {
    user: SessionUser | null,
    login: (email: string, password: string) => string,
    logout: () => void
}

export const sessionContext: any = createContext(null);


export default function SessionProvider({ children }: SessionProviderProps) {
    const [user, setUser] = useState<SessionUser | null>(null);

    React.useEffect(() => {
        const checkIfUserHasSession = async () => {
            const hasSession = await AuthService.hasSession();
            if (hasSession) {
                const sessionUser = await UserService.getMe();
                setUser(sessionUser);
            }
        }
        checkIfUserHasSession();
    }, []);

    const login = async (email: string, password: string) => {

        const { message, success } = await AuthService.login(email, password);

        if (success) {
            const sessionUser = await UserService.getMe();
            setUser(sessionUser);
        }

        return message;
    }

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    return (
        <sessionContext.Provider value={{ user, login, logout }}>
            {children}
        </sessionContext.Provider>
    );
}
