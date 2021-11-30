import { BuildingsOrRoomsChartsData } from "../../../../models/Stats";
import { Chart, ChartSection, ChartsTab, useCharts } from "../../../../shared/components/Charts";



export default function AddressCharts() {
    return (
        <ChartsTab>
            <ActualLoader />
        </ChartsTab>
    );
}

function ActualLoader() {
    const { chartsData } = useCharts<BuildingsOrRoomsChartsData>();

    return (
        <ChartSection defaultOpen title='Statystyki budynków'>
            <Chart
                fullWidth
                title='Ilość rezerwacji'
                data={chartsData.allReservations}
                xKey='name'
                y={[
                    { label: 'Ilość rezerwacji', key: 'reservationsCount' }
                ]}
            />
            <Chart
                fullWidth
                title="Czas wszystkich reserwacji"
                data={chartsData.allReservations}
                xKey='name'
                y={[
                    { label: 'Czas całkowity', key: 'allTimeMinutes' },
                ]}
            />
            <Chart
                fullWidth
                title="Średnie czasy rezerwacji"
                data={chartsData.allReservations}
                xKey='name'
                y={[
                    { label: 'Średni planowany czas', key: 'avgPlannedTimeMinutes' },
                    { label: 'Średni faktyczny czas', key: 'avgActualTimeMinutes' },
                ]}
            />
        </ChartSection>
    );
};