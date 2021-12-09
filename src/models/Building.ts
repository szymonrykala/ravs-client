import Model from './Model';
import Image from './Image';
import Address from './Address';


interface BaseBuilding extends Model {
    name: string,
    image: Image,
    openTime: string,
    closeTime: string,
};


export default interface Building extends BaseBuilding {
    address: number
}


export interface DetailedBuilding extends BaseBuilding {
    address: Address
}