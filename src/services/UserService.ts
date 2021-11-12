import { SessionUser } from "../models/User";
import { APIResponse } from "./interfaces";
import Service, { ServiceFormData } from "./Service";


export interface RegisterUserData extends ServiceFormData {
    email: string,
    password: string,
    name: string,
    surname: string
}

export interface ActivationData extends ServiceFormData {
    email: string,
    password: string,
    code: string,
}

export interface ChangePasswordData extends ServiceFormData {
    code: string,
    newPassword: string,
    email: string
}

export interface UserViewParams {
    userId: string;
}


class UserService extends Service {

    async getMe() {
        const resp = await this.get('/users/me');

        return resp.data as SessionUser;
    }

    async register(data: RegisterUserData) {
        return await this.post('/users', data);
    }

    async activate(data: ActivationData) {
        return await this.patch('/users/activate', data);
    }

    async generateKey(email: string) {
        return await this.post('/users/key', {
            email: email
        });
    }

    async changePassword(data: ChangePasswordData) {
        return await this.patch('/users/password', data) as APIResponse;
    }
}


export default new UserService();