import Room from "./Room";
import Model from './Model';
import User from './User';



export default interface Reservation extends Model {
    title: string,
    description: string,
    room: Room,
    user: User,
    plannedStart: string,
    plannedEnd: string,
    actualStart: null | string,
    actualEnd: null | string,
}