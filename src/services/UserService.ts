import { SessionUser } from "../models/User";
import Service, { ServiceFormData, StatusMessages } from "./Service";


// const loginMessges: StatusMessages = {
//     200: 'Sukces',
//     400: 'Hasło jest niepoprawne',
//     401: 'Użytkownik nie istnieje',
// }


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



class UserService extends Service {

    async getMe() {
        const resp = await this.get('/users/me');

        return resp.data as SessionUser;
    }

    async register(data: RegisterUserData) {
        const resp = await this.post('/users', data);
        return resp.data;
    }

    async activate(data: ActivationData) {
        const resp = await this.patch('/users', data);
        return resp.data;
    }

    async generateKey(email: string) {
        const resp = await this.post('/users/key', {
            email: email
        });
        return resp.data;
    }
}


export default new UserService();