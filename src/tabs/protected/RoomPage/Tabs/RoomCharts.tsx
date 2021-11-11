import { Stack } from "@mui/material";
import React from "react";
import { WeeklyStatsItem, MonthlyStatsItem, UserStatsItem } from "../../../../models/Stats";
import ChartTab, { ChartOptionsBar } from "../../../../shared/components/ChartTab";
import { useRoomContext } from "../RoomContext";



interface RoomChartsDtaInterface {
    perWeek: WeeklyStatsItem[],
    perMonth: MonthlyStatsItem[],
    users: UserStatsItem[]
}

interface ChartObject {
    [index: string]: Array<number | string>[]
}

const roomChartLinks: { name: string, href: string }[] = [
    { name: "miesięczne", href: "#monthly" },
    { name: "tygodniowe", href: "#weekly" },
    { name: "użytkownicy", href: "#users" },
]


export default function RoomCharts() {
    const { getChartsData } = useRoomContext();
    const [data, setData] = React.useState<RoomChartsDtaInterface>({
        perWeek: [],
        perMonth: [],
        users: []
    });


    const weekCharts = React.useMemo(() => {
        let obj: ChartObject = {
            reservationsCount: [["Dzień", "Ilość rezerwacji"]],
            averageTimes: [["Dzień", "Planowanny czas", "Faktyczny czas"]],
            allTime: [["Dzień", "Czas"]]
        }

        obj.reservationsCount.push(...data.perWeek.map((item) => [item.dayLabel, item.reservationsCount]))
        obj.allTime.push(...data.perWeek.map((item) => [item.dayLabel, item.allTimeMinutes]))
        obj.averageTimes.push(...data.perWeek.map((item) => [item.dayLabel, item.averagePlannedTimeMinutes, item.averageActualTimeMinutes]))

        return obj;
    }, [data]);


    const monthCharts = React.useMemo(() => {
        let obj: ChartObject = {
            reservationsCount: [["Dzień", "Ilość rezerwacji"]],
            averageTimes: [["Dzień", "Planowanny czas", "Faktyczny czas"]],
            allTime: [["Dzień", "Czas"]]
        }

        obj.reservationsCount.push(...data.perMonth.map((item) => [item.dayOfMonth, item.reservationsCount]))
        obj.allTime.push(...data.perMonth.map((item) => [item.dayOfMonth, item.allTimeMinutes]))
        obj.averageTimes.push(...data.perMonth.map((item) => [item.dayOfMonth, item.averagePlannedTimeMinutes, item.averageActualTimeMinutes]))

        return obj;
    }, [data]);


    const userCharts = React.useMemo(() => {
        let obj: ChartObject = {
            reservationsCount: [["Dzień", "Ilość rezerwacji"]],
            averageTimes: [["Dzień", "Planowanny czas", "Faktyczny czas"]],
            allTime: [["Dzień", "Czas"]]
        }

        obj.reservationsCount.push(...data.users.map((item) => [item.email, item.reservationsCount]))
        obj.allTime.push(...data.users.map((item) => [item.email, item.allTimeMinutes]))
        obj.averageTimes.push(...data.users.map((item) => [item.email, item.averagePlannedTimeMinutes, item.averageActualTimeMinutes]))

        return obj;
    }, [data]);


    return (
        <Stack spacing={4}>
            <ChartOptionsBar links={roomChartLinks} dataSetter={setData} dataGetter={getChartsData} />
            <ChartTab
                id="users"
                title="Ze względu na użytkowników"
                charts={[
                    {
                        type: "PieChart",
                        title: "Ilość rezerwacji na użytkownika",
                        data: userCharts.reservationsCount,
                        hTitle: "Użytkownik",
                        vTitle: "Ilość rezerwacji"
                    }, {
                        type: "ColumnChart",
                        title: 'Średni czas rezerwacji',
                        data: userCharts.averageTimes,
                        hTitle: "Użytkownik",
                        vTitle: 'Czas rezerwacji [m]'
                    }, {
                        type: "ColumnChart",
                        title: 'Suma czasu rezerwacji użytkownika',
                        data: userCharts.allTime,
                        hTitle: "Użytkownik",
                        vTitle: 'Czas rezerwacji [m]'
                    }
                ]}
            />
            <ChartTab
                id="weekly"
                title="Ze względu na dzień tygodnia"
                charts={[
                    {
                        type: "ColumnChart",
                        title: "Średnia Ilość rezerwacji na dzień tygodnia",
                        data: weekCharts.reservationsCount,
                        hTitle: "Dzień tygodnia",
                        vTitle: "Ilość rezerwacji"
                    }, {
                        type: "ColumnChart",
                        title: 'Średni czas rezerwacji',
                        data: weekCharts.averageTimes,
                        hTitle: "Dzień tygodnia",
                        vTitle: 'Czas rezerwacji [m]'
                    }, {
                        type: "ColumnChart",
                        title: 'Suma czasu rezerwacji na dzień tygodnia',
                        data: weekCharts.allTime,
                        hTitle: "Dzień tygodnia",
                        vTitle: 'Czas rezerwacji [m]'
                    }
                ]}
            />
            <ChartTab
                id="monthly"
                title="Ze względu na dzień miesiąca"
                charts={[
                    {
                        type: "ColumnChart",
                        title: "Średnia Ilość rezerwacji na dzień miesiąca",
                        data: monthCharts.reservationsCount,
                        hTitle: "Dzień tygodnia",
                        vTitle: "Ilość rezerwacji"
                    }, {
                        type: "ColumnChart",
                        title: 'Średni czas rezerwacji',
                        data: monthCharts.averageTimes,
                        hTitle: "Dzień tygodnia",
                        vTitle: 'Czas rezerwacji [m]'
                    }, {
                        type: "ColumnChart",
                        title: 'Suma czasu rezerwacji na dzień miesiąca',
                        data: monthCharts.allTime,
                        hTitle: "Dzień tygodnia",
                        vTitle: 'Czas rezerwacji [m]'
                    }
                ]}
            />
        </Stack>
    );
}