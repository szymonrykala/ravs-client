import Model from './Model';
import Image from './Image';
import Access from './Access';
import Metadata from './Metadata';


interface BaseUser extends Model {
    email: string,
    name: string,
    surname: string,
    activated: boolean,
    deleted: boolean,
    lastActivity: string,
    image: Image,
}

export interface DetailedUser extends BaseUser {
    access: Access,
}

export default interface User extends BaseUser {
    access: number,
}

export interface SessionUser extends DetailedUser {
    metadata: Metadata
}