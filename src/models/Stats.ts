
interface StatsItem {
    [index: string]: string | number
    reservationsCount: number,
    avgPlannedTimeMinutes: number,
    avgActualTimeMinutes: number,
    allTimeMinutes: number
}


export interface DayStatsItem extends StatsItem {
    day: number
}


export interface UserStatsItem extends StatsItem {
    id: number,
    email: string
}


export interface LogStatsItem {
    [index: string]: string | number,
    method: string,
    calls: number,
    generalEndpoint: string,
    avgTime: number,
    timeForEndpoint: number
}


export interface ReservationStatsItem extends StatsItem {
    id: number,
    name: string,
}


export interface ReservedRoomStatItem extends StatsItem {
    roomName: string,
    buildingName: string,
}


export interface EndpointStatItem {
    method: string,
    calls: number,
    generalEndpoint: string,
    avgTime: number,
    timeForEndpoint: number
}


/*#===== C O L L E C T I O N S =====#*/
export interface BuildingsOrRoomsChartsData {
    allReservations: ReservationStatsItem[]
}


export interface BuildingOrRoomChartsData {
    weekly: DayStatsItem[],
    monthly: DayStatsItem[],
    users: UserStatsItem[]
}


export interface LogsChartsData {
    endpoints: LogStatsItem[]
}

export interface AllUsersChartsData {
    users: UserStatsItem[]
}

export interface UserChartsData {
    weekly: DayStatsItem[],
    monthly: DayStatsItem[],
    reservedRooms: ReservedRoomStatItem[],
}

export interface EndpointChartsData {
    endpoints: EndpointStatItem[]
}