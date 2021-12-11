import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";
import { useQueryParams } from "../../../../../contexts/QueryParamsContext";
import { LogsQueryParams } from "../../../../../services/LogService";
import LazyInput from "../../components/LazyInput";



export function LogsTabBar() {
    const { queryParams, setQueryParams } = useQueryParams<LogsQueryParams>();


    const handleChange = React.useCallback((evt: any) => {
        evt.preventDefault();
        setQueryParams(old => ({ ...old, [evt.target.name]: evt.target.value }));
    }, [setQueryParams])


    return (
        <Grid container component="form" spacing={3}>
            <Grid item xs={6} md={2}>
                <FormControl fullWidth>
                    <InputLabel id="wybierz-metode">Metoda</InputLabel>
                    <Select
                        size="small"
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
                <LazyInput
                    label="id użytkownika"
                    name='userId'
                    value={queryParams.userId?.toString() ?? ''}
                    onChange={(evt) => setQueryParams(old => ({ ...old, userId: evt.target.value }))}
                />
            </Grid>
        </Grid>
    );
}

