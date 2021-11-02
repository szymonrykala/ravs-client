import {
    ReducerAction,
    ReducerResult,
    assignPayload,
    somethingBroke,
    initialReducerResult
} from "../../reducreInterfaces";



export function deleteReducer(state: ReducerResult, action: ReducerAction): ReducerResult {
    switch (action.statusCode) {
        case 200:
            return {
                success: true,
                message: "Usunięto"
            };
        case 403:
        case 401:
        case 400:
        case 409:
            return assignPayload(action)
        case 404:
            return {
                success: false,
                message: "Nie istnieje, prawdopodobnie został już usunięty"
            };
        case 500:
            return somethingBroke();
        default:
            return initialReducerResult;
    }
}