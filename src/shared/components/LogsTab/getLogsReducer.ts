import {
    ReducerAction,
    ReducerResult,
    assignPayload,
    somethingBroke,
    initialReducerResult
} from "../../reducreInterfaces";



export function getLogsReducer(state: ReducerResult, action: ReducerAction): ReducerResult {
    switch (action.statusCode) {
        case 200:
            return {
                success: true,
                message: "Logi gotowe"
            };
        case 403:
        case 401:
        case 400:
        case 409:
            return assignPayload(action)
        case 404:
            return {
                success: false,
                message: "Nie znaleziono nic takiego"
            };
        case 500:
            return somethingBroke();
        default:
            return initialReducerResult;
    }
}