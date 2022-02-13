import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AxisOptions } from "react-charts";
import { Chart as ReactChart } from 'react-charts'
import BarChartIcon from '@mui/icons-material/BarChart';



export const weekDays = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
];


interface ChartSeries {
    x: any
    y: number,
}


interface ChartProps<T> {
    data: T[],
    title: string,
    fullWidth?: boolean,
    resolveDay?: boolean
    xKey: keyof T,
    y: { label: string, key: keyof T }[]
}


export default function Chart<DataType>(props: ChartProps<DataType>) {

    const primaryAxis = React.useMemo((): AxisOptions<ChartSeries> => ({
        getValue: item => props.resolveDay ? weekDays[Number(item.x)] : item.x,
        min: 0
    }), [props.resolveDay]);


    const secondaryAxes = React.useMemo((): AxisOptions<ChartSeries>[] => [
        {
            getValue: item => item.y,
            position: 'left',
            elementType: 'bar',
            minDomainLength: 15,
            hardMin: 0,
            scaleType: 'linear',
            showDatumElements: true
        }
    ], []);


    const data = React.useMemo(() => {
        const obj: { label: string, data: ChartSeries[] }[] = props.y.map(({ label }) => ({ label: label, data: [] }))

        props.data.forEach((item) => {
            props.y.forEach(({ key }, index) => {
                obj[index].data.push({
                    x: item[props.xKey],
                    y: Number(item[key]),
                });
            })
        })
        return obj;
    }, [
        props.y,
        props.xKey,
        props.data,
    ]);


    return (
        <Grid item
            xs={12}
            lg={props.fullWidth ? 12 : 6}
        >
            <Stack direction='row' spacing={1} alignItems='center'>
                <Typography variant="body2" component='h4' color='text.secondary'>
                    {props.title}
                </Typography>
                <BarChartIcon color='primary' />

            </Stack>
            {props.data.length === 0 ?
                <Typography component='p' color='text.secondary'>
                    Brak danych do nakreślenia wykresu
                </Typography>
                : <Box
                    sx={{
                        maxHeight: '400px',
                        height: '40vh',
                        minHeight: '300px',
                        width: '100%',
                    }}>

                    <ReactChart
                        options={{
                            data,
                            primaryAxis,
                            secondaryAxes,
                        }}
                    />
                </Box>}
        </Grid>
    )
}