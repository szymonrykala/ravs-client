import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { useQueryParams } from "../../../../../contexts/QueryParamsContext";
import { ReservationsQueryParams } from "../../../../../services/ReservationService";
import SelectButtonGroup from "../../../../../shared/components/SelectButtonGroup";
import LazyInput from "../../../../../shared/components/LazyInput";
import { isDate } from "../../../../../shared/utils";


const buttons = [
    { name: 'Dziś', value: 'today' },
    { name: 'Ten tydzień', value: 'this week' },
    { name: 'Od wczoraj', value: 'yesterday' },
];


export default function ReservationTabBar() {
    const { setQueryParams, queryParams } = useQueryParams<ReservationsQueryParams>();

    const [customDate, setCustomDate] = React.useState(new Date(isDate(queryParams.from) ? queryParams.from ?? 'xxx' : Date.now()));

    const handleButtonChange = React.useCallback((value: string) => {
        setQueryParams((old: ReservationsQueryParams) => ({ ...old, from: value }));
    }, [setQueryParams]);


    const handleSubmitCustomDate = React.useCallback((evt: React.FormEvent) => {
        evt.preventDefault();
        setQueryParams((old: ReservationsQueryParams) => ({ ...old, from: customDate.toISOString() }))
    }, [customDate, setQueryParams])


    const handleSearchFieldChange = React.useCallback((evt) => {
        setQueryParams(old => ({ ...old, search: evt.target.value }));
    }, [setQueryParams]);


    return (
        <>
            <Grid container
                component='form'
                onSubmit={handleSubmitCustomDate}
                spacing={2}
                alignItems='center'
            >
                <Grid item xs={12} md={12}>
                    <SelectButtonGroup
                        onChange={handleButtonChange}
                        buttons={buttons}
                        value={isDate(queryParams.from) ? '' : queryParams?.from ?? buttons[0].value}
                    />
                    <Box display='inline-flex' >
                        <MobileDatePicker
                            label="Od daty"
                            inputFormat="yyyy-MM-dd"
                            value={customDate}
                            onChange={(value: Date | null) => value && setCustomDate(value)}
                            renderInput={(params) => <TextField {...params} size='small' />}
                        />
                        <Button
                            variant={queryParams?.from === customDate.toISOString() ? 'contained' : 'outlined'}
                            type='submit'
                            sx={{ ml: 1 }}
                        >
                            OK
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <LazyInput
                        name="search"
                        label='wyszukaj'
                        value={queryParams.search ?? ''}
                        onChange={handleSearchFieldChange}
                    />
                </Grid>
            </Grid>
        </>
    );
}