import { BuildingOrRoomChartsData } from "../../../models/Stats";
import { ChartsTab, Chart, ChartSection, useCharts } from "../../../shared/components/Charts";
import MonthlyChartsSection from "./MonthlyChartsSection";
import WeeklyChartsSection from "./WeeklyChartsSection";



export default function RoomOrBuildingChartTab() {
    return (
        <ChartsTab>
            <ActualLoader />
        </ChartsTab>
    );
}

// need to use actual loading component to access charts context in ChartsTab
function ActualLoader() {
    const { chartsData } = useCharts<BuildingOrRoomChartsData>();

    return (
        <>
            <WeeklyChartsSection data={chartsData.weekly} />

            <MonthlyChartsSection data={chartsData.monthly} />

            <ChartSection defaultOpen title='Wykresy odnośnie użytkowników'>
                <Chart
                    fullWidth
                    title="Średnie czasy rezerwacji"
                    data={chartsData.users}
                    xKey='email'
                    y={[
                        { label: 'Średni planowany czas', key: 'avgPlannedTimeMinutes' },
                        { label: 'Średni faktyczny czas', key: 'avgActualTimeMinutes' },
                    ]}
                />
                <Chart
                    fullWidth
                    title='Ilość rezerwacji użytkowników'
                    data={chartsData.users}
                    xKey='email'
                    y={[
                        { label: 'Ilość rezerwacji', key: 'reservationsCount' }
                    ]}
                />
                <Chart
                    fullWidth
                    title="Czas wszystkich reserwacji danego użytkownika"
                    data={chartsData.users}
                    xKey='email'
                    y={[
                        { label: 'Czas całkowity', key: 'allTimeMinutes' },
                    ]}
                />
            </ChartSection>
        </>
    )
}