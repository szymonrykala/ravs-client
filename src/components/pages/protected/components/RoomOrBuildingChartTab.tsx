import { Button } from "@mui/material";
import { usePDF } from "@react-pdf/renderer";
import React from "react";
import { BuildingOrRoomChartsData } from "../../../../models/Stats";

import { ChartsTab, Chart, ChartSection, useCharts } from "./Charts";
import { weekDays } from "./Charts/Chart";
import MonthlyChartsSection from "./MonthlyChartsSection";
import PDFPage from "./PDF/PDFPage";
import Table from "./PDF/Table";
import WeeklyChartsSection from "./WeeklyChartsSection";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useRoomContext } from "../RoomPage/RoomContext";
import { useBuilding } from "../BuildingPage/BuildingContext";


function RoomOrBuildingChartTab() {
    return (
        <ChartsTab>
            <ActualLoader />
        </ChartsTab>
    );
}

// need to use actual loading component to access charts context in ChartsTab
const ActualLoader = React.memo(() => {
    const { chartsData } = useCharts<BuildingOrRoomChartsData>();
    const roomContext = useRoomContext();
    const buildingContext = useBuilding();


    const [PDF] = usePDF({
        document: <PDFPage
            subject={'Statystyki ' + (roomContext ?
                `sali ${roomContext.room.name}` :
                buildingContext ? `budynku ${buildingContext.building.name}` :
                    'nie rozpoznano')
            }
            sections={
                [
                    <Table
                        title="Statystyki użytkowników"
                        rows={[
                            [
                                'email',
                                'ilość rezerwacji',
                                'czas rezerwacji',
                                'średni czas rezerwacji',
                                'średni planowany czas rezerwacji'
                            ]
                            , ...chartsData.users.map(r => [
                                r.email,
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
                    <Button startIcon={<PictureAsPdfIcon />}>
                        <a href={PDF.url} download={'stats.pdf'} title='pobierz tabele pdf'>
                            Pobierz raport pdf
                        </a>
                    </Button>
            }

            <WeeklyChartsSection data={chartsData.weekly} />

            <MonthlyChartsSection data={chartsData.monthly} />

            <ChartSection
                defaultOpen
                title='Wykresy odnośnie użytkowników'
            >
                <Chart
                    fullWidth={chartsData.users.length > 2}
                    title="Średnie czasy rezerwacji"
                    data={chartsData.users}
                    xKey='email'
                    y={[
                        { label: 'Średni planowany czas', key: 'avgPlannedTimeMinutes' },
                        { label: 'Średni faktyczny czas', key: 'avgActualTimeMinutes' },
                    ]}
                />
                <Chart
                    fullWidth={chartsData.users.length > 2}
                    title='Ilość rezerwacji użytkowników'
                    data={chartsData.users}
                    xKey='email'
                    y={[
                        { label: 'Ilość rezerwacji', key: 'reservationsCount' }
                    ]}
                />
                <Chart
                    fullWidth={chartsData.users.length > 2}
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
});

export default React.memo(RoomOrBuildingChartTab);