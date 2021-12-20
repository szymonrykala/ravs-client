import React from "react";
import { DayStatsItem } from "../../../../models/Stats";
import { Chart, ChartSection } from "./Charts";


interface WeeklyChartsSectionProps {
    data: DayStatsItem[]
}


function WeeklyChartsSection(props: WeeklyChartsSectionProps) {
    return (
        <ChartSection title='Statystyki tygodniowe'>
            <Chart
                fullWidth
                resolveDay
                title='Ilość rezerwacji na dzień tygodnia'
                data={props.data}
                xKey='day'
                y={[
                    { label: 'Ilość rezerwacji', key: 'reservationsCount' }
                ]}
            />
            <Chart
                fullWidth
                resolveDay
                title="Faktyczny czas wszystkich rezerwacji"
                data={props.data}
                xKey='day'
                y={[
                    { label: 'Czas całkowity [m]', key: 'allTimeMinutes' },
                ]}
            />
            <Chart
                fullWidth
                resolveDay
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

export default React.memo(WeeklyChartsSection);