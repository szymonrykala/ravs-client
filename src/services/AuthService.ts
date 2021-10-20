import Service, { ResponseData, ServiceFormData, StatusMessages } from "./Service";



// custom login method messages
const loginMessges: StatusMessages = {
    200: 'Zalogowano!',
    400: 'Hasło jest niepoprawne.',
    404: 'Użytkownik nie istnieje.',
    500: 'Wystąpił błąd, przepraszamy.'
}

export interface LoginResult {
    message: string,
    success: boolean
}


export interface LoginFormData extends ServiceFormData {
    email: string,
    password: string
}



class AuthService extends Service {

    async login(data: LoginFormData): Promise<LoginResult> {

        function respond(obj: ResponseData) {
            return loginMessges[obj.statusCode ?? 0] as string
                ?? obj?.error?.description as string;
        }

        try {
            const response = await this.post(
                '/users/auth',
                {
                    'email': data.email,
                    'password': data.password
                }
            ) as ResponseData;

            // set the token to local storage
            if (response.data) {
                localStorage.setItem(this._TOKEN_NAME, response.data);
            }

            return { message: respond(response), success: true };
        } catch (err: any) {
            return { message: respond(err), success: false };
        }
    }

    logout(): void {
        localStorage.removeItem(this._TOKEN_NAME);
    }

    async hasSession(): Promise<boolean> {
        if (localStorage.getItem(this._TOKEN_NAME)) {
            try {
                const resp = await this.get('/users/me'); // change to ping
                if (resp.statusCode === 200)
                    return true;

            } catch (err: any) {
                if (err.statusCode === 401)
                    return false;
            }
        }
        return false
    }

}


export default new AuthService();