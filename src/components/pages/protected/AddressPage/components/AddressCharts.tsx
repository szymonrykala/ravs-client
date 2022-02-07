import { BuildingsOrRoomsChartsData } from "../../../../../models/Stats";
import { Chart, ChartSection, ChartsTab, useCharts } from "../../components/Charts";
import { useAddress } from "../AddressContext";
import { usePDF } from "@react-pdf/renderer";
import { Button } from "@mui/material";
import PDFPage from "../../components/PDF/PDFPage";
import Table from "../../components/PDF/Table";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Tip } from "../../components/Tutorial";



export default function AddressCharts() {
    return (
        <ChartsTab>
            <ActualLoader />
        </ChartsTab>
    );
}

function ActualLoader() {
    const { chartsData } = useCharts<BuildingsOrRoomsChartsData>();
    const { address } = useAddress();

    const [PDF] = usePDF({
        document: <PDFPage
            subject={`Statystyki adresu ${address.town}, ${address.street} ${address.number}`}
            sections={
                [
                    <Table
                        title="Statystyki dla budynków pod adresem"
                        rows={[
                            [
                                'nazwa budynku',
                                'ilość rezerwacji',
                                'czas rezerwacji',
                                'średni czas rezerwacji',
                                'średni planowany czas rezerwacji'
                            ]
                            , ...chartsData.allReservations.map(r => [
                                r.name,
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
        </>
    );
};