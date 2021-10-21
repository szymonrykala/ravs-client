import {
    ReducerAction,
    ReducerResult,
    assignPayload,
    somethingBroke
} from "../../../../shared/reducreInterfaces";



export function registerReducer(state: ReducerResult, action: ReducerAction): ReducerResult {
    switch (action.statusCode) {
        case 200:
        case 201:
            return {
                success: true,
                message: action.payload ?? "Konto utworzone!"
            };
        case 403:
        case 401:
        case 400:
        case 409:
            return assignPayload(action);
        case 422:
            return {
                success: false,
                message: "Wprowadzono Nieprawidłowe dane"
            };
        case 500:
            return somethingBroke();
        default:
            throw new Error();
    }
}