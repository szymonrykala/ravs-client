import Model from './Model';
import Image from './Image';
import Access from './Access';


interface BaseUser extends Model{
    email: string,
    name: string,
    surname: string,
    activated: boolean,
    deleted: boolean,
    lastActivity: string,
    image: Image,
}

export default interface User extends BaseUser {
    access: number
}

export interface SessionUser extends BaseUser {
    access: Access,
    metadata: object
}