import { UserChartsData } from "../../../../models/Stats";
import { Chart, ChartSection, ChartsTab, useCharts } from "../../../../shared/components/Charts";
import MonthlyChartsSection from "../../shared/MonthlyChartsSection";
import WeeklyChartsSection from "../../shared/WeeklyChartsSection";


export default function UserCharts() {
    return (
        <ChartsTab>
            <ActualLoader />
        </ChartsTab>
    );
}


function ActualLoader() {
    const { chartsData } = useCharts<UserChartsData>();

    return (
        <>
            <ChartSection defaultOpen title='Rezerwowane Sale'>
                <Chart
                    fullWidth
                    title='Ilość rezerwacji w rezerwowanych salach'
                    data={chartsData.reservedRooms}
                    xKey='roomName'
                    y={[
                        { label: 'Ilość rezerwacji', key: 'reservationsCount' }
                    ]}
                />
                <Chart
                    fullWidth
                    title="Średnie czasy rezerwacji"
                    data={chartsData.reservedRooms}
                    xKey='roomName'
                    y={[
                        { label: 'Średni planowany czas', key: 'avgPlannedTimeMinutes' },
                        { label: 'Średni faktyczny czas', key: 'avgActualTimeMinutes' },
                    ]}
                />
                <Chart
                    fullWidth
                    title="Czas wszystkich rezerwacji w danej sali"
                    data={chartsData.reservedRooms}
                    xKey='roomName'
                    y={[
                        { label: 'Czas całkowity', key: 'allTimeMinutes' },
                    ]}
                />
            </ChartSection>

            <WeeklyChartsSection data={chartsData.weekly} />

            <MonthlyChartsSection data={chartsData.monthly} />
        </>
    );
}