import { Box, Grid, Paper, Typography } from "@mui/material";
import Chart from "react-google-charts";
import { GoogleChartWrapperChartType } from "react-google-charts/dist/types";
import Loading from "../Loading";

interface ChartTabProps {
    id?: string,
    title: string,
    charts: ChartTabItem[]
}

interface ChartTabItem {
    type: GoogleChartWrapperChartType,
    title: string,
    data: Array<string | number>[],
    hTitle: string,
    vTitle: string
}

export default function ChartTab({
    charts, title, id
}: ChartTabProps) {
    return (
        <Box>
            <Typography id={id} variant="h5" color="text.primary" sx={{ paddingTop: 4.5, paddingBottom: 1.5 }}>
                {title}
            </Typography>
            <Paper
                elevation={2}
                sx={{ borderRadius: ({ shape }) => shape.borderRadius }}
            >
                <Grid container columnSpacing={3}>
                    {charts.map((chart, index) =>
                        <Grid key={index} item xs={12} md={6}>
                            <Chart
                                height={400}
                                chartType={chart.type}
                                loader={<Loading />}
                                data={chart.data}
                                options={{
                                    title: chart.title,
                                    titleTextStyle: {
                                        bold: false,
                                        color: "#444",
                                        fontSize: "16"
                                    },
                                    chartArea: { width: '80%' },
                                    hAxis: {
                                        title: chart.hTitle,
                                        minValue: 0,
                                    },
                                    vAxis: {
                                        title: chart.vTitle,
                                    },
                                }}
                                legendToggle
                            />
                        </Grid>)}
                </Grid>
            </Paper>
        </Box>
    );
}