import { SessionUser } from "../models/User";
import Service, { StatusMessages } from "./Service";


// const loginMessges: StatusMessages = {
//     200: 'Sukces',
//     400: 'Hasło jest niepoprawne',
//     401: 'Użytkownik nie istnieje',
// }


interface RegisterUserData {
    email: string,
    password: string,
    name: string,
    surname: string
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

}


export default new UserService();