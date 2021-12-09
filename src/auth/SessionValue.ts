import { SessionUser } from "../models/User";
import { LoginFormData } from "../services/AuthService";


export default interface SessionValue {
    user: SessionUser | null,
    login: (data: LoginFormData) => Promise<void>,
    logout: () => void
}