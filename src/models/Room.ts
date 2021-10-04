import Model from './Model';
import Image from './Image';
import Building from './Building';


export default interface Room extends Model {
    name: string,
    image: Image,
    building: number | Building,
    roomType: string,
    seatsCount: number,
    floor: number,
    blocked: boolean,
    occupied: boolean,
    hasNFCTag: boolean
}