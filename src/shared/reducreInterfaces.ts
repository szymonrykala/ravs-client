

export interface ReducerResult {
    message: string,
    success: boolean | null
}


export interface ReducerAction {
    statusCode: number,
    payload?: any
}


export const initialReducerResult: ReducerResult = {
    success: null,
    message: ''
}


export const assignPayload = (
    action: ReducerAction,
    success: boolean = false
): ReducerResult => ({
    success: success,
    message: action.payload
});


export const somethingBroke = (): ReducerResult => ({
    success: false,
    message: "Coś poszło nie tak, przepraszamy"
});