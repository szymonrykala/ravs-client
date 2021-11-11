import { APIResponse } from "./interfaces";
import Service, { ServiceFormData } from "./Service";



export interface LoginFormData extends ServiceFormData {
    email: string,
    password: string
}



class AuthService extends Service {

    async login(data: LoginFormData): Promise<APIResponse> {
        const response = await this.post(
            '/users/auth',
            {
                'email': data.email,
                'password': data.password
            }
        );

        // set the token to local storage
        if (response.data) {
            localStorage.setItem(this._TOKEN_NAME, response.data.toString());
        }

        return response;
    }

    logout(): void {
        localStorage.removeItem(this._TOKEN_NAME);
    }

    hasToken(): boolean {
        return Boolean(localStorage.getItem(this._TOKEN_NAME));
    }

    async hasSession(): Promise<boolean> {
        try {
            if (this.hasToken()) {
                await this.get('/users/me'); // change to ping
                return true
            }
        } catch (err: any) {
            // localStorage.removeItem(this._TOKEN_NAME);
            
        }
        return false
    }
}

export default new AuthService();