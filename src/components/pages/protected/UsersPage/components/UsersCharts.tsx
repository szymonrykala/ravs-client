import { AllUsersChartsData } from "../../../../../models/Stats";
import { Chart, ChartSection, ChartsTab, useCharts } from "../../components/Charts";



export default function UsersCharts() {
    return (
        <ChartsTab>
            <ActualLoader />
        </ChartsTab>
    );
}


function ActualLoader() {
    const { chartsData } = useCharts<AllUsersChartsData>();

    return (
        <ChartSection defaultOpen title='Statystyki użytkowników'>
            <Chart
                fullWidth={chartsData.users.length >= 6}
                title='Ilość rezerwacji na użytkownika'
                data={chartsData.users}
                xKey='email'
                y={[
                    { label: 'Ilość rezerwacji', key: 'reservationsCount' }
                ]}
            />
            <Chart
                fullWidth={chartsData.users.length >= 6}
                title="Czas wszystkich reserwacji w dany dzień"
                data={chartsData.users}
                xKey='email'
                y={[
                    { label: 'Czas całkowity', key: 'allTimeMinutes' },
                ]}
            />
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
        </ChartSection>
    );
}