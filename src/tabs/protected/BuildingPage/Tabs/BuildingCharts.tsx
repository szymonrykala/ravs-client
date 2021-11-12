import Stack from "@mui/material/Stack";
import React from "react";
import { MonthlyStatsItem, UserStatsItem, WeeklyStatsItem } from "../../../../models/Stats";
import ChartTab, { ChartOptionsBar } from "../../../../shared/components/ChartTab";
import { useBuilding } from "../BuildingContext";



interface BuildingChartsDtaInterface {
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
    const { getChartsData } = useBuilding();
    const [data, setData] = React.useState<BuildingChartsDtaInterface>({
        perWeek: [],
        perMonth: [],
        users: []
    });


    const weekCharts = React.useMemo(() => {
        let obj: ChartObject = {
            reservationsCount: [["Dzień", "Ilość rezerwacji"]],
            times: [["Dzień", "Czas rzeczywisty", "Średni czas planowanny", "Średni czas rzeczywisty"]],
        }

        obj.reservationsCount.push(...data.perWeek.map((item) => [item.dayLabel, item.reservationsCount]))
        obj.times.push(...data.perWeek.map((item) =>
            [
                item.dayLabel,
                item.allTimeMinutes,
                item.averagePlannedTimeMinutes,
                item.averageActualTimeMinutes
            ]
        ))

        return obj;
    }, [data]);


    const monthCharts = React.useMemo(() => {
        let obj: ChartObject = {
            reservationsCount: [["Dzień", "Ilość rezerwacji"]],
            times: [["Dzień", "Czas rzeczywisty", "Średni czas planowanny", "Średni czas rzeczywisty"]],
        }

        obj.reservationsCount.push(...data.perMonth.map((item) => [item.dayOfMonth, item.reservationsCount]))
        obj.times.push(...data.perMonth.map((item) => [
            item.dayOfMonth,
            item.allTimeMinutes,
            item.averagePlannedTimeMinutes,
            item.averageActualTimeMinutes
        ]))

        return obj;
    }, [data]);


    const userCharts = React.useMemo(() => {
        let obj: ChartObject = {
            reservationsCount: [["Użytkownik", "Ilość rezerwacji"]],
            times: [["Użytkownik", "Czas rzeczywisty", "Średni czas planowanny", "Średni czas rzeczywisty"]],
        }

        obj.reservationsCount.push(...data.users.map((item) => [item.email, item.reservationsCount]))
        obj.times.push(...data.users.map((item) => [
            item.email,
            item.allTimeMinutes,
            item.averagePlannedTimeMinutes,
            item.averageActualTimeMinutes
        ]))

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
                        title: 'Czas rezerwacji',
                        data: userCharts.times,
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
                        type: "PieChart",
                        title: "Średnia Ilość rezerwacji",
                        data: weekCharts.reservationsCount,
                        hTitle: "Dzień tygodnia",
                        vTitle: "Ilość rezerwacji"
                    }, {
                        type: "ColumnChart",
                        title: 'Czas rezerwacji',
                        data: weekCharts.times,
                        hTitle: "Dzień tygodnia",
                        vTitle: 'Czas reserwacji [m]'
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
                        hTitle: "Dzień miesiąca",
                        vTitle: "Ilość rezerwacji"
                    }, {
                        type: "ColumnChart",
                        title: 'Średni czas rezerwacji',
                        data: monthCharts.times,
                        hTitle: "Dzień miesiąca",
                        vTitle: 'Czas rezerwacji [m]'
                    }
                ]}
            />
        </Stack>
    );
}