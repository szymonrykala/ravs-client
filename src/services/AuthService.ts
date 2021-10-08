import Service, { ResponseData, StatusMessages } from "./Service";



// custom login method messages
const loginMessges: StatusMessages = {
    200: 'Zalogowano!',
    400: 'Hasło jest niepoprawne.',
    404: 'Użytkownik nie istnieje.',
    500: 'Wystąpił błąd, przepraszamy.'
}

interface LoginResult {
    message: string,
    success: boolean
}


class AuthService extends Service {

    async login(email: string, password: string) {

        function respond(obj: ResponseData) {
            return <string>loginMessges[obj.statusCode ?? 0]
                ?? <string>obj?.error?.description;
        }

        try {
            const response = <ResponseData>await this.post(
                '/users/auth',
                {
                    'email': email,
                    'password': password
                }
            );
            // response = resp;
            // set the token to local storage
            if (response.data) {
                localStorage.setItem(this._TOKEN_NAME, response.data);
            }

            return <LoginResult>{ message: respond(response), success: true };
        } catch (err: any) {
            return <LoginResult>{ message: respond(err), success: false };
        }
    }

    logout() {
        localStorage.removeItem(this._TOKEN_NAME);
    }


}


export default new AuthService();