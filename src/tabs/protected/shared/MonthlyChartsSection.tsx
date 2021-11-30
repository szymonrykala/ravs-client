import { DayStatsItem } from "../../../models/Stats";
import { Chart, ChartSection } from "../../../shared/components/Charts";


interface MonthlyChartsSectionProps {
    data: DayStatsItem[]
}


export default function MonthlyChartsSection(props: MonthlyChartsSectionProps) {
    return (
        <ChartSection title='Statystyki miesięczne'>
            <Chart
                fullWidth
                title='Ilość rezerwacji na dzień miesiąca'
                data={props.data}
                xKey='day'
                y={[
                    { label: 'Ilość rezerwacji', key: 'reservationsCount' }
                ]}
            />
            <Chart
                fullWidth
                title="Faktyczny czas wszystkich rezerwacji"
                data={props.data}
                xKey='day'
                y={[
                    { label: 'Czas całkowity [m]', key: 'allTimeMinutes' },
                ]}
            />
            <Chart
                fullWidth
                title="Średni czas rezerwacji"
                data={props.data}
                xKey='day'
                y={[
                    { label: 'Średni planowany czas [m]', key: 'avgPlannedTimeMinutes' },
                    { label: 'Średni faktyczny czas [m]', key: 'avgActualTimeMinutes' },
                ]}
            />
        </ChartSection>
    );
}