import { SessionUser } from "../models/User";
import { PaginationQueryParams } from "./interfaces";
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

export interface UpdateUserParams extends ServiceFormData {
    name?: string,
    surname?: string,
    metadata?: object
}

export interface UserViewParams {
    userId: string;
}

export interface UserQueryParams extends PaginationQueryParams {
    [index: string]: any,
    accessId?: number,
    deleted?: boolean,
    search?: string,
    activated?: boolean,
}

export enum RegisterState {
    ACTIVATION_NEEDED,
    NO_ACTIVATION_NEEDED
}


class UserService extends Service {
    _path = '/users';

    get path(): string {
        return this._path;
    }

    public setPath(urlParams: UserViewParams) {
        this._path = this.preparePath(urlParams);
    }

    public getCurrentOne() {
        return this.get(this.path);
    }

    public async getMe() {
        const resp = await this.get('/users/me');
        return resp.data as SessionUser;
    }

    public getUsers(data?: UserQueryParams) {
        return this.get('/users', data);
    }

    public async register(data: RegisterUserData) {
        const message = (await this.post('/users', data)).data as string;
        if(message.search(/aktywacji|mailowy/) > 0){
            return RegisterState.NO_ACTIVATION_NEEDED
        }
        return RegisterState.ACTIVATION_NEEDED
    }

    public activate(data: ActivationData) {
        return this.patch('/users/activate', data);
    }

    public generateKey(email: string) {
        return this.post('/users/key', {
            email: email
        });
    }

    public updateAccess(userId: number, accessId: number) {
        return this.patch(`/users/${userId}/access`, {
            accessId: accessId
        })
    }

    public update(data: UpdateUserParams) {
        return this.patch(this.path, data);
    }

    public remove() {
        return this.delete(this.path);
    }

    public changePassword(data: ChangePasswordData) {
        return this.patch('/users/password', data);
    }
}


export default new UserService();