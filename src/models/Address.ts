import Model from './Model';


export default interface Address extends Model{
    country: string,
    town: string,
    postalCode: string,
    street: string,
    number: string,
}