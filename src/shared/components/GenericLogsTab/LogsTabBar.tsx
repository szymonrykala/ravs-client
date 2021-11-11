import { Grid, FormControl, InputLabel, Select, MenuItem, Input } from "@mui/material";
import React from "react";
import { useQueryParams } from "../../../contexts/QueryParamsContext";
import { LogsQueryParams } from "../../../services/interfaces";



export function LogsTabBar() {
    const { queryParams, setQueryParams } = useQueryParams<LogsQueryParams>();


    const handleChange = React.useCallback((evt: any) => {
        evt.preventDefault();
        setQueryParams(old => ({ ...old, [evt.target.name]: evt.target.value }));
    }, [setQueryParams])


    return (
        <Grid container component="form" columnSpacing={3}>
            <Grid item xs={6} md={2}>
                <FormControl fullWidth>
                    <InputLabel id="wybierz-metode">Metoda</InputLabel>
                    <Select
                        labelId="wybierz-metode"
                        id="metoda"
                        value={queryParams.method}
                        name="method"
                        label="wybierz-metode"
                        onChange={handleChange}
                    >
                        <MenuItem value="">brak</MenuItem>
                        <MenuItem value="GET">GET</MenuItem>
                        <MenuItem value="POST">POST</MenuItem>
                        <MenuItem value="PATCH">PATCH</MenuItem>
                        <MenuItem value="DELETE">DELETE</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
                <FormControl fullWidth>
                    <InputLabel id="Id użytkownika">Id użytkownika</InputLabel>
                    <Input
                        type="number"
                        id="Id użytkownika"
                        name="user"
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

