import Model from './Model';
import Image from './Image';
import Address from './Address';


export default interface Building extends Model {
    name: string,
    image: Image,
    address: number | Address,
    openTime: string,
    closeTime: string,
}