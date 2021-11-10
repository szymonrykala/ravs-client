import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { useReservations } from "../../../../contexts/ReservationsContext";
import { ReservationsQueryParams } from "../../../../services/ReservationService";
import SelectButtonGroup from "../../SelectButtonGroup";


const buttons = [
    { name: 'Ostatnie rezerwacje', value: '10 minutes ago' },
    { name: 'Następny dzień', value: 'tomorrow' },
    { name: ' Z Wczoraj', value: 'yesterday' },
]


export default function ReservationTabBar() {
    const { setQueryParams } = useReservations();
    const [customDate, setCustomDate] = React.useState(new Date());

    const handleButtonChange = (value: string) =>
        setQueryParams((old: ReservationsQueryParams) => ({ ...old, from: value }));

    const handleSubmitCustomDate = (evt: React.FormEvent) => {
        evt.preventDefault();
        setQueryParams((old: ReservationsQueryParams) => ({ ...old, from: customDate.toISOString() }))
    }

    return (
        <>
            <Grid container rowSpacing={5} alignItems='center'>
                <Grid item xs={12} md={8}>
                    <SelectButtonGroup
                        onSelectedChange={handleButtonChange}
                        buttons={buttons}
                        defaultButtonIndex={0}
                    />
                </Grid>
                <Grid item xs={12} md={4} component='form' onSubmit={handleSubmitCustomDate}>
                    <Box display='flex' >
                        <MobileDatePicker
                            label="Od daty"
                            inputFormat="yyyy-MM-dd"
                            value={customDate}
                            onChange={(value: Date | null) => value && setCustomDate(value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Button variant='outlined' type='submit' sx={{ ml: 1 }}>
                            OK
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}