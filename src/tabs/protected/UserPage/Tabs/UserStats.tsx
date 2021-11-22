import Stack from "@mui/material/Stack";
import React from "react";
import { MonthlyStatsItem, WeeklyStatsItem } from "../../../../models/Stats";
import ChartTab, { ChartOptionsBar } from "../../../../shared/components/ChartTab";
import { useUser } from "../UserContext";


interface ReservedRoomsStatsItem {
    reservationsCount: number,
    roomName: string,
    buildingName: string,
    averagePlannedTimeMinutes: number,
    averageActualTimeMinutes: number,
    allTimeMinutes: number
}

interface UserStatsData {
    perWeek: WeeklyStatsItem[],
    perMonth: MonthlyStatsItem[],
    reservedRooms: ReservedRoomsStatsItem[],
};



interface ChartObject {
    [index: string]: Array<number | string>[]
};


const roomChartLinks: { name: string, href: string }[] = [
    { name: "tygodniowe", href: "#weekly" },
    { name: "rezerwowane sale", href: "#rooms" },
    { name: "miesięczne", href: "#monthly" },
];


export default function UserStats() {
    const { getChartsData } = useUser();
    const [data, setData] = React.useState<UserStatsData>({
        perWeek: [],
        perMonth: [],
        reservedRooms: []
    })


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


    const reservedRoomsCharts = React.useMemo(() => {
        let obj: ChartObject = {
            rooms: [["Sala", "Ilość rezerwacji"]],
            times: [["Dzień", "Czas rzeczywisty", "Średni czas planowanny", "Średni czas rzeczywisty"]],
        }
        obj.rooms.push(...data.reservedRooms.map((item) => [
            `${item.buildingName} - ${item.roomName}`,
            item.reservationsCount
        ]));

        obj.times.push(...data.reservedRooms.map((item) =>
            [
                `${item.buildingName} - ${item.roomName}`,
                item.allTimeMinutes,
                item.averagePlannedTimeMinutes,
                item.averageActualTimeMinutes
            ]
        ));

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


    return (
        <Stack spacing={4}>

            <ChartOptionsBar links={roomChartLinks} dataSetter={setData} dataGetter={getChartsData} />
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
                id="rooms"
                title="Rezerwowane pokoje"
                charts={[
                    {
                        type: "PieChart",
                        title: "Ilość rezerwacji na salę",
                        data: reservedRoomsCharts.rooms,
                        hTitle: "Sala",
                        vTitle: "Ilość rezerwacji"
                    }, {
                        type: "ColumnChart",
                        title: 'Średni czas rezerwacji',
                        data: reservedRoomsCharts.times,
                        hTitle: "Sala",
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