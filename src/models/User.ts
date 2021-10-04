import Model from './Model';
import Image from './Image';
import Access from './Access';


export default interface User extends Model {
    email: string,
    name: string,
    surname: string,
    activated: boolean,
    deleted: boolean,
    image: Image,
    access: number | Access,
    metadata?: object
}