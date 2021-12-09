

export interface ButtonStatus {
    success: boolean | null,
    message: string,
}

interface Action {
    statusCode: number | string,
    payload?: any
}

export const initialResult = {
    success: null,
    message: ''
}

export function statusReducer(state: ButtonStatus, action: Action): ButtonStatus {
    switch (action.statusCode) {
        case 200:
        case 201:
            return {
                success: true,
                message: "Kod został wysłany na podany email"
            };
        case 403:
        case 401:
        case 400:
            return {
                success: false,
                message: action.payload
            };
        case 404:
            return {
                success: false,
                message: "Taki użytkownik nie istnieje."
            };
        case 422:
            return {
                success: false,
                message: "Adres email jest niepoprawny"
            };
        case "NO_ADDRESS":
            return {
                success: false,
                message: "Musisz podać adres email"
            };
        default:
            return {
                success: false,
                message: action.payload
            };
            // throw new Error();
    }
}