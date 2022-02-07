import { UserChartsData } from "../../../../../models/Stats";
import { Chart, ChartSection, ChartsTab, useCharts } from "../../components/Charts";
import MonthlyChartsSection from "../../components/MonthlyChartsSection";
import WeeklyChartsSection from "../../components/WeeklyChartsSection";
import { Button } from "@mui/material";
import { usePDF } from "@react-pdf/renderer";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PDFPage from "../../components/PDF/PDFPage";
import Table from "../../components/PDF/Table";
import { weekDays } from "../../components/Charts/Chart";
import { useUser } from "../UserContext";
import { Tip } from "../../components/Tutorial";



export default function UserCharts() {
    return (
        <ChartsTab>
            <ActualLoader />
        </ChartsTab>
    );
}


function ActualLoader() {
    const { chartsData } = useCharts<UserChartsData>();
    const { user } = useUser();

    const [PDF] = usePDF({
        document: <PDFPage
            subject={`Statystyki użytkownika ${user.name} ${user.surname}, ${user.email}`}
            sections={
                [
                    <Table
                        title="Rezerwowane sale"
                        rows={[
                            [
                                'nazwa sali',
                                'ilość rezerwacji',
                                'czas rezerwacji',
                                'średni czas rezerwacji',
                                'średni planowany czas rezerwacji'
                            ]
                            , ...chartsData.reservedRooms.map(r => [
                                `${r.buildingName} - ${r.roomName}`,
                                r.reservationsCount,
                                r.allTimeMinutes,
                                r.avgActualTimeMinutes,
                                r.avgPlannedTimeMinutes
                            ])
                        ]}
                    />,
                    <Table
                        title="Statystyki tygodniowe"
                        rows={[
                            [
                                'dzień tygodnia',
                                'ilość rezerwacji',
                                'czas rezerwacji',
                                'średni czas rezerwacji',
                                'średni planowany czas rezerwacji'
                            ]
                            , ...chartsData.weekly.map(r => [
                                weekDays[r.day],
                                r.reservationsCount,
                                r.allTimeMinutes,
                                r.avgActualTimeMinutes,
                                r.avgPlannedTimeMinutes
                            ])
                        ]}
                    />,
                    <Table
                        title="Statystyki miesięczne"
                        rows={[
                            [
                                'dzień miesiąca',
                                'ilość rezerwacji',
                                'czas rezerwacji',
                                'średni czas rezerwacji',
                                'średni planowany czas rezerwacji'
                            ]
                            , ...chartsData.monthly.map(r => [
                                r.day,
                                r.reservationsCount,
                                r.allTimeMinutes,
                                r.avgActualTimeMinutes,
                                r.avgPlannedTimeMinutes
                            ])
                        ]}
                    />
                ]} />
    });

    return (
        <>
            {
                (PDF.loading || !PDF.url) ?
                    <p>loading pdf ...</p>
                    :
                    <Tip text='Kliknij tutaj aby pobrać raport w formacie PDF.'>
                        <Button startIcon={<PictureAsPdfIcon />}>
                            <a href={PDF.url} download={'stats.pdf'} title='pobierz tabele pdf'>
                                Pobierz raport pdf
                            </a>
                        </Button>
                    </Tip>
            }

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