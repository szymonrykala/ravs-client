import React, { createContext, useState } from "react";

import { SessionUser } from "../models/User";

import AuthService, { LoginResult } from "../services/AuthService";
import UserService from "../services/UserService";


interface SessionProviderProps {
    children?: React.ReactNode
}


export interface SessionContextInterface {
    user: SessionUser | null,
    login: (email: string, password: string) => Promise<LoginResult>,
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

    const login = async (email: string, password: string): Promise<LoginResult> => {

        const { message, success } = await AuthService.login(email, password);

        if (success) {
            const sessionUser = await UserService.getMe();
            setUser(sessionUser);
        }

        return { message, success } as LoginResult;
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
