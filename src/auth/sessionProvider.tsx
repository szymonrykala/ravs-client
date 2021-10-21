import React, { createContext, useState } from "react";

import { SessionUser } from "../models/User";

import AuthService, { LoginFormData } from "../services/AuthService";
import { APIResponse } from "../services/Service";
import UserService from "../services/UserService";


interface SessionProviderProps {
    children?: React.ReactNode
}


export interface SessionContextInterface {
    user: SessionUser | null,
    login: (data: LoginFormData) => Promise<APIResponse>,
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

    const login = async (data: LoginFormData): Promise<APIResponse> => {

        const resp = await AuthService.login(data);

        if (resp.statusCode === 200) {
            const sessionUser = await UserService.getMe();
            setUser(sessionUser);
        }

        return resp;
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
