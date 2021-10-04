import Model from './Model';

export default interface Access extends Model{
    name: string,
    owner: boolean,
    accessAdmin: boolean,
    premisesAdmin: boolean,
    keysAdmin: boolean,
    reservationsAdmin: boolean,
    reservationsAbility: boolean,
    logsAdmin: boolean,
    statsViewer: boolean,
}