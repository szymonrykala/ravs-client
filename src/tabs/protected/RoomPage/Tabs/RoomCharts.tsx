import { RedoRounded } from "@mui/icons-material";
import { Box, Divider } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { WeeklyStatsItem, MonthlyStatsItem, UserStatsItem } from "../../../../models/Stats";
import RoomService, { RoomViewParams } from "../../../../services/RoomService";
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
    const params = useParams<RoomViewParams>();
    const { getChartsData } = useRoomContext();
    const [data, setData] = React.useState<RoomChartsDtaInterface>();

    // React.useEffect(() => {
    //     RoomService.setPath(params);
    // }, [params.roomId]);

    // const getRoomChartsData = async (query: any) => await RoomService.getChartsData(query);


    const weekCharts = React.useMemo(() => {
        let obj: ChartObject = {
            reservationsCount: [["Dzień", "Ilość rezerwacji"]],
            averageTimes: [["Dzień", "Planowanny czas", "Faktyczny czas"]],
            allTime: [["Dzień", "Czas"]]
        }
        if (!data) return obj;

        obj.reservationsCount.push(...data.perWeek.map((item) => [item.dayLabel, item.reservationsCount]))
        obj.allTime.push(...data.perWeek.map((item) => [item.dayLabel, item.allTimeMinutes]))
        obj.averageTimes.push(...data.perWeek.map((item) => [item.dayLabel, item.averagePlannedTimeMinutes, item.averageActualTimeMinutes]))

        return obj;
    }, [data?.perWeek]);

    const monthCharts = React.useMemo(() => {
        let obj: ChartObject = {
            reservationsCount: [["Dzień", "Ilość rezerwacji"]],
            averageTimes: [["Dzień", "Planowanny czas", "Faktyczny czas"]],
            allTime: [["Dzień", "Czas"]]
        }
        if (!data) return obj;

        obj.reservationsCount.push(...data.perMonth.map((item) => [item.dayOfMonth, item.reservationsCount]))
        obj.allTime.push(...data.perMonth.map((item) => [item.dayOfMonth, item.allTimeMinutes]))
        obj.averageTimes.push(...data.perMonth.map((item) => [item.dayOfMonth, item.averagePlannedTimeMinutes, item.averageActualTimeMinutes]))

        return obj;
    }, [data?.perMonth]);

    const userCharts = React.useMemo(() => {
        let obj: ChartObject = {
            reservationsCount: [["Dzień", "Ilość rezerwacji"]],
            averageTimes: [["Dzień", "Planowanny czas", "Faktyczny czas"]],
            allTime: [["Dzień", "Czas"]]
        }
        if (!data) return obj;

        obj.reservationsCount.push(...data.users.map((item) => [item.email, item.reservationsCount]))
        obj.allTime.push(...data.users.map((item) => [item.email, item.allTimeMinutes]))
        obj.averageTimes.push(...data.users.map((item) => [item.email, item.averagePlannedTimeMinutes, item.averageActualTimeMinutes]))

        return obj;
    }, [data?.users]);


    return (
        <Box>
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
            <Divider />
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
            <Divider />
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
        </Box>
    );
}