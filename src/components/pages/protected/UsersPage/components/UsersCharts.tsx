import React from 'react';
import { AllUsersChartsData } from "../../../../../models/Stats";
import { Chart, ChartSection, ChartsTab, useCharts } from "../../components/Charts";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Button } from "@mui/material";
import { usePDF } from "@react-pdf/renderer";
import PDFPage from "../../components/PDF/PDFPage";
import Table from "../../components/PDF/Table";



export default function UsersCharts() {
    return (
        <ChartsTab>
            <ActualLoader />
        </ChartsTab>
    );
}


function ActualLoader() {
    const { chartsData } = useCharts<AllUsersChartsData>();


    const [PDF] = usePDF({
        document: <PDFPage
            subject='Statystyki użytkowników'
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
        </>
    );
}