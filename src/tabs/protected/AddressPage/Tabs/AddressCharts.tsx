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
        <ChartSection defaultOpen title='Wykresy tygodniowe'>
            <Chart
                title='Ilość rezerwacji na dzień tygodnia'
                data={chartsData.allReservations}
                xKey='name'
                y={[
                    { label: 'Ilość rezerwacji', key: 'reservationsCount' }
                ]}
            />
            <Chart
                title="Czas wszystkich reserwacji w dany dzień"
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