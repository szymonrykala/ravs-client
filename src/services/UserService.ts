import Image from "../models/Image";
import { SessionUser } from "../models/User";
import { APIResponse, DatesQueryParams, PaginationQueryParams } from "./interfaces";
import { LogsQueryParams } from "./LogService";
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


class UserService extends Service {
    _path = '/users';

    get path(): string {
        return this._path;
    }

    public setPath({ userId }: UserViewParams) {
        this._path = `/users/${userId}`;
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

    public register(data: RegisterUserData) {
        return this.post('/users', data);
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

    public uploadImage(image: Blob) {
        const formData = new FormData();
        formData.append(
            'file',
            image
        );
        return this.sendImage(`${this.path}/images`, formData);
    }

    public removeImage(image: Image) {
        return this.delete(`${this.path}/images/${image.id}`);
    }

    public changePassword(data: ChangePasswordData) {
        return this.patch('/users/password', data);
    }
}


export default new UserService();