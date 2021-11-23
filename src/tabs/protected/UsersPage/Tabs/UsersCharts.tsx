import Stack from "@mui/material/Stack";
import React from "react";
import ChartTab, { ChartOptionsBar } from "../../../../shared/components/ChartTab";
import { useUsers } from "../UsersContext";



interface ChartObject {
    [index: string]: Array<number | string>[]
}


interface UserChartData {
    id: number,
    email: string,
    reservationsCount: number,
    averagePlannedTimeMinutes: number,
    averageActualTimeMinutes: number,
    allTimeMinutes: number
}



export default function UsersCharts() {
    const { getChartsData } = useUsers();

    const [data, setData] = React.useState<{ allUsers: UserChartData[] }>({
        allUsers: []
    });


    const chartData = React.useMemo(() => {
        let obj: ChartObject = {
            reservationsCount: [["Użytkownik", "Ilość rezerwacji"]],
            times: [["Użytkownik", "Czas rzeczywisty", "Średni czas planowanny", "Średni czas rzeczywisty"]],
        };

        obj.reservationsCount.push(...data.allUsers.map((item) => [item.email, item.reservationsCount]))
        obj.times.push(...data.allUsers.map((item) => [
            item.email,
            item.allTimeMinutes,
            item.averagePlannedTimeMinutes,
            item.averageActualTimeMinutes
        ]))

        return obj;
    }, [data]);


    return (
        <Stack spacing={4}>
            <ChartOptionsBar links={[]} dataSetter={setData} dataGetter={getChartsData} />
            <ChartTab
                id="users"
                title="Ze względu na użytkowników"
                charts={[
                    {
                        type: "PieChart",
                        title: "Ilość rezerwacji na użytkownika",
                        data: chartData.reservationsCount,
                        hTitle: "Użytkownik",
                        vTitle: "Ilość rezerwacji"
                    }, {
                        type: "ColumnChart",
                        title: 'Czas rezerwacji',
                        data: chartData.times,
                        hTitle: "Użytkownik",
                        vTitle: 'Czas rezerwacji [m]'
                    }
                ]}
            />
        </Stack>
    );
}