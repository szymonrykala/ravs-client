import { Stack } from "@mui/material";
import React from "react";
import { WeeklyStatsItem, MonthlyStatsItem, UserStatsItem } from "../../../../models/Stats";
import ChartTab, { ChartOptionsBar } from "../../../../shared/components/ChartTab";
import { useAddress } from "../AddressContext";



interface AllBuildingsChartsDtaInterface {
    allReservations: ChartDataRow[]
}

interface ChartDataRow {
    id: number,
    name: string,
    allTimeMinutes: number,
    reservationsCount: number,
    averageActualTimeMinutes: number,
    averagePlannedTimeMinutes: number,
}

const roomChartLinks: { name: string, href: string }[] = [
    { name: "Dla każdego budynku", href: "#buildings" },
    // { name: "tygodniowe", href: "#weekly" },
    // { name: "użytkownicy", href: "#users" },
]


export default function AddressCharts() {
    const { getChartsData } = useAddress();
    const [data, setData] = React.useState<AllBuildingsChartsDtaInterface>({
        allReservations: []
    });


    const chartsData = React.useMemo(() => {
        let obj: {
            reservations: Array<string | number>[],
            times: Array<string | number>[]
        } = {
            reservations: [["Budynek", "Liczba rezerwacji"]],
            times: [['Budynek', 'Czas całkowity', 'Planowany czas', 'Czas rzeczywisty']]
        };

        obj.reservations.push(...data.allReservations.map(row => [row.name, row.reservationsCount]))
        obj.times.push(...data.allReservations.map(row =>
            [row.name, row.allTimeMinutes, row.averagePlannedTimeMinutes, row.averageActualTimeMinutes]
        ));

        return obj;
    }, [data]);


    return (
        <Stack spacing={4}>
            <ChartOptionsBar links={roomChartLinks} dataSetter={setData} dataGetter={getChartsData} />
            <ChartTab
                id="buildings"
                title="Statystyki budynków pod tym adresem"
                charts={
                    [
                        {
                            type: "PieChart",
                            title: "Ilość reserwacji w każdym budynku",
                            data: chartsData.reservations,
                            hTitle: "Budynek",
                            vTitle: "Ilość rezerwacji"
                        }, {
                            type: "ColumnChart",
                            title: 'Czas trwania rezerwacji',
                            data: chartsData.times,
                            hTitle: "Budynek",
                            vTitle: 'Czas [m]'
                        }
                    ]}
            />
        </Stack>
    );
}