import Model from './Model';


export default interface Log extends Model {
    method: "GET" | "POST" | "PATCH" | "DELETE",
    endpoint: string,
    user: number,
    payload: any,
    time: number,
}
