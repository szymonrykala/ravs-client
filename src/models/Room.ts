import Model from './Model';
import Image from './Image';
import Building from './Building';

export enum RoomTypes {
    LABORATORY = "Sala laboratoryjna",
    CONFERENCE = "Sala konferencyjna",
    LECTURE = "Sala wykładowa"
}

// export type RoomType = "Sala wykładowa" | "Sala laboratoryjna" | "Sala konferencyjna";
export type RoomType = RoomTypes.LABORATORY | RoomTypes.CONFERENCE | RoomTypes.LECTURE;

interface BaseRoom extends Model {
    name: string,
    image: Image,
    roomType: RoomType,
    seatsCount: number,
    floor: number,
    blocked: boolean,
    occupied: boolean,
    hasNFCTag: boolean
}

export default interface Room extends BaseRoom {
    building: number
}

export interface DetailedRoom extends BaseRoom {
    building: Building
}