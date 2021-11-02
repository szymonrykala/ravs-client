
interface StatsItem {
    reservationsCount: number,
    averagePlannedTimeMinutes: number,
    averageActualTimeMinutes: number,
    allTimeMinutes: number
}

export interface WeeklyStatsItem extends StatsItem {
    dayOfWeek: number,
    dayLabel: string
}

export interface MonthlyStatsItem extends StatsItem {
    dayOfMonth: number,
}

export interface UserStatsItem extends StatsItem {
    id: number,
    email: string
}

export interface LogStat {
    method: string
    calls: number
    generalEndpoint: string,
    avgTime: number,
    timeForEndpoint: number
}


export interface RoomStats {
    dayOfWeek: [

    ]
}