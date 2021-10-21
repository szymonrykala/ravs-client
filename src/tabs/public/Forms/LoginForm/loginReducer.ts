import {
    ReducerAction,
    ReducerResult,
    assignPayload,
    somethingBroke
} from "../../../../shared/reducreInterfaces";



export function loginReducer(state: ReducerResult, action: ReducerAction): ReducerResult {
    switch (action.statusCode) {
        case 200:
            return {
                success: true,
                message: action.payload ?? "Zalogowano!"
            };
        case 403:
        case 401:
        case 400:
        case 409:
            return assignPayload(action)
        case 404:
            return {
                success: false,
                message: "Taki użytkownik nie istnieje."
            };
        case 500:
            return somethingBroke();
        default:
            throw new Error();
    }
}