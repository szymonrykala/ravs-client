import User from "../models/User";
import Service, { StatusMessages } from "./Service";


const loginMessges: StatusMessages = {
    200: 'Sukces',
    400: 'Hasło jest niepoprawne',
    401: 'Użytkownik nie istnieje',
}


class UserService extends Service {

    async getMe() {
        const resp = await this.get('/users/me');

        return <User>resp.data;
    }


}


export default new UserService();